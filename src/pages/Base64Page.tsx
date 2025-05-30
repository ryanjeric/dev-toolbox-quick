
import Base64Converter from "@/components/Base64Converter";

const Base64Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Base64Converter />
        </div>
      </div>
    </div>
  );
};

export default Base64Page;
