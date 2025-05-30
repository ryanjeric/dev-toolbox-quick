
import { useState } from "react";
import { Copy, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import JsonConverter from "@/components/JsonConverter";
import CsvJsonConverter from "@/components/CsvJsonConverter";
import UrlConverter from "@/components/UrlConverter";
import Base64Converter from "@/components/Base64Converter";
import UuidGenerator from "@/components/UuidGenerator";
import TimestampConverter from "@/components/TimestampConverter";
import TextCaseConverter from "@/components/TextCaseConverter";

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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <JsonConverter />
          <CsvJsonConverter />
          <UrlConverter />
          <Base64Converter />
          <UuidGenerator />
          <TimestampConverter />
          <TextCaseConverter />
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
