import { TabSpaceConverter } from "@/components/TabSpaceConverter";

export default function TabSpaceConverterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Tab to Space Converter</h1>
        <TabSpaceConverter />
      </div>
    </div>
  );
} 