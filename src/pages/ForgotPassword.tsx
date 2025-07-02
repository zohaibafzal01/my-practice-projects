import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [showResetScreen, setShowResetScreen] = useState(false);
  const otpRefs = useRef<HTMLInputElement[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setShowOtpScreen(true);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      otpRefs.current[index].value = value;
      if (value && index < 5) {
        otpRefs.current[index + 1]?.focus();
      }
    }
  };

  if (showResetScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-black">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-80 h-80 bg-[#06B6D433] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#A855F733] rounded-full blur-3xl"></div>
        </div>
        <div className="relative w-full max-w-md">
          <Card className="bg-[#14181F] border border-[#E2DCD533]">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-[#E2DCD5]">
                Reset Your Password
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="new-password" className="text-[#E2DCD5]">
                    New Password
                  </Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="Enter new password"
                    className="bg-black/30 border border-[#E2DCD533] text-cyan-100"
                  />
                </div>
                <div>
                  <Label htmlFor="confirm-password" className="text-[#E2DCD5]">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm new password"
                    className="bg-black/30 border border-[#E2DCD533] text-cyan-100"
                  />
                </div>
                <Button className="w-full bg-[#E2DCD5] hover:bg-[#E2DCD5] text-black font-semibold">
                  Reset Password
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (showOtpScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-black ">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-80 h-80 bg-[#06B6D433] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#A855F733] rounded-full blur-3xl"></div>
        </div>
        <div className="relative w-full max-w-md">
          <Card className="bg-[#14181F] border border-[#E2DCD533]">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-[#E2DCD5]">
                Enter OTP
              </CardTitle>
              <p className="text-gray-300 text-sm">
                Enter the 6-digit code sent to{" "}
                <span className="text-[#E2DCD5] font-bold">{email}</span>
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-center space-x-2">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <Input
                    key={idx}
                    type="text"
                    maxLength={1}
                    ref={(el) => (otpRefs.current[idx] = el!)}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    className="w-10 text-center text-xl bg-black/30 border border-[#E2DCD533] text-cyan-100"
                  />
                ))}
              </div>
              <Button
                onClick={() => setShowResetScreen(true)}
                className="w-full bg-[#E2DCD5] hover:bg-[#E2DCD5] text-black font-semibold"
              >
                Verify OTP
              </Button>
              <div className="text-center">
                <button
                  className="text-sm text-[#E2DCD5] hover:text-[#E2DCD5]"
                  onClick={() => setShowOtpScreen(false)}
                >
                  ← Back to Email Input
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black via-blue-900 to-indigo-900 flex items-center justify-center p-6">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-[#06B6D433] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#A855F733] rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        <Card className="bg-[#14181F] border border-[#E2DCD533] ">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold text-[#E2DCD5] bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-2">
              Reset Password
            </CardTitle>
            <p className="text-gray-300">
              Enter your email address and we'll send you a code to reset your
              password.
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
              autoComplete="off"
            >
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#E2DCD5]">
                  Email Address
                </Label>
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
                className="w-full bg-[#E2DCD5] hover:bg-[#E2DCD5] text-black font-semibold py-3"
              >
                Forgot password
              </Button>
            </form>

            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-2 text-cyan-100/50">
                <div className="h-px bg-[#E2DCD5] flex-1"></div>
                <span className="text-xs text-[#E2DCD5]">OR</span>
                <div className="h-px bg-[#E2DCD5] flex-1"></div>
              </div>

              <p className="text-sm text-[#E2DCD5]">
                Remember your password?{" "}
                <Link
                  to="/auth"
                  className="text-cyan-300 hover:text-cyan-200 underline"
                >
                  Sign in here
                </Link>
              </p>
            </div>

            <div className="text-center">
              <Link
                to="/"
                className="text-[#E2DCD5] hover:text-white text-sm flex items-center justify-center space-x-1"
              >
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
