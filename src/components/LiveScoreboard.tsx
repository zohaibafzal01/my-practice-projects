
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ActivityItem {
  id: number;
  agent: string;
  action: string;
  amount: string;
  location: string;
  timestamp: Date;
}

const LiveScoreboard = () => {
  const [activities, setActivities] = useState<ActivityItem[]>([
    { id: 1, agent: "Sarah Mitchell", action: "closed a policy", amount: "$1.2M", location: "Texas", timestamp: new Date() },
    { id: 2, agent: "Michael Chen", action: "generated lead", amount: "$850K", location: "California", timestamp: new Date() },
    { id: 3, agent: "Jessica Torres", action: "closed a policy", amount: "$2.1M", location: "Florida", timestamp: new Date() },
    { id: 4, agent: "David Kim", action: "generated lead", amount: "$650K", location: "New York", timestamp: new Date() },
  ]);

  const sampleActivities = [
    { agent: "Emma Rodriguez", action: "closed a policy", amount: "$1.8M", location: "Arizona" },
    { agent: "James Wilson", action: "generated lead", amount: "$920K", location: "Nevada" },
    { agent: "Lisa Chang", action: "closed a policy", amount: "$1.5M", location: "Georgia" },
    { agent: "Robert Johnson", action: "generated lead", amount: "$750K", location: "Illinois" },
    { agent: "Maria Santos", action: "closed a policy", amount: "$2.3M", location: "Virginia" },
    { agent: "Alex Thompson", action: "generated lead", amount: "$680K", location: "Washington" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const newActivity = sampleActivities[Math.floor(Math.random() * sampleActivities.length)];
      const newItem: ActivityItem = {
        id: Date.now(),
        ...newActivity,
        timestamp: new Date()
      };
      
      setActivities(prev => [newItem, ...prev.slice(0, 7)]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold mb-2 gradient-text">Live Agent Activity</h2>
      <p className="text-gray-400 mb-8">See what's happening in real-time across our network</p>
      
      <div className="max-w-4xl mx-auto">
        <div className="space-y-3">
          {activities.map((activity, index) => (
            <Card 
              key={activity.id} 
              className={`card-glass transition-all duration-500 ${
                index === 0 ? 'animate-slide-up glow-effect' : ''
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-electric-blue to-electric-teal rounded-full flex items-center justify-center font-semibold text-dark-bg">
                      {activity.agent.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-white">
                        Agent <span className="text-electric-blue">{activity.agent}</span> just {activity.action}
                      </div>
                      <div className="text-sm text-gray-400">
                        {activity.amount} • {activity.location}
                      </div>
                    </div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className="border-electric-teal text-electric-teal bg-electric-teal/10"
                  >
                    LIVE
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveScoreboard;
