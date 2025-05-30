
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Index from "./pages/Index";
import JsonPage from "./pages/JsonPage";
import CsvJsonPage from "./pages/CsvJsonPage";
import UrlPage from "./pages/UrlPage";
import Base64Page from "./pages/Base64Page";
import UuidPage from "./pages/UuidPage";
import TimestampPage from "./pages/TimestampPage";
import TextCasePage from "./pages/TextCasePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/json" element={<JsonPage />} />
          <Route path="/csv-json" element={<CsvJsonPage />} />
          <Route path="/url" element={<UrlPage />} />
          <Route path="/base64" element={<Base64Page />} />
          <Route path="/uuid" element={<UuidPage />} />
          <Route path="/timestamp" element={<TimestampPage />} />
          <Route path="/text-case" element={<TextCasePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
