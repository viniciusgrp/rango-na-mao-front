import { TextField, TextFieldProps } from "@mui/material";
import { Control, Controller, ValidationRule } from "react-hook-form";
import React, { useState } from "react";

type InputDefProps = {
  name: string;
  readOnly?: boolean;
  control: Control<any>;
  maxLength?: number;
  onChangeAlt?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  size?: "small" | "medium";
  rules?: ValidationRule | Record<string, ValidationRule>;
  mask?: string;
} & TextFieldProps;

export default function InputText({
  name,
  readOnly = false,
  control,
  maxLength,
  minRows,
  onChangeAlt,
  mask,
  size = "small",
  rules,
  ...rest
}: InputDefProps) {
  const [maskedValue, setMaskedValue] = useState<string>(
    rest?.defaultValue || ""
  );

  const applyMask = (value: string, mask: string): string => {
    let masked = "";
    let valueIndex = 0;
    for (let maskIndex = 0; maskIndex < mask.length; maskIndex++) {
      if (mask[maskIndex] === "#") {
        if (valueIndex < value.length && /\d/.test(value[valueIndex])) {
          masked += value[valueIndex];
          valueIndex++;
        } else {
          break;
        }
      } else {
        masked += mask[maskIndex];
        if (mask[maskIndex] === value[valueIndex]) {
          valueIndex++;
        }
      }
    }
    return masked;
  };

  return (
    <Controller
      name={name}
      rules={rules}
      defaultValue={rest.defaultValue}
      control={control}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => {
        const inputProps = {
          readOnly,
          maxLength,
          ...rest.inputProps,
        };

        const InputLabelProps = {
          shrink: !!value || rest?.InputLabelProps?.shrink,
          ...rest.InputLabelProps,
        };

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          let newValue = e.target.value;
          if (mask) {
            newValue = applyMask(newValue.replace(/\D/g, ""), mask);
            setMaskedValue(newValue);
          }
          onChange(newValue);
          if (onChangeAlt) {
            onChangeAlt(e);
          }
        };

        const textFieldProps = {
          ...rest,
          name,
          size,
          minRows,
          value: mask ? maskedValue : value,
          inputRef: ref,
          error: !!error,
          onChange: handleChange,
          autoComplete: "new-password",
          helperText: error ? error.message : rest.helperText,
          inputProps,
          InputLabelProps,
        };

        return <TextField {...textFieldProps} />;
      }}
    />
  );
}
