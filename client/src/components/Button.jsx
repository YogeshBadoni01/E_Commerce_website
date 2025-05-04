import { CircularProgress } from "@mui/material";
import React from "react";

const Button = ({
  text,
  isLoading,
  isDisabled,
  rightIcon,
  leftIcon,
  type,
  onClick,
  flex,
  small,
  outlined,
  full,
}) => {
  const baseClasses = `
    rounded-lg text-white text-sm cursor-pointer transition-all duration-300
    flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(0,0,0,0.3)]
    border focus:outline-none h-[50px]
  `;
  const typeClasses =
    type === "secondary"
      ? "bg-theme-secondary border-theme-secondary"
      : "bg-theme-primary border-theme-primary";
  const disabledClasses = isDisabled || isLoading ? "opacity-80 cursor-not-allowed" : "";
  const sizeClasses = small ? "px-3 py-2" : "px-6 py-4";
  const flexClasses = flex ? "flex-1" : "inline-flex";
  const outlinedClasses = outlined ? "bg-theme-transparent text-theme-primary shadow-none border-theme-primary" : "";
  const fullClasses = full ? "w-full" : "";
  const responsiveClasses = "md:px-3 md:py-2";

  const buttonClasses = [
    baseClasses,
    typeClasses,
    disabledClasses,
    sizeClasses,
    flexClasses,
    outlinedClasses,
    fullClasses,
    responsiveClasses,
  ].join(" ");

  return (
    <button
      className={buttonClasses}
      onClick={() => !isDisabled && !isLoading && onClick()}
      disabled={isDisabled || isLoading}
    >
      {isLoading && (
        <CircularProgress
          style={{ width: "18px", height: "18px", color: "inherit" }}
        />
      )}
      {leftIcon}
      {text}
      {isLoading && <> . . .</>}
      {rightIcon}
    </button>
  );
};

export default Button;
