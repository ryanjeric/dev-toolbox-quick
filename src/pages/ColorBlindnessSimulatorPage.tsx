import { ColorBlindnessSimulator } from "@/components/ColorBlindnessSimulator";

export default function ColorBlindnessSimulatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Color Blindness Simulator</h1>
        <p className="text-center text-sm text-slate-600 dark:text-slate-400 mb-8">
          Note: This tool uses algorithmic simulations and may not perfectly replicate the experience of individuals with color blindness. For accurate testing, it is recommended to consult with individuals who have the specific type of color blindness.
        </p>
        <ColorBlindnessSimulator />
      </div>
    </div>
  );
} 