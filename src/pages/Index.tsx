import { Link } from "react-router-dom";
import { 
  FileJson, 
  Table, 
  Link as LinkIcon, 
  FileKey,
  Hash,
  Clock,
  Type,
  ArrowRight,
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
  Home,
  Code,
  SquareStack,
  Ruler,
  Info,
  Smartphone,
  Paintbrush,
  Globe,
  Dice6,
  Wrench,
  ArrowUpWideNarrow,
  EyeOff,
  Monitor,
  Image,
  Replace,
  Star,
  MapPin,
  LucideIcon
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from 'react';
import { useFavorites } from "@/hooks/useFavorites";

const categorizedTools = [
  {
    category: "Calculators",
    items: [
      { name: "Basic Calculator", description: "Perform basic calculations", path: "/calculator", icon: Calculator, color: "from-green-500 to-green-600" },
      { name: "Percent-off Calculator", description: "Calculate the final price after a discount", path: "/percent-off-calculator", icon: Percent, color: "from-yellow-500 to-yellow-600" },
      { name: "Basic Percentage Calculator", description: "Perform basic percentage calculations", path: "/percentage-calculator", icon: Calculator, color: "from-green-500 to-green-600" },
      { name: "Unit Converter", description: "Convert between different units of measurement", path: "/unit-converter", icon: Ruler, color: "from-yellow-500 to-yellow-600" },
      { name: "Working Days Calculator", description: "Calculate working days excluding weekends and holidays", path: "/working-days-calculator", icon: Calculator, color: "from-green-500 to-green-600" },
      { name: "Ratio Calculator", description: "Simplify or compare two ratios", path: "/ratio-calculator", icon: Calculator, color: "from-teal-500 to-teal-600" }
    ]
  },
  {
    category: "Location Tools",
    items: [
      { name: "Postcode Lookup", description: "Look up postcodes for New Zealand and Australia", path: "/postcode-lookup", icon: MapPin, color: "from-blue-500 to-blue-600" }
    ]
  },
  {
    category: "Text Tools",
    items: [
      { name: "Text Case", description: "Convert text to different cases", path: "/text-case", icon: Type, color: "from-blue-500 to-blue-600" },
      { name: "Character Counter", description: "Count characters, words, and lines", path: "/character-counter", icon: Calculator, color: "from-green-500 to-green-600" },
      { name: "Whitespace Cleaner", description: "Remove extra spaces and normalize text", path: "/whitespace-cleaner", icon: Eraser, color: "from-purple-500 to-purple-600" },
      { name: "Duplicate Line Remover", description: "Remove duplicate lines from text", path: "/duplicate-line-remover", icon: Filter, color: "from-pink-500 to-pink-600" },
      { name: "Prompt Splitter", description: "Split text into smaller chunks", path: "/prompt-splitter", icon: Scissors, color: "from-orange-500 to-orange-600" },
      { name: "Lorem Ipsum Generator", description: "Generate placeholder text", path: "/lorem-ipsum-generator", icon: Type, color: "from-indigo-500 to-indigo-600" },
      { name: "Text Diff Highlighter", description: "Compare and highlight text differences", path: "/text-diff-highlighter", icon: GitCompare, color: "from-red-500 to-red-600" },
      { name: "Tab to Space Converter", description: "Convert tabs to spaces and vice versa", path: "/tab-space-converter", icon: Code, color: "from-yellow-500 to-yellow-600" },
      { name: "Text Sorter", description: "Sort lines alphabetically or numerically", path: "/text-sorter", icon: ArrowUpWideNarrow, color: "from-teal-500 to-teal-600" },
      { name: "Text Replacer", description: "Bulk find and replace text with advanced options", path: "/text-replacer", icon: Replace, color: "from-blue-500 to-blue-600" }
    ]
  },
  {
    category: "Data Tools",
    items: [
      { name: "JSON", description: "Format, validate, and convert JSON ⇄ String", path: "/json", icon: FileJson, color: "from-blue-500 to-blue-600" },
      { name: "JSON Beautifier", description: "Format and beautify JSON code", path: "/json-beautifier", icon: Wand2, color: "from-teal-500 to-teal-600" },
      { name: "CSV ⇄ JSON", description: "Convert between CSV and JSON formats", path: "/csv-json", icon: Table, color: "from-green-500 to-green-600" },
      { name: "CSV Table Viewer", description: "View CSV data as a formatted table", path: "/csv-table-viewer", icon: Table, color: "from-green-500 to-green-600" },
      { name: "Base64", description: "Encode and decode Base64 strings", path: "/base64", icon: FileKey, color: "from-red-500 to-red-600" },
      { name: "Base64 File Converter", description: "Encode and decode files to and from Base64", path: "/base64-file-converter", icon: FileKey, color: "from-red-500 to-red-600" },
      { name: "JSON Validator", description: "Validate and format JSON with detailed error messages", path: "/json-validator", icon: FileJson, color: "from-blue-500 to-blue-600" },
      { name: "Image Converter", description: "Convert images between different formats (JPEG, PNG, WebP)", path: "/image-converter", icon: Image, color: "from-purple-500 to-purple-600" },
    ]
  },
  {
    category: "Web Tools",
    items: [
      { name: "URL Parser", description: "Parse and analyze URL components", path: "/url-parser", icon: LinkIcon, color: "from-purple-500 to-purple-600" },
      { name: "URL Encoder/Decoder", description: "Encode and decode URL strings", path: "/url", icon: LinkIcon, color: "from-purple-500 to-purple-600" },
      { name: "SVG URL Encoder", description: "Convert SVG to URL-encoded format", path: "/svg-url-encoder", icon: Code, color: "from-blue-500 to-blue-600" },
      { name: "HTTP Status Code Explainer", description: "Get detailed explanations of HTTP status codes", path: "/http-status-code-explainer", icon: Info, color: "from-teal-500 to-teal-600" },
      { name: "Responsive Image Tester", description: "Test how images look on different screen sizes", path: "/responsive-image-tester", icon: Smartphone, color: "from-blue-500 to-blue-600" },
      { name: "BigCommerce Status", description: "Check the current status of BigCommerce services", path: "/bigcommerce-status", icon: Globe, color: "from-blue-500 to-blue-600" },
      { name: "Shopify Status", description: "Check the current status of Shopify services", path: "/shopify-status", icon: Globe, color: "from-blue-500 to-blue-600" },
      { name: "Responsive Tester", description: "Preview websites on multiple device sizes in one page", path: "/responsive-tester", icon: Smartphone, color: "from-blue-500 to-blue-600" }
    ]
  },
  {
    category: "Design Tools",
    items: [
      { name: "Color Converter", description: "Convert between HEX, RGB, and HSL formats", path: "/color-converter", icon: Palette, color: "from-cyan-500 to-cyan-600" },
      { name: "Color Picker", description: "Visually select a color and get HEX, RGB, HSL values", path: "/color-picker", icon: Palette, color: "from-cyan-500 to-cyan-600" },
      { name: "Color Name", description: "Find the name of a color from its HEX value", path: "/color-name", icon: Eye, color: "from-purple-500 to-purple-600" },
      { name: "Color Blindness Simulator", description: "Input image or color palette → shows how it looks for different types of color blindness (protanopia, deuteranopia, etc.)", path: "/color-blindness-simulator", icon: EyeOff, color: "from-purple-500 to-purple-600" },
      { name: "Screen DPI Calculator", description: "Calculate screen density, dimensions, and PPI for different devices", path: "/screen-dpi-calculator", icon: Monitor, color: "from-blue-500 to-blue-600" },
      { name: "Image Editor", description: "Edit images with shapes, arrows, text, and free drawing tools", path: "/image-editor", icon: Image, color: "from-purple-500 to-purple-600" },
      { name: "Image Resizer", description: "Resize and optimize images for different devices and platforms", path: "/image-resizer", icon: Image, color: "from-purple-500 to-purple-600" }
    ]
  },
  {
    category: "Development Tools",
    items: [
      { name: "Regex Tester", description: "Test and debug regular expressions", path: "/regex", icon: Search, color: "from-orange-500 to-orange-600" },
      { name: "Diff Checker", description: "Compare text differences side-by-side", path: "/diff-checker", icon: GitCompare, color: "from-violet-500 to-violet-600" },
      { name: "UUID Generator", description: "Generate random UUIDs", path: "/uuid", icon: Hash, color: "from-yellow-500 to-yellow-600" },
      { name: "Password Strength Checker", description: "Check the strength of your passwords", path: "/password-strength-checker", icon: FileKey, color: "from-red-500 to-red-600" },
      { name: "Checkbox/Radio Generator", description: "Generate styled checkbox and radio inputs", path: "/checkbox-radio-generator", icon: SquareStack, color: "from-blue-500 to-blue-600" },
      { name: "Developer Excuse Generator", description: "Generate random developer excuses", path: "/developer-excuse-generator", icon: Dice6, color: "from-purple-500 to-purple-600" }
    ]
  },
  {
    category: "Time & Date",
    items: [
      { name: "Timestamp Converter", description: "Convert between timestamps and dates", path: "/timestamp", icon: Clock, color: "from-indigo-500 to-indigo-600" },
      { name: "TimeZone Converter", description: "Convert times between different timezones", path: "/timezone-converter", icon: Globe, color: "from-indigo-500 to-indigo-600" },
      { name: "Cron Job Generator", description: "Generate cron job expressions", path: "/cron-job-generator", icon: Clock, color: "from-indigo-500 to-indigo-600" },
      { name: "Date Difference Calculator", description: "Calculate the difference between two dates in days, weeks, and months", path: "/date-difference-calculator", icon: Clock, color: "from-indigo-500 to-indigo-600" },
      { name: "Cron Expression Visualizer", description: "Visualize cron expressions and see upcoming execution times", path: "/cron-expression-visualizer", icon: Clock, color: "from-indigo-500 to-indigo-600" }
    ]
  },
  {
    category: "CSS Generators",
    items: [
      { name: "Layout Grid Generator", description: "Generate CSS grid layouts with customizable parameters", path: "/layout-grid-generator", icon: SquareStack, color: "from-purple-500 to-purple-600" },
      { name: "CSS Gradient Generator", description: "Create beautiful CSS gradients with a visual editor", path: "/css-gradient-generator", icon: Paintbrush, color: "from-pink-500 to-pink-600" },
      { name: "Box Shadow Generator", description: "Generate CSS box shadows with a visual editor", path: "/box-shadow-generator", icon: SquareStack, color: "from-purple-500 to-purple-600" },
      { name: "CSS Unit Converter", description: "Convert between different CSS units (px, em, rem, etc.)", path: "/css-unit-converter", icon: Ruler, color: "from-yellow-500 to-yellow-600" },
      { name: "Border Radius Generator", description: "Generate CSS border radius with a visual editor", path: "/border-radius-generator", icon: SquareStack, color: "from-purple-500 to-purple-600" },
      { name: "SVG Cleaner", description: "Clean and optimize SVG code", path: "/svg-cleaner", icon: Wand2, color: "from-teal-500 to-teal-600" },
      { name: "Custom Scrollbar Generator", description: "Generate custom CSS scrollbar styles", path: "/scrollbar-generator", icon: SquareStack, color: "from-purple-500 to-purple-600" },
      { name: "CSS Button Generator", description: "Generate beautiful CSS button styles", path: "/button-generator", icon: SquareStack, color: "from-purple-500 to-purple-600" },
      { name: "CSS Loader Generator", description: "Generate CSS loading animations", path: "/loader-generator", icon: SquareStack, color: "from-purple-500 to-purple-600" },
      { name: "Accordion/Toggle Generator", description: "Generate CSS accordion and toggle components", path: "/accordion-generator", icon: SquareStack, color: "from-purple-500 to-purple-600" },
      { name: "Skeleton Loader Generator", description: "Generate skeleton loading components for cards, lists, etc.", path: "/skeleton-loader-generator", icon: SquareStack, color: "from-purple-500 to-purple-600" }
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
  Star
};

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { favorites } = useFavorites();

  const filteredCategories = useMemo(() => {
    if (!searchTerm) {
      return categorizedTools;
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return categorizedTools.map(categoryGroup => ({
      ...categoryGroup,
      items: categoryGroup.items.filter(tool => 
        tool.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        tool.description.toLowerCase().includes(lowerCaseSearchTerm)
      )
    })).filter(categoryGroup => categoryGroup.items.length > 0);
  }, [searchTerm]);

  const favoriteTools = useMemo(() => {
    return favorites.map(fav => {
      const tool = categorizedTools
        .flatMap(cat => cat.items)
        .find(item => item.path === fav.path);
      return tool || { 
        ...fav, 
        description: "", 
        color: "from-gray-500 to-gray-600",
        icon: iconMap[fav.iconName] || Home
      };
    });
  }, [favorites]);

  const renderToolCard = (tool: any) => {
    const Icon = tool.icon;
    return (
      <Link key={tool.path} to={tool.path}>
        <Card className="h-full hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer group dark:bg-slate-800 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-slate-900 dark:text-slate-100">
              <div className={`p-2 rounded-lg bg-gradient-to-r ${tool.color} text-white`}>
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-lg">{tool.name}</span>
              <ArrowRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 dark:text-slate-400">{tool.description}</p>
          </CardContent>
        </Card>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Dev Toolbox
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto mb-6">
            Instant converters and utilities for developers. Fast, clean, and completely client-side.
          </p>
          <div className="max-w-md mx-auto">
            <Input 
              placeholder="Quick search tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        {/* Tools Grid */}
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Favorites Section */}
          {favoriteTools.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                Favorites
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {favoriteTools.map(renderToolCard)}
              </div>
            </div>
          )}

          {/* Other Categories */}
          {filteredCategories.map((categoryGroup) => (
            <div key={categoryGroup.category}>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100">{categoryGroup.category}</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {categoryGroup.items.map(renderToolCard)}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 space-y-2">
          <p className="text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1">
            <Wrench className="inline-block h-4 w-4 mr-1" />
            All processing happens in your browser. No data is stored or transmitted.
          </p>
          <p className="text-slate-500 dark:text-slate-400">
            Developed by{" "}
            <a 
              href="#"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              MR - Rai
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
