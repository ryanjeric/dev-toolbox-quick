import { AwsStatus } from "@/components/AwsStatus";

export default function AwsStatusPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-slate-100">AWS Status</h1>
            <p className="text-slate-600 dark:text-slate-400">
              Monitor the real-time operational status of AWS services across all regions
            </p>
          </div>
          <AwsStatus />
        </div>
      </div>
    </div>
  );
} 