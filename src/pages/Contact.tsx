
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-black text-cream">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-cream/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold gradient-text">InsuranceElite</Link>
            <div className="hidden md:flex space-x-8">
              <Link to="/" className="hover:text-light-cream transition-colors">Home</Link>
              <Link to="/about" className="hover:text-light-cream transition-colors">About Us</Link>
              <Link to="/contact" className="text-light-cream font-semibold">Contact Us</Link>
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
          <h1 className="text-5xl font-bold mb-6 gradient-text">Contact Us</h1>
          <p className="text-xl text-cream/70 max-w-3xl mx-auto mb-8">
            Have questions about our platform? Want to learn more about our premium leads? We're here to help you succeed.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="card-glass">
              <CardHeader>
                <CardTitle className="text-2xl font-bold gradient-text">Send us a message</CardTitle>
                <p className="text-cream/70">Fill out the form below and we'll get back to you within 24 hours.</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-cream mb-2">First Name</label>
                    <Input 
                      type="text" 
                      placeholder="John"
                      className="bg-charcoal/50 border-cream/20 text-cream placeholder:text-cream/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-cream mb-2">Last Name</label>
                    <Input 
                      type="text" 
                      placeholder="Doe"
                      className="bg-charcoal/50 border-cream/20 text-cream placeholder:text-cream/50"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-cream mb-2">Email Address</label>
                  <Input 
                    type="email" 
                    placeholder="john@example.com"
                    className="bg-charcoal/50 border-cream/20 text-cream placeholder:text-cream/50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-cream mb-2">Phone Number</label>
                  <Input 
                    type="tel" 
                    placeholder="(555) 123-4567"
                    className="bg-charcoal/50 border-cream/20 text-cream placeholder:text-cream/50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-cream mb-2">Subject</label>
                  <Input 
                    type="text" 
                    placeholder="How can we help you?"
                    className="bg-charcoal/50 border-cream/20 text-cream placeholder:text-cream/50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-cream mb-2">Message</label>
                  <Textarea 
                    placeholder="Tell us more about your needs..."
                    rows={5}
                    className="bg-charcoal/50 border-cream/20 text-cream placeholder:text-cream/50 resize-none"
                  />
                </div>
                
                <Button className="w-full bg-cream hover:bg-light-cream text-black font-semibold">
                  Send Message
                </Button>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="card-glass">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Mail className="w-6 h-6 text-cream mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-cream mb-2">Email Us</h3>
                      <p className="text-cream/70 mb-1">General Inquiries: info@insuranceelite.com</p>
                      <p className="text-cream/70 mb-1">Support: support@insuranceelite.com</p>
                      <p className="text-cream/70">Sales: sales@insuranceelite.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-glass">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Phone className="w-6 h-6 text-cream mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-cream mb-2">Call Us</h3>
                      <p className="text-cream/70 mb-1">Main: (555) 123-4567</p>
                      <p className="text-cream/70 mb-1">Support: (555) 123-4568</p>
                      <p className="text-cream/70">Sales: (555) 123-4569</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-glass">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-cream mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-cream mb-2">Visit Us</h3>
                      <p className="text-cream/70 mb-1">InsuranceElite Headquarters</p>
                      <p className="text-cream/70 mb-1">123 Business District</p>
                      <p className="text-cream/70 mb-1">Suite 456</p>
                      <p className="text-cream/70">New York, NY 10001</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-glass">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Clock className="w-6 h-6 text-cream mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-cream mb-2">Business Hours</h3>
                      <p className="text-cream/70 mb-1">Monday - Friday: 8:00 AM - 8:00 PM EST</p>
                      <p className="text-cream/70 mb-1">Saturday: 9:00 AM - 5:00 PM EST</p>
                      <p className="text-cream/70">Sunday: Closed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-charcoal/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 gradient-text">Frequently Asked Questions</h2>
            <p className="text-xl text-cream/70 max-w-3xl mx-auto">
              Quick answers to common questions about our platform and services
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="card-glass">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-cream mb-3">How quickly can I start receiving leads?</h3>
                <p className="text-cream/70">Most agents start receiving qualified leads within 24 hours of account setup and verification.</p>
              </CardContent>
            </Card>

            <Card className="card-glass">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-cream mb-3">What types of insurance leads do you provide?</h3>
                <p className="text-cream/70">We provide leads for auto, home, life, health, and commercial insurance across all 50 states.</p>
              </CardContent>
            </Card>

            <Card className="card-glass">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-cream mb-3">Do you offer lead exclusivity?</h3>
                <p className="text-cream/70">Yes, our premium plans include exclusive leads that are only shared with you, not multiple agents.</p>
              </CardContent>
            </Card>

            <Card className="card-glass">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-cream mb-3">Is there a minimum commitment?</h3>
                <p className="text-cream/70">No long-term contracts required. You can start with monthly plans and upgrade or cancel anytime.</p>
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

export default Contact;
