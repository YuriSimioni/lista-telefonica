"use client";

import { Input } from "@/components/ui/input";
import * as React from "react";
import { PatternFormat, PatternFormatProps } from "react-number-format";

interface PhoneInputProps extends Omit<
  React.ComponentProps<typeof Input>,
  "onChange" | "value"
> {
  value?: string;
  onChange?: (value: string) => void;
}

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ value = "", onChange, ...props }, ref) => {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
      setMounted(true);
    }, []);

    const { ...cleanProps } = props;

    if (!mounted) {
      return <Input {...props} type="tel" ref={ref} />;
    }

    return (
      <PatternFormat
        {...(cleanProps as PatternFormatProps)}
        format="(##) #####-####"
        mask=""
        value={value}
        onValueChange={(values) => {
          onChange?.(values.value);
        }}
        customInput={
          Input as React.ComponentType<
            React.InputHTMLAttributes<HTMLInputElement>
          >
        }
        getInputRef={ref}
        type="tel"
      />
    );
  },
);

PhoneInput.displayName = "PhoneInput";
