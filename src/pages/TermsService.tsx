import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import leadslogo from "@/../public/leadslogo.svg";
import Navbar from "@/components/Navbar";

const TermsService = () => {
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
              Terms of Service
            </h1>

            <div className="space-y-6 text-gray-300">
              <section>
                <h2 className="text-lg font-semibold text-white mb-2">
                  Agreement
                </h2>
                <p>
                  By using Londen Leads, you agree to these terms. We provide
                  insurance lead generation and analytics services for licensed
                  professionals.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-white mb-2">
                  User Requirements
                </h2>
                <p>
                  You must maintain valid insurance licenses and use our leads
                  ethically. Violation of regulations or misuse may result in
                  account termination.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-white mb-2">
                  Payment
                </h2>
                <p>
                  Subscription fees are billed monthly or annually. All payments
                  are final except during our 30-day money-back guarantee for
                  new users.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-white mb-2">
                  Service Level
                </h2>
                <p>
                  We strive for high-quality leads but cannot guarantee specific
                  conversion rates or outcomes. Results vary based on market
                  conditions.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-white mb-2">
                  Termination
                </h2>
                <p>
                  Either party may end this agreement with 30 days notice.
                  Platform access ends immediately upon termination.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-white mb-2">
                  Liability
                </h2>
                <p>
                  Our liability is limited to fees paid. We're not responsible
                  for indirect damages or lost profits from lead activities.
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

export default TermsService;
