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
        className="bg-background border-border"
      />
    </div>
  );
};

export default RichTextEditor;