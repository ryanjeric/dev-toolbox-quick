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
  GitCompare,
  Eye,
  Filter,
  Calculator,
  Eraser,
  Percent,
  Scissors,
  Code,
  SquareStack,
  Ruler,
  Dice6,
  Globe,
  Info,
  Paintbrush,
  Smartphone,
  ArrowUpWideNarrow,
  EyeOff,
  Monitor,
  Image,
  Replace,
  Star,
  MapPin,
  LucideIcon
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
  useSidebar,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from 'react';
import { useFavorites } from "@/hooks/useFavorites";
import { Button } from "@/components/ui/button";

interface NavigationItem {
  name: string;
  path: string;
  icon: LucideIcon;
}

const categorizedNavigationItems: { category: string; items: NavigationItem[] }[] = [
  {
    category: "General",
    items: [
      { name: "Home", path: "/", icon: Home },
    ]
  },
  {
    category: "Calculators",
    items: [
      { name: "Basic Calculator", path: "/calculator", icon: Calculator },
      { name: "Percent-off Calculator", path: "/percent-off-calculator", icon: Percent },
      { name: "Basic Percentage Calculator", path: "/percentage-calculator", icon: Code },
      { name: "Unit Converter", path: "/unit-converter", icon: Ruler },
      { name: "Working Days Calculator", path: "/working-days-calculator", icon: Calculator },
      { name: "Ratio Calculator", path: "/ratio-calculator", icon: Calculator }
    ]
  },
  {
    category: "Location Tools",
    items: [
      { name: "Postcode Lookup", path: "/postcode-lookup", icon: MapPin },
    ]
  },
  {
    category: "Text Tools",
    items: [
      { name: "Text Case", path: "/text-case", icon: Type },
      { name: "Character Counter", path: "/character-counter", icon: Calculator },
      { name: "Whitespace Cleaner", path: "/whitespace-cleaner", icon: Eraser },
      { name: "Duplicate Line Remover", path: "/duplicate-line-remover", icon: Filter },
      { name: "Prompt Splitter", path: "/prompt-splitter", icon: Scissors },
      { name: "Lorem Ipsum Generator", path: "/lorem-ipsum-generator", icon: Type },
      { name: "Text Diff Highlighter", path: "/text-diff-highlighter", icon: GitCompare },
      { name: "Tab to Space Converter", path: "/tab-space-converter", icon: Code },
      { name: "Text Sorter", path: "/text-sorter", icon: ArrowUpWideNarrow },
      { name: "Text Replacer", path: "/text-replacer", icon: Replace }
    ]
  },
  {
    category: "Data Tools",
    items: [
      { name: "JSON", path: "/json", icon: FileJson },
      { name: "JSON Beautifier", path: "/json-beautifier", icon: Wand2 },
      { name: "CSV ⇄ JSON", path: "/csv-json", icon: Table },
      { name: "CSV Table Viewer", path: "/csv-table-viewer", icon: Table },
      { name: "Base64", path: "/base64", icon: FileKey },
      { name: "Base64 File Converter", path: "/base64-file-converter", icon: FileKey },
      { name: "JSON Validator", path: "/json-validator", icon: FileJson },
      { name: "Image Converter", path: "/image-converter", icon: Image },
    ]
  },
  {
    category: "Web Tools",
    items: [
      { name: "URL Parser", path: "/url-parser", icon: LinkIcon },
      { name: "URL Encoder/Decoder", path: "/url", icon: LinkIcon },
      { name: "SVG URL Encoder", path: "/svg-url-encoder", icon: Code },
      { name: "HTTP Status Code Explainer", path: "/http-status-code-explainer", icon: Info },
      { name: "Responsive Image Tester", path: "/responsive-image-tester", icon: Smartphone },
      { name: "BigCommerce Status", path: "/bigcommerce-status", icon: Globe },
      { name: "Shopify Status", path: "/shopify-status", icon: Globe }
    ]
  },
  {
    category: "Design Tools",
    items: [
      { name: "Color Converter", path: "/color-converter", icon: Palette },
      { name: "Color Picker", path: "/color-picker", icon: Palette },
      { name: "Color Name", path: "/color-name", icon: Eye },
      
      { name: "Color Blindness Simulator", path: "/color-blindness-simulator", icon: EyeOff },
      { name: "Screen DPI Calculator", path: "/screen-dpi-calculator", icon: Monitor },
      { name: "Image Editor", path: "/image-editor", icon: Image },
      { name: "Image Resizer", path: "/image-resizer", icon: Image }
    ]
  },
  {
    category: "CSS Generators",
    items: [
      { name: "Layout Grid Generator", path: "/layout-grid-generator", icon: SquareStack },
      { name: "CSS Gradient Generator", path: "/css-gradient-generator", icon: Paintbrush },
      { name: "Box Shadow Generator", path: "/box-shadow-generator", icon: SquareStack },
      { name: "CSS Unit Converter", path: "/css-unit-converter", icon: Ruler },
      { name: "Border Radius Generator", path: "/border-radius-generator", icon: SquareStack },
      { name: "SVG Cleaner", path: "/svg-cleaner", icon: Wand2 },
      { name: "Custom Scrollbar Generator", path: "/scrollbar-generator", icon: SquareStack },
      { name: "CSS Button Generator", path: "/button-generator", icon: SquareStack },
      { name: "CSS Loader Generator", path: "/loader-generator", icon: SquareStack },
      { name: "Accordion/Toggle Generator", path: "/accordion-generator", icon: SquareStack },
      { name: "Skeleton Loader Generator", path: "/skeleton-loader-generator", icon: SquareStack }
    ]
  },
  {
    category: "Development Tools",
    items: [
      { name: "Regex Tester", path: "/regex", icon: Search },
      { name: "Diff Checker", path: "/diff-checker", icon: GitCompare },
      { name: "UUID Generator", path: "/uuid", icon: Hash },
      { name: "Password Strength Checker", path: "/password-strength-checker", icon: FileKey },
      { name: "Checkbox/Radio Generator", path: "/checkbox-radio-generator", icon: SquareStack },
      { name: "Developer Excuse Generator", path: "/developer-excuse-generator", icon: Dice6 }
    ]
  },
  {
    category: "Time & Date",
    items: [
      { name: "Timestamp Converter", path: "/timestamp", icon: Clock },
      { name: "TimeZone Converter", path: "/timezone-converter", icon: Globe },
      { name: "Cron Job Generator", path: "/cron-job-generator", icon: Clock },
      { name: "Date Difference Calculator", path: "/date-difference-calculator", icon: Clock },
      { name: "Cron Expression Visualizer", path: "/cron-expression-visualizer", icon: Clock }
    ]
  }
];

const iconMap: { [key: string]: LucideIcon } = {
  FileJson,
  Table,
  LinkIcon,
  FileKey,
  Hash,
  Clock,
  Type,
  Home,
  Search,
  Wand2,
  Palette,
  GitCompare,
  Eye,
  Filter,
  Calculator,
  Eraser,
  Percent,
  Scissors,
  Code,
  SquareStack,
  Ruler,
  Dice6,
  Globe,
  Info,
  Paintbrush,
  Smartphone,
  ArrowUpWideNarrow,
  EyeOff,
  Monitor,
  Image,
  Replace,
  Star,
  MapPin
};

export function AppSidebar() {
  const location = useLocation();
  const { state } = useSidebar();
  const [searchTerm, setSearchTerm] = useState('');
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();

  const filteredNavigationItems = useMemo(() => {
    if (!searchTerm) {
      return categorizedNavigationItems;
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return categorizedNavigationItems.map(categoryGroup => ({
      ...categoryGroup,
      items: categoryGroup.items.filter(item => 
        item.name.toLowerCase().includes(lowerCaseSearchTerm)
      )
    })).filter(categoryGroup => categoryGroup.items.length > 0);
  }, [searchTerm]);

  const handleFavoriteClick = (item: { name: string; path: string; icon?: LucideIcon, iconName?: string }) => {
    if (isFavorite(item.path)) {
      removeFavorite(item.path);
    } else {
      const navItem = categorizedNavigationItems.flatMap(cat => cat.items).find(nav => nav.path === item.path);
      if (navItem) {
        addFavorite(navItem as any);
      }
    }
  };

  return (
    <Sidebar collapsible="icon" className="flex flex-col">
      <SidebarHeader className="border-b border-sidebar-border flex-shrink-0">
        <div className={`flex items-center px-2 py-2 ${state === 'collapsed' ? 'justify-center' : 'justify-between'}`}>
          {state === 'expanded' && (
            <NavLink to="/" className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Dev Toolbox
            </NavLink>
          )}
          <SidebarTrigger />
        </div>
         {state === 'expanded' && (
          <div className="px-2 pb-2">
            <Input 
              placeholder="Quick search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
        )}
      </SidebarHeader>

      {state === 'expanded' && (
        <SidebarContent className="flex-1 overflow-y-auto">
          {favorites.length > 0 && (
            <SidebarGroup>
              <SidebarGroupLabel>Favorites</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {favorites.map((item) => {
                    const isActive = location.pathname === item.path;
                    
                    return (
                      <SidebarMenuItem key={item.path} className="group">
                        <SidebarMenuButton asChild isActive={isActive}>
                          <div className="flex items-center justify-between w-full">
                            <NavLink to={item.path} className="flex items-center gap-2 flex-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                              <span>{item.name}</span>
                            </NavLink>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={(e) => {
                                e.preventDefault();
                                handleFavoriteClick(item);
                              }}
                            >
                              <Star
                                className={`h-4 w-4 ${
                                  isFavorite(item.path)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-muted-foreground"
                                }`}
                              />
                            </Button>
                          </div>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}

          {filteredNavigationItems.map((categoryGroup) => (
            <SidebarGroup key={categoryGroup.category}>
              <SidebarGroupLabel>{categoryGroup.category}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {categoryGroup.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    
                    return (
                      <SidebarMenuItem key={item.path} className="group">
                        <SidebarMenuButton asChild isActive={isActive}>
                          <div className="flex items-center justify-between w-full">
                            <NavLink to={item.path} className="flex items-center gap-2 flex-1">
                              <Icon className="h-4 w-4" />
                              <span>{item.name}</span>
                            </NavLink>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={(e) => {
                                e.preventDefault();
                                handleFavoriteClick(item);
                              }}
                            >
                              <Star
                                className={`h-4 w-4 ${
                                  isFavorite(item.path)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-muted-foreground"
                                }`}
                              />
                            </Button>
                          </div>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
      )}
    </Sidebar>
  );
}
