 th {
 position: sticky;
 top: 0;
 z-index: 1;
 background: #f8faf8;
 color: var(--muted);
 font-size: 0.72rem;
 font-weight: 790;
 text-transform: uppercase;
 letter-spacing: 0.06em;
 }

 td:first-child,
 th:first-child {
 padding-left: 16px;
 }

 td:last-child,
 th:last-child {
 padding-right: 16px;
 }

 tr:hover td {
 background: #fbfcfb;
 }

 .complaint-text {
 max-width: 360px;
 line-height: 1.35;
 }

 .badge {
 display: inline-flex;
 align-items: center;
 gap: 6px;
 min-height: 24px;
 padding: 4px 7px;
 border-radius: 999px;
 border: 1px solid var(--line);
 background: #fff;
 color: var(--muted);
 font-size: 0.74rem;
 font-weight: 750;
 white-space: nowrap;
 }

 .badge-critical {
 border-color: rgba(196,61,61,0.32);
 background: rgba(196,61,61,0.08);
 color: #9f2929;
 }

 .badge-high {
 border-color: rgba(217,125,43,0.36);
 background: rgba(217,125,43,0.11);
 color: #a25414;
 }

 .badge-moderate {
 border-color: rgba(185,130,15,0.32);
 background: rgba(185,130,15,0.1);
 color: #7b570a;
 }

 .score {
 display: grid;
 gap: 5px;
 min-width: 88px;
 }

 .score strong {
 font-size: 1.08rem;
 line-height: 1;
 }

 .scorebar {
 height: 6px;
 overflow: hidden;
 border-radius: 999px;
 background: #e5ebe6;
 }

 .scorebar span {
 display: block;
 width: var(--w);
 height: 100%;
 border-radius: inherit;
 background: var(--c);
 }

 .category-dot {
 width: 9px;
 height: 9px;
 border-radius: 50%;
 background: var(--dot);
 flex: 0 0 auto;
 }

 .insight-grid {
 display: grid;
 grid-template-columns: repeat(3, minmax(0, 1fr));
 gap: 12px;
 }

 .insight {
 border: 1px solid var(--line);
 border-radius: var(--radius);
 background: #fff;
 padding: 12px;
 min-height: 142px;
 }

 .insight-top {
 display: flex;
 justify-content: space-between;
 gap: 10px;
 align-items: start;
 }

 .rank {
 width: 30px;
 height: 30px;
 display: grid;
 place-items: center;
 border-radius: var(--radius);
 color: #fff;
 background: #1e5948;
 font-size: 0.82rem;
 font-weight: 820;
 flex: 0 0 auto;
 }

 .insight h3 {
 margin: 0;
 font-size: 0.94rem;
 line-height: 1.2;
 }

 .insight p {
 margin: 8px 0 0;
 color: var(--muted);
 font-size: 0.82rem;
 line-height: 1.4;
 }

 .mini-facts {
 display: flex;
 flex-wrap: wrap;
 gap: 6px;
 margin-top: 10px;
 }

 .toast {
 position: fixed;
 right: 18px;
 bottom: 18px;
 z-index: 1000;
 display: none;
 width: min(390px, calc(100vw - 36px));
 padding: 12px 13px;
 border: 1px solid rgba(22, 132, 95, 0.32);
 border-radius: var(--radius);
 background: #fff;
 color: var(--ink);
 box-shadow: var(--shadow);
 font-weight: 720;
 line-height: 1.35;
 }

 .toast.show {
 display: block;
 animation: rise 0.24s ease;
 }

 @keyframes rise {
 from { transform: translateY(8px); opacity: 0; }
 to { transform: translateY(0); opacity: 1; }
 }

 .leaflet-popup-content-wrapper,
 .leaflet-popup-tip {
 border-radius: var(--radius);
 }

 .popup {
 min-width: 210px;
 display: grid;
 gap: 7px;
 font-family: var(--font);
 }

 .popup-title {
 font-weight: 800;
 color: var(--ink);
 }

 .popup-meta {
 color: var(--muted);
 font-size: 0.82rem;
 line-height: 1.35;
