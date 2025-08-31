export function Avatar({ value }: { value: string }) {
  return (
    <div className="w-10 h-10 flex items-center justify-center bg-neutral-600 rounded-full text-white font-semibold text-lg">
      {value}
    </div>
  );
}

