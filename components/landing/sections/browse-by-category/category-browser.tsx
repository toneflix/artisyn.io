"use client";

import { useState } from "react";
import { CategoryGrid } from "./category-grid";
import { CategoryListing } from "./category-listing";
import { SearchSection } from "./search-section";
import { categoriesData, artisansData } from "@/lib/mock-data";
import type { Category } from "@/lib/browse-by-categories-types";

/**
 * CategoryBrowser Component
 *
 * Main container component that orchestrates the category browsing experience:
 * - Manages navigation state between category overview and detail views
 * - Handles search functionality across categories and artisans
 * - Provides data filtering and state management
 * - Implements responsive layout structure
 */
export function CategoryBrowser() {
  // State Management
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");

  /**
   * Handle category selection
   * Navigates to category detail view and resets search
   */
  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setSearchQuery(""); // Clear search when switching categories
  };

  /**
   * Handle navigation back to categories overview
   * Resets both category selection and search state
   */
  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setSearchQuery("");
  };

  /**
   * Filter categories based on search query
   * Performs case-insensitive search on category names
   */
  const filteredCategories = categoriesData.filter((category: Category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /**
   * Filter artisans based on selected category and search query
   * Searches across artisan names and specialties
   */
  const filteredArtisans = selectedCategory
    ? artisansData.filter(
        (artisan) =>
          artisan.category === selectedCategory.id &&
          (searchQuery === "" ||
            artisan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            artisan.specialties.some((specialty: string) =>
              specialty.toLowerCase().includes(searchQuery.toLowerCase())
            ))
      )
    : [];

  return (
    <div className="min-h-screen ">
      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 sm:py-12">
          {/* Search and Navigation Section */}
          <SearchSection
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onBackToCategories={handleBackToCategories}
          />

          {/* Dynamic Content Based on Navigation State */}
          <div className="mt-12">
            {!selectedCategory ? (
              // Category Overview - Show all categories
              <CategoryGrid
                categories={filteredCategories}
                onCategorySelect={handleCategorySelect}
              />
            ) : (
              // Category Detail - Show filtered artisans
              <CategoryListing
                category={selectedCategory}
                artisans={filteredArtisans}
                searchQuery={searchQuery}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
