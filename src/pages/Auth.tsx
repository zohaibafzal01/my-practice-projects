
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, Shield, UserCheck } from 'lucide-react';


const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loginType, setLoginType] = useState<'admin' | 'agent'>('agent');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate directly to dashboard with role
    if (loginType === 'admin') {
      navigate('/dashboard', { state: { role: 'admin' } });
    } else {
      navigate('/dashboard', { state: { role: 'agent' } });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-black via-blue-900 to-indigo-900 flex items-center justify-center p-6">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-[#06B6D433] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#A855F733] rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        <Card className="bg-[#14181F] backdrop-blur-md border border-[#E2DCD533] ">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold mb-2 flex justify-center">
               <img src="/logo.png" alt="Logo" className="h-10 w-auto" />

            </CardTitle>

            <p className="text-cyan-100/70">
              {isLogin ? 'Join thousands of successful agents' : 'Join thousands of successful agents'}
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex border-b border-cyan-400/20">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 text-center transition-colors ${isLogin
                    ? 'text-[#FFFFFF] border-b-2 border-[#E2DCD5]'
                    : 'text-[#E2DCD545] hover:text-[#FFFFFF]'
                  }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 text-center transition-colors ${!isLogin
                    ? 'text-[#FFFFFF] border-b-2 border-[#E2DCD5]'
                    : 'text-[#E2DCD545] hover:text-[#FFFFFF]'
                  }`}
              >
                Sign Up
              </button>
            </div>

            {isLogin && (
              <div className="space-y-4">
                <Label className="text-[#FFFFFF]">Login As</Label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setLoginType('agent')}
                    className={`flex-1 p-4 rounded-lg border transition-all ${loginType === 'agent'
                        ? 'border-[#E2DCD5] bg-black/20 text-[#FFFFFF]'
                        : 'border-[#E2DCD545] bg-black/30 text-[#E2DCD545] '
                      }`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <UserCheck className="h-6 w-6" />
                      <span className="font-medium">Agent</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setLoginType('admin')}
                    className={`flex-1 p-4 rounded-lg border transition-all ${loginType === 'admin'
                        ? 'border-[#E2DCD5] bg-black/20 text-[#FFFFFF] '
                        : 'border-[#E2DCD545] bg-black/30 text-[#E2DCD545] '
                      }`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <Shield className="h-6 w-6" />
                      <span className="font-medium">Admin</span>
                    </div>
                  </button>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-[#E2DCD5]">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-[#E2DCD5]" />
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="pl-10 bg-black/30 border-[#E2DCD5] text-[#E2DCD5] placeholder:text-[#E2DCD545] "
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#E2DCD5]">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-[#E2DCD5]" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 bg-black/30 border-[#E2DCD5] text-[#E2DCD5] placeholder:text-[#E2DCD545] "
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#E2DCD5]">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-[#E2DCD5]" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 bg-black/30 border-[#E2DCD5] text-[#E2DCD5] placeholder:text-[#E2DCD545] "
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-[#E2DCD5] hover:text-cyan-300"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-[#E2DCD5]">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-[#E2DCD5]" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="pl-10 bg-black/30 border-[#E2DCD5] text-[#E2DCD5] placeholder:text-[#E2DCD545] focus:outline-none"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className={`w-full font-semibold py-3 shadow-lg ${loginType === 'admin' && isLogin
                    ? 'bg-[#E2DCD5] hover:bg-[#E2DCD5]'
                    : 'bg-[#E2DCD5]  hover:bg-[#E2DCD5] '
                  } text-black`}
              >
                {isLogin ? `Login as ${loginType === 'admin' ? 'Admin' : 'Agent'}` : 'Create Account'}
              </Button>
            </form>

            {isLogin && (
              <div className="text-center">
                <Link to="/forgot-password" className="text-[#E2DCD5] hover:text-[#FFFFFF] text-sm">
                  Forgot your password?
                </Link>
              </div>
            )}

            <div className="text-center">
              <Link to="/" className="text-[#E2DCD5] hover:text-[#FFFFFF] text-sm">
                ← Back to Home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
