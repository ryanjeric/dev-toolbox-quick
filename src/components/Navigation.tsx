import { Link, useLocation } from "react-router-dom";
import { 
  FileJson, 
  Table, 
  Link as LinkIcon, 
  FileKey,
  Hash,
  Clock,
  Type,
  Home,
  Image
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigationItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "JSON", path: "/json", icon: FileJson },
  { name: "CSV ⇄ JSON", path: "/csv-json", icon: Table },
  { name: "URL", path: "/url", icon: LinkIcon },
  { name: "Base64", path: "/base64", icon: FileKey },
  { name: "UUID", path: "/uuid", icon: Hash },
  { name: "Timestamp", path: "/timestamp", icon: Clock },
  { name: "Text Case", path: "/text-case", icon: Type },
  { name: "Image Editor", path: "/image-editor", icon: Image },
];

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="bg-white border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Dev Toolbox
          </Link>
          
          <div className="hidden md:flex space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blue-100 text-blue-700"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </div>
          
          {/* Mobile menu button - simplified for now */}
          <div className="md:hidden">
            <select 
              value={location.pathname} 
              onChange={(e) => window.location.href = e.target.value}
              className="px-3 py-1 border border-slate-300 rounded-md text-sm"
            >
              {navigationItems.map((item) => (
                <option key={item.path} value={item.path}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
