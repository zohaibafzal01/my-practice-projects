import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import testimonialsApi from "@/api/testimonials";

interface Testimonial {
  _id: string;
  companyName: string;
  designation: string;
  notes: string;
  stars: number;
  leadId?: string;
  createdAt?: string;
  updatedAt?: string;
  agentRef?: {
    _id: string;
    firstName: string;
    lastName: string;
    profilePicture: string | null;
  };
}

const AgentTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await testimonialsApi.getPublicTestimonials();
        const data = Array.isArray(response?.data?.topRated)
          ? response.data.topRated
          : [];
        setTestimonials(data);
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        testimonials.length > 0 ? (prev + 1) % testimonials.length : 0
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-xl ${
          i < rating ? "text-yellow-400" : "text-gray-600"
        }`}
      >
        ★
      </span>
    ));
  };

  if (loading) {
    return (
      <div className="text-center text-gray-400 py-10">
        Loading testimonials...
      </div>
    );
  }

  if (testimonials.length === 0) {
    return (
      <div className="text-center text-gray-400 py-10">
        No testimonials available yet.
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="relative max-w-4xl mx-auto">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial._id} className="w-full flex-shrink-0 px-4">
                <Card className="card-glass max-w-3xl mx-auto bg-[#14181F] border border-[#00D4FF33]">
                  <CardContent className="p-8">
                    <div className="mb-6">{renderStars(testimonial.stars)}</div>

                    <blockquote className="text-lg md:text-[20px] text-[#D1D5DB] mb-6 leading-relaxed">
                      "{testimonial.notes}"
                    </blockquote>

                    <div className="flex items-center justify-center space-x-4">
                      <div className="w-16 h-16 bg-gray-800 rounded-full flex text-white items-center justify-center font-bold text-dark-bg text-xl">
                        {testimonial.companyName?.slice(0, 2).toUpperCase() ||
                          "??"}
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-white text-[20px]">
                          {testimonial?.agentRef
                            ? `${testimonial?.agentRef?.firstName} ${testimonial?.agentRef?.lastName}`
                            : "Anonymous"}
                        </div>
                        <div className="text-[#9CA3AF] text-[14px]">
                          {testimonial.companyName}
                        </div>
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
                index === currentIndex ? "bg-[#F5F5DC]" : "bg-[#4B5563]"
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
