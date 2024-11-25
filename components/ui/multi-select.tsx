'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { X } from 'lucide-react';

export interface MultiSelectOption {
  label: string;
  value: string;
}

export interface MultiSelectProps {
  options: MultiSelectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

export function MultiSelect({ 
  options, 
  value, 
  onChange, 
  placeholder = 'Select options' 
}: MultiSelectProps) {
  const handleSelect = (option: MultiSelectOption) => {
    const newValue = value.includes(option.value)
      ? value.filter(v => v !== option.value)
      : [...value, option.value];
    onChange(newValue);
  };

  const removeOption = (optionToRemove: string) => {
    onChange(value.filter(v => v !== optionToRemove));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map(selectedValue => {
          const option = options.find(opt => opt.value === selectedValue);
          return option ? (
            <Button 
              key={option.value} 
              variant="secondary" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={() => removeOption(option.value)}
            >
              {option.label}
              <X className="h-4 w-4" />
            </Button>
          ) : null;
        })}
      </div>
      <div className="relative">
        <select
          multiple
          value={value}
          onChange={(e) => {
            const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
            onChange(selectedOptions);
          }}
          className={cn(
            "w-full p-2 border rounded-md",
            value.length === 0 && "text-gray-500"
          )}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
