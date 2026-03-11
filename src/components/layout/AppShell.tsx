/** Main app layout - sidebar, header, content area */
export function AppShell({ children }: { children: React.ReactNode }) {
  return <div className="min-h-svh">{children}</div>
}
