import { leadsApi } from "@/api/leads";
import { US_STATES } from "@/constants/states";
import { selectUserInfo } from "@/redux/selectors/userSelectors";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";

const LeadForm = ({
  setIsOpen,
  refreshLeads,
}: {
  setIsOpen: (open: boolean) => void;
  refreshLeads: () => void;
}) => {
  const userInfo = useSelector(selectUserInfo);
  const token = userInfo?.token;
  const [stateSearch, setStateSearch] = useState("");

  const filteredStates = stateSearch
    ? US_STATES.filter((s) =>
        s.name.toLowerCase().includes(stateSearch.toLowerCase())
      )
    : US_STATES.slice(0, 5);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    leadSource: "",
    region: "",
    campaign: "",
    status: "NEW",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required.";
    if (!formData.lastName.trim())
      newErrors.lastName = "Last name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    if (!formData.leadSource.trim())
      newErrors.leadSource = "Lead source is required.";
    if (!formData.region.trim()) newErrors.region = "Region is required.";

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!token) {
      console.error("Authorization token missing.");
      return;
    }

    try {
      const response = await leadsApi.createLeads(formData);
      toast.success("Lead created successfully!");
      setIsOpen(false);
      refreshLeads();
    } catch (error) {
      console.error("Error creating lead:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6 text-[#E2DCD5]">
      <h2 className="text-2xl font-semibold">Lead Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full p-2 rounded bg-[#252525] border border-[#3A3A3A] text-[#E2DCD5] placeholder-[#B0B0B0]"
            placeholder="Enter first name"
          />
          {errors.firstName && (
            <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>
          )}
        </div>
        <div>
          <label className="block mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-2 rounded bg-[#252525] border border-[#3A3A3A] text-[#E2DCD5] placeholder-[#B0B0B0]"
            placeholder="Enter last name"
          />
          {errors.lastName && (
            <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 rounded bg-[#252525] border border-[#3A3A3A] text-[#E2DCD5] placeholder-[#B0B0B0]"
            placeholder="Enter email address"
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div>
          <label className="block mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 rounded bg-[#252525] border border-[#3A3A3A] text-[#E2DCD5] placeholder-[#B0B0B0]"
            placeholder="Enter phone number"
          />
          {errors.phone && (
            <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block mb-1">Lead Source</label>
        <input
          type="text"
          name="leadSource"
          value={formData.leadSource}
          onChange={handleChange}
          className="w-full p-2 rounded bg-[#252525] border border-[#3A3A3A] text-[#E2DCD5] placeholder-[#B0B0B0]"
          placeholder="Enter lead source"
        />
        {errors.leadSource && (
          <p className="text-red-400 text-sm mt-1">{errors.leadSource}</p>
        )}
      </div>

      <div>
        <label className="block mb-1">Region</label>
        <Select
          value={formData.region}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, region: value }))
          }
        >
          <SelectTrigger className="w-full p-2 rounded bg-[#252525] border border-[#3A3A3A] text-[#E2DCD5]">
            <SelectValue placeholder="Select a state" />
          </SelectTrigger>

          <SelectContent
            side="bottom" 
            className="max-h-60 overflow-auto bg-[#1A1A1A] border border-[#3A3A3A] text-[#E2DCD5] shadow-lg"
          >
            <div className="p-2 sticky top-0 bg-[#1A1A1A] z-10">
              <Input
                placeholder="Search states..."
                value={stateSearch}
                onChange={(e) => setStateSearch(e.target.value)}
                className="w-full bg-[#252525] border border-[#3A3A3A] text-[#E2DCD5] placeholder-[#888] rounded"
              />
            </div>

            {filteredStates.map((state) => (
              <SelectItem
                key={state.code}
                value={state.code}
                className="text-[#E2DCD5] hover:bg-[#2A2A2A] cursor-pointer"
              >
                {state.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.region && (
          <p className="text-red-400 text-sm mt-1">{errors.region}</p>
        )}
      </div>

      <div>
        <label className="block mb-1">Campaign</label>
        <input
          type="text"
          name="campaign"
          value={formData.campaign}
          onChange={handleChange}
          className="w-full p-2 rounded bg-[#252525] border border-[#3A3A3A] text-[#E2DCD5] placeholder-[#B0B0B0]"
          placeholder="Enter campaign name or ID"
        />
      </div>

      <div>
        <label className="block mb-1">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-2 rounded bg-[#252525] border border-[#3A3A3A] text-[#E2DCD5]"
        >
          <option value="NEW">NEW</option>
          <option value="SOLD">SOLD</option>
          <option value="ASSIGNED">ASSIGNED</option>
          <option value="UNASSIGNED">UNASSIGNED</option>
          <option value="REQUESTED">REQUESTED</option>
          <option value="REPLACEMENT_REQUESTED">REPLACEMENT_REQUESTED</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-[#E2DCD5] text-[#121212] py-2 rounded hover:bg-[#D6D0C8] transition"
      >
        Submit
      </button>
    </form>
  );
};

export default LeadForm;
