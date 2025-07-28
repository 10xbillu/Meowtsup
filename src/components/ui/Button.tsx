function Button({
  type = "button",
  value,
  className,
  disabled = false,
}: {
  type: "submit" | "reset" | "button" | undefined;
  value: string;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`w-full bg-fuchsia-800 hover:bg-fuchsia-700 py-1 font-semibold text-neutral-100 rounded-3xl ${className}`}
    >
      {value}
    </button>
  );
}

export default Button;
