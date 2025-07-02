import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import LiveScoreboard from "@/components/LiveScoreboard";
import AgentTestimonials from "@/components/AgentTestimonials";
import StatePerformanceChart from "@/components/StatePerformanceChart";
import USHeatMap from "@/components/USHeatMap";
import PricingSection from "@/components/PricingSection";
import leadslogo from "@/../public/leadslogo.svg";
import LiveAgentActivity from "@/components/LiveAgentActivity";
import LeadsDifferentiator from "@/components/LeadsDifferentiator";

const Index = () => {
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
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-[72px] font-bold mb-6 text-[#E2DCD5] leading-[72px]">
            Take your insurance <br /> Agency to the next level
          </h1>
          <p className="text-[24px] text-[#D1D5DB] max-w-4xl mx-auto mb-8">
            Access high-quality leads, real-time market insights, and join a
            community of top-performing insurance agents across the United
            States
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/login">
              <Button className="bg-transparent hover:bg-transparent text-[#F5F5DC] font-semibold px-8 py-3 text-lg shadow-xl shadow-[#F5F5DC4D]/15">
                Start Free Trial
              </Button>
            </Link>
            <Button
              // variant="outline"
              className="border-[#141414]/50 text-[#F5F5DC] hover:text-[#F5F5DC] !bg-[#F5F5DC33] hover:bg-[#333333]/10 px-8 py-3 text-lg"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Live Scoreboard */}
      <section className="pb-16 bg-[#000000]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-black/40 backdrop-blur-md border border-[#F5F5DC33]  text-center">
              <CardContent className="p-6">
                <div className="text-[30px] font-bold text-[#FFFDD0] mb-2">
                  50K+
                </div>
                <div className="text-[#9CA3AF]">Average AP per Policy</div>
              </CardContent>
            </Card>
            <Card className="bg-black/40 backdrop-blur-md border border-[#F5F5DC33]  text-center">
              <CardContent className="p-6">
                <div className="text-[30px] font-bold text-[#FFFDD0] mb-2">
                  $2.8B+
                </div>
                <div className="text-[#9CA3AF]">Policies Closed</div>
              </CardContent>
            </Card>
            <Card className="bg-black/40 backdrop-blur-md border border-[#F5F5DC33]  text-center">
              <CardContent className="p-6">
                <div className="text-[30px] font-bold text-[#FFFDD0] mb-2">
                  98.7%
                </div>
                <div className="text-[#9CA3AF]">Number of Leads Generated</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#16213E4D]">
        <div className="container mx-auto px-6">
          {/* <LiveAgentActivity /> */}
          <LeadsDifferentiator />
        </div>
      </section>

      {/* Performance Analytics */}
      <section id="features" className="py-20 bg-[#000000]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-[#F5F5DC]">
              Real-Time Performance Analytics
            </h2>
            <p className="text-xl text-[#9CA3AF] max-w-3xl mx-auto">
              Track live market data, agent performance, and lead opportunities
              across all 50 states
            </p>
          </div>

          <div className="grid lg:grid-cols-1 gap-12 items-center">
            {/* <div>
              <StatePerformanceChart />
            </div> */}
            <div>
              <USHeatMap />
            </div>
          </div>
        </div>
      </section>

      {/* Agent Testimonials */}
      <section id="testimonials" className="py-20 bg-[#16213E4D]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[36px] font-bold mb-4 text-[#F5F5DC]">
              What Our Agents Say
            </h2>
            <p className="!text-[20px] text-[#9CA3AF] max-w-3xl mx-auto">
              Join thousands of successful insurance agents who trust
              InsuranceElite
            </p>
          </div>
          <div>
            <AgentTestimonials />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-[#000000]">
        <div>
          <PricingSection />
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

export default Index;
