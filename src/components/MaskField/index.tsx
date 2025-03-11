import React from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { useMask } from "@react-input/mask";
import { Controller, ValidationRule } from "react-hook-form";

type InputDefProps = {
  name: string;
  readOnly?: boolean;
  control: Control<any>;
  maxLength?: number;
  onChangeAlt?: (e: any) => void;
  size?: "small" | "medium";
  rules?: any;
} & TextFieldProps;

function MascaraTextField({
  name,
  control,
  maxLength,
  minRows,
  onChangeAlt,
  size = "small",
  rules = {} as ValidationRule,
  ...rest
}: InputDefProps) {
  const {  } = useMask({
    mask: "999.999.999-99",
  });

  return (
    <Controller
      name={name}
      rules={rules}
      defaultValue={rest.defaultValue}
      control={control}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => {
        return (
          <TextField
            {...rest}
            name={name}
            size={size}
            minRows={minRows}
            value={value}
            inputRef={ref}
            error={!!error}
            onChange={(data) => {
              onChange(data);
              setMaskedValue(data)
              if (onChangeAlt) {
                onChangeAlt(data);
              }
            }}
            autoComplete="new-password"
            helperText={
              (error && <span>{error.message}</span>) ?? rest.helperText
            }
            inputProps={{ readOnly, maxLength }}
            InputLabelProps={{
              shrink: !!value || rest?.InputLabelProps?.shrink,
            }}
          />
        );
      }}
    />
  );
}

export default MascaraTextField;
