import React from "react";
import { cn } from "@/lib/utils";

interface VerifiedTextProps {
  isVerified?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const VerifiedText = ({ isVerified = false, children, className }: VerifiedTextProps) => {
  const textColor = isVerified ? "" : "text-orange-600 dark:text-orange-500";
  
  return (
    <span className={cn(textColor, className)} title={isVerified ? "Verified data" : "Unverified data"}>
      {children}
    </span>
  );
};