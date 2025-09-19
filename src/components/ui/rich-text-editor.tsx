import React, { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "./button";
import { Textarea } from "./textarea";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";
import { cn } from "@/lib/utils";
import { 
  Bold, 
  Italic, 
  List, 
  Eye, 
  Edit, 
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  ListOrdered,
  Link,
  Code,
  Smile,
  Search
} from "lucide-react";
import { Input } from "./input";
import MarkdownPreview from '@uiw/react-markdown-preview';

interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string | undefined) => void;
  className?: string;
  height?: number;
}

// Emoji data organized by categories
const EMOJI_CATEGORIES = {
  'Smileys & People': [
    '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇',
    '🥰', '😍', '🤩', '😘', '😗', '😚', '😙', '😋', '😛', '😜', '🤪', '😝', '🤑',
    '🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬',
    '🤥', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '🥵', '🥶'
  ],
  'Hearts & Love': [
    '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞',
    '💓', '💗', '💖', '💘', '💝', '💟', '💌', '💋', '😍', '🥰', '😘', '😗', '😚'
  ],
  'Celebrations': [
    '🎉', '🎊', '🎈', '🎂', '🎁', '🎀', '🎆', '🎇', '✨', '🌟', '💫', '⭐', '🎯',
    '🎪', '🎨', '🎭', '🎪', '🎡', '🎢', '🎠', '🎮', '🕹️', '🎲', '🃏', '🀄'
  ],
  'Objects & Symbols': [
    '📱', '💻', '⌨️', '🖥️', '🖨️', '📷', '📹', '🎥', '📞', '☎️', '📠', '📺', '📻',
    '🎵', '🎶', '🎤', '🎧', '📢', '📣', '📯', '🔔', '🔕', '🎼', '🎹', '🥁', '🎷'
  ],
  'Nature': [
    '🌸', '🌺', '🌻', '🌷', '🌹', '🥀', '🌾', '🌿', '🍀', '🍃', '🌳', '🌲', '🌴',
    '🌵', '🌶️', '🍄', '🌰', '🌱', '🌿', '☘️', '🌞', '🌝', '🌛', '🌜', '🌚', '🌕'
  ],
  'Food & Drink': [
    '🍎', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥',
    '🥝', '🍅', '🍆', '🥑', '🥦', '🥬', '🥒', '🌶️', '🌽', '🥕', '🧄', '🧅', '🥔'
  ]
};

const ALL_EMOJIS = Object.values(EMOJI_CATEGORIES).flat();

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value = '',
  onChange,
  className,
  height = 200,
}) => {
  const [isPreview, setIsPreview] = useState(false);
  const [recentEmojis, setRecentEmojis] = useState<string[]>([]);
  const [emojiSearch, setEmojiSearch] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const editorId = useRef(`editor-${Math.random().toString(36).substr(2, 9)}`);

  // Load recent emojis from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('richTextEditor-recentEmojis');
    if (saved) {
      try {
        setRecentEmojis(JSON.parse(saved));
      } catch (e) {
        // Ignore parsing errors
      }
    }
  }, []);

  // Save recent emojis to localStorage
  const addRecentEmoji = useCallback((emoji: string) => {
    setRecentEmojis(prev => {
      const updated = [emoji, ...prev.filter(e => e !== emoji)].slice(0, 20);
      localStorage.setItem('richTextEditor-recentEmojis', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Enhanced text insertion with proper cursor handling
  const insertText = useCallback((before: string, after: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newText = before + selectedText + after;
    
    const newValue = value.substring(0, start) + newText + value.substring(end);
    onChange?.(newValue);
    
    // Set cursor position after the inserted text
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + before.length + selectedText.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  }, [value, onChange]);

  // Insert emoji at cursor position
  const insertEmoji = useCallback((emoji: string) => {
    insertText(emoji);
    addRecentEmoji(emoji);
  }, [insertText, addRecentEmoji]);

  // Formatting functions
  const handleBold = useCallback(() => insertText('**', '**'), [insertText]);
  const handleItalic = useCallback(() => insertText('*', '*'), [insertText]);
  const handleUnderline = useCallback(() => insertText('<u>', '</u>'), [insertText]);
  const handleStrikethrough = useCallback(() => insertText('~~', '~~'), [insertText]);
  const handleCode = useCallback(() => insertText('`', '`'), [insertText]);
  const handleLink = useCallback(() => {
    const url = prompt('Enter URL:');
    if (url) {
      insertText('[', `](${url})`);
    }
  }, [insertText]);

  const handleHeader = useCallback((level: number) => {
    const prefix = '#'.repeat(level) + ' ';
    insertText(prefix);
  }, [insertText]);

  const handleList = useCallback((ordered: boolean = false) => {
    const lines = value.split('\n');
    const textarea = textareaRef.current;
    const start = textarea?.selectionStart || 0;
    
    // Find which line the cursor is on
    let currentPos = 0;
    let lineIndex = 0;
    for (let i = 0; i < lines.length; i++) {
      if (currentPos + lines[i].length >= start) {
        lineIndex = i;
        break;
      }
      currentPos += lines[i].length + 1;
    }
    
    const prefix = ordered ? '1. ' : '- ';
    const currentLine = lines[lineIndex] || '';
    
    // Toggle list item
    if (currentLine.match(/^(\d+\.|\-)\s/)) {
      lines[lineIndex] = currentLine.replace(/^(\d+\.|\-)\s/, '');
    } else {
      lines[lineIndex] = prefix + currentLine;
    }
    
    onChange?.(lines.join('\n'));
  }, [value, onChange]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!textareaRef.current?.contains(e.target as Node)) return;
      
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'b':
            e.preventDefault();
            handleBold();
            break;
          case 'i':
            e.preventDefault();
            handleItalic();
            break;
          case 'u':
            e.preventDefault();
            handleUnderline();
            break;
          case 'k':
            e.preventDefault();
            handleLink();
            break;
          case '`':
            e.preventDefault();
            handleCode();
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleBold, handleItalic, handleUnderline, handleLink, handleCode]);

  // Filter emojis based on search
  const filteredEmojis = emojiSearch 
    ? ALL_EMOJIS.filter(emoji => {
        // Simple emoji search by common names (could be enhanced)
        const searchLower = emojiSearch.toLowerCase();
        return emoji.includes(searchLower);
      })
    : [];

  const ToolbarButton = ({ 
    onClick, 
    disabled, 
    children, 
    tooltip 
  }: { 
    onClick: () => void; 
    disabled?: boolean; 
    children: React.ReactNode; 
    tooltip: string;
  }) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClick}
          className="h-8 w-8 p-0"
          disabled={disabled}
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );

  return (
    <TooltipProvider>
      <div className={cn("rich-text-editor border border-border rounded-md overflow-hidden", className)}>
        {/* Enhanced Toolbar */}
        <div className="flex items-center gap-1 p-2 border-b border-border bg-muted/30 flex-wrap">
          {/* Text Formatting */}
          <div className="flex items-center gap-1">
            <ToolbarButton onClick={handleBold} disabled={isPreview} tooltip="Bold (Ctrl+B)">
              <Bold className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton onClick={handleItalic} disabled={isPreview} tooltip="Italic (Ctrl+I)">
              <Italic className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton onClick={handleUnderline} disabled={isPreview} tooltip="Underline (Ctrl+U)">
              <Underline className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton onClick={handleStrikethrough} disabled={isPreview} tooltip="Strikethrough">
              <Strikethrough className="h-4 w-4" />
            </ToolbarButton>
          </div>

          <div className="w-px h-4 bg-border" />

          {/* Headers */}
          <div className="flex items-center gap-1">
            <ToolbarButton onClick={() => handleHeader(1)} disabled={isPreview} tooltip="Heading 1">
              <Heading1 className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton onClick={() => handleHeader(2)} disabled={isPreview} tooltip="Heading 2">
              <Heading2 className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton onClick={() => handleHeader(3)} disabled={isPreview} tooltip="Heading 3">
              <Heading3 className="h-4 w-4" />
            </ToolbarButton>
          </div>

          <div className="w-px h-4 bg-border" />

          {/* Lists */}
          <div className="flex items-center gap-1">
            <ToolbarButton onClick={() => handleList(false)} disabled={isPreview} tooltip="Bullet List">
              <List className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton onClick={() => handleList(true)} disabled={isPreview} tooltip="Numbered List">
              <ListOrdered className="h-4 w-4" />
            </ToolbarButton>
          </div>

          <div className="w-px h-4 bg-border" />

          {/* Utilities */}
          <div className="flex items-center gap-1">
            <ToolbarButton onClick={handleLink} disabled={isPreview} tooltip="Insert Link (Ctrl+K)">
              <Link className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton onClick={handleCode} disabled={isPreview} tooltip="Inline Code (Ctrl+`)">
              <Code className="h-4 w-4" />
            </ToolbarButton>

            {/* Emoji Picker */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  disabled={isPreview}
                >
                  <Smile className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0">
                <div className="p-3">
                  <div className="mb-3">
                    <Input
                      placeholder="Search emojis..."
                      value={emojiSearch}
                      onChange={(e) => setEmojiSearch(e.target.value)}
                      className="h-8"
                    />
                  </div>

                  <div className="max-h-60 overflow-y-auto">
                    {emojiSearch ? (
                      <div>
                        <h4 className="text-sm font-medium mb-2">Search Results</h4>
                        <div className="grid grid-cols-8 gap-1">
                          {filteredEmojis.slice(0, 32).map((emoji, i) => (
                            <button
                              key={i}
                              onClick={() => insertEmoji(emoji)}
                              className="p-1 hover:bg-muted rounded text-lg"
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <>
                        {recentEmojis.length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-sm font-medium mb-2">Recently Used</h4>
                            <div className="grid grid-cols-8 gap-1">
                              {recentEmojis.slice(0, 16).map((emoji, i) => (
                                <button
                                  key={i}
                                  onClick={() => insertEmoji(emoji)}
                                  className="p-1 hover:bg-muted rounded text-lg"
                                >
                                  {emoji}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {Object.entries(EMOJI_CATEGORIES).map(([category, emojis]) => (
                          <div key={category} className="mb-4">
                            <h4 className="text-sm font-medium mb-2">{category}</h4>
                            <div className="grid grid-cols-8 gap-1">
                              {emojis.slice(0, 24).map((emoji, i) => (
                                <button
                                  key={i}
                                  onClick={() => insertEmoji(emoji)}
                                  className="p-1 hover:bg-muted rounded text-lg"
                                >
                                  {emoji}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Preview Toggle */}
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
              <MarkdownPreview 
                source={value} 
                style={{ backgroundColor: 'transparent' }}
              />
            </div>
          ) : (
            <Textarea
              ref={textareaRef}
              className={`${editorId.current} h-full resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0`}
              value={value}
              onChange={(e) => onChange?.(e.target.value)}
              placeholder="Start typing... Use Ctrl+B for bold, Ctrl+I for italic, etc."
            />
          )}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default RichTextEditor;