
import ColorConverter from "@/components/ColorConverter";

const ColorConverterPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <ColorConverter />
        </div>
      </div>
    </div>
  );
};

export default ColorConverterPage;
