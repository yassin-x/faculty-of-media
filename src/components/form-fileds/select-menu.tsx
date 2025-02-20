import { IFormField } from "@/types/app";
import { ValidationErrors } from "@/validations/auth";
import React from "react";
import { Label } from "../ui/label";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "../ui/select";

interface Props extends IFormField {
  error: ValidationErrors;
  value?: string;
  onChange?: (value: string) => void;
}

export default function SelectMenu({
  label,
  name,
  error,
  options,
  placeholder,
  value,
  onChange,
}: Props) {
  return (
    <div className="space-y-2">
      <Label
        htmlFor={name}
        className="capitalize text-black dark:text-white mb-2"
      >
        {label}
      </Label>
      <Select value={value} onValueChange={onChange} name={name}>
        <SelectTrigger className="w-full focus:!ring-0">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Categories</SelectLabel>
            {options?.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="hover:!bg-slate-100 transition-colors duration-300 ease-in-out !bg-transparent"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {error && error[name] && (
        <p className="text-destructive mt-2 text-sm font-medium">
          {error[name]}
        </p>
      )}
    </div>
  );
}
