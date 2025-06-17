
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import HeroSection from '@/components/HeroSection';
import LiveScoreboard from '@/components/LiveScoreboard';
import AgentTestimonials from '@/components/AgentTestimonials';
import StatePerformanceChart from '@/components/StatePerformanceChart';
import USHeatMap from '@/components/USHeatMap';
import PricingSection from '@/components/PricingSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/30 backdrop-blur-md border-b border-cyan-400/30">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">InsuranceElite</div>
            <div className="hidden md:flex space-x-8">
              <Link to="/dashboard" className="text-cyan-300 hover:text-cyan-100 transition-colors">Dashboard</Link>
              <a href="#features" className="text-cyan-300 hover:text-cyan-100 transition-colors">Features</a>
              <a href="#testimonials" className="text-cyan-300 hover:text-cyan-100 transition-colors">Testimonials</a>
              <a href="#pricing" className="text-cyan-300 hover:text-cyan-100 transition-colors">Pricing</a>
              <Link to="/about-neon" className="text-cyan-300 hover:text-cyan-100 transition-colors">About Us</Link>
              <Link to="/contact-neon" className="text-cyan-300 hover:text-cyan-100 transition-colors">Contact Us</Link>
            </div>
            <Link to="/auth">
              <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-semibold shadow-lg shadow-cyan-500/25">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
            InsuranceElite
          </h1>
          <p className="text-xl text-cyan-100/80 max-w-3xl mx-auto mb-8">
            Empowering insurance agents with premium leads and real-time insights. Join thousands of successful agents maximizing their potential.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/dashboard">
              <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-semibold px-8 py-3 text-lg shadow-lg shadow-cyan-500/25">
                View Dashboard
              </Button>
            </Link>
            <Button variant="outline" className="border-cyan-400/50 text-cyan-200 hover:bg-cyan-400/10 px-8 py-3 text-lg">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Live Scoreboard */}
      <section className="py-16 bg-black/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              Live Performance Dashboard
            </h2>
            <p className="text-cyan-100/70 max-w-2xl mx-auto">
              Real-time metrics from our active agent network
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="bg-black/40 backdrop-blur-md border border-cyan-400/30 shadow-xl shadow-cyan-500/10 text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-cyan-300 mb-2">10,247</div>
                <div className="text-cyan-100/70">Active Agents</div>
              </CardContent>
            </Card>
            <Card className="bg-black/40 backdrop-blur-md border border-cyan-400/30 shadow-xl shadow-cyan-500/10 text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-cyan-300 mb-2">$2.4M</div>
                <div className="text-cyan-100/70">Monthly Commissions</div>
              </CardContent>
            </Card>
            <Card className="bg-black/40 backdrop-blur-md border border-cyan-400/30 shadow-xl shadow-cyan-500/10 text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-cyan-300 mb-2">98.2%</div>
                <div className="text-cyan-100/70">Lead Quality Score</div>
              </CardContent>
            </Card>
            <Card className="bg-black/40 backdrop-blur-md border border-cyan-400/30 shadow-xl shadow-cyan-500/10 text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-cyan-300 mb-2">24hr</div>
                <div className="text-cyan-100/70">Average Response</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Performance Analytics */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">Real-Time Performance Analytics</h2>
            <p className="text-xl text-cyan-100/70 max-w-3xl mx-auto">
              Track live market data, agent performance, and lead opportunities across all 50 states
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-black/40 backdrop-blur-md border border-cyan-400/30 shadow-xl shadow-cyan-500/10 rounded-lg p-6">
              <StatePerformanceChart />
            </div>
            <div className="bg-black/40 backdrop-blur-md border border-cyan-400/30 shadow-xl shadow-cyan-500/10 rounded-lg p-6">
              <USHeatMap />
            </div>
          </div>
        </div>
      </section>

      {/* Agent Testimonials */}
      <section id="testimonials" className="py-20 bg-black/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
              Success Stories
            </h2>
            <p className="text-xl text-cyan-100/70 max-w-3xl mx-auto">
              Hear from top-performing agents who've transformed their business with InsuranceElite
            </p>
          </div>
          <div className="bg-black/40 backdrop-blur-md border border-cyan-400/30 shadow-xl shadow-cyan-500/10 rounded-lg p-6">
            <AgentTestimonials />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
              Choose Your Plan
            </h2>
            <p className="text-xl text-cyan-100/70 max-w-3xl mx-auto">
              Flexible pricing options designed to scale with your business
            </p>
          </div>
          <div className="bg-black/40 backdrop-blur-md border border-cyan-400/30 shadow-xl shadow-cyan-500/10 rounded-lg p-6">
            <PricingSection />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-cyan-400/30">
        <div className="container mx-auto px-6 text-center">
          <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-4">
            InsuranceElite
          </div>
          <p className="text-cyan-100/70 mb-6">Empowering insurance agents with premium leads and real-time insights</p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-cyan-300/70 hover:text-cyan-200 transition-colors">Privacy Policy</a>
            <a href="#" className="text-cyan-300/70 hover:text-cyan-200 transition-colors">Terms of Service</a>
            <Link to="/contact-neon" className="text-cyan-300/70 hover:text-cyan-200 transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
