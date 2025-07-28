"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Archive, RotateCcw, Trash2 } from "lucide-react";

interface ArchivedListing {
  id: string;
  name: string;
  category: string;
  location: string;
  isVerified: boolean;
  archivedAt: string;
}

interface ArchivedListingCardProps {
  listing: ArchivedListing;
  onRestore: () => void;
  onDelete: () => void;
  isLoading: boolean;
}

/**
 * Individual archived listing card component
 */
export function ArchivedListingCard({
  listing,
  onRestore,
  onDelete,
  isLoading,
}: ArchivedListingCardProps) {
  return (
    <Card className="hover:shadow-sm transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          {/* Left side - Archive icon */}
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Archive className="h-5 w-5 text-gray-500" />
            </div>

            {/* Center - Listing details */}
            <div className="space-y-1">
              <h3 className="font-semibold text-gray-900">{listing.name}</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>{listing.category}</span>
                <span>•</span>
                <span>{listing.location}</span>
              </div>
              {listing.isVerified && (
                <Badge
                  variant="secondary"
                  className="bg-blue-50 text-blue-700 hover:bg-blue-50"
                >
                  Verified
                </Badge>
              )}
            </div>
          </div>

          {/* Right side - Action buttons */}
          <div className="flex items-center space-x-2">
            {/* Delete button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onDelete}
              disabled={isLoading}
              className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>

            {/* Restore button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onRestore}
              disabled={isLoading}
              className="h-8 w-8 p-0 text-green-500 hover:text-green-600 hover:bg-green-50"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
