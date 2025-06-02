import DiffChecker from "@/components/DiffChecker";

const DiffCheckerPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <DiffChecker />
        </div>
      </div>
    </div>
  );
};

export default DiffCheckerPage;
