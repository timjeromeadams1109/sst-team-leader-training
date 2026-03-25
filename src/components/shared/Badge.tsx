"use client";

import clsx from "clsx";

interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  variant?: "solid" | "soft" | "outline";
  size?: "sm" | "md";
  pulse?: boolean;
  className?: string;
}

export function Badge({
  children,
  color = "#FF5308",
  variant = "soft",
  size = "sm",
  pulse,
  className,
}: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 font-bold rounded-full whitespace-nowrap",
        size === "sm" ? "text-xs px-2.5 py-1" : "text-sm px-3 py-1.5",
        variant === "solid" && "text-white",
        variant === "soft" && "border",
        variant === "outline" && "border bg-transparent",
        className
      )}
      style={{
        ...(variant === "solid" && { backgroundColor: color }),
        ...(variant === "soft" && {
          backgroundColor: color + "12",
          color,
          borderColor: color + "30",
        }),
        ...(variant === "outline" && { borderColor: color + "40", color }),
      }}
    >
      {pulse && (
        <span
          className="w-1.5 h-1.5 rounded-full animate-pulse"
          style={{ backgroundColor: color }}
        />
      )}
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: "locked" | "active" | "completed" | "certified" }) {
  const config = {
    locked: { label: "Locked", color: "#848484", icon: "🔒" },
    active: { label: "In Progress", color: "#F59E0B", icon: "📖" },
    completed: { label: "Completed", color: "#22C55E", icon: "✓" },
    certified: { label: "Certified", color: "#22C55E", icon: "🏆" },
  };
  const c = config[status];
  return (
    <Badge color={c.color} variant="soft">
      <span className="text-[10px]">{c.icon}</span> {c.label}
    </Badge>
  );
}
