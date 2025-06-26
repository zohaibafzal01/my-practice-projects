import {
  ShieldCheck,
  Bell,
  LayoutGrid,
  Target,
  BadgeCheck,
  Sun,
} from "lucide-react";

export default function LeadsDifferentiator() {
  const features = [
    {
      icon: <ShieldCheck className="w-[40px] h-[40px] text-white" />,
      title: "100% Verified Phone Numbers",
      description:
        "A 4-digit text verification must occur within 60 seconds of the client filling out their information or the lead is invalid.",
    },
    {
      icon: <Target className="w-[40px] h-[40px] text-white" />,
      title: "Accurate Targeting",
      description:
        "Our ads are designed to attract the right audience, focusing on those genuinely interested in Mortgage protection.",
    },
    {
      icon: <BadgeCheck className="w-[40px] h-[40px] text-white" />,
      title: "Lead Quality",
      description:
        "We strive to provide the highest quality lead compared to every other vendor. Give us a try & you'll see the difference!",
    },
    {
      icon: <Bell className="w-[40px] h-[40px] text-white" />,
      title: "Real Time Notifications",
      description:
        "The moment a lead fills out the form you receive an email with all of the lead submission information.",
    },
    {
      icon: <LayoutGrid className="w-[40px] h-[40px] text-white" />,
      title: "User Dashboard",
      description:
        "Take full control of your business. Easily manage your lead flow with the flexibility to update your state selections or pause leads at any time.",
    },
    {
      icon: <Sun className="w-[40px] h-[40px] text-white" />,
      title: "High-Intent, Fully Informed Leads",
      description:
        "Every lead we generate knows exactly what they’re signing up for: more information about mortgage protection insurance.",
    },
  ];

  return (
    <section className="">
      <div className=" text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5DC]">
          How Our Leads Are Different
        </h2>
        <p className="text-[#9CA3AF] mt-4 max-w-2xl mx-auto">
          Our leads are highly qualified and pre-screened, ensuring better
          conversion rates and less time wasted on unfit prospects
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14 mt-16 text-left">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start flex-col gap-4">
              {feature?.icon}
              <div>
                <h3 className="font-semibold !text-lg text-white">
                  {feature?.title}
                </h3>
                <p className=" text-[#D1D5DB] mt-1">{feature?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
