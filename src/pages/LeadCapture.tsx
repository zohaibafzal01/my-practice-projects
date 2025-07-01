import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import leadslogo from "@/../public/leadslogo.svg";
import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

const LeadForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    experience: "",
    licenseType: "",
    statesLicensed: "",
    averageMonthlyPremium: "",
    preferredLeadType: "",
  });

  const steps = [
    {
      title: "What is your first name?",
      field: "firstName",
      placeholder: "First name",
      type: "text",
    },
    {
      title: "What is your last name?",
      field: "lastName",
      placeholder: "Last name",
      type: "text",
    },
    {
      title: "What is your email?",
      field: "email",
      placeholder: "Enter your email",
      type: "email",
    },
    {
      title: "What is your phone number?",
      field: "phone",
      placeholder: "tel",
      type: "tel",
    },
    {
      title:
        "Do you have a history of diabetes, cancer, stroke, or heart disease?",
      field: "history",
      placeholder: "Select",
      type: "select",
      options: ["Yes", "No"],
    },
    {
      title: "What is your State?",
      field: "State",
      placeholder: "Select state",
      type: "select",
      options: ["Illinois", "California", "Texas", "Florida", "New York"],
    },
    {
      title: "What is the total amount owed on the home?",
      field: "amount",
      placeholder: "Select",
      type: "select",
      options: [
        "Less than $100,000",
        "$100,000 - $200,000",
        "$200,000 - $300,000",
      ],
    },
    {
      title: "Who will your policy pay out to?",
      field: "policy",
      placeholder: "Enter Text",
      type: "text",
    },
    {
      title: "What is your age?",
      field: "age",
      placeholder: "Enter age",
      type: "text",
    },
    {
      title: "Why are you interested in London Leads?",
      field: "interested",
      placeholder: "Enter Text",
      type: "text",
    },
  ];

  const handleInputChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      [steps[currentStep].field]: value,
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Handle form submission
      console.log("Form submitted:", formData);
      alert("Thank you! Your information has been submitted.");
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = formData[steps[currentStep]?.field]?.trim() !== "";
  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-[#000000]">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-[#06B6D433] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#A855F733] rounded-full blur-3xl"></div>
      </div>
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
              <Link to="/agent-login">
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

      {/* Form Section */}
      <div className="min-h-screen  flex items-center justify-center p-4 ">
        <div className="w-full max-w-3xl shadow-[#E2DCD533] shadow-lg border border-slate-700 backdrop-blur-sm rounded-2xl py-8 px-10 bg-[#14181F]">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="!text-[30px] font-bold text-[#E2DCD5] ">
              Lead Capture Form
            </h1>
            <p className="text-white">
              Please fill out the following questions to get started:
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              {steps.map((_, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      index <= currentStep
                        ? "bg-emerald-500 border-emerald-500"
                        : "border-slate-600 bg-slate-800"
                    }`}
                  >
                    {index < currentStep && (
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    {index === currentStep && (
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-0.5 w-10 transition-all duration-300 ${
                        index < currentStep ? "bg-emerald-500" : "bg-slate-600"
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div>
            <div>
              <h2 className="text-2xl font-semibold text-white mb-6">
                {steps[currentStep]?.title}
              </h2>
              <p className="text-white mb-2">{steps[currentStep]?.title}</p>
            </div>

            <div className="mb-8">
              {steps[currentStep]?.type === "select" ? (
                <select
                  value={formData[steps[currentStep].field] || ""}
                  onChange={(e) => handleInputChange(e.target.value)}
                  className="w-full p-4 bg-[#14181F] border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                >
                  <option value="">{steps[currentStep].placeholder}</option>
                  {steps[currentStep].options?.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={steps[currentStep]?.type || "text"}
                  value={formData[steps[currentStep]?.field] || ""}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder={steps[currentStep]?.placeholder}
                  className="w-full p-4 bg-[#14181F] border border-[#FFFFFF] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FFFFFF] focus:border-[#FFFFFF] transition-all duration-200"
                  autoFocus
                />
              )}
            </div>

            {/* Navigation Buttons */}
            <div
              className={`flex ${
                currentStep === 0 ? "justify-end" : "justify-between"
              }`}
            >
              {currentStep !== 0 && (
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    currentStep === 0
                      ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                      : "bg-[#E2DCD5] text-[#000000] hover:bg-[#E2DCD5]"
                  }`}
                >
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Back
                </button>
              )}

              <button
                onClick={handleNext}
                disabled={!canProceed}
                className={`flex items-center px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
                  canProceed
                    ? "bg-[#E2DCD5] text-[#000000] hover:bg-[#E2DCD5] shadow-lg shadow-emerald-500/20"
                    : "bg-slate-700 text-slate-500 cursor-not-allowed"
                }`}
              >
                {currentStep === steps.length - 1 ? "Submit" : "Next"}
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>

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

export default LeadForm;
