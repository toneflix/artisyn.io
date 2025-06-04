"use client";

import { useState } from "react";
import { Map, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArtisanCard } from "./artisan-card";
import { NotFoundState } from "./not-found-state";
import type { Category, Artisan } from "@/lib/browse-by-categories-types";

type ViewMode = "list" | "map";

interface CategoryListingProps {
  category: Category;
  artisans: Artisan[];
  searchQuery: string;
}

/**
 * CategoryListing Component
 *
 * Displays filtered artisans for a specific category with:
 * - Results count and search context
 * - View mode toggle (List/Map)
 * - Responsive grid layout
 * - Empty state handling
 */
export function CategoryListing({
  category,
  artisans,
  searchQuery,
}: CategoryListingProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  /**
   * Handle view mode changes
   * Future: Could persist user preference in localStorage
   */
  const handleViewModeChange = (mode: ViewMode): void => {
    setViewMode(mode);
  };

  // Show empty state when no artisans match criteria
  if (artisans.length === 0) {
    return (
      <NotFoundState
        title={`No ${category.name.toLowerCase()}s found`}
        description={
          searchQuery
            ? `No ${category.name.toLowerCase()}s match your search "${searchQuery}". Try adjusting your search terms.`
            : `No ${category.name.toLowerCase()}s are currently available in this area.`
        }
        showBackButton={false}
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* Results Header with Count and View Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Results Count with Search Context */}
        <p className="text-gray-600 dark:text-zinc-300 text-lg">
          Showing {artisans.length} {category.name}s
          {searchQuery && (
            <span className="ml-1">for &quot;{searchQuery}&quot;</span>
          )}
        </p>

        {/* View Mode Toggle */}
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => handleViewModeChange("list")}
            className="flex items-center space-x-2"
            aria-label="List view"
          >
            <LayoutGrid className="h-4 w-4" />
            <span>List</span>
          </Button>
          <Button
            variant={viewMode === "map" ? "default" : "outline"}
            size="sm"
            onClick={() => handleViewModeChange("map")}
            className="flex items-center space-x-2"
            aria-label="Map view"
            disabled
          >
            <Map className="h-4 w-4" />
            <span>Map</span>
          </Button>
        </div>
      </div>

      {/* Results Display */}
      {viewMode === "list" ? (
        // Grid Layout for Artisan Cards
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artisans.map((artisan: Artisan) => (
            <ArtisanCard key={artisan.id} artisan={artisan} />
          ))}
        </div>
      ) : (
        // Map View Placeholder - Future Implementation
        <div className="bg-gray-50 dark:bg-zinc-900 rounded-2xl p-12 text-center">
          <Map className="h-16 w-16 text-gray-400 dark:text-zinc-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-zinc-100 mb-2">
            Map view coming soon
          </h3>
          <p className="text-gray-600 dark:text-zinc-300">
            We&lsquo;re working on an interactive map to help you find artisans
            near you.
          </p>
        </div>
      )}
    </div>
  );
}
