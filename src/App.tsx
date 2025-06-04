import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import Index from "./pages/Index";
import JsonPage from "./pages/JsonPage";
import CsvJsonPage from "./pages/CsvJsonPage";
import UrlPage from "./pages/UrlPage";
import UrlParserPage from "./pages/UrlParserPage";
import UuidPage from "./pages/UuidPage";
import TimestampPage from "./pages/TimestampPage";
import TextCasePage from "./pages/TextCasePage";
import RegexPage from "./pages/RegexPage";
import JsonBeautifierPage from "./pages/JsonBeautifierPage";
import ColorConverterPage from "./pages/ColorConverterPage";
import DiffCheckerPage from "./pages/DiffCheckerPage";
import ColorNamePage from "./pages/ColorNamePage";
import DuplicateLineRemoverPage from "./pages/DuplicateLineRemoverPage";
import CharacterCounterPage from "./pages/CharacterCounterPage";
import WhitespaceCleanerPage from "./pages/WhitespaceCleanerPage";
import PercentOffCalculatorPage from "./pages/PercentOffCalculatorPage";
import PercentageCalculatorPage from "./pages/PercentageCalculatorPage";
import PromptSplitterPage from "./pages/PromptSplitterPage";
import SvgUrlEncoderPage from "./pages/SvgUrlEncoderPage";
import BoxShadowGeneratorPage from "./pages/BoxShadowGeneratorPage";
import CssUnitConverterPage from "./pages/CssUnitConverterPage";
import Base64FileConverterPage from "./pages/Base64FileConverterPage";
import Base64Page from "./pages/Base64Page";
import CronJobGeneratorPage from "./pages/CronJobGeneratorPage";
import PostcodeLookupPage from "./pages/PostcodeLookupPage";
import CheckboxRadioGeneratorPage from "./pages/CheckboxRadioGeneratorPage";
import CsvTableViewerPage from "./pages/CsvTableViewerPage";
import LoremIpsumGeneratorPage from "./pages/LoremIpsumGeneratorPage";
import PasswordStrengthCheckerPage from "./pages/PasswordStrengthCheckerPage";
import PlaceholderImageGeneratorPage from "./pages/PlaceholderImageGeneratorPage";
import ColorPickerPage from "./pages/ColorPickerPage";
import TextDiffHighlighterPage from "./pages/TextDiffHighlighterPage";
import DeveloperExcuseGeneratorPage from "./pages/DeveloperExcuseGeneratorPage";
import UnitConverterPage from "./pages/UnitConverterPage";
import BinaryToTextConverterPage from "./pages/BinaryToTextConverterPage";
import TimeZoneConverterPage from "./pages/TimeZoneConverterPage";
import HttpStatusCodeExplainerPage from "./pages/HttpStatusCodeExplainerPage";
import CssGradientGeneratorPage from "./pages/CssGradientGeneratorPage";
import ResponsiveImageTesterPage from "./pages/ResponsiveImageTesterPage";
import NotFound from "./pages/NotFound";
import DateDifferenceCalculatorPage from "./pages/DateDifferenceCalculatorPage";
import CronExpressionVisualizerPage from "./pages/CronExpressionVisualizerPage";
import TabSpaceConverterPage from "./pages/TabSpaceConverterPage";
import TextSorterPage from "./pages/TextSorterPage";
import SvgCleanerPage from "./pages/SvgCleanerPage";
import ColorBlindnessSimulatorPage from "./pages/ColorBlindnessSimulatorPage";
import JsonValidatorPage from "./pages/JsonValidatorPage";
import ScreenDpiCalculatorPage from "./pages/ScreenDpiCalculatorPage";
import ImageConverterPage from "./pages/ImageConverterPage";
import CalculatorPage from "./pages/CalculatorPage";
import TextReplacerPage from "@/pages/TextReplacerPage";
import ImageEditorPage from "@/pages/ImageEditorPage";
import WorkingDaysCalculatorPage from "@/pages/WorkingDaysCalculatorPage";
import RatioCalculatorPage from "./pages/RatioCalculatorPage";
import BigCommerceStatusPage from "./pages/BigCommerceStatusPage";
import ShopifyStatusPage from "./pages/ShopifyStatusPage";
import ImageResizerPage from "./pages/ImageResizer";
import LayoutGridGeneratorPage from "./pages/LayoutGridGenerator";
import BorderRadiusGeneratorPage from "./pages/BorderRadiusGenerator";
import ScrollbarGenerator from "./pages/ScrollbarGenerator";
import ButtonGenerator from "./pages/ButtonGenerator";
import LoaderGenerator from "./pages/LoaderGenerator";
import AccordionGenerator from "./pages/AccordionGenerator";
import SkeletonLoaderGeneratorPage from "./pages/SkeletonLoaderGeneratorPage";
import ResponsiveTesterPage from "./pages/ResponsiveTesterPage";
import TodoListPage from "./pages/TodoListPage";
import BreathingExerciseTimerPage from "./pages/BreathingExerciseTimerPage";
import DigitalZenGardenPage from "./pages/DigitalZenGardenPage";
import CloudShapeGeneratorPage from "./pages/CloudShapeGeneratorPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="dev-toolbox-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider>
            <div className="flex min-h-screen w-full">
              <AppSidebar />
              <SidebarInset>
                <div className="relative">
                  <div className="absolute right-4 top-4">
                    <ModeToggle />
                  </div>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/breathing-exercise-timer" element={<BreathingExerciseTimerPage />} />
                    <Route path="/digital-zen-garden" element={<DigitalZenGardenPage />} />
                    <Route path="/cloud-shape-generator" element={<CloudShapeGeneratorPage />} />
                    <Route path="/json" element={<JsonPage />} />
                    <Route path="/csv-json" element={<CsvJsonPage />} />
                    <Route path="/url" element={<UrlPage />} />
                    <Route path="/url-parser" element={<UrlParserPage />} />
                    <Route path="/uuid" element={<UuidPage />} />
                    <Route path="/timestamp" element={<TimestampPage />} />
                    <Route path="/text-case" element={<TextCasePage />} />
                    <Route path="/regex" element={<RegexPage />} />
                    <Route path="/json-beautifier" element={<JsonBeautifierPage />} />
                    <Route path="/color-converter" element={<ColorConverterPage />} />
                    <Route path="/diff-checker" element={<DiffCheckerPage />} />
                    <Route path="/color-name" element={<ColorNamePage />} />
                    <Route path="/duplicate-line-remover" element={<DuplicateLineRemoverPage />} />
                    <Route path="/character-counter" element={<CharacterCounterPage />} />
                    <Route path="/whitespace-cleaner" element={<WhitespaceCleanerPage />} />
                    <Route path="/percent-off-calculator" element={<PercentOffCalculatorPage />} />
                    <Route path="/percentage-calculator" element={<PercentageCalculatorPage />} />
                    <Route path="/prompt-splitter" element={<PromptSplitterPage />} />
                    <Route path="/svg-url-encoder" element={<SvgUrlEncoderPage />} />
                    <Route path="/box-shadow-generator" element={<BoxShadowGeneratorPage />} />
                    <Route path="/css-unit-converter" element={<CssUnitConverterPage />} />
                    <Route path="/base64-file-converter" element={<Base64FileConverterPage />} />
                    <Route path="/base64" element={<Base64Page />} />
                    <Route path="/cron-job-generator" element={<CronJobGeneratorPage />} />
                    <Route path="/postcode-lookup" element={<PostcodeLookupPage />} />
                    <Route path="/checkbox-radio-generator" element={<CheckboxRadioGeneratorPage />} />
                    <Route path="/csv-table-viewer" element={<CsvTableViewerPage />} />
                    <Route path="/lorem-ipsum-generator" element={<LoremIpsumGeneratorPage />} />
                    <Route path="/password-strength-checker" element={<PasswordStrengthCheckerPage />} />
                    <Route path="/placeholder-image-generator" element={<PlaceholderImageGeneratorPage />} />
                    <Route path="/color-picker" element={<ColorPickerPage />} />
                    <Route path="/text-diff-highlighter" element={<TextDiffHighlighterPage />} />
                    <Route path="/developer-excuse-generator" element={<DeveloperExcuseGeneratorPage />} />
                    <Route path="/unit-converter" element={<UnitConverterPage />} />
                    <Route path="/binary-to-text-converter" element={<BinaryToTextConverterPage />} />
                    <Route path="/timezone-converter" element={<TimeZoneConverterPage />} />
                    <Route path="/http-status-code-explainer" element={<HttpStatusCodeExplainerPage />} />
                    <Route path="/css-gradient-generator" element={<CssGradientGeneratorPage />} />
                    <Route path="/responsive-image-tester" element={<ResponsiveImageTesterPage />} />
                    <Route path="/date-difference-calculator" element={<DateDifferenceCalculatorPage />} />
                    <Route path="/cron-expression-visualizer" element={<CronExpressionVisualizerPage />} />
                    <Route path="/tab-space-converter" element={<TabSpaceConverterPage />} />
                    <Route path="/text-sorter" element={<TextSorterPage />} />
                    <Route path="/svg-cleaner" element={<SvgCleanerPage />} />
                    <Route path="/color-blindness-simulator" element={<ColorBlindnessSimulatorPage />} />
                    <Route path="/json-validator" element={<JsonValidatorPage />} />
                    <Route path="/screen-dpi-calculator" element={<ScreenDpiCalculatorPage />} />
                    <Route path="/image-converter" element={<ImageConverterPage />} />
                    <Route path="/calculator" element={<CalculatorPage />} />
                    <Route path="/text-replacer" element={<TextReplacerPage />} />
                    <Route path="/image-editor" element={<ImageEditorPage />} />
                    <Route path="/working-days-calculator" element={<WorkingDaysCalculatorPage />} />
                    <Route path="/ratio-calculator" element={<RatioCalculatorPage />} />
                    <Route path="/bigcommerce-status" element={<BigCommerceStatusPage />} />
                    <Route path="/shopify-status" element={<ShopifyStatusPage />} />
                    <Route path="/image-resizer" element={<ImageResizerPage />} />
                    <Route path="/layout-grid-generator" element={<LayoutGridGeneratorPage />} />
                    <Route path="/border-radius-generator" element={<BorderRadiusGeneratorPage />} />
                    <Route path="/scrollbar-generator" element={<ScrollbarGenerator />} />
                    <Route path="/button-generator" element={<ButtonGenerator />} />
                    <Route path="/loader-generator" element={<LoaderGenerator />} />
                    <Route path="/accordion-generator" element={<AccordionGenerator />} />
                    <Route path="/skeleton-loader-generator" element={<SkeletonLoaderGeneratorPage />} />
                    <Route path="/responsive-tester" element={<ResponsiveTesterPage />} />
                    <Route path="/todo-list" element={<TodoListPage />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
              </SidebarInset>
            </div>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
