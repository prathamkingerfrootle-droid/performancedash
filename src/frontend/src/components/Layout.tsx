import { useIsMobile } from "@/hooks/use-mobile";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const isMobile = useIsMobile();

  return (
    <div className="flex min-h-screen bg-background">
      {!isMobile && (
        <aside className="w-64 shrink-0 hidden md:block">
          <div className="fixed inset-y-0 left-0 w-64">
            <Sidebar />
          </div>
        </aside>
      )}

      <div className="flex flex-1 flex-col min-w-0">
        <Header />
        <main className="flex-1 p-4 lg:p-6 overflow-auto">{children}</main>
        <footer className="border-t bg-muted/40 py-4 px-4 lg:px-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>© {new Date().getFullYear()} PerfDash</span>
            <a
              href="https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=perfdash"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-smooth"
            >
              Built with love using caffeine.ai
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
