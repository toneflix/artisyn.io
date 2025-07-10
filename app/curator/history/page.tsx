"use client";
import { withCuratorAuth } from "@/components/auth/withAuth";

function HistoryPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">History</h1>
      <p className="text-gray-600">
        View your activity history and past interactions.
      </p>
    </div>
  );
}

export default withCuratorAuth(HistoryPage);
