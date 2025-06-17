
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Senior Insurance Agent",
    company: "Texas Elite Insurance",
    image: "SM",
    rating: 5,
    text: "InsuranceElite transformed my business. I've increased my monthly revenue by 340% and the lead quality is unmatched. The real-time analytics help me target the right markets at the right time."
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Independent Agent",
    company: "Pacific Coast Insurance",
    image: "MC",
    rating: 5,
    text: "The platform's data insights are incredible. I can see exactly where the hottest leads are and act fast. My conversion rate jumped from 12% to 47% in just 3 months."
  },
  {
    id: 3,
    name: "Jessica Torres",
    role: "Regional Manager",
    company: "Sunshine State Insurance",
    image: "JT",
    rating: 5,
    text: "Managing a team of 15 agents became so much easier with InsuranceElite. The live scoreboard keeps everyone motivated and the lead distribution is perfectly balanced."
  },
  {
    id: 4,
    name: "David Kim",
    role: "Top Producer",
    company: "Empire State Insurance",
    image: "DK",
    rating: 5,
    text: "Best investment I've made in my career. The ROI was positive within the first week. The quality of leads and the speed of delivery is exactly what I needed to scale my business."
  }
];

const AgentTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-xl ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`}>
        ★
      </span>
    ));
  };

  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold mb-4 gradient-text">What Our Agents Say</h2>
      <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
        Join thousands of successful insurance agents who trust InsuranceElite
      </p>

      <div className="relative max-w-4xl mx-auto">
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                <Card className="card-glass max-w-3xl mx-auto">
                  <CardContent className="p-8">
                    <div className="mb-6">
                      {renderStars(testimonial.rating)}
                    </div>
                    
                    <blockquote className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed">
                      "{testimonial.text}"
                    </blockquote>
                    
                    <div className="flex items-center justify-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-electric-blue to-electric-teal rounded-full flex items-center justify-center font-bold text-dark-bg text-xl">
                        {testimonial.image}
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-white text-lg">{testimonial.name}</div>
                        <div className="text-electric-blue font-medium">{testimonial.role}</div>
                        <div className="text-gray-400 text-sm">{testimonial.company}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center space-x-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-electric-blue' : 'bg-gray-600'
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgentTestimonials;
