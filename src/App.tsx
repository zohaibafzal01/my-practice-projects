import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AboutNeon from "./pages/AboutNeon";
import ContactNeon from "./pages/ContactNeon";
import Auth from "./pages/Auth";
import ForgotPassword from "./pages/ForgotPassword";
import OtpVerification from "./pages/OtpVerification";
import ThankYou from "./pages/ThankYou";
import NotFound from "./pages/NotFound";
import Leads from "./pages/Leads";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsService from "./pages/TermsService";
import LeadForm from "./pages/LeadCapture";
import ScrollToTop from "./components/ScrollToTop";
import AdminPage from "./pages/AdminPage";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/about-neon" element={<About />} />
            <Route path="/contact-neon" element={<Contact />} />
            <Route path="/about" element={<AboutNeon />} />
            <Route path="/contact" element={<ContactNeon />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/otp-verification" element={<OtpVerification />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsService />} />
            <Route path="/lead-capture" element={<LeadForm />} />

            {/* Admin Routes */}
            <Route path="/admin/overview" element={<AdminPage />} />
            <Route path="/admin/users" element={<AdminPage />} />
            <Route path="/admin/leads" element={<AdminPage />} />
            <Route path="/admin/replacements" element={<AdminPage />} />
            <Route path="/admin/analytics" element={<AdminPage />} />
            <Route path="/admin/sales" element={<AdminPage />} />
            <Route path="/admin/subscriptions" element={<AdminPage />} />
            <Route path="/admin/profile" element={<AdminPage />} />
            <Route path="/admin/notifications" element={<AdminPage />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
