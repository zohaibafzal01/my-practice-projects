
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      // In a real app, you would send a password reset email here
      setTimeout(() => {
        navigate('/auth');
      }, 3000);
    }
  };

  if (isSubmitted) {
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
                Check Your Email
              </CardTitle>
              <p className="text-cyan-100/70 text-sm">
                We've sent password reset instructions to
              </p>
              <p className="text-cyan-300 font-medium">{email}</p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <p className="text-cyan-100/70 text-sm">
                  Click the link in the email to reset your password. The link will expire in 24 hours.
                </p>

                <div className="bg-black/30 border border-cyan-400/20 rounded-lg p-4">
                  <p className="text-xs text-cyan-100/60 mb-2">Didn't receive the email?</p>
                  <ul className="text-xs text-cyan-100/60 space-y-1">
                    <li>• Check your spam folder</li>
                    <li>• Make sure you entered the correct email</li>
                    <li>• Try again in a few minutes</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="w-full border-cyan-400/30 text-cyan-300 hover:bg-cyan-400/10 hover:text-cyan-200"
                >
                  Try Different Email
                </Button>

                <div className="text-center">
                  <Link to="/auth" className="text-cyan-300/70 hover:text-cyan-200 text-sm">
                    ← Back to Login
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black via-blue-900 to-indigo-900 flex items-center justify-center p-6">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="aabsolute top-0 left-0 w-80 h-80 bg-[#06B6D433] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#A855F733] rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        <Card className="bg-[#14181F] border border-[#E2DCD533] ">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold text-[#E2DCD5] bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-2">
              Reset Password
            </CardTitle>
            <p className="text-cyan-100/70">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4" autoComplete='off'>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#E2DCD5]">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-[#E2DCD5]" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-black/30 border-[#E2DCD5] text-[#E2DCD5] placeholder:text-[#E2DCD545]"
                    autoComplete="new-email"
                    required
                  />

                </div>
              </div>

              <Button
                type="submit"
                disabled={!email}
                className="w-full bg-[#E2DCD5] hover:bg-[#E2DCD5] text-black font-semibold py-3 "
              >
                Send Reset Link
              </Button>
            </form>

            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-2 text-cyan-100/50">
                <div className="h-px bg-[#E2DCD5] flex-1"></div>
                <span className="text-xs text-[#E2DCD5]">OR</span>
                <div className="h-px bg-[#E2DCD5] flex-1"></div>
              </div>

              <p className="text-sm text-[#E2DCD5]">
                Remember your password?{' '}
                <Link to="/auth" className="text-cyan-300 hover:text-cyan-200 underline">
                  Sign in here
                </Link>
              </p>
            </div>

            <div className="text-center">
              <Link to="/" className="text-[#E2DCD5] hover:text-white text-sm flex items-center justify-center space-x-1">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
