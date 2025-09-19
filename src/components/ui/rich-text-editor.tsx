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
  return (
    <div className={cn("rich-text-editor", className)}>
      <MDEditor
        value={value || ""}
        onChange={onChange}
        height={height}
        preview="edit"
        hideToolbar={false}
        visibleDragbar={false}
        className="bg-background border-border [&_.w-md-editor]:!bg-background [&_.w-md-editor-text]:!text-foreground [&_.w-md-editor-text-input]:!text-foreground [&_.w-md-editor-text-container]:!text-foreground [&_.w-md-editor-text-area]:!text-foreground [&_.w-md-editor-text-pre>code]:!text-foreground [&_.w-md-editor-text-pre]:!text-foreground [&_.w-md-editor-text>div]:!text-foreground"
        data-color-mode="light"
      />
    </div>
  );
};

export default RichTextEditor;