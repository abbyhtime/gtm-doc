import React from 'react';
import { cn } from '@/lib/utils';

interface HtmlContentProps {
  content: string;
  className?: string;
}

export const HtmlContent: React.FC<HtmlContentProps> = ({ content, className }) => {
  // Simple HTML sanitization - remove script tags and other dangerous elements
  const sanitizeHtml = (html: string): string => {
    return html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '');
  };

  const sanitizedContent = sanitizeHtml(content);

  return (
    <div 
      className={cn("prose prose-sm max-w-none dark:prose-invert", className)}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
};

export default HtmlContent;