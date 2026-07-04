import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";

const port = Number(process.env.PORT || 8000);
const anthropicKey = process.env.ANTHROPIC_API_KEY;
const claudeModel = process.env.CLAUDE_MODEL || "claude-3-5-haiku-latest";
const root = resolve(process.cwd());

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml"
};

createServer(async (req, res) => {
  try {
    const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
    if (req.method === "POST" && url.pathname === "/api/triage") {
      await handleTriage(req, res);
      return;
    }

    const pathname = url.pathname === "/" ? "/index.html" : decodeURIComponent(url.pathname);
    const target = resolve(root, `.${pathname}`);

    if (target !== root && !target.startsWith(root + sep)) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }

    const body = await readFile(target);
    res.writeHead(200, {
      "Content-Type": types[extname(target)] || "application/octet-stream",
      "Cache-Control": "no-store"
    });
    res.end(body);
  } catch (error) {
    res.writeHead(error.code === "ENOENT" ? 404 : 500);
    res.end(error.code === "ENOENT" ? "Not found" : "Server error");
  }
}).listen(port, () => {
  console.log(`SansadSetu demo running at http://localhost:${port}`);
});

async function handleTriage(req, res) {
  const payload = await readJson(req);
  if (!anthropicKey) {
    sendJson(res, 200, {
      enabled: false,
      reason: "ANTHROPIC_API_KEY is not set; browser used local demo triage."
    });
    return;
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": anthropicKey,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: claudeModel,
      max_tokens: 700,
      temperature: 0,
      messages: [
        {
          role: "user",
          content: buildTriagePrompt(payload)
        }
      ]
    })
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    sendJson(res, 502, {
      enabled: true,
      error: "Claude API request failed",
      detail: data.error?.message || response.statusText
    });
    return;
  }

  const text = (data.content || []).map((part) => part.text || "").join("\n").trim();
  const triage = parseJsonBlock(text);
  sendJson(res, 200, {
    enabled: true,
    model: claudeModel,
    triage
  });
}

function buildTriagePrompt(payload) {
  return `You are triaging complaints for an Indian Member of Parliament constituency command center.
Return only valid JSON. Do not include markdown.

Allowed categories: water, road, electricity, health, education, land, sanitation, crowd.
Priority must be one of: Critical, High, Moderate, Routine.
Urgency score must be an integer from 0 to 100.

Complaint payload:
${JSON.stringify(payload, null, 2)}

Return this exact JSON shape:
{
  "category": "water",
  "location": "Ward or village name",
  "urgency_score": 0,
  "priority": "Moderate",
  "sentiment": "routine",
  "repeated_reports": 1,
  "summary": "One sentence summary",
  "recommended_action": "One operational next step",
  "extracted_signals": {
    "keywords": [],
    "risk_factors": [],
    "infrastructure_gap": ""
  }
}`;
}

function parseJsonBlock(text) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1 || end < start) {
    throw new Error("Claude response did not contain JSON.");
  }
  return JSON.parse(text.slice(start, end + 1));
}

async function readJson(req) {
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > 1_000_000) throw new Error("Payload too large.");
    chunks.push(chunk);
  }
  const text = Buffer.concat(chunks).toString("utf8");
  return text ? JSON.parse(text) : {};
}

function sendJson(res, status, payload) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}


