"use client";

import clsx from "clsx";
import { Check, Lock } from "lucide-react";

export interface Step {
  label: string;
  sublabel?: string;
  status: "upcoming" | "current" | "completed" | "locked";
}

interface StepIndicatorProps {
  steps: Step[];
  color?: string;
}

export function StepIndicator({ steps, color = "#FF5308" }: StepIndicatorProps) {
  return (
    <div className="flex items-center w-full">
      {steps.map((step, i) => (
        <div key={step.label} className="flex items-center flex-1 last:flex-none">
          {/* Step circle + label */}
          <div className="flex flex-col items-center relative">
            <div
              className={clsx(
                "w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all",
                step.status === "completed" && "text-white",
                step.status === "current" && "text-white ring-4 ring-offset-2",
                step.status === "upcoming" && "bg-sst-light-gray text-sst-gray",
                step.status === "locked" && "bg-sst-light-gray text-sst-border"
              )}
              style={{
                ...(step.status === "completed" && { backgroundColor: "#22C55E" }),
                ...(step.status === "current" && {
                  backgroundColor: color,
                  ringColor: color + "30",
                }),
              }}
            >
              {step.status === "completed" ? (
                <Check className="w-4 h-4" />
              ) : step.status === "locked" ? (
                <Lock className="w-3.5 h-3.5" />
              ) : (
                i + 1
              )}
            </div>
            <span
              className={clsx(
                "text-[10px] sm:text-xs mt-1.5 font-medium text-center whitespace-nowrap",
                step.status === "current" ? "text-sst-charcoal" : "text-sst-gray"
              )}
            >
              {step.label}
            </span>
            {step.sublabel && (
              <span className="text-[9px] text-sst-gray">{step.sublabel}</span>
            )}
          </div>

          {/* Connector line */}
          {i < steps.length - 1 && (
            <div className="flex-1 mx-2 sm:mx-3">
              <div
                className="h-0.5 rounded-full transition-all"
                style={{
                  backgroundColor:
                    step.status === "completed" ? "#22C55E" : "#E5E5E5",
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
