import React, { useEffect, useMemo, useState } from "react";
import { User, Phone, Lock, Eye, EyeOff } from "lucide-react";
import agentApi from "@/api/agent";
import { useSelector } from "react-redux";
import { selectUserInfo } from "@/redux/selectors/userSelectors";
import adminApi from "@/api/admin";
import { toast } from "sonner";
import userApi from "@/api/user";
import { useDispatch } from "react-redux";
import { login } from "@/redux/slices/userSlice";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import debounce from "lodash.debounce";
import { US_STATES } from "@/constants/states";

const CreateProfilePage = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    currentIMO: "",
    directUpline: "",
    experienceInMortgageProtection: "",
    mortgageProtectionDuration: "",
    regions: [] as string[],
  });
  const defaultStates = US_STATES;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const userInfo = useSelector(selectUserInfo);
  const [imos, setImos] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();

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

  const handleImoInputChange = (newValue: string) => {
    setSearchTerm(newValue);
    debouncedFetchImos(newValue);
  };

  const handleChange = (field: string, value: string | string[]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdateProfile = async () => {
    const { firstName, lastName, phone } = form;

    if (!firstName || !lastName || !phone) {
      toast.error("Please fill in all profile fields");
      return;
    }

    try {
      setIsUpdating(true);

      let updatedUser;

      if (userInfo?.userType === "ADMIN") {
        const fullName = `${firstName} ${lastName}`.trim();
        await adminApi.updateAdminProfile(fullName, phone);

        updatedUser = {
          ...userInfo,
          adminRef: {
            ...userInfo.adminRef,
            name: fullName,
            phoneNumber: phone,
          },
        };
      } else {
        await agentApi.updateAgentProfile({
          firstName: form.firstName,
          lastName: form.lastName,
          phoneNumber: form.phone,
          currentIMO: form.currentIMO,
          directUpline: form.directUpline,
          experienceInMortgageProtection: form.experienceInMortgageProtection,
          mortgageProtectionDuration: form.mortgageProtectionDuration,
          regions: form.regions,
        });

        updatedUser = {
          ...userInfo,
          firstName,
          lastName,
          phoneNumber: phone,
          agentRef: {
            ...userInfo.agentRef,
            firstName,
            lastName,
            phoneNumber: phone,
            currentIMO: form.currentIMO,
            directUpline: form.directUpline,
            experienceInMortgageProtection: form.experienceInMortgageProtection,
            mortgageProtectionDuration: form.mortgageProtectionDuration,
            regions: form.regions,
          },
        };
      }

      localStorage.setItem("user_info", JSON.stringify(updatedUser));

      dispatch(login(updatedUser));

      toast.success("Profile updated successfully!");

      setForm((prev) => ({
        ...prev,
        firstName: "",
        lastName: "",
        phone: "",
      }));
    } catch (error: any) {
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
      toast.error("Please fill in all password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    try {
      setIsCreating(true);
      await userApi.updateProfilesPassword(currentPassword, newPassword);

      toast.success("Password updated successfully!");

      setForm((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Failed to update password.";
      toast.error(message);
    } finally {
      setIsCreating(false);
    }
  };

  useEffect(() => {
    if (!userInfo) return;

    if (userInfo.userType === "ADMIN") {
      const [firstName, ...rest] = userInfo.adminRef?.name?.split(" ") || [];
      const lastName = rest?.join(" ") || "";

      setForm((prev) => ({
        ...prev,
        firstName: firstName || "",
        lastName: lastName || "",
        phone: userInfo.adminRef?.phoneNumber || "",
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        firstName: userInfo.agentRef?.firstName || userInfo.firstName || "",
        lastName: userInfo.agentRef?.lastName || userInfo.lastName || "",
        phone: userInfo.agentRef?.phoneNumber || userInfo.phoneNumber || "",
        currentIMO: userInfo.agentRef?.currentIMO || "",
        directUpline: userInfo.agentRef?.directUpline || "",
        experienceInMortgageProtection:
          userInfo.agentRef?.experienceInMortgageProtection || "",
        mortgageProtectionDuration:
          userInfo.agentRef?.mortgageProtectionDuration || "",
        regions: userInfo.agentRef?.regions || [],
      }));
    }
  }, [userInfo]);

  const stateOptions = defaultStates.map((state) => ({
    label: state?.name,
    value: state?.code,
  }));

  const defaultSelectedStates = stateOptions.slice(0, 5);

  return (
    <main className="flex-1 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="border border-gray-700 rounded-lg p-8 space-y-12">
          {/* Profile Info */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">
              Profile Information
            </h2>

            <div
              className={`${
                userInfo?.userType === "AGENT" ? "grid grid-cols-2 gap-4" : ""
              } `}
            >
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
            </div>

            {/* Phone */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-white mb-2">
                Phone Number <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={form.phone}
                  onChange={(e) => {
                    const numericValue = e.target.value.replace(/\D/g, "");
                    handleChange("phone", numericValue);
                  }}
                  placeholder="Enter phone number"
                  className="w-full pl-10 pr-4 py-3 bg-elevated-bg border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                />
              </div>
            </div>

            {userInfo?.userType === "AGENT" && (
              <>
                <div className="space-y-2 mb-6">
                  <label className="block text-sm font-medium text-white mb-2">
                    Current IMO <span className="text-red-400">*</span>
                  </label>
                  <div>
                    <CreatableSelect
                      id="currentIMO"
                      name="currentIMO"
                      value={
                        form.currentIMO
                          ? {
                              label: form.currentIMO,
                              value: form.currentIMO,
                            }
                          : null
                      }
                      onChange={(selectedOption: any) =>
                        handleChange(
                          "currentIMO",
                          selectedOption ? selectedOption.value : ""
                        )
                      }
                      onInputChange={handleImoInputChange}
                      options={imos.map((imo) => ({ label: imo, value: imo }))}
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
                          backgroundColor: "#1E1E1E",
                          color: "#FFFFFF",
                          borderRadius: "10px",
                          padding: "6px 2px",
                          borderColor: "#4B5563",
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
                          backgroundColor: state.isSelected ? "#444" : "#333",
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

                <div className="space-y-2 mb-6">
                  <label className="block text-sm font-medium text-white ">
                    Direct Upline's Name & Agency Name{" "}
                    <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="directUpline"
                    name="directUpline"
                    type="text"
                    placeholder="Enter your Direct Upline's Name & Agency Name"
                    value={form.directUpline}
                    onChange={(e) =>
                      handleChange("directUpline", e.target.value)
                    }
                    className="w-full pl-4 pr-4 py-3 bg-elevated-bg border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                  />
                </div>

                <div className="space-y-2 mb-6">
                  <label className="block text-sm font-medium text-white mb-2">
                    Do you have experience in running mortgage protection?{" "}
                    <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="experienceInMortgageProtection"
                      name="experienceInMortgageProtection"
                      value={form.experienceInMortgageProtection}
                      onChange={(e) =>
                        handleChange(
                          "experienceInMortgageProtection",
                          e.target.value
                        )
                      }
                      className="w-full pl-4 pr-4 py-[13px] bg-elevated-bg border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                      required
                      // disabled={isLoading}
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <label className="block text-sm font-medium text-white ">
                    How long have you been running mortgage protection?{" "}
                    <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="mortgageProtectionDuration"
                    name="mortgageProtectionDuration"
                    type="number"
                    placeholder="Duration in years"
                    value={form.mortgageProtectionDuration}
                    onChange={(e) =>
                      handleChange("mortgageProtectionDuration", e.target.value)
                    }
                    className="w-full pl-4 pr-4 py-3 bg-elevated-bg border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                  />
                </div>

                <div className="space-y-2 mb-6">
                  <label className="block text-sm font-medium text-white mb-2">
                    Select Regions <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Select
                      id="regions"
                      name="regions"
                      value={
                        form.regions.length > 0
                          ? {
                              label:
                                US_STATES.find(
                                  (s) => s.code === form.regions[0]
                                )?.name || form.regions[0],
                              value: form.regions[0],
                            }
                          : null
                      }
                      onChange={(selectedOption: any) =>
                        handleChange(
                          "regions",
                          selectedOption ? [selectedOption.value] : []
                        )
                      }
                      options={stateOptions}
                      placeholder="Search and select states"
                      className="bg-black/30 border-[#E2DCD5] !text-white placeholder:!text-white"
                      classNamePrefix="custom-select"
                      isClearable
                      required
                      // isDisabled={isLoading}
                      // defaultValue={defaultSelectedStates}
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          backgroundColor: "#1E1E1E",
                          color: "#FFFFFF",
                          borderRadius: "10px",
                          padding: "6px 2px",
                          borderColor: "#4B5563",
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
                          backgroundColor: state.isSelected ? "#444" : "#333",
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
                  type={showCurrentPassword ? "text" : "password"}
                  value={form.currentPassword}
                  onChange={(e) =>
                    handleChange("currentPassword", e.target.value)
                  }
                  placeholder="Enter current password"
                  className="w-full pl-10 pr-12 py-3 bg-elevated-bg border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showCurrentPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
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
                {isCreating ? "Updating..." : "Update Password"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CreateProfilePage;
