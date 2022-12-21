import React from "react";
import classes from "./Input.module.css";

export type InputProps = {
  className: string;
  placeholder: string;
  type: string;
  id: string;
  required: boolean;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, placeholder, type, id, required }, ref) => {
    return (
      <input
        className={`${classes.input} ${className}`}
        id={id}
        placeholder={placeholder}
        type={type}
        required={required}
        ref={ref}
      />
    );
  }
);

export default Input;
