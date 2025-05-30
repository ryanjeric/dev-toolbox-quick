
import { Link } from "react-router-dom";
import { 
  FileJson, 
  Table, 
  Link as LinkIcon, 
  FileKey,
  Hash,
  Clock,
  Type,
  ArrowRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const tools = [
  {
    name: "JSON Converter",
    description: "Format, validate, and convert JSON ⇄ String",
    path: "/json",
    icon: FileJson,
    color: "from-blue-500 to-blue-600"
  },
  {
    name: "CSV ⇄ JSON",
    description: "Convert between CSV and JSON formats",
    path: "/csv-json",
    icon: Table,
    color: "from-green-500 to-green-600"
  },
  {
    name: "URL Converter",
    description: "Encode and decode URL strings",
    path: "/url",
    icon: LinkIcon,
    color: "from-purple-500 to-purple-600"
  },
  {
    name: "Base64 Converter",
    description: "Encode and decode Base64 strings",
    path: "/base64",
    icon: FileKey,
    color: "from-red-500 to-red-600"
  },
  {
    name: "UUID Generator",
    description: "Generate unique identifiers instantly",
    path: "/uuid",
    icon: Hash,
    color: "from-yellow-500 to-yellow-600"
  },
  {
    name: "Timestamp Converter",
    description: "Convert between UNIX timestamps and human dates",
    path: "/timestamp",
    icon: Clock,
    color: "from-indigo-500 to-indigo-600"
  },
  {
    name: "Text Case Converter",
    description: "Convert between camelCase, snake_case, PascalCase",
    path: "/text-case",
    icon: Type,
    color: "from-pink-500 to-pink-600"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Dev Toolbox
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Instant converters and utilities for developers. Fast, clean, and completely client-side.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link key={tool.path} to={tool.path}>
                <Card className="h-full hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer group">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${tool.color} text-white`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-lg">{tool.name}</span>
                      <ArrowRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">{tool.description}</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-slate-500">
          <p>🔒 All processing happens in your browser. No data is stored or transmitted.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
