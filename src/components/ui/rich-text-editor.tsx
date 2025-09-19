import React, { useState } from "react";
import { Button } from "./button";
import { Textarea } from "./textarea";
import { cn } from "@/lib/utils";
import { Bold, Italic, List, Eye, Edit } from "lucide-react";
import MarkdownPreview from '@uiw/react-markdown-preview';

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
  const [isPreview, setIsPreview] = useState(false);
  
  const insertText = (before: string, after: string = '') => {
    const textarea = document.querySelector('.rich-text-textarea') as HTMLTextAreaElement;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value?.substring(start, end) || '';
    const newText = before + selectedText + after;
    
    const newValue = (value || '').substring(0, start) + newText + (value || '').substring(end);
    onChange?.(newValue);
    
    // Set cursor position after the inserted text
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 0);
  };

  const handleBold = () => insertText('**', '**');
  const handleItalic = () => insertText('*', '*');
  const handleBulletList = () => {
    const lines = (value || '').split('\n');
    const textarea = document.querySelector('.rich-text-textarea') as HTMLTextAreaElement;
    const start = textarea?.selectionStart || 0;
    
    // Find which line the cursor is on
    let currentPos = 0;
    let lineIndex = 0;
    for (let i = 0; i < lines.length; i++) {
      if (currentPos + lines[i].length >= start) {
        lineIndex = i;
        break;
      }
      currentPos += lines[i].length + 1; // +1 for newline
    }
    
    // Toggle bullet point for current line
    if (lines[lineIndex] && lines[lineIndex].startsWith('- ')) {
      lines[lineIndex] = lines[lineIndex].substring(2);
    } else {
      lines[lineIndex] = '- ' + (lines[lineIndex] || '');
    }
    
    onChange?.(lines.join('\n'));
  };

  return (
    <div className={cn("rich-text-editor border border-border rounded-md overflow-hidden", className)}>
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 border-b border-border bg-muted/30">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBold}
          className="h-8 w-8 p-0"
          disabled={isPreview}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleItalic}
          className="h-8 w-8 p-0"
          disabled={isPreview}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBulletList}
          className="h-8 w-8 p-0"
          disabled={isPreview}
        >
          <List className="h-4 w-4" />
        </Button>
        <div className="ml-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsPreview(!isPreview)}
            className="h-8 px-3"
          >
            {isPreview ? (
              <>
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-1" />
                Preview
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Content Area */}
      <div style={{ height }}>
        {isPreview ? (
          <div className="p-3 h-full overflow-auto prose prose-sm max-w-none dark:prose-invert">
            <MarkdownPreview source={value || ''} />
          </div>
        ) : (
          <Textarea
            className="rich-text-textarea h-full resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            value={value || ''}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder="Start typing..."
          />
        )}
      </div>
    </div>
  );
};

export default RichTextEditor;