
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Index from "./pages/Index";
import JsonPage from "./pages/JsonPage";
import CsvJsonPage from "./pages/CsvJsonPage";
import UrlPage from "./pages/UrlPage";
import Base64Page from "./pages/Base64Page";
import UuidPage from "./pages/UuidPage";
import TimestampPage from "./pages/TimestampPage";
import TextCasePage from "./pages/TextCasePage";
import RegexPage from "./pages/RegexPage";
import JsonBeautifierPage from "./pages/JsonBeautifierPage";
import ColorConverterPage from "./pages/ColorConverterPage";
import DiffCheckerPage from "./pages/DiffCheckerPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <SidebarInset>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/json" element={<JsonPage />} />
                <Route path="/csv-json" element={<CsvJsonPage />} />
                <Route path="/url" element={<UrlPage />} />
                <Route path="/base64" element={<Base64Page />} />
                <Route path="/uuid" element={<UuidPage />} />
                <Route path="/timestamp" element={<TimestampPage />} />
                <Route path="/text-case" element={<TextCasePage />} />
                <Route path="/regex" element={<RegexPage />} />
                <Route path="/json-beautifier" element={<JsonBeautifierPage />} />
                <Route path="/color-converter" element={<ColorConverterPage />} />
                <Route path="/diff-checker" element={<DiffCheckerPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
