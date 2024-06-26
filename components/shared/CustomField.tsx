import React from "react";
import { Control } from "react-hook-form";
import { z } from "zod";

import { FormField, FormItem, FormControl, FormMessage, FormLabel } from "../ui/form";
import { formSchema } from "./TransformationForm";

type CustomFieldProps = {  //Type definition
  control: Control<z.infer<typeof formSchema>> | undefined;
  render: (props: { field: any }) => React.ReactNode;   //returns a React node to render the form control.
  name: keyof z.infer<typeof formSchema>;
  formLabel?: string;
  className?: string;
};

export const CustomField = ({
  control,
  render,
  name,
  formLabel,
  className,
}: CustomFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {formLabel && <FormLabel>{formLabel}</FormLabel>}
          {/* Render the actual form control using the provided `render` function, passing the `field` object. */}
          <FormControl>{render({ field })}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};