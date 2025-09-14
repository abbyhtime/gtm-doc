import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface MultiValueInputProps {
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  className?: string;
  maxValues?: number;
}

export const MultiValueInput: React.FC<MultiValueInputProps> = ({
  values,
  onChange,
  placeholder = "Add item...",
  className,
  maxValues = 10,
}) => {
  const [inputValue, setInputValue] = useState("");

  const addValue = () => {
    if (inputValue.trim() && !values.includes(inputValue.trim()) && values.length < maxValues) {
      onChange([...values, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeValue = (indexToRemove: number) => {
    onChange(values.filter((_, index) => index !== indexToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addValue();
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {/* Display current values */}
      {values.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {values.map((value, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="flex items-center gap-1 px-2 py-1"
            >
              <span>{value}</span>
              <button
                onClick={() => removeValue(index)}
                className="hover:text-destructive"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
      
      {/* Input for new values */}
      {values.length < maxValues && (
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="flex-1"
          />
          <Button
            type="button"
            size="sm"
            onClick={addValue}
            disabled={!inputValue.trim() || values.includes(inputValue.trim())}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default MultiValueInput;