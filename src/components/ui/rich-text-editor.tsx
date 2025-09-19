import React from "react";
import MDEditor from "@uiw/react-md-editor";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string | undefined) => void;
  className?: string;
  height?: number;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  className,
  height = 200,
}) => {
  const isDark = document.documentElement.classList.contains('dark');
  
  return (
    <div className={cn("rich-text-editor", className)}>
      <MDEditor
        value={value || ""}
        onChange={onChange}
        height={height}
        preview="edit"
        hideToolbar={false}
        visibleDragbar={false}
        className="bg-background border-border"
        data-color-mode={isDark ? "dark" : "light"}
        style={{
          backgroundColor: 'hsl(var(--background))',
        }}
        textareaProps={{
          style: {
            color: 'hsl(var(--foreground))',
            backgroundColor: 'hsl(var(--background))',
          }
        }}
      />
      <style dangerouslySetInnerHTML={{
        __html: `
          .w-md-editor {
            background-color: hsl(var(--background)) !important;
            color: hsl(var(--foreground)) !important;
          }
          .w-md-editor-text-pre,
          .w-md-editor-text-input,
          .w-md-editor-text-container,
          .w-md-editor-text-area,
          .w-md-editor-text > div {
            color: hsl(var(--foreground)) !important;
            background-color: hsl(var(--background)) !important;
          }
          .w-md-editor-text-pre > code {
            color: hsl(var(--foreground)) !important;
          }
          .w-md-editor-text ul,
          .w-md-editor-text ol {
            padding-left: 1.5rem !important;
            margin: 0.5rem 0 !important;
          }
          .w-md-editor-text li {
            margin: 0.25rem 0 !important;
            list-style: inherit !important;
          }
        `
      }} />
    </div>
  );
};

export default RichTextEditor;