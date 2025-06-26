import { ReactNode } from "react";
import { X } from "lucide-react";
import clsx from "clsx";

interface CustomModalProps {
  show: boolean;
  onClose: () => void;
  size?: "sm" | "md" | "lg" | "xl";
  title?: string;
  children: ReactNode;
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

export default function ViewModal({
  show,
  onClose,
  size = "md",
  title,
  children,
}: CustomModalProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm px-4">
      <div
        className={clsx(
          "w-full bg-[#1E1E1E] text-[#E2DCD5] rounded-lg shadow-lg border border-[#3A3A3A] overflow-hidden",
          sizeClasses[size]
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-[#3A3A3A]">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-[#E2DCD5] hover:text-[#FFFFFF] p-1 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="w-full p-4">{children}</div>
      </div>
    </div>
  );
}
