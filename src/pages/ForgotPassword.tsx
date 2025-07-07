import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Mail, ArrowLeft, Eye, EyeOff } from "lucide-react";
import userApi from "@/api/user";
import { toast } from "sonner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [showResetScreen, setShowResetScreen] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const otpRefs = useRef<HTMLInputElement[]>([]);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const urlEmail = searchParams.get("email");
    const urlOtp = searchParams.get("otp");

    if (urlEmail) {
      setEmail(urlEmail);
      setShowOtpScreen(true);
    }

    if (urlEmail && urlOtp) {
      setOtp(urlOtp);
      setShowOtpScreen(false);
      setShowResetScreen(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      try {
        setLoading(true);
        await userApi.forgotPassword(email);
        setSearchParams({ email });
        setShowOtpScreen(true);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        const backendMessage =
          error?.response?.data?.message ||
          "Failed to send OTP. Please try again.";
        setErrorMessage(backendMessage);
      }
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      otpRefs.current[index].value = value;

      const otpValue = otpRefs.current.map((input) => input.value).join("");
      setOtp(otpValue);

      if (value && index < 5) {
        otpRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setErrorMessage("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      setLoading(true);
      const response = await userApi.verifyResetOtp(email, otp);
      if (response.success && response.valid) {
        setSearchParams({ email, otp });
        setShowResetScreen(true);
        setErrorMessage("");
      } else {
        setErrorMessage("Invalid or expired OTP. Please try again.");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrorMessage("Failed to verify OTP. Please try again.");
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    try {
      setLoading(true);
      await userApi.resetPassword(email, otp, newPassword);
      setLoading(false);
      toast.success("Password reset successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setErrorMessage("Failed to reset password. Please try again later.");
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  if (showResetScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-black">
        <div className="relative w-full max-w-md">
          <Card className="bg-[#14181F] border border-[#E2DCD533]">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-[#E2DCD5]">
                Reset Your Password
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {errorMessage && (
                <div className="text-red-500 text-center mb-4">
                  {errorMessage}
                </div>
              )}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="new-password" className="text-[#E2DCD5]">
                    New Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="new-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      className="bg-black/30 border border-[#E2DCD533] text-cyan-100"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#E2DCD5]"
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="confirm-password" className="text-[#E2DCD5]">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      className="bg-black/30 border border-[#E2DCD533] text-cyan-100"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={toggleConfirmPasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#E2DCD5]"
                    >
                      {showConfirmPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>
                <Button
                  onClick={handleResetPassword}
                  className="w-full bg-[#E2DCD5] hover:bg-[#E2DCD5] text-black font-semibold"
                  disabled={loading}
                >
                  {loading ? "Resetting..." : "Reset Password"}
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
              {errorMessage && (
                <div className="text-red-500 text-center mb-4">
                  {errorMessage}
                </div>
              )}
              <Button
                onClick={handleVerifyOtp}
                className="w-full bg-[#E2DCD5] hover:bg-[#E2DCD5] text-black font-semibold"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </Button>
              <div className="text-center">
                <button
                  className="text-sm text-[#E2DCD5] hover:text-[#E2DCD5]"
                  onClick={() => {
                    setSearchParams({});
                    setShowOtpScreen(false);
                  }}
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
      <div className="relative w-full max-w-md">
        <Card className="bg-[#14181F] border border-[#E2DCD533]">
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
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrorMessage("");
                    }}
                    className="pl-10 bg-black/30 border-[#E2DCD5] text-[#E2DCD5] placeholder:text-[#E2DCD545]"
                    autoComplete="new-email"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={!email || loading}
                className="w-full bg-[#E2DCD5] hover:bg-[#E2DCD5] text-black font-semibold py-3"
              >
                {loading ? "Sending..." : "Forgot password"}
              </Button>
              {errorMessage && (
                <div className="text-red-500 text-center mb-4">
                  {errorMessage}
                </div>
              )}
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
                to="/login"
                className="text-[#E2DCD5] hover:text-white text-sm flex items-center justify-center space-x-1"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Login</span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
