import { pageLabel } from "./pageLabel";

const COLS = [
  ["Date", (e) => new Date(e.created_at).toLocaleString()],
  ["Type", (e) => (e.kind === "session" ? "Session booking" : "Enquiry")],
  ["Name", (e) => e.name],
  ["Email", (e) => e.email],
  ["Phone", (e) => e.phone],
  ["Vertical", (e) => e.vertical],
  ["Interest", (e) => e.interest],
  ["Based in", (e) => e.location],
  ["Preferred date", (e) => e.preferred_date],
  ["Preferred time", (e) => e.preferred_time],
  ["Session mode", (e) => e.session_mode],
  ["Source page", (e) => pageLabel(e.source_page)],
  ["Source URL", (e) => e.source_page],
  ["Message", (e) => e.message],
  ["Status", (e) => e.status],
  ["Email notification", (e) => e.email_status],
];

const cell = (v) => {
  let s = v == null ? "" : String(v);
  if (/^[=@\t\r]/.test(s) || /^[+-][^\d\s]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
};

export const downloadEnquiriesCsv = (items, nameParts) => {
  const lines = [COLS.map(([h]) => cell(h)).join(","), ...items.map((e) => COLS.map(([, f]) => cell(f(e))).join(","))];
  const blob = new Blob(["\uFEFF" + lines.join("\r\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const slug = nameParts.filter(Boolean).join("-").replace(/[^a-z0-9-]+/gi, "-").replace(/-+/g, "-").toLowerCase();
  a.href = url;
  a.download = `goalfinity-enquiries-${slug}-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};
