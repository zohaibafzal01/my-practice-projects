
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-dark-card to-dark-surface"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.1)_0%,transparent_50%)]"></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Premium Insurance
            <span className="block gradient-text">Leads & Analytics</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
            Access high-quality leads, real-time market insights, and join a community of 
            top-performing insurance agents across the United States
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-electric-blue hover:bg-electric-blue/80 text-dark-bg font-semibold px-8 py-4 text-lg glow-effect"
            >
              Start Free Trial
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-electric-blue text-electric-blue hover:bg-electric-blue/10 px-8 py-4 text-lg"
            >
              Watch Demo
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="card-glass rounded-xl p-6">
              <div className="text-3xl font-bold gradient-text mb-2">50K+</div>
              <div className="text-gray-400">Active Agents</div>
            </div>
            <div className="card-glass rounded-xl p-6">
              <div className="text-3xl font-bold gradient-text mb-2">$2.8B+</div>
              <div className="text-gray-400">Policies Closed</div>
            </div>
            <div className="card-glass rounded-xl p-6">
              <div className="text-3xl font-bold gradient-text mb-2">98.7%</div>
              <div className="text-gray-400">Lead Quality</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-electric-blue" />
      </div>
    </section>
  );
};

export default HeroSection;
