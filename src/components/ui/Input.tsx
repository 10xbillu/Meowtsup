import { CircleAlert } from "lucide-react";
import { forwardRef, type ReactNode } from "react";

type InputProps = {
  id: string;
  type: string;
  label: ReactNode;
  placeholder: string;
  error: string;
  required?: boolean;
};

export const Input = forwardRef(
  (
    {
      id,
      type = "text",
      label,
      placeholder,
      required = false,
      error,
      ...props
    }: InputProps,
    ref
  ) => {
    return (
      <div>
        <div className="flex gap-2 items-center justify-center">
          <label
            htmlFor={id}
            className="rounded-xl overflow-hidden text-sm p-1 bg-neutral-100 text-neutral-950"
          >
            {label}
          </label>
          <input
            className="flex-auto tracking-wide px-1 outline-none bg-transparent border-b-[.5px]"
            id={id}
            type={type}
            placeholder={placeholder}
            ref={ref}
            {...props}
            required={required}
          />
        </div>
        {error && (
          <p className="text-red-500 flex gap-2 mt-2 items-center justify-center">
            <CircleAlert size={"20px"} />
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
