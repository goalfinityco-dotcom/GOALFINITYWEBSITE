import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Loader2, Lock } from "lucide-react";
import { http, formatApiError } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { CareersLogo } from "../components/site/Brand";
import { Seo } from "../components/site/Seo";

const field = "w-full rounded-2xl border border-[#D9E1EE] bg-white px-4 py-3.5 text-[15px] outline-none focus:border-[#2480F1]";

export default function AdminLogin() {
  const { user, setUser } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [state, setState] = useState({ loading: false, error: "" });

  if (user) return <Navigate to="/admin" replace />;

  const submit = async (e) => {
    e.preventDefault();
    setState({ loading: true, error: "" });
    try {
      const { data } = await http.post("/auth/login", form);
      setUser(data);
      nav("/admin");
    } catch (err) {
      setState({ loading: false, error: formatApiError(err.response?.data?.detail) || err.message });
    }
  };

  return (
    <main data-testid="admin-login-page" className="grid min-h-screen place-items-center px-5 py-28">
      <Seo path="/admin/login" title="Team login | Goalfinity" description="Goalfinity team login." noindex />
      <form onSubmit={submit} data-testid="admin-login-form" className="w-full max-w-md rounded-[32px] border border-[#E3E8F2] bg-white p-8 shadow-xl sm:p-10">
        <CareersLogo className="h-8" />
        <h1 className="font-display mt-8 flex items-center gap-2 text-3xl font-semibold tracking-tight"><Lock className="h-6 w-6 text-[#2480F1]" /> Team login</h1>
        <p className="mt-2 text-sm text-[#3B4A66]">Access the Goalfinity enquiries inbox.</p>
        <div className="mt-8 space-y-4">
          <input required type="email" data-testid="admin-email-input" className={field} placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input required type="password" data-testid="admin-password-input" className={field} placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        </div>
        {state.error && <p data-testid="admin-login-error" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{state.error}</p>}
        <button disabled={state.loading} data-testid="admin-login-submit" className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#0A1B3D] py-4 font-semibold text-white transition-[background-color] duration-300 hover:bg-[#0B3F9E] disabled:opacity-60">
          {state.loading && <Loader2 className="h-4 w-4 animate-spin" />} Sign in
        </button>
      </form>
    </main>
  );
}
