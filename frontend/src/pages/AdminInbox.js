import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";
import { LogOut, Mail, MapPinned, Phone, RefreshCw, Trash2 } from "lucide-react";
import { http } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { Seo } from "../components/site/Seo";
import { pageLabel } from "../lib/pageLabel";

const SourceSummary = ({ items, active, onPick }) => {
  const rows = useMemo(() => {
    const m = {};
    items.forEach((e) => { const k = e.source_page || ""; m[k] = (m[k] || 0) + 1; });
    return Object.entries(m).sort((a, b) => b[1] - a[1]);
  }, [items]);
  if (!rows.length) return null;
  return (
    <div data-testid="source-summary" className="mt-6 rounded-[24px] border border-[#E3E8F2] bg-white p-5">
      <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#0B3F9E]"><MapPinned className="h-4 w-4" />Enquiries by page</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {rows.map(([path, n]) => (
          <button key={path || "unknown"} data-testid={`source-chip-${path || "unknown"}`} onClick={() => onPick(active === path ? null : path)} className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${active === path ? "bg-[#0B3F9E] text-white" : "bg-[#EAF3FF] text-[#0A1B3D] hover:bg-[#D6E6FF]"}`}>
            {pageLabel(path)} <span className="ml-1 font-semibold">{n}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const STATUSES = ["new", "contacted", "enrolled", "archived"];
const VFILTERS = [{ id: "", l: "All" }, { id: "careers", l: "Careers" }, { id: "institute", l: "Institute" }, { id: "unsure", l: "Not sure" }];
const VBADGE = { careers: "bg-[#EAF3FF] text-[#0B3F9E]", institute: "bg-[#EAF7EF] text-[#146B34]", unsure: "bg-[#FFF6E5] text-[#8A5300]" };
const EBADGE = { sent: "text-[#146B34]", failed: "text-red-600", pending: "text-[#3B4A66]" };

const Row = ({ e, onStatus, onDelete }) => (
  <tr data-testid={`enquiry-row-${e.id}`} className="border-t border-[#E3E8F2] align-top">
    <td className="p-4"><p className="font-semibold">{e.name}</p><p className="mt-1 text-xs text-[#3B4A66]">{new Date(e.created_at).toLocaleString()}</p><p data-testid={`enquiry-source-${e.id}`} className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#F7F9FC] px-2.5 py-1 text-xs text-[#0B3F9E]"><MapPinned className="h-3 w-3" />{pageLabel(e.source_page)}</p></td>
    <td className="p-4 text-sm">
      <a href={`mailto:${e.email}`} className="flex items-center gap-1.5 hover:underline"><Mail className="h-3.5 w-3.5" />{e.email}</a>
      <a href={`tel:${e.phone}`} className="mt-1 flex items-center gap-1.5 hover:underline"><Phone className="h-3.5 w-3.5" />{e.phone}</a>
    </td>
    <td className="p-4 text-sm"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${VBADGE[e.vertical] || ""}`}>{e.vertical}</span>{e.kind === "session" && <span data-testid={`enquiry-session-badge-${e.id}`} className="ml-1.5 rounded-full bg-[#0A1B3D] px-2.5 py-1 text-xs font-semibold text-white">session</span>}{e.kind === "session" && <p className="mt-2 text-xs font-semibold text-[#0A1B3D]">{e.preferred_date} · {e.preferred_time} · {e.session_mode}</p>}<p className="mt-2">{e.interest || "—"}</p><p className="text-xs text-[#3B4A66]">{e.location}</p></td>
    <td className="max-w-xs p-4 text-sm text-[#3B4A66]">{e.message || "—"}</td>
    <td className="p-4 text-sm">
      <select data-testid={`enquiry-status-${e.id}`} value={e.status} onChange={(ev) => onStatus(e.id, ev.target.value)} className="rounded-xl border border-[#D9E1EE] bg-white px-3 py-2">
        {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
      </select>
      <p className={`mt-2 text-xs ${EBADGE[e.email_status] || ""}`}>email: {e.email_status}</p>
    </td>
    <td className="p-4"><button data-testid={`enquiry-delete-${e.id}`} onClick={() => onDelete(e.id)} className="rounded-full p-2 text-[#3B4A66] hover:bg-red-50 hover:text-red-600" aria-label="Delete"><Trash2 className="h-4 w-4" /></button></td>
  </tr>
);

export default function AdminInbox() {
  const { user, logout } = useAuth();
  const [items, setItems] = useState([]);
  const [vertical, setVertical] = useState("");
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState(null);
  const shown = source === null ? items : items.filter((x) => (x.source_page || "") === source);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await http.get("/enquiries", { params: vertical ? { vertical } : {} });
      setItems(Array.isArray(data) ? data : []);
    } catch { toast.error("Could not load enquiries"); }
    setLoading(false);
  }, [vertical]);

  useEffect(() => { if (user) load(); }, [user, load]);

  if (user === null) return <div className="grid min-h-screen place-items-center text-[#3B4A66]">Loading…</div>;
  if (user === false) return <Navigate to="/admin/login" replace />;

  const onStatus = async (id, status) => {
    await http.patch(`/enquiries/${id}`, { status });
    setItems((xs) => xs.map((x) => (x.id === id ? { ...x, status } : x)));
    toast.success("Status updated");
  };
  const onDelete = async (id) => {
    if (!window.confirm("Delete this enquiry?")) return;
    await http.delete(`/enquiries/${id}`);
    setItems((xs) => xs.filter((x) => x.id !== id));
  };

  return (
    <main data-testid="admin-inbox-page" className="mx-auto max-w-[1360px] px-5 pb-20 pt-28 sm:px-8">
      <Seo path="/admin" title="Enquiries inbox | Goalfinity" description="Goalfinity admin." noindex />
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><p className="font-mono text-xs uppercase tracking-[0.2em] text-[#2480F1]">Admin</p><h1 className="font-display mt-2 text-4xl font-semibold tracking-tight">Enquiries inbox</h1><p className="mt-1 text-sm text-[#3B4A66]">{items.length} enquiries · signed in as {user.email}</p></div>
        <div className="flex gap-2">
          <button data-testid="admin-refresh-btn" onClick={load} className="inline-flex items-center gap-2 rounded-full border border-[#D9E1EE] bg-white px-4 py-2.5 text-sm font-semibold"><RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Refresh</button>
          <button data-testid="admin-logout-btn" onClick={logout} className="inline-flex items-center gap-2 rounded-full bg-[#0A1B3D] px-4 py-2.5 text-sm font-semibold text-white"><LogOut className="h-4 w-4" /> Log out</button>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {VFILTERS.map((f) => <button key={f.id || "all"} data-testid={`admin-filter-${f.id || "all"}`} onClick={() => setVertical(f.id)} className={`rounded-full px-4 py-2 text-sm font-medium ${vertical === f.id ? "bg-[#0B3F9E] text-white" : "border border-[#D9E1EE] bg-white"}`}>{f.l}</button>)}
      </div>
      <SourceSummary items={items} active={source} onPick={setSource} />
      <div className="mt-6 overflow-x-auto rounded-[24px] border border-[#E3E8F2] bg-white">
        <table className="w-full min-w-[900px] text-left" data-testid="enquiries-table">
          <thead className="bg-[#F7F9FC] text-xs uppercase tracking-wider text-[#3B4A66]"><tr><th className="p-4">Name</th><th className="p-4">Contact</th><th className="p-4">Interest</th><th className="p-4">Message</th><th className="p-4">Status</th><th className="p-4" /></tr></thead>
          <tbody>{shown.map((e) => <Row key={e.id} e={e} onStatus={onStatus} onDelete={onDelete} />)}</tbody>
        </table>
        {!items.length && !loading && <p data-testid="enquiries-empty" className="p-10 text-center text-[#3B4A66]">No enquiries yet.</p>}
      </div>
    </main>
  );
}
