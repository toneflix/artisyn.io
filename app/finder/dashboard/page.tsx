"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRole } from "@/app/context/role-context";

export default function FinderDashboard() {
  const { isProfileComplete } = useRole();
  const router = useRouter();

  // Redirect incomplete profiles directly to profile setup
  useEffect(() => {
    if (!isProfileComplete) {
      router.replace("/profile-setup");
    }
  }, [isProfileComplete, router]);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Finder Dashboard
        </h1>
        <p className="text-gray-600">
          Discover and connect with talented artisans
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium mb-2">Searches</h3>
          <p className="text-3xl font-bold text-blue-600">12</p>
          <p className="text-sm text-gray-600">This month</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium mb-2">Saved Artisans</h3>
          <p className="text-3xl font-bold text-green-600">8</p>
          <p className="text-sm text-gray-600">Total saved</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium mb-2">Connections</h3>
          <p className="text-3xl font-bold text-purple-600">5</p>
          <p className="text-sm text-gray-600">Active connections</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium mb-4">Recent Searches</h3>
          <div className="space-y-3">
            {[
              {
                category: "Pottery",
                location: "San Francisco",
                time: "2 hours ago",
              },
              {
                category: "Woodworking",
                location: "Portland",
                time: "1 day ago",
              },
              { category: "Jewelry", location: "New York", time: "3 days ago" },
              { category: "Textiles", location: "Seattle", time: "1 week ago" },
            ].map((search, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium">{search.category}</p>
                  <p className="text-sm text-gray-600">{search.location}</p>
                </div>
                <span className="text-xs text-gray-500">{search.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium mb-4">Recommended Artisans</h3>
          <div className="space-y-3">
            {[
              {
                name: "Sarah Johnson",
                specialty: "Ceramic Artist",
                rating: 4.9,
              },
              { name: "Mike Chen", specialty: "Woodworker", rating: 4.8 },
              { name: "Emma Wilson", specialty: "Jewelry Maker", rating: 4.7 },
              {
                name: "David Martinez",
                specialty: "Textile Artist",
                rating: 4.9,
              },
            ].map((artisan, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  <div>
                    <p className="font-medium">{artisan.name}</p>
                    <p className="text-sm text-gray-600">{artisan.specialty}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">⭐ {artisan.rating}</p>
                  <button className="text-blue-600 hover:text-blue-800 text-sm">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
