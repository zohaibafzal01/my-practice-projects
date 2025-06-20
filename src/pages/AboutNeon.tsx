
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Users, Target, Award, TrendingUp } from 'lucide-react';
import leadslogo from "@/../public/leadslogo.svg";

const AboutNeon = () => {
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
            <Link to="/auth">
              <Button className="bg-[#E2DCD5] hover:bg-[#E2DCD5] text-[#0A0A0F] text-[14px] font-semibold ">
                Login / Signup
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-[#000000]">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6 text-[#E2DCD5] bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
            About InsuranceElite
          </h1>
          <p className="text-xl text-[#D1D5DB] max-w-3xl mx-auto mb-8">
            We're revolutionizing the insurance industry by connecting
            top-performing agents with premium leads and real-time market
            insights.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-[#16213E4D]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-[#F5F5DC] ">
                Our Mission
              </h2>
              <p className="text-[#9CA3AF] mb-6">
                At InsuranceElite, we believe that success in insurance comes
                from having the right leads at the right time. Our mission is to
                empower insurance agents with premium quality leads, real-time
                market data, and the tools they need to maximize their
                potential.
              </p>
              <p className="text-[#9CA3AF]">
                We've built a platform that not only provides leads but creates
                a community of high-performing agents who share insights,
                celebrate successes, and drive each other to new heights.
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
            <p className="text-xl text-[#D1D5DB] max-w-3xl mx-auto">
              These principles guide everything we do at InsuranceElite
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-black/40 backdrop-blur-md border border-[#F5F5DC33]  text-center">
              <CardHeader>
                <Award className="w-12 h-12  text-[#E2DCD5] mb-4" />
                <CardTitle className="text-xl text-[#F5F5DC] ">
                  Quality First
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className=" text-[#D1D5DB]">
                  We provide only the highest quality leads, vetted and verified
                  to ensure maximum conversion potential for our agents.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-md border border-[#F5F5DC33]  text-center">
              <CardHeader>
                <TrendingUp className="w-12 h-12 text-[#E2DCD5]  mb-4" />
                <CardTitle className="text-xl text-[#F5F5DC]">
                  Innovation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#D1D5DB]">
                  We continuously innovate our platform with real-time
                  analytics, AI-powered insights, and cutting-edge technology.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-md border border-[#F5F5DC33]  text-center">
              <CardHeader>
                <Users className="w-12 h-12  text-[#E2DCD5]  mb-4" />
                <CardTitle className="text-xl text-[#F5F5DC] ">
                  Community
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className=" text-[#D1D5DB]">
                  We foster a supportive community where agents can learn from
                  each other, share successes, and grow together.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-[#16213E4D]">
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
              href="#"
              className="text-[#9CA3AF] hover:text-[#9CA3AF] transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
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
