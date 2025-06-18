import React from "react";

const LiveAgentActivity = () => {
  const activities = [
    {
      id: "AT",
      name: " Alex Thompson",
      action: "generated lead",
      value: "$680K",
      location: "Washington",
    },
    {
      id: "RJ",
      name: " Robert Johnson",
      action: "generated lead",
      value: "$750K",
      location: "Illinois",
    },
    {
      id: "MS",
      name: " Maria Santos",
      action: "closed a policy",
      value: "$2.3M",
      location: "Virginia",
    },
    {
      id: "MS",
      name: " Maria Santos",
      action: "closed a policy",
      value: "$2.3M",
      location: "Virginia",
    },
    {
      id: "AT",
      name: " Alex Thompson",
      action: "generated lead",
      value: "$680K",
      location: "Washington",
    },
    {
      id: "RJ",
      name: " Robert Johnson",
      action: "generated lead",
      value: "$750K",
      location: "Illinois",
    },
    {
      id: "RJ",
      name: " Robert Johnson",
      action: "generated lead",
      value: "$750K",
      location: "Illinois",
    },
    {
      id: "LC",
      name: " Lisa Chang",
      action: "closed a policy",
      value: "$15M",
      location: "Georgia",
    },
  ];

  return (
    <div className=" text-white p-4 mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4 text-[#F5F5DC]">
          Live Agent Activity
        </h2>
        <p className="text-xl text-[#9CA3AF] max-w-3xl mx-auto">
          See what's happening in real-time across our network
        </p>
      </div>
      <div className="space-y-2">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-[#14181F] rounded-lg border border-[#FBFAD733]"
          >
            <div className="flex items-center space-x-4">
              <span className="w-6 h-6 bg-[#F5F5DC] rounded-full flex items-center justify-center text-xs font-bold text-gray-900">
                {activity.id}
              </span>
              <span className="text-sm text-white">
                Agent{" "}
                <span className="text-[#FBFAD7]">
                  {activity.name}
                  {""}
                </span>
                <span className="text-white"> just {activity.action}</span>
                <div>
                  <span className="text-[#9CA3AF] ml-1">{activity.value}</span>
                  <span className="text-[#9CA3AF] ml-1">
                    • {activity.location}
                  </span>
                </div>
              </span>
            </div>
            <span className="px-2 py-0.5 bg-[#00FFB31A] border border-[#00FFB3] text-xs rounded-full text-[#00FFB3] font-medium">
              LIVE
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveAgentActivity;
