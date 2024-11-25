export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-full bg-slate-100">{children}</div>;
}
