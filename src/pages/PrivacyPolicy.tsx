import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import leadslogo from "@/../public/leadslogo.svg";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0FE5]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/30 backdrop-blur-md ">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/">
              <img src={leadslogo} alt="Londen Leads" />
            </Link>
            <div className="hidden md:flex space-x-8">
              {/* <Link
                to="/dashboard"
                className="text-[#F8FAFC] hover:text-[#F8FAFC] text-[16px] transition-colors"
              >
                Dashboard
              </Link> */}
              <Link
                to="/"
                className="text-[#E2DCD5] hover:text-cyan-100 transition-colors"
              >
                Home
              </Link>
              <a
                href="#features"
                className="text-[#F8FAFC] hover:text-[#F8FAFC] text-[16px] transition-colors"
              >
                Features
              </a>
              <a
                href="#testimonials"
                className="text-[#F8FAFC] hover:text-[#F8FAFC] text-[16px] transition-colors"
              >
                Testimonials
              </a>
              <a
                href="#pricing"
                className="text-[#F8FAFC] hover:text-[#F8FAFC] text-[16px] transition-colors"
              >
                Pricing
              </a>
              <Link
                to="/about"
                className="text-[#F8FAFC] hover:text-[#F8FAFC] text-[16px] transition-colors"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="text-[#F8FAFC] hover:text-[#F8FAFC] text-[16px] transition-colors"
              >
                Contact Us
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button className="bg-[#E2DCD5] hover:bg-[#E2DCD5] text-[#0A0A0F] text-[14px] font-semibold ">
                  Login / Signup
                </Button>
              </Link>
              {/* <Link to="/lead-capture">
                <Button className="bg-[#E2DCD5] hover:bg-[#E2DCD5] text-[#0A0A0F] text-[14px] font-semibold ">
                  Submit Lead
                </Button>
              </Link> */}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-[#000000]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-gray-800 rounded-lg shadow-xl p-8">
            <h1 className="text-3xl font-bold text-white mb-8">
              Privacy Policy
            </h1>

            <div className="space-y-6 text-gray-300">
              <section>
                <h2 className="text-lg font-semibold text-white mb-2">
                  Information We Collect
                </h2>
                <p>
                  We collect your contact information, business details, and
                  usage data to provide our lead generation services.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-white mb-2">
                  How We Use Your Data
                </h2>
                <p>
                  Your information helps us deliver quality leads, provide
                  analytics, and improve our platform. We use data to match you
                  with relevant insurance opportunities.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-white mb-2">
                  Data Protection
                </h2>
                <p>
                  We use industry-standard encryption and security measures to
                  protect your information. Access is restricted to authorized
                  personnel only.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-white mb-2">
                  Information Sharing
                </h2>
                <p>
                  We don't sell your personal data. Information may be shared
                  with trusted service providers under strict confidentiality
                  agreements.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-white mb-2">
                  Your Rights
                </h2>
                <p>
                  You can access, update, or delete your account information
                  anytime. Contact us at privacy@londenleads.com for data
                  requests.
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-[#1F2937] bg-[#000000]">
        <div className="container mx-auto px-6 text-center">
          <div className=" mb-4 flex justify-center">
            <Link to="/">
              <img src={leadslogo} alt="Londen Leads" />
            </Link>
          </div>
          <p className="text-[#9CA3AF] mb-6">
            Empowering insurance agents with premium leads and real-time
            insights
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="/privacy-policy"
              className="text-[#9CA3AF] hover:text-[#9CA3AF] transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/terms-of-service"
              className="text-[#9CA3AF] hover:text-[#9CA3AF] transition-colors"
            >
              Terms of Service
            </a>
            <Link
              to="/contact"
              className="text-[#9CA3AF] hover:text-[#9CA3AF] transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
