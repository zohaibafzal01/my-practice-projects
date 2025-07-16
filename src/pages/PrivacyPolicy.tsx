import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import leadslogo from "@/../public/leadslogo.svg";
import Navbar from "@/components/Navbar";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0FE5]">
      {/* Navigation */}
      <div>
        <Navbar />
      </div>

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
