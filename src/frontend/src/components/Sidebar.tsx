import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { useLocation } from "@tanstack/react-router";
import {
  Building2,
  LayoutDashboard,
  Settings,
  TrendingUp,
  Users,
} from "lucide-react";

const navItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
    ocid: "sidebar.nav.dashboard",
  },
  {
    title: "Employees",
    href: "/employees",
    icon: Users,
    ocid: "sidebar.nav.employees",
  },
  {
    title: "Performance",
    href: "/performance",
    icon: TrendingUp,
    ocid: "sidebar.nav.performance",
  },
  {
    title: "Departments",
    href: "/departments",
    icon: Building2,
    ocid: "sidebar.nav.departments",
  },
];

export function Sidebar() {
  const location = useLocation({ select: (s) => s.pathname });

  return (
    <div className="flex h-full flex-col border-r bg-sidebar">
      <div className="flex h-14 items-center border-b px-4">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
            <LayoutDashboard className="size-4 text-primary-foreground" />
          </div>
          <span className="font-display font-semibold text-sidebar-foreground">
            PerfDash
          </span>
        </div>
      </div>

      <nav className="flex-1 overflow-auto py-4 px-3">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  data-ocid={item.ocid}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-smooth",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  )}
                >
                  <item.icon className="size-4" />
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t p-4">
        <button
          type="button"
          data-ocid="sidebar.nav.settings"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-smooth w-full text-left"
        >
          <Settings className="size-4" />
          Settings
        </button>
      </div>
    </div>
  );
}
