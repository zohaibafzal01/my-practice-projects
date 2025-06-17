
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-4 -right-4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        <Card className="bg-black/40 backdrop-blur-md border border-cyan-400/30 shadow-xl shadow-cyan-500/10">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-2">
              InsuranceElite
            </CardTitle>
            <p className="text-cyan-100/70">
              {isLogin ? 'Welcome back to your dashboard' : 'Join thousands of successful agents'}
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="flex border-b border-cyan-400/20">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 text-center transition-colors ${
                  isLogin 
                    ? 'text-cyan-300 border-b-2 border-cyan-400' 
                    : 'text-cyan-100/50 hover:text-cyan-300'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 text-center transition-colors ${
                  !isLogin 
                    ? 'text-cyan-300 border-b-2 border-cyan-400' 
                    : 'text-cyan-100/50 hover:text-cyan-300'
                }`}
              >
                Sign Up
              </button>
            </div>

            {isLogin && (
              <div className="space-y-4">
                <Label className="text-cyan-200">Login As</Label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setLoginType('agent')}
                    className={`flex-1 p-4 rounded-lg border transition-all ${
                      loginType === 'agent'
                        ? 'border-cyan-400 bg-cyan-500/20 text-cyan-100'
                        : 'border-cyan-400/30 bg-black/30 text-cyan-100/70 hover:border-cyan-400/50'
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
                    className={`flex-1 p-4 rounded-lg border transition-all ${
                      loginType === 'admin'
                        ? 'border-purple-400 bg-purple-500/20 text-purple-100'
                        : 'border-purple-400/30 bg-black/30 text-purple-100/70 hover:border-purple-400/50'
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
                  <Label htmlFor="fullName" className="text-cyan-200">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-cyan-400" />
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="pl-10 bg-black/30 border-cyan-400/30 text-cyan-100 placeholder:text-cyan-100/50 focus:border-cyan-400"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-cyan-200">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-cyan-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 bg-black/30 border-cyan-400/30 text-cyan-100 placeholder:text-cyan-100/50 focus:border-cyan-400"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-cyan-200">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-cyan-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 bg-black/30 border-cyan-400/30 text-cyan-100 placeholder:text-cyan-100/50 focus:border-cyan-400"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-cyan-400 hover:text-cyan-300"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-cyan-200">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-cyan-400" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="pl-10 bg-black/30 border-cyan-400/30 text-cyan-100 placeholder:text-cyan-100/50 focus:border-cyan-400"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              <Button 
                type="submit"
                className={`w-full font-semibold py-3 shadow-lg ${
                  loginType === 'admin' && isLogin
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 shadow-purple-500/25'
                    : 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 shadow-cyan-500/25'
                } text-white`}
              >
                {isLogin ? `Login as ${loginType === 'admin' ? 'Admin' : 'Agent'}` : 'Create Account'}
              </Button>
            </form>

            {isLogin && (
              <div className="text-center">
                <Link to="/forgot-password" className="text-cyan-300 hover:text-cyan-200 text-sm">
                  Forgot your password?
                </Link>
              </div>
            )}

            <div className="text-center">
              <Link to="/" className="text-cyan-300/70 hover:text-cyan-200 text-sm">
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
