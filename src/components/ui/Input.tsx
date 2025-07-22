import type { ReactNode } from "react";

type InputProps = {
  type: string;
  name: string;
  htmlFor: string;
  label: ReactNode;
  value: string;
  placeholder: string;
  error: string;
  onChange: () => {};
};

export default function Input({
  type = "text",
  name,
  label,
  value,
  placeholder,
  onChange,
  error,
  props,
}: InputProps) {
  return (
    <div className="flex gap-2 items-center justify-center">
      <label
        className="rounded-xl overflow-hidden text-sm p-1 bg-neutral-100 text-neutral-950"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        className="flex-auto tracking-wide px-1 outline-none bg-transparent border-b-[.5px]"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...props}
      />
      <p>{error}</p>
    </div>
  );
}
