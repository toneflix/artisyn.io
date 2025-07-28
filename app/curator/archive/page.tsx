import { ArchivedListings } from "@/components/curator/archive/archived-listings";

/**
 * Curator Archive Page
 * Displays all archived artisan listings with restore and delete actions
 */
export default function ArchivedListingsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Curator Archive
          </h1>
          <p className="text-gray-600">Manage your archive</p>
        </div>

        <ArchivedListings />
      </div>
    </div>
  );
}
