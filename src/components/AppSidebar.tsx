
import { NavLink, useLocation } from "react-router-dom";
import { 
  FileJson, 
  Table, 
  Link as LinkIcon, 
  FileKey,
  Hash,
  Clock,
  Type,
  Home,
  Search,
  Wand2,
  Palette,
  GitCompare
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navigationItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "JSON", path: "/json", icon: FileJson },
  { name: "CSV ⇄ JSON", path: "/csv-json", icon: Table },
  { name: "URL", path: "/url", icon: LinkIcon },
  { name: "Base64", path: "/base64", icon: FileKey },
  { name: "UUID", path: "/uuid", icon: Hash },
  { name: "Timestamp", path: "/timestamp", icon: Clock },
  { name: "Text Case", path: "/text-case", icon: Type },
  { name: "Regex Tester", path: "/regex", icon: Search },
  { name: "JSON Beautifier", path: "/json-beautifier", icon: Wand2 },
  { name: "Color Converter", path: "/color-converter", icon: Palette },
  { name: "Diff Checker", path: "/diff-checker", icon: GitCompare },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center justify-between px-2 py-2">
          <NavLink to="/" className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Dev Toolbox
          </NavLink>
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <NavLink to={item.path} className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
