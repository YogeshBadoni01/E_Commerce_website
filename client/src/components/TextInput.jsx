import { CloseRounded, Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState ,useEffect} from "react";

const 
TextInput = ({
  label,
  placeholder,
  name,
  value,
  error,
  handelChange,
  textArea,
  rows,
  cols,
  chipableInput,
  chipableArray,
  removeChip,
  height,
  small,
  popup,
  password,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`flex w-full flex-col gap-1 ${small ? "text-[8px]" : "text-[12px]"}`}>
      {/* Label */}
      <label
        className={`px-1 ${error ? "text-red-500" : popup ? "text-gray-500" : "text-theme-primary"} 
          ${small ? "text-[8px]" : "text-[12px]"}`}
      >
        {label}
      </label>

      {/* Outlined Input Container */}
      <div
        className={`rounded-lg border-[0.5px] ${
          error ? "border-red-500" : popup ? "border-gray-400" : "border-gray-500"
        } bg-transparent px-4 py-2 flex items-center gap-3 focus-within:border-theme-secondary 
          ${small ? "rounded-md px-2 py-1" : "rounded-lg px-4 py-2"} ${
          chipableInput ? "flex-col items-start gap-2 min-h-[height]" : ""
        }`}
      >
        {chipableInput ? (
          <div className="flex flex-wrap gap-2">
            {/* Chips */}
            {chipableArray.map((chip, index) => (
              <div
                key={index}
                className="px-2 py-1 rounded-lg bg-blue-100 text-theme-primary flex items-center gap-2 cursor-pointer transition-all duration-300"
              >
                <span>{chip}</span>
                <CloseRounded
                  className="text-[14px] cursor-pointer"
                  onClick={() => removeChip(name, index)}
                />
              </div>
            ))}

            {/* Input Field */}
            <input
              className="w-full bg-transparent border-none outline-none text-theme-primary text-[14px]"
              placeholder={placeholder}
              name={name}
              value={value}
              onChange={(e) => handelChange(e)}
            />
          </div>
        ) : (
          <>
            {/* Input Field */}
            <input
              className={`w-full bg-transparent border-none outline-none ${
                popup ? "text-gray-500" : "text-theme-primary"
              } ${small ? "text-[12px]" : "text-[14px]"}`}
              as={textArea ? "textarea" : "input"}
              rows={rows}
              cols={cols}
              placeholder={placeholder}
              name={name}
              value={value}
              onChange={(e) => handelChange(e)}
              type={password && !showPassword ? "password" : "text"}
            />

            {/* Password Toggle */}
            {password && (
              <>
                {showPassword ? (
                  <Visibility
                    className="cursor-pointer"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <VisibilityOff
                    className="cursor-pointer"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p className={`text-red-500 ${small ? "text-[8px]" : "text-[12px]"} px-1`}>
          {error}
        </p>
      )}
    </div>
  );
};

export default TextInput;
