import React, { useState } from "react";
import { ChevronDown, ChevronUp, Plus, Minus } from "lucide-react";

const FAQ = () => {
  const [openItems, setOpenItems] = useState({
    0: true,
    1: false,
    2: false,
    3: false,
  });

  const toggleItem = (index) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const faqItems = [
    {
      question: "What are your prices?",
      answer:
        "Our prices are based on market need and costs to acquire high quality data and turn that into high converting leads",
    },
    {
      question: "What is your refund / cancel order policy?",
      answer:
        "We offer a 30-day money-back guarantee for all our services. You can cancel your order within 30 days of purchase for a full refund.",
    },
    {
      question: "What is your lead credit policy?",
      answer:
        "Lead credits are valid for 12 months from the date of purchase. Unused credits will expire after this period and cannot be refunded.",
    },
    {
      question: "Are your leads resold?",
      answer:
        "No, our leads are exclusive to you. Each lead is sold only once to ensure maximum conversion potential and value for your business.",
    },
  ];

  return (
    <div className=" text-white ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-[#F5F5DC]">
            Frequently Asked Question
          </h1>
          <p className="text-gray-400 text-lg">
            Here are some frequently asked question from our users
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="border border-gray-700 rounded-lg overflow-hidden bg-gray-800/50"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-700/30 transition-colors duration-200"
              >
                <span className="text-lg font-medium text-white pr-4">
                  {item.question}
                </span>
                <div className="flex-shrink-0 transition-transform duration-300 ease-in-out">
                  {openItems[index] ? (
                    <Minus className="w-5 h-5 text-gray-400 transform rotate-0" />
                  ) : (
                    <Plus className="w-5 h-5 text-gray-400 transform rotate-0" />
                  )}
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openItems[index]
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6">
                  <div className="border-t border-gray-700 pt-4">
                    <p className="text-gray-300 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
