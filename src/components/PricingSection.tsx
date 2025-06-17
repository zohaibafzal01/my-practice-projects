
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const pricingPlans = [
  {
    name: "Starter",
    price: { monthly: 299, yearly: 2390 },
    description: "Perfect for new agents getting started",
    features: [
      "500 Fresh Leads/month",
      "Basic Analytics Dashboard",
      "Email Support",
      "Lead Filtering Tools",
      "Mobile App Access"
    ],
    popular: false,
    cta: "Start Free Trial"
  },
  {
    name: "Growth",
    price: { monthly: 599, yearly: 4790 },
    description: "Ideal for established agents scaling up",
    features: [
      "1,500 Fresh Leads/month",
      "Advanced Analytics & Insights",
      "Priority Phone Support",
      "CRM Integration",
      "Custom Lead Filters",
      "Performance Coaching"
    ],
    popular: true,
    cta: "Most Popular"
  },
  {
    name: "Elite",
    price: { monthly: 999, yearly: 7990 },
    description: "For top performers and agencies",
    features: [
      "3,000 Fresh Leads/month",
      "Real-time Market Intelligence",
      "Dedicated Success Manager",
      "White-label Solutions",
      "API Access",
      "Custom Integrations",
      "Team Collaboration Tools"
    ],
    popular: false,
    cta: "Go Elite"
  },
  {
    name: "Enterprise",
    price: { monthly: 1999, yearly: 15990 },
    description: "Complete solution for large agencies",
    features: [
      "Unlimited Fresh Leads",
      "Enterprise Analytics Suite",
      "24/7 Premium Support",
      "Custom Development",
      "Multi-location Management",
      "Advanced Compliance Tools",
      "Dedicated Infrastructure"
    ],
    popular: false,
    cta: "Contact Sales"
  }
];

const PricingSection = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold mb-4 gradient-text">Choose Your Plan</h2>
      <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
        Flexible pricing plans designed to grow with your business
      </p>

      {/* Billing Toggle */}
      <div className="flex items-center justify-center space-x-4 mb-12">
        <span className={`${!isYearly ? 'text-white' : 'text-gray-400'}`}>Monthly</span>
        <button
          onClick={() => setIsYearly(!isYearly)}
          className={`relative w-14 h-7 rounded-full transition-colors ${
            isYearly ? 'bg-electric-blue' : 'bg-gray-600'
          }`}
        >
          <div
            className={`absolute w-5 h-5 bg-white rounded-full top-1 transition-transform ${
              isYearly ? 'translate-x-8' : 'translate-x-1'
            }`}
          />
        </button>
        <span className={`${isYearly ? 'text-white' : 'text-gray-400'}`}>
          Yearly
          <Badge className="ml-2 bg-electric-teal text-dark-bg">Save 20%</Badge>
        </span>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {pricingPlans.map((plan, index) => (
          <Card
            key={plan.name}
            className={`card-glass relative transition-all duration-300 hover:scale-105 ${
              plan.popular ? 'ring-2 ring-electric-blue glow-effect' : ''
            }`}
          >
            {plan.popular && (
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-electric-blue text-dark-bg">
                Most Popular
              </Badge>
            )}
            
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-white">{plan.name}</CardTitle>
              <p className="text-gray-400 text-sm">{plan.description}</p>
              
              <div className="mt-4">
                <div className="text-4xl font-bold gradient-text">
                  ${isYearly ? plan.price.yearly : plan.price.monthly}
                  <span className="text-lg text-gray-400 font-normal">
                    /{isYearly ? 'year' : 'month'}
                  </span>
                </div>
                {isYearly && (
                  <div className="text-sm text-electric-teal">
                    Save ${(plan.price.monthly * 12) - plan.price.yearly}
                  </div>
                )}
              </div>
            </CardHeader>
            
            <CardContent>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-electric-teal rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button
                className={`w-full ${
                  plan.popular
                    ? 'bg-electric-blue hover:bg-electric-blue/80 text-dark-bg'
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                } font-semibold`}
              >
                {plan.cta}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Money Back Guarantee */}
      <div className="mt-12 p-6 card-glass rounded-xl max-w-2xl mx-auto">
        <h3 className="text-xl font-semibold mb-2 gradient-text">30-Day Money-Back Guarantee</h3>
        <p className="text-gray-400">
          Try any plan risk-free. If you're not completely satisfied, we'll refund your money.
        </p>
      </div>
    </div>
  );
};

export default PricingSection;
