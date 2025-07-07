import React, { useState } from "react";
import { User, Phone, Lock, Eye, EyeOff } from "lucide-react";
import agentApi from "@/api/agent";
import { useSelector } from "react-redux";
import { selectUserInfo } from "@/redux/selectors/userSelectors";
import adminApi from "@/api/admin";
import { toast } from "sonner";

const CreateProfilePage = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const userInfo = useSelector(selectUserInfo);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdateProfile = async () => {
    const { firstName, lastName, phone } = form;

    if (!firstName || !lastName || !phone) {
      alert("Please fill in all profile fields");
      return;
    }

    try {
      setIsUpdating(true);

      if (userInfo?.userType === "ADMIN") {
        const fullName = `${firstName} ${lastName}`.trim();
        await adminApi.updateAdminProfile(fullName, phone);
      } else {
        await agentApi.updateAgentProfile(firstName, lastName, phone);
      }

      toast.success("Profile updated successfully!");

      setForm((prev) => ({
        ...prev,
        firstName: "",
        lastName: "",
        phone: "",
      }));
    } catch (error: any) {
      console.error("Update profile failed:", error);
      const message =
        error?.response?.data?.message || "Failed to update profile.";
      toast.error(message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCreatePassword = async () => {
    const { currentPassword, newPassword, confirmPassword } = form;

    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill in all password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    setIsCreating(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert("Password updated successfully!");
    setIsCreating(false);
  };

  return (
    <main className="flex-1 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="border border-gray-700 rounded-lg p-8 space-y-12">
          {/* Profile Info */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">
              Profile Information
            </h2>

            {/* First Name */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-white mb-2">
                First Name <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={form.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  placeholder="Enter first name"
                  className="w-full pl-10 pr-4 py-3 bg-elevated-bg border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Last Name */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-white mb-2">
                Last Name <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={form.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  placeholder="Enter last name"
                  className="w-full pl-10 pr-4 py-3 bg-elevated-bg border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-white mb-2">
                Phone Number <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="Enter phone number"
                  className="w-full pl-10 pr-4 py-3 bg-elevated-bg border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Update Profile Button */}
            <div className="pt-4 flex justify-end">
              <button
                onClick={handleUpdateProfile}
                disabled={isUpdating}
                className="px-8 py-3 bg-[#E2DCD5] hover:bg-[#E2DCD5] text-black rounded-lg font-medium text-lg disabled:opacity-50"
              >
                {isUpdating ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </div>

          {/* Password Section */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">
              Change Password
            </h2>

            {/* Current Password */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-white mb-2">
                Current Password <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  value={form.currentPassword}
                  onChange={(e) =>
                    handleChange("currentPassword", e.target.value)
                  }
                  placeholder="Enter current password"
                  className="w-full pl-10 pr-4 py-3 bg-elevated-bg border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                />
              </div>
            </div>

            {/* New Password */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-white mb-2">
                New Password <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.newPassword}
                  onChange={(e) => handleChange("newPassword", e.target.value)}
                  placeholder="Enter new password"
                  className="w-full pl-10 pr-12 py-3 bg-elevated-bg border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
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
            <div className="mb-6">
              <label className="block text-sm font-medium text-white mb-2">
                Confirm Password <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={(e) =>
                    handleChange("confirmPassword", e.target.value)
                  }
                  placeholder="Confirm new password"
                  className="w-full pl-10 pr-12 py-3 bg-elevated-bg border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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

            {/* Create Profile / Update Password Button */}
            <div className="pt-4 flex justify-end">
              <button
                onClick={handleCreatePassword}
                disabled={isCreating}
                className="px-8 py-3 bg-[#E2DCD5] hover:bg-[#E2DCD5] text-black rounded-lg font-medium text-lg disabled:opacity-50"
              >
                {isCreating ? "Saving..." : "Create Profile"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CreateProfilePage;
