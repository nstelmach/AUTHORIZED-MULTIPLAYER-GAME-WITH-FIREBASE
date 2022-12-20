import React from "react";
import classes from "./Button.module.css";
import { RotatingLines } from "react-loader-spinner";

export type ButtonProps = {
  text: string;
  className: string;
  type: "button" | "submit" | "reset" | undefined;
  disabled: boolean;
  onClick?: () => void;
  isLoading?: boolean;
};

function Button({
  text,
  className,
  type,
  disabled,
  onClick,
  isLoading,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`${classes.button} ${className}`}
      onClick={onClick}
    >
      {isLoading ? <RotatingLines strokeColor="#edcd5a" width="30" /> : text}
    </button>
  );
}

export default Button;
