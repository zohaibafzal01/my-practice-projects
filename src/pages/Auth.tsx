import { agentApi } from "@/api/agent";
import { authApi } from "@/api/auth";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { US_STATES } from "@/constants/states";
import { login } from "@/redux/slices/userSlice";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import debounce from "lodash.debounce";
import { toast } from "sonner";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  Phone,
  Shield,
  User,
  UserCheck,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

interface AuthProps {
  loginMode: "admin" | "agent";
}

const Auth: React.FC<AuthProps> = ({ loginMode }) => {
  const dispatch = useDispatch();
  const defaultStates = US_STATES;
  const [stateData, setStateData] = useState({
    regions: [],
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [imos, setImos] = useState<string[]>([]);
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginType, setLoginType] = useState<"admin" | "agent">(loginMode);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    confirmPassword: "",
    currentIMO: "",
    directUpline: "",
    experienceInMortgageProtection: "",
    mortgageProtectionDuration: "",
  });

  const navigate = useNavigate();

  const validateSignupForm = () => {
    if (!formData.firstName.trim()) {
      setError("First name is required");
      return false;
    }
    if (!formData.lastName.trim()) {
      setError("Last name is required");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!formData.phoneNumber.trim()) {
      setError("Phone number is required");
      return false;
    }
    if (!formData.password) {
      setError("Password is required");
      return false;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateSignupForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const mortgageProtectionDuration = formData.mortgageProtectionDuration
        ? parseInt(formData.mortgageProtectionDuration, 10)
        : 0;

      const signupData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        phoneNumber: formData.phoneNumber.trim(),
        password: formData.password,
        currentIMO: formData.currentIMO.trim(),
        directUpline: formData.directUpline.trim(),
        experienceInMortgageProtection: formData.experienceInMortgageProtection,
        mortgageProtectionDuration,
        regions: stateData.regions,
      };

      const response = await agentApi.registerAgent(signupData);

      if (response?.data) {
        setSuccess(
          "Agent registered successfully! Your account is pending approval. You will be notified once it's activated."
        );

        toast.success("Agent created 🎉", {
          description:
            "Your account is pending approval. We’ll email you once it’s activated.",
        });

        // Clear the form
        setFormData({
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          phoneNumber: "",
          confirmPassword: "",
          currentIMO: "",
          directUpline: "",
          experienceInMortgageProtection: "",
          mortgageProtectionDuration: "",
        });
        // Switch to login tab after successful registration
        setTimeout(() => {
          window.open(
            "https://calendly.com/justins-appointments/onboarding",
            "_blank"
          );
        }, 2000);

        setTimeout(() => {
          setIsLogin(true);
          setSuccess("");
        }, 3000);
      }
    } catch (error: any) {
      console.error("Signup error:", error);

      if (error.response?.data?.message) {
        // Handle array of error messages
        if (Array.isArray(error.response.data.message)) {
          setError(error.response.data.message.join(", "));
        } else {
          setError(error.response.data.message);
        }
      } else if (error.response?.status === 400) {
        setError(
          "Registration failed. Please check your information and try again."
        );
      } else {
        setError("Registration failed. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.email || !formData.password) {
      setError("Please enter email and password");
      return;
    }

    setIsLoading(true);

    try {
      const response = await authApi.login(formData.email, formData.password);

      const token = response?.data?.accessToken;
      const userData = response?.data?.user;

      if (!token || !userData) {
        setError("Invalid response from server");
        return;
      }

      const role = userData.userType?.toLowerCase();
      const selected = loginType?.toLowerCase();

      if (role !== selected) {
        setError(`User not found`);
        return;
      }

      // Check for pending status - handle both uppercase and lowercase
      const userStatus = userData.status?.toUpperCase();
      if (userStatus === "PENDING") {
        setError(
          "Your account is pending approval. Please wait for admin activation before logging in."
        );
        return;
      }

      // Check for inactive/suspended status
      if (userStatus === "INACTIVE") {
        setError(
          "Your account is suspended. Please contact support for assistance."
        );
        return;
      }

      localStorage.setItem("authToken", token);
      localStorage.setItem("userRole", role);
      localStorage.setItem("user_info", JSON.stringify({ ...userData, token }));

      dispatch(login({ ...userData, token }));

      navigate(role === "admin" ? "/admin/overview" : "/dashboard", {
        state: { role },
      });
    } catch (error: any) {
      console.error("Login error:", error);

      if (error.response?.status === 401) {
        setError("Invalid credentials");
      } else if (error.response?.status === 403) {
        const message = error.response?.data?.message;
        if (message) {
          if (message.toLowerCase().includes("pending")) {
            setError(
              "Your account is pending approval. Please wait for admin activation."
            );
          } else if (message.toLowerCase().includes("suspend")) {
            setError("Your account is suspended. Please contact support.");
          } else {
            setError(message);
          }
        } else {
          setError("Access denied. Please contact support.");
        }
      } else if (error.response?.data?.message) {
        const message = error.response.data.message;
        if (Array.isArray(message)) {
          setError(message.join(", "));
        } else {
          setError(message);
        }
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    if (isLogin) {
      handleLogin(e);
    } else {
      handleSignup(e);
    }
  };

  const debouncedFetchImos = useMemo(
    () =>
      debounce(async (term: string) => {
        if (term.length < 1) return;
        try {
          const fetched = await agentApi.agentImos(term);
          setImos(fetched);
        } catch (err) {
          console.error("Error fetching IMOs:", err);
        }
      }, 500),
    []
  );

  useEffect(() => {
    return () => debouncedFetchImos.cancel();
  }, [debouncedFetchImos]);

  const handleSearchChange = (newValue: string) => {
    setSearchTerm(newValue);
    debouncedFetchImos(newValue);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleTabSwitch = (loginTab: boolean) => {
    setIsLogin(loginTab);
    setError("");
    setSuccess("");
    setFormData({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      confirmPassword: "",
      currentIMO: "",
      directUpline: "",
      experienceInMortgageProtection: "",
      mortgageProtectionDuration: "",
    });
  };

  const handleSelectChange = (selectedOption: any) => {
    setFormData({
      ...formData,
      currentIMO: selectedOption ? selectedOption.value : "",
    });
  };

  const imoOptions = imos.map((imo) => ({
    label: imo,
    value: imo,
  }));

  const stateOptions = defaultStates.map((state) => ({
    label: state?.name,
    value: state?.code,
  }));

  const defaultSelectedStates = stateOptions.slice(0, 5);

  return (
    <div className="min-h-screen bg-black via-blue-900 to-indigo-900 flex items-center justify-center p-6">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-[#06B6D433] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#A855F733] rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        <Card className="bg-[#14181F] backdrop-blur-md border border-[#E2DCD533]">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold mb-2 flex justify-center">
              <img src="/leadslogo.svg" alt="Logo" className="h-10 w-auto" />
            </CardTitle>
            <p className="text-cyan-100/70">
              {isLogin
                ? "Welcome back to your dashboard"
                : "Join thousands of successful agents"}
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex border-b border-cyan-400/20">
              <button
                onClick={() => handleTabSwitch(true)}
                className={`flex-1 py-3 text-center transition-colors ${
                  isLogin
                    ? "text-[#FFFFFF] border-b-2 border-[#E2DCD5]"
                    : "text-[#E2DCD545] hover:text-[#FFFFFF]"
                }`}
              >
                Login
              </button>
              {loginMode === "agent" && (
                <button
                  onClick={() => handleTabSwitch(false)}
                  className={`flex-1 py-3 text-center transition-colors ${
                    !isLogin
                      ? "text-[#FFFFFF] border-b-2 border-[#E2DCD5]"
                      : "text-[#E2DCD545] hover:text-[#FFFFFF]"
                  }`}
                >
                  Sign Up
                </button>
              )}
            </div>

            {isLogin && (
              <div className="space-y-4">
                <Label className="text-[#FFFFFF]">Login As</Label>
                <div className="flex gap-4">
                  {loginMode === "agent" && (
                    <button
                      type="button"
                      onClick={() => setLoginType("agent")}
                      className={`flex-1 p-4 rounded-lg border transition-all ${
                        loginType === "agent"
                          ? "border-[#E2DCD5] bg-black/20 text-[#FFFFFF]"
                          : "border-[#E2DCD545] bg-black/30 text-[#E2DCD545]"
                      }`}
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <UserCheck className="h-6 w-6" />
                        <span className="font-medium">Agent</span>
                      </div>
                    </button>
                  )}

                  {loginMode === "admin" && (
                    <button
                      type="button"
                      onClick={() => setLoginType("admin")}
                      className={`flex-1 p-4 rounded-lg border transition-all ${
                        loginType === "admin"
                          ? "border-[#E2DCD5] bg-black/20 text-[#FFFFFF]"
                          : "border-[#E2DCD545] bg-black/30 text-[#E2DCD545]"
                      }`}
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <Shield className="h-6 w-6" />
                        <span className="font-medium">Admin</span>
                      </div>
                    </button>
                  )}
                </div>
              </div>
            )}

            {error && (
              <Alert className="bg-red-500/10 border-red-500/20 text-red-400">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="bg-green-500/10 border-green-500/20 text-green-400">
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div
                className={`space-y-4 ${
                  !isLogin && "h-[400px] overflow-y-auto scrollable"
                }`}
              >
                {!isLogin && (
                  <>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-[#E2DCD5]">
                          First Name
                        </Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-[#E2DCD5]" />
                          <Input
                            id="firstName"
                            name="firstName"
                            type="text"
                            placeholder="First name"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="pl-10 bg-black/30 border-[#E2DCD5] text-[#E2DCD5] placeholder:text-[#E2DCD545]"
                            required={!isLogin}
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-[#E2DCD5]">
                          Last Name
                        </Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-[#E2DCD5]" />
                          <Input
                            id="lastName"
                            name="lastName"
                            type="text"
                            placeholder="Last name"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="pl-10 bg-black/30 border-[#E2DCD5] text-[#E2DCD5] placeholder:text-[#E2DCD545]"
                            required={!isLogin}
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber" className="text-[#E2DCD5]">
                        Phone Number
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-[#E2DCD5]" />
                        <Input
                          id="phoneNumber"
                          name="phoneNumber"
                          type="tel"
                          placeholder="Enter your phone number"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          className="pl-10 bg-black/30 border-[#E2DCD5] text-[#E2DCD5] placeholder:text-[#E2DCD545]"
                          required={!isLogin}
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#E2DCD5]">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-[#E2DCD5]" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10 bg-black/30 border-[#E2DCD5] !text-[#E2DCD5] placeholder:text-[#E2DCD545]"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {!isLogin && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="currentIMO" className="text-[#E2DCD5]">
                        Current IMO
                      </Label>
                      <div>
                        <CreatableSelect
                          id="currentIMO"
                          name="currentIMO"
                          value={
                            formData.currentIMO
                              ? {
                                  label: formData.currentIMO,
                                  value: formData.currentIMO,
                                }
                              : null
                          }
                          onChange={handleSelectChange}
                          onInputChange={handleSearchChange}
                          options={imoOptions}
                          isClearable
                          isSearchable
                          placeholder="Select or type your IMO"
                          className="bg-black/30 border-[#E2DCD5] text-[#E2DCD5] placeholder:text-[#E2DCD5]"
                          classNamePrefix="custom-select"
                          required
                          isDisabled={false}
                          isMulti={false}
                          styles={{
                            control: (provided) => ({
                              ...provided,
                              backgroundColor: "rgb(18 18 18 / 0.3)",
                              color: "#FFFFFF",
                              borderRadius: "10px",
                              padding: "1px 0px",
                            }),
                            input: (base) => ({
                              ...base,
                              color: "#FFFFFF",
                            }),
                            singleValue: (base) => ({
                              ...base,
                              color: "#FFFFFF",
                            }),
                            menu: (provided) => ({
                              ...provided,
                              backgroundColor: "#333",
                              color: "#ffffff",
                            }),
                            option: (provided, state) => ({
                              ...provided,
                              backgroundColor: state.isSelected
                                ? "#444"
                                : "#333",
                              color: "#ffffff",
                              cursor: "pointer",
                            }),
                            multiValue: (provided) => ({
                              ...provided,
                              backgroundColor: "#444",
                              color: "#ffffff",
                            }),
                            multiValueLabel: (provided) => ({
                              ...provided,
                              color: "#E2DCD5",
                            }),
                            multiValueRemove: (provided) => ({
                              ...provided,
                              color: "#ffffff",
                              ":hover": {
                                backgroundColor: "#E2DCD5",
                                color: "#333",
                              },
                            }),
                          }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="directUpline" className="text-[#E2DCD5]">
                        Direct Upline
                      </Label>
                      <Input
                        id="directUpline"
                        name="directUpline"
                        type="text"
                        placeholder="Enter your direct upline"
                        value={formData.directUpline}
                        onChange={handleInputChange}
                        className="bg-black/30 border-[#E2DCD5] text-[#E2DCD5] placeholder:text-[#E2DCD545]"
                        required
                        disabled={isLoading}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label
                          htmlFor="experienceInMortgageProtection"
                          className="text-[#E2DCD5]"
                        >
                          Mortgage Experience
                        </Label>
                        <div className="relative">
                          <select
                            id="experienceInMortgageProtection"
                            name="experienceInMortgageProtection"
                            value={formData.experienceInMortgageProtection}
                            onChange={handleInputChange}
                            className="bg-black/30 border !border-[#E2DCD5] text-[#E2DCD5] placeholder:text-[#E2DCD545] p-2 w-full rounded-lg focus:outline-none"
                            required
                            disabled={isLoading}
                          >
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="mortgageProtectionDuration"
                          className="text-[#E2DCD5]"
                        >
                          Mortgage Duration
                        </Label>
                        <Input
                          id="mortgageProtectionDuration"
                          name="mortgageProtectionDuration"
                          type="number"
                          placeholder="Duration in years"
                          value={formData.mortgageProtectionDuration}
                          onChange={handleInputChange}
                          className="bg-black/30 border-[#E2DCD5] text-[#E2DCD5] placeholder:text-[#E2DCD545]"
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="regions" className="text-[#E2DCD5]">
                        Select Regions
                      </Label>
                      <div className="relative">
                        <Select
                          id="regions"
                          name="regions"
                          value={
                            stateData.regions.length > 0
                              ? {
                                  label: stateData.regions[0],
                                  value: stateData.regions[0],
                                }
                              : null
                          }
                          onChange={(selectedOption: any) =>
                            setStateData({
                              ...stateData,
                              regions: selectedOption
                                ? [selectedOption.value]
                                : [],
                            })
                          }
                          options={stateOptions}
                          placeholder="Search and select states"
                          className="bg-black/30 border-[#E2DCD5] !text-white placeholder:!text-white"
                          classNamePrefix="custom-select"
                          isClearable
                          required
                          isDisabled={isLoading}
                          defaultValue={defaultSelectedStates}
                          styles={{
                            control: (provided) => ({
                              ...provided,
                              backgroundColor: "rgb(18 18 18 / 0.3)",
                              color: "#FFFFFF",
                              borderRadius: "10px",
                              padding: "1px 0px",
                            }),
                            input: (base) => ({
                              ...base,
                              color: "#FFFFFF",
                            }),

                            singleValue: (base) => ({
                              ...base,
                              color: "#FFFFFF",
                            }),
                            menu: (provided) => ({
                              ...provided,
                              backgroundColor: "#333",
                              color: "#ffffff",
                            }),
                            option: (provided, state) => ({
                              ...provided,
                              backgroundColor: state.isSelected
                                ? "#444"
                                : "#333",
                              color: "#ffffff",
                              cursor: "pointer",
                            }),
                            multiValue: (provided) => ({
                              ...provided,
                              backgroundColor: "#444",
                              color: "#ffffff",
                            }),
                            multiValueLabel: (provided) => ({
                              ...provided,
                              color: "#E2DCD5",
                            }),
                            multiValueRemove: (provided) => ({
                              ...provided,
                              color: "#ffffff",
                              ":hover": {
                                backgroundColor: "#E2DCD5",
                                color: "#333",
                              },
                            }),
                          }}
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-[#E2DCD5]">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-[#E2DCD5]" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-10 pr-10 bg-black/30 border-[#E2DCD5] !text-[#E2DCD5] placeholder:text-[#E2DCD545]"
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-[#E2DCD5] hover:text-cyan-300"
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-[#E2DCD5]">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-[#E2DCD5]" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="pl-10 pr-10 bg-black/30 border-[#E2DCD5] text-[#E2DCD5] placeholder:text-[#E2DCD545] focus:outline-none"
                        required={!isLogin}
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-3 text-[#E2DCD5] hover:text-cyan-300"
                        disabled={isLoading}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full font-semibold py-3 shadow-lg bg-[#E2DCD5] hover:bg-[#E2DCD5] text-black disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isLogin ? "Signing in..." : "Creating account..."}
                  </>
                ) : isLogin ? (
                  `Login as ${loginType === "admin" ? "Admin" : "Agent"}`
                ) : (
                  "Create Agent Account"
                )}
              </Button>
            </form>

            {isLogin && loginType === "agent" && (
              <div className="text-center">
                <Link
                  to="/forgot-password"
                  className="text-[#E2DCD5] hover:text-[#FFFFFF] text-sm"
                >
                  Forgot your password?
                </Link>
              </div>
            )}

            <div className="text-center">
              <Link
                to="/"
                className="text-[#E2DCD5] hover:text-[#FFFFFF] text-sm"
              >
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
