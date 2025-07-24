import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  Users,
  Target,
  Award,
  TrendingUp,
  CheckCircle,
  CircleCheck,
  Handshake,
  Home,
  Zap,
  BarChart3,
} from "lucide-react";
import leadslogo from "@/../public/leadslogo.svg";
import Navbar from "@/components/Navbar";

const AboutNeon = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0FE5]">
      {/* Navigation */}
      <div>
        <Navbar />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-[#000000] via-[#0A0A0FE5] to-[#000000] overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#E2DCD5] bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
              About Us
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-pink-400 mx-auto rounded-full mb-8"></div>
          </div>

          {/* Main content grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Left column - Mission statement */}
            <div className="space-y-8">
              <Card className="bg-black/40 backdrop-blur-md border border-[#F5F5DC33] hover:transform hover:-translate-y-1 transition-all duration-300">
                <CardContent className="p-7">
                  <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5DC] mb-4">
                    Built for Agents.
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                      {" "}
                      Backed by Results.
                    </span>
                  </h2>

                  <p className="text-xl text-[#D1D5DB] leading-relaxed mb-4">
                    At Londen Leads, our mission is simple:
                    <span className="text-cyan-400 font-semibold">
                      {" "}
                      Help life insurance agents consistently write $10K+ per
                      week.
                    </span>
                  </p>

                  <p className="text-lg text-[#9CA3AF] leading-relaxed">
                    We've been in your shoes — and since 2024, we've delivered
                    thousands of exclusive leads to agents nationwide.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Right column - Key points */}
            <div className="space-y-4">
              {/* Feature cards */}
              <Card className="bg-black/40 backdrop-blur-md border border-[#F5F5DC33] hover:transform hover:-translate-y-1 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#F5F5DC] ">
                        No Recycled Lists
                      </h3>
                      <p className="text-[#9CA3AF]">
                        Fresh, exclusive leads that haven't been sold to
                        multiple agents.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 backdrop-blur-md border border-[#F5F5DC33] hover:transform hover:-translate-y-1 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#F5F5DC] ">
                        No Complicated Tech
                      </h3>
                      <p className="text-[#9CA3AF]">
                        Simple, straightforward process that gets you selling
                        fast.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 backdrop-blur-md border border-[#F5F5DC33] hover:transform hover:-translate-y-1 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-cyan-400 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#F5F5DC]">
                        High-Intent Leads
                      </h3>
                      <p className="text-[#9CA3AF]">
                        Verified prospects designed to convert into sales.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Bottom section */}
          <div className="text-center mt-16">
            <Card className="bg-black/40 backdrop-blur-md border border-[#F5F5DC33] max-w-4xl mx-auto hover:transform hover:-translate-y-1 transition-all duration-300">
              <CardContent className="p-8">
                <p className="text-xl text-[#D1D5DB] leading-relaxed mb-6">
                  Whether you're just starting out or already closing 10+
                  policies a week, we're here to help you hit — and exceed —
                  your next milestone.
                </p>

                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                  Because when agents win, families win.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* <section className="pt-32 pb-16 bg-[#000000]">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6 text-[#E2DCD5] bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
            About Londen Leads
          </h1>
          <p className="text-xl text-[#D1D5DB] max-w-3xl mx-auto mb-8">
            We're revolutionizing the insurance industry by connecting
            top-performing agents with premium leads and real-time market
            insights.
          </p>
        </div>
      </section> */}

      {/* Mission Section */}
      <section className="py-16 bg-[#16213E4D]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-[#F5F5DC] ">
                Our Mission
              </h2>
              <p className="text-[#9CA3AF]">
                At Londen Leads, our mission is to empower life insurance agents
                with the tools, leads, and support they need to consistently
                write $10K+ per week. By delivering high-quality, verified leads
                and simplifying the path to growth, we help agents protect more
                families — because when agents win, families win.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card className="bg-black/40 backdrop-blur-md border border-[#F5F5DC33]  text-center">
                <CardContent className="p-6 text-center">
                  <Users className="w-8 h-8 text-[#E2DCD5] mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-[#F5F5DC] mb-2">
                    10,000+
                  </h3>
                  <p className=" text-[#D1D5DB]">Active Agents</p>
                </CardContent>
              </Card>
              <Card className="bg-black/40 backdrop-blur-md border border-[#F5F5DC33]  text-center">
                <CardContent className="p-6 text-center">
                  <Target className="w-8 h-8 text-[#E2DCD5]  mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-[#F5F5DC]  mb-2">
                    500K+
                  </h3>
                  <p className=" text-[#D1D5DB]">Leads Generated</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-[#000000]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-[#E2DCD5] ">
              Our Core Values
            </h2>
            {/* <p className="text-xl text-[#D1D5DB] max-w-3xl mx-auto">
              These principles guide everything we do at InsuranceElite
            </p> */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center">
            <Card className="bg-black/40 backdrop-blur-md border border-[#F5F5DC33]  text-center w-full max-w-md">
              <CardHeader>
                <Target className="w-12 h-12 text-[#E2DCD5] mb-4" />
                <CardTitle className="text-xl text-[#F5F5DC] ">
                  Agent Success First
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className=" text-[#D1D5DB]">
                  Everything we do is built around helping agents grow their
                  business and achieve consistent, meaningful results.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-md border border-[#F5F5DC33]  text-center w-full max-w-md">
              <CardHeader>
                <CheckCircle className="w-12 h-12 text-[#E2DCD5] mb-4" />
                <CardTitle className="text-xl text-[#F5F5DC]">
                  Quality Over Quantity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#D1D5DB]">
                  We don’t cut corners — our focus is on delivering verified,
                  high-intent leads that convert, not recycled lists.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-md border border-[#F5F5DC33]  text-center w-full max-w-md">
              <CardHeader>
                <CircleCheck className="w-12 h-12 text-[#E2DCD5] mb-4" />
                <CardTitle className="text-xl text-[#F5F5DC] ">
                  Simplicity & Transparency
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className=" text-[#D1D5DB]">
                  No confusing tech, no hidden agendas. Just straightforward
                  solutions that work.
                </p>
              </CardContent>
            </Card>

            <div className="md:col-span-3 flex justify-center gap-4">
              <Card className="bg-black/40 backdrop-blur-md border border-[#F5F5DC33]  text-center w-full max-w-md">
                <CardHeader>
                  <Handshake className="w-12 h-12 text-[#E2DCD5] mb-4" />
                  <CardTitle className="text-xl text-[#F5F5DC] ">
                    Integrity in Every Interaction
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className=" text-[#D1D5DB]">
                    We honor our word, treat agents as partners, and hold
                    ourselves accountable for results.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-black/40 backdrop-blur-md border border-[#F5F5DC33]  text-center w-full max-w-md">
                <CardHeader>
                  <Home className="w-12 h-12 text-[#E2DCD5] mb-4" />
                  <CardTitle className="text-xl text-[#F5F5DC] ">
                    Empowering Families Through Agents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className=" text-[#D1D5DB]">
                    When agents succeed, families across the country get the
                    protection they need — and that drives our mission.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      {/* <section className="py-20 bg-[#16213E4D]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-[#E2DCD5] ">
              Leadership Team
            </h2>
            <p className="text-xl text-[#D1D5DB] max-w-3xl mx-auto">
              Meet the experienced professionals driving InsuranceElite forward
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-black/40 backdrop-blur-md border border-[#F5F5DC33]  text-center">
              <CardContent className="p-8">
                <div className="w-24 h-24 bg-black/40 backdrop-blur-md border border-[#F5F5DC33] rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-bold text-[#F5F5DC] mb-2">
                  Sarah Johnson
                </h3>
                <p className=" text-[#F5F5DC] mb-4">CEO & Founder</p>
                <p className=" text-[#D1D5DB] text-sm">
                  15+ years in insurance industry, former VP at Fortune 500
                  insurance company
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-md border border-[#F5F5DC33]  text-center">
              <CardContent className="p-8">
                <div className="w-24 h-24 bg-black/40 backdrop-blur-md border border-[#F5F5DC33] rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-bold text-[#F5F5DC] mb-2">
                  Michael Chen
                </h3>
                <p className="text-[#F5F5DC] mb-4">CTO</p>
                <p className="text-[#D1D5DB] text-sm">
                  Tech veteran with 12+ years building scalable platforms for
                  financial services
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-md border border-[#F5F5DC33]  text-center">
              <CardContent className="p-8">
                <div className="w-24 h-24 bg-black/40 backdrop-blur-md border border-[#F5F5DC33] rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-bold text-[#F5F5DC] mb-2">
                  David Rodriguez
                </h3>
                <p className="text-[#F5F5DC] mb-4">VP of Sales</p>
                <p className="text-[#D1D5DB] text-sm">
                  Top-performing insurance agent turned leader, 20+ years of
                  industry experience
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section> */}

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

export default AboutNeon;
