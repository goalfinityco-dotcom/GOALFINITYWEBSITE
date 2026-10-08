import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { AuthProvider } from "./context/AuthContext";
import { SmoothScroll } from "./components/site/SmoothScroll";
import { Header } from "./components/site/Header";
import { Footer } from "./components/site/Footer";
import { FloatingContact } from "./components/site/FloatingContact";
import Home from "./pages/Home";
import Careers from "./pages/Careers";
import Institute from "./pages/Institute";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminInbox from "./pages/AdminInbox";

const Shell = () => {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");
  return (
    <>
      <SmoothScroll />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/institute" element={<Institute />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminInbox />} />
        <Route path="*" element={<Home />} />
      </Routes>
      {!isAdmin && <Footer />}
      {!isAdmin && <FloatingContact />}
    </>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Shell />
          <Toaster position="top-center" />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
