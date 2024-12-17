import { FormControl, TextField } from "@mui/material";
import React, { Fragment } from "react";
import { Controller } from "react-hook-form";

const F_Input = ({
  name = "",
  label = "",
  type = "text",
  control = {},
  isDisabled = false,
  isRequired = false,
  errors = {},
  rules = {},
  ...props
}) => {
  return (
    <FormControl
      fullWidth
      variant="outlined"
      size="small"
      error={!!errors?.[name]}
      sx={{
        mt: 0.25,
        mb: 0.25,
        maxWidth: props.maxWidth ?? "230px",
        minWidth: props.minWidth ?? "230px",
      }}
    >
      <Controller
        name={name}
        control={control}
        defaultValue={props?.defaultValue ?? ""}
        rules={rules}
        render={({ field: { onChange, ref, value } }) => (
          <TextField
            onChange={onChange}
            ref={ref}
            type={type}
            value={value}
            label={label}
            fullWidth
            size="small"
            error={!!errors?.[name]}
            autoComplete="off"
            helperText={
              errors?.[name]
                ? errors?.[name].message
                : props.defaultHelperText ?? props.defaultHelperText ?? ""
            }
            disabled={isDisabled}
          />
        )}
      />
    </FormControl>
  );
};

export default F_Input;
