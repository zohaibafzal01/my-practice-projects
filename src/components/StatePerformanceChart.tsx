
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// const data = [
//   { state: 'CA', value: 2847, color: '#00D4FF' },
//   { state: 'TX', value: 2634, color: '#00FFB3' },
//   { state: 'FL', value: 2156, color: '#39FF14' },
//   { state: 'NY', value: 1892, color: '#FF6B35' },
//   { state: 'IL', value: 1654, color: '#FF1493' },
//   { state: 'PA', value: 1487, color: '#FFD700' },
//   { state: 'OH', value: 1298, color: '#FF69B4' },
//   { state: 'GA', value: 1187, color: '#9370DB' },
// ];

// const RADIAN = Math.PI / 180;
// const renderCustomizedLabel = ({
//   cx, cy, midAngle, innerRadius, outerRadius, percent
// }: any) => {
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   return (
//     <text 
//       x={x} 
//       y={y} 
//       fill="white" 
//       textAnchor={x > cx ? 'start' : 'end'} 
//       dominantBaseline="central"
//       fontSize={12}
//       fontWeight="bold"
//     >
//       {`${(percent * 100).toFixed(0)}%`}
//     </text>
//   );
// };

// const StatePerformanceChart = () => {
//   return (
//     <Card className="card-glass bg-[#14181F]">
//       <CardHeader>
//         <CardTitle className="text-2xl font-bold text-[#F5F5DC]">
//           Top Performing States
//         </CardTitle>
//         <p className="text-[#9CA3AF]">Real-time policy volume by state</p>
//       </CardHeader>
//       <CardContent>
//         <div className="h-80">
//           {/* <ResponsiveContainer width="100%" height="100%">
//             <PieChart>
//               <Pie
//                 data={data}
//                 cx="50%"
//                 cy="50%"
//                 labelLine={false}
//                 label={renderCustomizedLabel}
//                 outerRadius={100}
//                 fill="#8884d8"
//                 dataKey="value"
//               >
//                 {data.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={entry.color} />
//                 ))}
//               </Pie>
//               <Tooltip
//                 formatter={(value: any) => [value, "Policies"]}
//                 labelFormatter={(label: any) => `State: ${label}`}
//                 contentStyle={{
//                   backgroundColor: "rgba(0, 0, 0, 0.8)",
//                   border: "1px solid rgba(0, 212, 255, 0.3)",
//                   borderRadius: "8px",
//                   color: "white",
//                 }}
//               />
//               <Legend
//                 verticalAlign="bottom"
//                 height={36}
//                 formatter={(value: any) => `${value}`}
//                 wrapperStyle={{
//                   paddingTop: "20px",
//                   color: "#9CA3AF",
//                 }}
//               />
//             </PieChart>
//           </ResponsiveContainer> */}
//         </div>

//         <div className="mt-6 grid grid-cols-2 gap-4">
//           <div className="text-center p-4 rounded-lg bg-[#16213E80]">
//             <div className="text-2xl font-bold text-white">$127M</div>
//             <div className="text-sm text-[#9CA3AF]">Total Volume</div>
//           </div>
//           <div className="text-center p-4 rounded-lg bg-[#16213E80]">
//             <div className="text-2xl font-bold text-white">+23%</div>
//             <div className="text-sm text-[#9CA3AF]">Month Growth</div>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default StatePerformanceChart;


import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { state: "CA", value: 2847, color: "#00D4FF" },
  { state: "TX", value: 2634, color: "#00FFB3" },
  { state: "FL", value: 2156, color: "#39FF14" },
  { state: "NY", value: 1892, color: "#FF6B35" },
  { state: "IL", value: 1654, color: "#FF1493" },
  // { state: "PA", value: 1487, color: "#FFD700" },
  // { state: "OH", value: 1298, color: "#FF69B4" },
  // { state: "GA", value: 1187, color: "#9370DB" },
];

const CustomDonutChart = ({ data }) => {
  const [hoveredSegment, setHoveredSegment] = useState(null);

  // Calculate angles for each segment
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;

  const segments = data.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const angle = (item.value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle += angle;

    return {
      ...item,
      percentage: Math.round(percentage),
      startAngle,
      endAngle,
      angle,
    };
  });

  // Function to create SVG path for donut segment
  const createPath = (innerRadius, outerRadius, startAngle, endAngle) => {
    const centerX = 160;
    const centerY = 160;

    const startAngleRad = ((startAngle - 90) * Math.PI) / 180;
    const endAngleRad = ((endAngle - 90) * Math.PI) / 180;

    const x1 = centerX + innerRadius * Math.cos(startAngleRad);
    const y1 = centerY + innerRadius * Math.sin(startAngleRad);
    const x2 = centerX + outerRadius * Math.cos(startAngleRad);
    const y2 = centerY + outerRadius * Math.sin(startAngleRad);

    const x3 = centerX + outerRadius * Math.cos(endAngleRad);
    const y3 = centerY + outerRadius * Math.sin(endAngleRad);
    const x4 = centerX + innerRadius * Math.cos(endAngleRad);
    const y4 = centerY + innerRadius * Math.sin(endAngleRad);

    const largeArc = endAngle - startAngle > 180 ? 1 : 0;

    return `M ${x1} ${y1} L ${x2} ${y2} A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x3} ${y3} L ${x4} ${y4} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x1} ${y1}`;
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="relative">
        <svg width="320" height="320" className="transform -rotate-90">
          {/* Dotted circle guide */}
          <circle
            cx="160"
            cy="160"
            r="110"
            fill="none"
            stroke="rgba(156, 163, 175, 0.3)"
            strokeWidth="1"
            strokeDasharray="2,2"
            opacity="0.5"
          />

          {/* Donut segments */}
          {segments.map((segment, index) => (
            <g key={segment.state}>
              <path
                d={createPath(70, 140, segment.startAngle, segment.endAngle)}
                fill={segment.color}
                stroke="#14181F"
                strokeWidth="16"
                className="cursor-pointer transition-all duration-200 hover:brightness-110"
                onMouseEnter={() => setHoveredSegment(segment)}
                onMouseLeave={() => setHoveredSegment(null)}
                style={{
                  filter:
                    hoveredSegment?.state === segment.state ? "none" : "none",
                }}
              />

              {/* Percentage labels */}
              <text
                x={
                  160 +
                  105 *
                    Math.cos(
                      (((segment.startAngle + segment.endAngle) / 2) *
                        Math.PI) /
                        180 -
                        Math.PI / 2
                    )
                }
                y={
                  160 +
                  105 *
                    Math.sin(
                      (((segment.startAngle + segment.endAngle) / 2) *
                        Math.PI) /
                        180 -
                        Math.PI / 2
                    )
                }
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-white text-xs font-bold pointer-events-none"
                transform={`rotate(90 ${
                  160 +
                  105 *
                    Math.cos(
                      (((segment.startAngle + segment.endAngle) / 2) *
                        Math.PI) /
                        180 -
                        Math.PI / 2
                    )
                } ${
                  160 +
                  105 *
                    Math.sin(
                      (((segment.startAngle + segment.endAngle) / 2) *
                        Math.PI) /
                        180 -
                        Math.PI / 2
                    )
                })`}
              >
                {segment.percentage}%
              </text>
            </g>
          ))}
        </svg>

        {/* Callout box */}
        {hoveredSegment && (
          <div className="absolute -left-24 bottom-16 w-fit">
            <div className="w-1/2  border-t border-[#F3F2DB] ml-auto "></div>
            <div className="w-px h-8  bg-[#F3F2DB] mx-auto"></div>
            <div className="bg-[#D9D9D929] bg-opacity-80 border border-[#F3F2DB] rounded px-3 py-2 text-white font-semibold text-[16px]">
              {hoveredSegment.state}: {hoveredSegment.value.toLocaleString()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const StatePerformanceChart = () => {
  return (
    <Card className="card-glass bg-[#14181F]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-[#F5F5DC]">
          Top Performing States
        </CardTitle>
        <p className="text-[#9CA3AF]">Real-time policy volume by state</p>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <CustomDonutChart data={data} />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="text-center p-4 rounded-lg bg-[#16213E80]">
            <div className="text-2xl font-bold text-white">$127M</div>
            <div className="text-sm text-[#9CA3AF]">Total Volume</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-[#16213E80]">
            <div className="text-2xl font-bold text-white">+23%</div>
            <div className="text-sm text-[#9CA3AF]">Month Growth</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatePerformanceChart;
