import { IFormField } from "@/types/app";
import { ValidationErrors } from "@/validations/auth";
import React from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
interface Props extends IFormField {
  error: ValidationErrors;
}
export default function TextareaField({
  label,
  name,
  placeholder,
  disabled,
  autoFocus,
  error,
  defaultValue,
  readOnly,
}: Props) {
  return (
    <div className="space-y-2">
      <Label
        htmlFor={name}
        className="capitalize text-black dark:text-white mb-2"
      >
        {label}
      </Label>
      <Textarea
        placeholder={placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        name={name}
        id={name}
        defaultValue={defaultValue}
        readOnly={readOnly}
        className="focus:!ring-0"
      />
      {error && error[name] && (
        <p
          className={`text-accent mt-2 text-sm font-medium ${
            error[name] ? "text-destructive" : ""
          }`}
        >
          {error[name]}
        </p>
      )}
    </div>
  );
}
