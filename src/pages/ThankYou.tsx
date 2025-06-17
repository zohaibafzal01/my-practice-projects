
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Check, Sparkles, TrendingUp, Users } from 'lucide-react';

const ThankYou = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-4 -right-4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/10 rounded-full blur-2xl"></div>
      </div>

      <div className="relative w-full max-w-lg">
        <Card className={`bg-black/40 backdrop-blur-md border border-cyan-400/30 shadow-xl shadow-cyan-500/10 transition-all duration-1000 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          <CardHeader className="text-center pb-8">
            <div className="mx-auto w-20 h-20 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full flex items-center justify-center mb-6 animate-bounce">
              <Check className="h-10 w-10 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-4">
              Welcome to InsuranceElite!
            </CardTitle>
            <p className="text-cyan-100/80 text-lg">
              Your account has been successfully created and verified.
            </p>
          </CardHeader>
          
          <CardContent className="space-y-8">
            <div className="text-center space-y-4">
              <p className="text-cyan-100/70">
                🎉 Congratulations! You're now part of an exclusive community of top-performing insurance agents.
              </p>
              
              <div className="grid grid-cols-3 gap-4 py-6">
                <div className="text-center p-4 rounded-lg bg-black/30 border border-cyan-400/20">
                  <Users className="h-6 w-6 text-cyan-400 mx-auto mb-2" />
                  <div className="text-lg font-bold text-cyan-300">10K+</div>
                  <div className="text-xs text-cyan-100/60">Active Agents</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-black/30 border border-cyan-400/20">
                  <TrendingUp className="h-6 w-6 text-green-400 mx-auto mb-2" />
                  <div className="text-lg font-bold text-green-300">98.2%</div>
                  <div className="text-xs text-cyan-100/60">Success Rate</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-black/30 border border-cyan-400/20">
                  <Sparkles className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                  <div className="text-lg font-bold text-purple-300">$2.4M</div>
                  <div className="text-xs text-cyan-100/60">Monthly Volume</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-cyan-300 text-center">What's Next?</h3>
              <div className="space-y-3 text-sm text-cyan-100/70">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Complete your profile to unlock premium features</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Access your personalized dashboard with real-time analytics</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Start receiving high-quality leads within 24 hours</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Link to="/">
                <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-semibold py-3 shadow-lg shadow-cyan-500/25">
                  Go to Dashboard
                </Button>
              </Link>
              
              <div className="text-center">
                <p className="text-xs text-cyan-100/50">
                  Need help? <a href="#" className="text-cyan-300 hover:text-cyan-200 underline">Contact our support team</a>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ThankYou;
