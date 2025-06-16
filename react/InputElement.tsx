import React from "react";

export interface InputElementProps {
  labelText: string;
  inputType: string;
  inputPlaceholder?: string;
  setValue: (val: string) => void;
  value: string;
  className?: string;
}

export function InputElement(props: InputElementProps) {
  const { labelText, inputType, inputPlaceholder, setValue, value, className } =
    props;
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <label>{labelText}</label>
      {inputType === "textarea" && (
        <textarea
          onChange={handleChange}
          value={value}
          placholder={inputPlaceholder ?? ""}
          className={className}
        ></textarea>
      )}
      {inputType !== "textarea" && (
        <input
          onChange={handleChange}
          type={inputType}
          value={value}
          placholder={inputPlaceholder ?? ""}
          className={className}
        />
      )}
    </div>
  );
}
