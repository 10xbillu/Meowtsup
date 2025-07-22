function Button({
  type = "button",
  value,
  className,
}: {
  type: "submit" | "reset" | "button" | undefined;
  value: string;
  className?: string;
}) {
  return (
    <button
      type={type}
      className={`w-full bg-fuchsia-800 hover:bg-fuchsia-700 py-1 font-semibold text-neutral-100 rounded-3xl ${className}`}
    >
      {value}
    </button>
  );
}

export default Button;
