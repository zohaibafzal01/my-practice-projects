import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import leadslogo from "@/../public/leadslogo.svg";
import FAQ from "@/components/FAQ";
import Navbar from "@/components/Navbar";

const ContactNeon = () => {
  return (
    <div className="min-h-screen bg-black via-blue-900 to-indigo-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-[#06B6D433] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#A855F733] rounded-full blur-3xl"></div>
      </div>
      <div className="relative">
        {/* Navigation */}
        <div>
          <Navbar />
        </div>

        {/* Hero Section */}
        <section className="pt-32 pb-16">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-5xl font-bold mb-6 text-[#E2DCD5] bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
              Contact Us
            </h1>
            <p className="text-xl text-[#D1D5DB] max-w-3xl mx-auto mb-8">
              Have questions about our platform? Want to learn more about our
              premium leads? We're here to help you succeed.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="bg-black/40 backdrop-blur-md border border-[#E2DCD533] ">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-[#E2DCD5] bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                    Send us a message
                  </CardTitle>
                  <p className="text-[#D1D5DB]">
                    Fill out the form below and we'll get back to you within 24
                    hours.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#E2DCD5] mb-2 ">
                        First Name
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter First Name"
                        className="bg-black/50 border-[#E2DCD5] text-[#E2DCD5] placeholder:text-[#E2DCD545] focus:border-[#E2DCD5]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#E2DCD5] mb-2">
                        Last Name
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter Last Name"
                        className="bg-black/50 border-[#E2DCD5] text-[#E2DCD5] placeholder:text-[#E2DCD545] focus:border-[#E2DCD5]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#E2DCD5] mb-2">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      placeholder="Enter Email"
                      className="bg-black/50 border-[#E2DCD5] text-[#E2DCD5] placeholder:text-[#E2DCD545] focus:border-[#E2DCD5]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#E2DCD5] mb-2">
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      placeholder="Enter Phone"
                      className="bg-black/50 border-[#E2DCD5] text-[#E2DCD5] placeholder:text-[#E2DCD545] focus:border-[#E2DCD5]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#E2DCD5] mb-2">
                      Subject
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter Subject"
                      className="bg-black/50 border-[#E2DCD5] text-[#E2DCD5] placeholder:text-[#E2DCD545] focus:border-[#E2DCD5]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#E2DCD5] mb-2">
                      Message
                    </label>
                    <Textarea
                      placeholder="Enter Massage..."
                      rows={5}
                      className="bg-black/50 border-[#E2DCD5] text-[#E2DCD5] placeholder:text-[#E2DCD545] focus:border-[#E2DCD5]"
                    />
                  </div>

                  <Button className="w-full bg-[#E2DCD5] to-purple-500 hover:bg-[#E2DCD5] hover:to-purple-400 text-black font-semibold shadow-lg shadow-cyan-500/25">
                    Send Message
                  </Button>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-8">
                <Card className="bg-black/40 backdrop-blur-md border border-[#E2DCD533] ">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Mail className="w-6 h-6 text-[#E2DCD5] mt-1" />
                      <div>
                        <h3 className="text-lg font-semibold text-[#E2DCD5] mb-2">
                          Email Us
                        </h3>
                        <p className="text-[#D1D5DB] mb-1">
                          General Inquiries: info@insuranceelite.com
                        </p>
                        <p className="text-[#D1D5DB] mb-1">
                          Support: support@insuranceelite.com
                        </p>
                        <p className="text-[#D1D5DB]">
                          Sales: sales@insuranceelite.com
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 backdrop-blur-md border border-[#E2DCD533]">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Phone className="w-6 h-6 text-[#E2DCD5] mt-1" />
                      <div>
                        <h3 className="text-lg font-semibold text-[#E2DCD5] mb-2">
                          Call Us
                        </h3>
                        <p className="text-[#D1D5DB] mb-1">
                          Main: (555) 123-4567
                        </p>
                        <p className="text-[#D1D5DB] mb-1">
                          Support: (555) 123-4568
                        </p>
                        <p className="text-[#D1D5DB]">Sales: (555) 123-4569</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 backdrop-blur-md border border-[#E2DCD533] ">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <MapPin className="w-6 h-6 text-[#E2DCD5] mt-1" />
                      <div>
                        <h3 className="text-lg font-semibold text-[#E2DCD5] mb-2">
                          Visit Us
                        </h3>
                        <p className="text-[#D1D5DB] mb-1">
                          InsuranceElite Headquarters
                        </p>
                        <p className="text-[#D1D5DB] mb-1">
                          123 Business District
                        </p>
                        <p className="text-[#D1D5DB] mb-1">Suite 456</p>
                        <p className="text-[#D1D5DB]">New York, NY 10001</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 backdrop-blur-md border border-[#E2DCD533]">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Clock className="w-6 h-6 text-[#E2DCD5] mt-1" />
                      <div>
                        <h3 className="text-lg font-semibold text-[#E2DCD5] mb-2">
                          Business Hours
                        </h3>
                        <p className="text-[#D1D5DB] mb-1">
                          Monday - Friday: 8:00 AM - 8:00 PM EST
                        </p>
                        <p className="text-[#D1D5DB] mb-1">
                          Saturday: 9:00 AM - 5:00 PM EST
                        </p>
                        <p className="text-[#D1D5DB]">Sunday: Closed</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        {/* <section className="py-20 bg-[#16213E4D]">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-[#E2DCD5] bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-[#D1D5DB] max-w-3xl mx-auto">
                Quick answers to common questions about our platform and
                services
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="bg-black/40 backdrop-blur-md border border-[#E2DCD533] ">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-[#E2DCD5] mb-3">
                    How quickly can I start receiving leads?
                  </h3>
                  <p className="text-[#D1D5DB]">
                    Most agents start receiving qualified leads within 24 hours
                    of account setup and verification.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-black/40 backdrop-blur-md border border-[#E2DCD533] ">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-[#E2DCD5] mb-3">
                    What types of insurance leads do you provide?
                  </h3>
                  <p className="text-[#D1D5DB]">
                    We provide leads for auto, home, life, health, and
                    commercial insurance across all 50 states.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-black/40 backdrop-blur-md border border-[#E2DCD533] ">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-[#E2DCD5] mb-3">
                    Do you offer lead exclusivity?
                  </h3>
                  <p className="text-[#D1D5DB]">
                    Yes, our premium plans include exclusive leads that are only
                    shared with you, not multiple agents.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-black/40 backdrop-blur-md border border-[#E2DCD533] ">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-[#E2DCD5] mb-3">
                    Is there a minimum commitment?
                  </h3>
                  <p className="text-[#D1D5DB]">
                    No long-term contracts required. You can start with monthly
                    plans and upgrade or cancel anytime.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section> */}
        <section className="py-20 bg-[#16213E4D]">
          <div>
            <FAQ />
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-[#D1D5DB]">
          <div className="container mx-auto px-6 text-center">
            <div className=" mb-4 flex justify-center">
              <Link to="/">
                <img src={leadslogo} alt="Londen Leads" />
              </Link>
            </div>
            <p className="text-[#D1D5DB] mb-6">
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
                className="text-[#E2DCD5] hover:text-white transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ContactNeon;
