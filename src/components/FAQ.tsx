import React, { useState } from "react";
import { ChevronDown, ChevronUp, Plus, Minus } from "lucide-react";

const FAQ = () => {
  const [openItem, setOpenItem] = useState(0); 

  const toggleItem = (index) => {
    setOpenItem(openItem === index ? null : index);
  };

  const faqItems = [
    {
      question: "What are your prices?",
      answer:
        "Our pricing reflects both the market demand and the investment required to acquire premium-quality data and transform it into high-converting leads. We’re not the cheapest option — and we don’t aim to be. We serve top producers who recognize the value of paying for performance and understand that quality delivers results.",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "Once an order has been fulfilled, we’re unable to offer refunds. If you’d like to cancel your subscription, just let us know at least one week in advance, and we’ll make sure everything is handled smoothly.",
    },
    {
      question: "Are your leads resold?",
      answer:
        "Any lead that hasn’t been marked as “sold” may be resold as a Second Chance or “aged” lead. It is the agent’s responsibility to follow up and resolve their leads. Fresh leads that remain unresolved will be eligible for resale after 91 days.",
    },
    {
      question: "What is your lead credit policy?",
      answer:
        "We’re happy to replace any invalid numbers for leads that aren’t Second Chance or OTP-verified. We do not offer refunds or replacements for any other reason",
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
                  {item?.question}
                </span>
                <div className="flex-shrink-0 transition-transform duration-300 ease-in-out">
                  {openItem === index ? (
                    <Minus className="w-5 h-5 text-gray-400 transform rotate-0" />
                  ) : (
                    <Plus className="w-5 h-5 text-gray-400 transform rotate-0" />
                  )}
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openItem === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6">
                  <div className="border-t border-gray-700 pt-4">
                    <p className="text-gray-300 leading-relaxed">
                      {item?.answer}
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
