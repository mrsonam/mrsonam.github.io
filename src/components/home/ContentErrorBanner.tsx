type Props = {
  message: string | null;
};

export function ContentErrorBanner({ message }: Props) {
  if (!message) return null;
  return (
    <div
      role="alert"
      className="w-full bg-destructive/10 border-b border-destructive/30 text-destructive text-center text-sm py-3 px-4"
    >
      {message}
    </div>
  );
}
