import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Save,
  ArrowLeft,
} from "lucide-react";

const CreateProfilePage = () => {
  // Profile form state
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // Loading and visibility states
  const [isCreating, setIsCreating] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handle form changes
  const handleChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle profile creation
  const handleCreateProfile = async () => {
    // Validation
    if (!profileData.name || !profileData.email || !profileData.password) {
      alert("Please fill in all required fields");
      return;
    }

    if (profileData.password !== profileData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (profileData.password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    setIsCreating(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Profile created:", profileData);
      alert("Profile created successfully!");

      // Reset form after successful creation
      setProfileData({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Profile creation failed:", error);
      alert("Failed to create profile. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  const handleGoBack = () => {
    console.log("Go back to previous page");
    // Example: router.back() or router.push('/dashboard')
  };

  return (
    <div>
      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-2xl mx-auto">
          {/* Profile Creation Card */}
          <div className=" border border-gray-700 rounded-lg p-8">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 rounded-full bg-elevated-bg flex items-center justify-center">
                <User className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Profile Information
                </h2>
                <p className="text-gray-400 text-sm">
                  Enter your details to create your profile
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-elevated-bg  border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-elevated-bg  border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-elevated-bg  border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                    placeholder="Enter your phone number (optional)"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Password <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={profileData.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                      className="w-full pl-10 pr-12 py-3 bg-elevated-bg  border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                      placeholder="Create password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Confirm Password <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={profileData.confirmPassword}
                      onChange={(e) =>
                        handleChange("confirmPassword", e.target.value)
                      }
                      className="w-full pl-10 pr-12 py-3 bg-elevated-bg  border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                      placeholder="Confirm password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Password Requirements */}
              <div className="bg-elevated-bg  border border-gray-600 rounded-lg p-4">
                <p className="text-sm text-gray-300 mb-2">
                  Password requirements:
                </p>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• At least 8 characters long</li>
                  <li>• Mix of uppercase and lowercase letters recommended</li>
                  <li>
                    • Include numbers and special characters for better security
                  </li>
                </ul>
              </div>

              {/* Create Profile Button */}
              <div className="flex justify-center pt-4">
                <button
                  onClick={handleCreateProfile}
                  disabled={isCreating}
                  className="flex items-center space-x-2 px-8 py-3 bg-[#E2DCD5] hover:bg-[#E2DCD5] text-black rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-lg"
                >
                  <span>
                    {isCreating ? "Creating Profile..." : "Create Profile"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateProfilePage;
