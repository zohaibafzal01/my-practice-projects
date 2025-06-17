
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Users, Target, Award, TrendingUp } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-black text-cream">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-cream/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold gradient-text">InsuranceElite</Link>
            <div className="hidden md:flex space-x-8">
              <Link to="/" className="hover:text-light-cream transition-colors">Home</Link>
              <Link to="/about" className="text-light-cream font-semibold">About Us</Link>
              <Link to="/contact" className="hover:text-light-cream transition-colors">Contact Us</Link>
            </div>
            <Button className="bg-cream hover:bg-light-cream text-black font-semibold">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6 gradient-text">About InsuranceElite</h1>
          <p className="text-xl text-cream/70 max-w-3xl mx-auto mb-8">
            We're revolutionizing the insurance industry by connecting top-performing agents with premium leads and real-time market insights.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-charcoal/30">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 gradient-text">Our Mission</h2>
              <p className="text-cream/80 mb-6">
                At InsuranceElite, we believe that success in insurance comes from having the right leads at the right time. Our mission is to empower insurance agents with premium quality leads, real-time market data, and the tools they need to maximize their potential.
              </p>
              <p className="text-cream/80">
                We've built a platform that not only provides leads but creates a community of high-performing agents who share insights, celebrate successes, and drive each other to new heights.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card className="card-glass">
                <CardContent className="p-6 text-center">
                  <Users className="w-8 h-8 text-cream mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-cream mb-2">10,000+</h3>
                  <p className="text-cream/70">Active Agents</p>
                </CardContent>
              </Card>
              <Card className="card-glass">
                <CardContent className="p-6 text-center">
                  <Target className="w-8 h-8 text-cream mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-cream mb-2">500K+</h3>
                  <p className="text-cream/70">Leads Generated</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 gradient-text">Our Core Values</h2>
            <p className="text-xl text-cream/70 max-w-3xl mx-auto">
              These principles guide everything we do at InsuranceElite
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="card-glass">
              <CardHeader>
                <Award className="w-12 h-12 text-cream mb-4" />
                <CardTitle className="text-xl text-cream">Quality First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-cream/70">
                  We provide only the highest quality leads, vetted and verified to ensure maximum conversion potential for our agents.
                </p>
              </CardContent>
            </Card>

            <Card className="card-glass">
              <CardHeader>
                <TrendingUp className="w-12 h-12 text-cream mb-4" />
                <CardTitle className="text-xl text-cream">Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-cream/70">
                  We continuously innovate our platform with real-time analytics, AI-powered insights, and cutting-edge technology.
                </p>
              </CardContent>
            </Card>

            <Card className="card-glass">
              <CardHeader>
                <Users className="w-12 h-12 text-cream mb-4" />
                <CardTitle className="text-xl text-cream">Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-cream/70">
                  We foster a supportive community where agents can learn from each other, share successes, and grow together.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-charcoal/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 gradient-text">Leadership Team</h2>
            <p className="text-xl text-cream/70 max-w-3xl mx-auto">
              Meet the experienced professionals driving InsuranceElite forward
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="card-glass text-center">
              <CardContent className="p-8">
                <div className="w-24 h-24 bg-cream/20 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-bold text-cream mb-2">Sarah Johnson</h3>
                <p className="text-cream/70 mb-4">CEO & Founder</p>
                <p className="text-cream/60 text-sm">
                  15+ years in insurance industry, former VP at Fortune 500 insurance company
                </p>
              </CardContent>
            </Card>

            <Card className="card-glass text-center">
              <CardContent className="p-8">
                <div className="w-24 h-24 bg-cream/20 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-bold text-cream mb-2">Michael Chen</h3>
                <p className="text-cream/70 mb-4">CTO</p>
                <p className="text-cream/60 text-sm">
                  Tech veteran with 12+ years building scalable platforms for financial services
                </p>
              </CardContent>
            </Card>

            <Card className="card-glass text-center">
              <CardContent className="p-8">
                <div className="w-24 h-24 bg-cream/20 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-bold text-cream mb-2">David Rodriguez</h3>
                <p className="text-cream/70 mb-4">VP of Sales</p>
                <p className="text-cream/60 text-sm">
                  Top-performing insurance agent turned leader, 20+ years of industry experience
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-cream/20">
        <div className="container mx-auto px-6 text-center">
          <div className="text-2xl font-bold gradient-text mb-4">InsuranceElite</div>
          <p className="text-cream/70 mb-6">Empowering insurance agents with premium leads and real-time insights</p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-cream/70 hover:text-cream transition-colors">Privacy Policy</a>
            <a href="#" className="text-cream/70 hover:text-cream transition-colors">Terms of Service</a>
            <Link to="/contact" className="text-cream/70 hover:text-cream transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
