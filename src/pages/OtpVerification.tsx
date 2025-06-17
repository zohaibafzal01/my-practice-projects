
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

const OtpVerification = () => {
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [canResend, setCanResend] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const email = location.state?.email || 'your email';

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVerify = () => {
    if (otp.length === 6) {
      navigate('/thank-you');
    }
  };

  const handleResend = () => {
    setTimeLeft(300);
    setCanResend(false);
    setOtp('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-4 -right-4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        <Card className="bg-black/40 backdrop-blur-md border border-cyan-400/30 shadow-xl shadow-cyan-500/10">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-2">
              Verify Your Email
            </CardTitle>
            <p className="text-cyan-100/70 text-sm">
              We've sent a 6-digit verification code to
            </p>
            <p className="text-cyan-300 font-medium">{email}</p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-center">
                <InputOTP 
                  maxLength={6} 
                  value={otp} 
                  onChange={setOtp}
                  className="gap-2"
                >
                  <InputOTPGroup>
                    <InputOTPSlot 
                      index={0} 
                      className="w-12 h-12 text-lg bg-black/30 border-cyan-400/30 text-cyan-100 focus:border-cyan-400" 
                    />
                    <InputOTPSlot 
                      index={1} 
                      className="w-12 h-12 text-lg bg-black/30 border-cyan-400/30 text-cyan-100 focus:border-cyan-400" 
                    />
                    <InputOTPSlot 
                      index={2} 
                      className="w-12 h-12 text-lg bg-black/30 border-cyan-400/30 text-cyan-100 focus:border-cyan-400" 
                    />
                    <InputOTPSlot 
                      index={3} 
                      className="w-12 h-12 text-lg bg-black/30 border-cyan-400/30 text-cyan-100 focus:border-cyan-400" 
                    />
                    <InputOTPSlot 
                      index={4} 
                      className="w-12 h-12 text-lg bg-black/30 border-cyan-400/30 text-cyan-100 focus:border-cyan-400" 
                    />
                    <InputOTPSlot 
                      index={5} 
                      className="w-12 h-12 text-lg bg-black/30 border-cyan-400/30 text-cyan-100 focus:border-cyan-400" 
                    />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <div className="text-center text-sm text-cyan-100/70">
                {!canResend ? (
                  <p>Resend code in {formatTime(timeLeft)}</p>
                ) : (
                  <button
                    onClick={handleResend}
                    className="text-cyan-300 hover:text-cyan-200 underline"
                  >
                    Resend verification code
                  </button>
                )}
              </div>
            </div>

            <Button 
              onClick={handleVerify}
              disabled={otp.length !== 6}
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-semibold py-3 shadow-lg shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Verify & Continue
            </Button>

            <div className="text-center">
              <Link to="/auth" className="text-cyan-300/70 hover:text-cyan-200 text-sm">
                ← Back to Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OtpVerification;
