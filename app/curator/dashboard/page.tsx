"use client";
import { withCuratorAuth } from "@/components/auth/withAuth";

function CuratorDashboardPage() {
  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-600">Welcome to your curator dashboard</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium mb-2">Total Listings</h3>
            <p className="text-3xl font-bold text-blue-600">12</p>
            <p className="text-sm text-gray-600">Active artisan listings</p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium mb-2">Applications</h3>
            <p className="text-3xl font-bold text-green-600">8</p>
            <p className="text-sm text-gray-600">Pending review</p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium mb-2">Revenue</h3>
            <p className="text-3xl font-bold text-purple-600">$2,450</p>
            <p className="text-sm text-gray-600">This month</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withCuratorAuth(CuratorDashboardPage);
