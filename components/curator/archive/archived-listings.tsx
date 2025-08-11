"use client";

import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { ArchiveX } from "lucide-react";
import { DeleteConfirmationModal } from "./delete-confirmation-modal";
import { ArchivedListingCard } from "./archived-listing-card";

interface ArchivedListing {
  id: string;
  name: string;
  category: string;
  location: string;
  isVerified: boolean;
  archivedAt: string;
}

/**
 * Archived listings component with restore and delete functionality
 */
export function ArchivedListings() {
  const [isLoading, setIsLoading] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] =
    useState<ArchivedListing | null>(null);

  // Mock archived listings data
  const archivedListings: ArchivedListing[] = [
    {
      id: "1",
      name: "John Doe",
      category: "Plumber",
      location: "Ikeja, Lagos",
      isVerified: false,
      archivedAt: "2024-01-15",
    },
    {
      id: "2",
      name: "Jane Smith",
      category: "Electrician",
      location: "Abuja",
      isVerified: true,
      archivedAt: "2024-01-10",
    },
    {
      id: "3",
      name: "Michael Johnson",
      category: "Carpenter",
      location: "Accra",
      isVerified: true,
      archivedAt: "2024-01-08",
    },
  ];

  const handleRestore = async (listingId: string) => {
    setIsLoading(true);
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Restoring listing:", listingId);
      // In real app, update the listings state
    } catch (error) {
      console.error("Error restoring listing:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (listing: ArchivedListing) => {
    setSelectedListing(listing);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedListing) return;

    setIsLoading(true);
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Permanently deleting listing:", selectedListing.id);
      // In real app, remove from listings state
      setDeleteModalOpen(false);
      setSelectedListing(null);
    } catch (error) {
      console.error("Error deleting listing:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-200 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                </div>
                <div className="flex space-x-2">
                  <div className="w-8 h-8 bg-gray-200 rounded"></div>
                  <div className="w-8 h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (archivedListings.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <ArchiveX className="h-8 w-8 text-gray-400" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">No archived listings</h3>
              <p className="text-gray-600">
                Your archived listings will appear here.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {archivedListings.map((listing) => (
          <ArchivedListingCard
            key={listing.id}
            listing={listing}
            onRestore={() => handleRestore(listing.id)}
            onDelete={() => handleDeleteClick(listing)}
            isLoading={isLoading}
          />
        ))}
      </div>

      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        listingName={selectedListing?.name || ""}
        isLoading={isLoading}
      />
    </>
  );
}
