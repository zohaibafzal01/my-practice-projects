import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

const stateData = {
  CA: { fresh: 3200, aged: 1800, total: 5000 },
  TX: { fresh: 2800, aged: 1600, total: 4400 },
  FL: { fresh: 2400, aged: 1400, total: 3800 },
  NY: { fresh: 2000, aged: 1200, total: 3200 },
  IL: { fresh: 1600, aged: 1000, total: 2600 },
  PA: { fresh: 1400, aged: 900, total: 2300 },
  OH: { fresh: 1200, aged: 800, total: 2000 },
  GA: { fresh: 1100, aged: 700, total: 1800 },
  WA: { fresh: 950, aged: 600, total: 1550 },
  NC: { fresh: 900, aged: 550, total: 1450 },
  AZ: { fresh: 850, aged: 500, total: 1350 },
  CO: { fresh: 750, aged: 450, total: 1200 },
  NV: { fresh: 650, aged: 400, total: 1050 },
  OR: { fresh: 600, aged: 350, total: 950 },
  MI: { fresh: 580, aged: 320, total: 900 },
  NJ: { fresh: 520, aged: 280, total: 800 },
  VA: { fresh: 480, aged: 260, total: 740 },
  MD: { fresh: 440, aged: 240, total: 680 },
  CT: { fresh: 400, aged: 220, total: 620 },
  MA: { fresh: 380, aged: 200, total: 580 },
};

// US States SVG paths (simplified but geographically accurate)
const statePaths = {
  CA: "M158,278L158,218L158,214L158,206L158,202L158,194L158,186L153,186L149,186L145,186L141,186L137,186L133,186L129,186L125,186L121,186L117,186L113,186L109,186L109,194L109,202L109,210L109,218L109,226L109,234L109,242L109,250L109,258L109,266L109,274L109,282L113,282L117,282L121,282L125,282L129,282L133,282L137,282L141,282L145,282L149,282L153,282L158,278Z",
  TX: "M360,360L360,320L320,320L320,280L280,280L280,320L280,360L320,360L360,360Z",
  FL: "M540,380L540,340L500,340L500,320L480,320L480,340L480,360L480,380L500,380L520,380L540,380Z",
  NY: "M580,180L580,140L540,140L540,120L520,120L520,140L520,160L520,180L540,180L560,180L580,180Z",
  IL: "M440,220L440,180L400,180L400,220L400,260L440,260L440,220Z",
  PA: "M560,200L560,160L520,160L520,140L500,140L500,160L500,180L500,200L520,200L540,200L560,200Z",
  OH: "M500,200L500,160L460,160L460,200L460,240L500,240L500,200Z",
  GA: "M520,300L520,260L480,260L480,300L480,340L520,340L520,300Z",
  WA: "M140,80L140,40L100,40L100,80L100,120L140,120L140,80Z",
  NC: "M540,260L540,220L500,220L500,240L480,240L480,260L500,260L520,260L540,260Z",
  AZ: "M220,320L220,280L180,280L180,320L180,360L220,360L220,320Z",
  CO: "M300,240L300,200L260,200L260,240L260,280L300,280L300,240Z",
  NV: "M180,280L180,240L140,240L140,200L120,200L120,240L120,280L140,280L160,280L180,280Z",
  OR: "M140,160L140,120L100,120L100,160L100,200L140,200L140,160Z",
  MI: "M480,160L480,120L460,120L440,120L440,140L440,160L460,160L480,160Z",
  NJ: "M580,200L580,180L560,180L560,200L560,220L580,220L580,200Z",
  VA: "M540,220L540,200L520,200L500,200L500,220L500,240L520,240L540,240L540,220Z",
  MD: "M560,220L560,200L540,200L540,220L540,240L560,240L560,220Z",
  CT: "M600,180L600,160L580,160L580,180L580,200L600,200L600,180Z",
  MA: "M620,160L620,140L600,140L600,160L600,180L620,180L620,160Z",
};

const USHeatMap = () => {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"fresh" | "aged" | "total">("total");
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const mapRef = useRef<HTMLDivElement>(null);

  const getStateIntensity = (stateCode: string) => {
    const data = stateData[stateCode as keyof typeof stateData];
    if (!data) return 0;

    const value = data[viewMode];
    const maxValue = Math.max(
      ...Object.values(stateData).map((d) => d[viewMode])
    );
    return value / maxValue;
  };

  const getStateColor = (stateCode: string) => {
    const intensity = getStateIntensity(stateCode);

    if (viewMode === "fresh") {
      const opacity = 0.3 + intensity * 0.7;
      return `rgba(34, 197, 94, ${opacity})`; // Green for fresh
    } else if (viewMode === "aged") {
      const opacity = 0.3 + intensity * 0.7;
      return `rgba(249, 115, 22, ${opacity})`; // Orange for aged
    } else {
      const opacity = 0.3 + intensity * 0.7;
      return `rgba(59, 130, 246, ${opacity})`; // Blue for total
    }
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev * 1.5, 4));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev / 1.5, 0.5));
  };

  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setSelectedState(null);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    document.addEventListener("mouseup", handleGlobalMouseUp);
    return () => document.removeEventListener("mouseup", handleGlobalMouseUp);
  }, []);

  return (
    <Card className="card-glass bg-[#14181F]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-[#F5F5DC]">
              US Lead Distribution Heat Map
            </CardTitle>
            <p className="text-[#9CA3AF]">
              Interactive map showing lead availability by state
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomIn}
              className="border border-[#00D4FF4D] bg-[#0C0E13] hover:bg-[#0C0E13] text-[#F8FAFC]"
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomOut}
              className="border border-[#00D4FF4D] bg-[#0C0E13] hover:bg-[#0C0E13] text-[#F8FAFC]"
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="border border-[#00D4FF4D] bg-[#0C0E13] hover:bg-[#0C0E13] text-[#F8FAFC]"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* View Mode Toggle */}
        <div className="flex justify-center mb-6">
          <div className="flex bg-dark-surface/50 rounded-lg p-1 bg-[#16213E80]">
            {(["total", "fresh", "aged"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  viewMode === mode
                    ? "bg-[#E2DCD5] text-black"
                    : "text-gray-400 "
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)} Leads
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Map Container */}
        <div className="w-full h-72 rounded-2xl overflow-hidden shadow-lg">
          <iframe
            title="Google Map"
            className="w-full h-full border-0"
            loading="lazy"
            allowFullScreen
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52809972.582145326!2d-161.4707710359371!3d36.1114029076984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2s!4v1750245704928!5m2!1sen!2s"
          ></iframe>
        </div>

        {/* Legend */}
        <div className="mt-6 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-semibold text-[#F8FAFC] mb-3">
              Lead Volume Intensity
            </h4>
            <div className="flex items-center space-x-4 text-xs text-[#F8FAFC]">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-[#00FFB3]"></div>
                <span>High</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-[#00FFB3]"></div>
                <span>Medium</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-[#00FFB3]"></div>
                <span>Low</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 rounded-lg bg-[#16213E80]">
              <div className="text-lg font-bold text-[#E2DCD5]">
                {Object.values(stateData)
                  .reduce((sum, state) => sum + state.fresh, 0)
                  .toLocaleString()}
              </div>
              <div className="text-xs text-[#9CA3AF]">Fresh Leads</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-[#16213E80]">
              <div className="text-lg font-bold text-[#00FFB3]">
                {Object.values(stateData)
                  .reduce((sum, state) => sum + state.aged, 0)
                  .toLocaleString()}
              </div>
              <div className="text-xs text-[#9CA3AF]">Aged Leads</div>
            </div>
          </div>
        </div>

        {/* Selected State Details */}
        {selectedState &&
          stateData[selectedState as keyof typeof stateData] && (
            <div className="mt-6 p-4 rounded-lg bg-electric-blue/10 border border-electric-blue/30">
              <h3 className="text-lg font-semibold text-electric-blue mb-3">
                {selectedState} - Detailed Breakdown
              </h3>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">
                    {stateData[
                      selectedState as keyof typeof stateData
                    ].fresh.toLocaleString()}
                  </div>
                  <div className="text-gray-400">Fresh Leads</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400">
                    {stateData[
                      selectedState as keyof typeof stateData
                    ].aged.toLocaleString()}
                  </div>
                  <div className="text-gray-400">Aged Leads</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">
                    {stateData[
                      selectedState as keyof typeof stateData
                    ].total.toLocaleString()}
                  </div>
                  <div className="text-gray-400">Total Available</div>
                </div>
              </div>
            </div>
          )}
      </CardContent>
    </Card>
  );
};

export default USHeatMap;
