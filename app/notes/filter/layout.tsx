export default function FilterLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', gap: '2rem' }}>
      {sidebar}
      {children}
    </div>
  );
}
