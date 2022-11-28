import React from "react";
import classes from "./Button.module.css";

export type ButtonProps = {
  text: string;
  className: string;
  type: "button" | "submit" | "reset" | undefined;
  disabled: boolean;
  onClick?: () => void;
};

function Button({ text, className, type, disabled, onClick }: ButtonProps) {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`${classes.button} ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
