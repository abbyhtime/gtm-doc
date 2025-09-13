import React from "react";
import { cn } from "@/lib/utils";
import { useDataVerification } from "@/hooks/useDataVerification";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface VerifiedTextProps {
  section: string;
  dataKey: string;
  children: React.ReactNode;
  className?: string;
}

export const VerifiedText = ({ section, dataKey, children, className }: VerifiedTextProps) => {
  const { getVerificationStatus } = useDataVerification();
  const isVerified = getVerificationStatus(section, dataKey);
  
  // If verification status is unknown, render normally
  if (isVerified === null) {
    return <span className={className}>{children}</span>;
  }

  const textColor = isVerified ? "" : "text-orange-600 dark:text-orange-500";
  
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className={cn(textColor, className)}>
          {children}
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p>
          {isVerified 
            ? "✓ Verified data from credible sources" 
            : "⚠ Unverified data - may be synthetic or estimated"
          }
        </p>
      </TooltipContent>
    </Tooltip>
  );
};