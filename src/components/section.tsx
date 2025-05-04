interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export function Section({ title, children }: SectionProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold text-slate-800">{title}</h2>
      <div className="pl-4 border-l-4 border-blue-200">{children}</div>
    </div>
  );
}
