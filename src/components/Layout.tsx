import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { 
  Home, 
  GraduationCap, 
  HeartPulse, 
  Newspaper, 
  Calendar, 
  ShieldCheck, 
  HeadphonesIcon, 
  ExternalLink,
  BarChart2,
  MessageSquare,
  Search,
  Menu,
  LogOut
} from "lucide-react";
import { cn } from "../lib/utils";

const navItems = [
  { label: "Home", icon: Home, path: "#", inactive: true },
  { label: "Creator Academy", icon: GraduationCap, path: "#", inactive: true },
  { label: "Health & Wellness", icon: HeartPulse, path: "#", inactive: true },
  { label: "News & Updates", icon: Newspaper, path: "#", inactive: true },
  { label: "Events", icon: Calendar, path: "#", inactive: true },
  { label: "Guidelines & Safety", icon: ShieldCheck, path: "#", inactive: true },
  { label: "Support", icon: HeadphonesIcon, path: "#", inactive: true },
  { label: "Back to CB", icon: ExternalLink, path: "#", inactive: true },
];

const customItems = [
  { label: "Analytics", icon: BarChart2, path: "/analytics" },
  { label: "Chat with Data", icon: MessageSquare, path: "/chat" },
];

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <div className="flex flex-col h-full bg-gray-50/30">
      {/* Top Navigation */}
      <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-gray-200 shrink-0">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            title="Toggle Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="bg-orange-500 text-white font-bold p-1 rounded">CB</div>
            <span className={cn("font-bold text-gray-900 tracking-tight leading-none text-lg transition-opacity duration-300", isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100 hidden sm:block")}>
              CREATOR<br/>COMMUNITY
            </span>
          </div>
        </div>
        <div className="flex-1 max-w-2xl px-4 sm:px-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search in CB Creator Community" 
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border-transparent rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
            />
          </div>
        </div>
        <div className="w-8 sm:w-24"></div> {/* Spacer for symmetry */}
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar Navigation */}
        <aside className={cn(
          "bg-white border-r border-gray-200 flex flex-col pt-6 overflow-y-auto transition-all duration-300 z-10 shrink-0",
          isCollapsed ? "w-[72px]" : "w-64 absolute md:relative h-full"
        )}>
          <nav className="flex-1 px-3 space-y-1 text-sm font-medium">
            {navItems.map((item) => (
              <div
                key={item.label}
                className={cn(
                  "flex items-center gap-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors cursor-not-allowed",
                  isCollapsed ? "px-0 justify-center" : "px-3"
                )}
                title={isCollapsed ? item.label : "Not implemented in demo"}
              >
                <item.icon className="h-5 w-5 text-gray-400 shrink-0" strokeWidth={1.5} />
                {!isCollapsed && <span>{item.label}</span>}
              </div>
            ))}
            
            <div className="my-4 border-t border-gray-100" />
            
            {!isCollapsed && (
              <div className="px-3 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Data Tools
              </div>
            )}
            {customItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  title={isCollapsed ? item.label : undefined}
                  className={cn(
                    "flex items-center gap-3 py-2.5 rounded-lg transition-colors",
                    isActive 
                      ? "bg-blue-50 text-blue-700" 
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    isCollapsed ? "px-0 justify-center" : "px-3"
                  )}
                >
                  <item.icon 
                    className={cn(
                      "h-5 w-5 shrink-0", 
                      isActive ? "text-blue-700" : "text-gray-400"
                    )} 
                    strokeWidth={1.5} 
                  />
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </nav>

          <div className="p-3 border-t border-gray-200">
            <button
              onClick={handleLogout}
              title={isCollapsed ? "Logout" : undefined}
              className={cn(
                "w-full flex items-center gap-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors cursor-pointer",
                isCollapsed ? "px-0 justify-center" : "px-3"
              )}
            >
              <LogOut className="h-5 w-5 shrink-0" strokeWidth={1.5} />
              {!isCollapsed && <span>Logout</span>}
            </button>
          </div>
        </aside>

        {/* Overlay for mobile when sidebar is open */}
        {!isCollapsed && (
          <div 
            className="md:hidden absolute inset-0 bg-black/20 z-0 cursor-pointer" 
            onClick={() => setIsCollapsed(true)}
            title="Close sidebar"
          />
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto bg-gray-50 h-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
