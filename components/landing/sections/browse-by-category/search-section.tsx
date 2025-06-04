"use client";

import { ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Category } from "@/lib/browse-by-categories-types";
import type { ChangeEvent } from "react";

interface SearchSectionProps {
  selectedCategory: Category | null;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onBackToCategories: () => void;
}

/**
 * SearchSection Component
 *
 * Handles the page title and search functionality:
 * - Dynamic page titles based on selected category
 * - Context-aware search placeholders
 * - Back navigation for category drill-down
 * - Full-width responsive search bar
 */
export function SearchSection({
  selectedCategory,
  searchQuery,
  onSearchChange,
  onBackToCategories,
}: SearchSectionProps) {
  /**
   * Generate contextual search placeholder text
   * Changes based on whether user is in category view or main view
   */
  const getSearchPlaceholder = (): string => {
    if (selectedCategory) {
      return `Search for ${selectedCategory.name.toLowerCase()}s.`;
    }
    return "Search for plumbers, electricians, etc.";
  };

  /**
   * Generate dynamic page title
   * Shows category-specific title when drilling down
   */
  const getPageTitle = (): string => {
    if (selectedCategory) {
      return `Browse ${selectedCategory.name}s`;
    }
    return "Browse Categories";
  };

  /**
   * Handle search input changes
   * Debouncing could be added here for performance optimization
   */
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="space-y-8">
      {/* Page Header with Optional Back Button */}
      <div className="flex items-center space-x-4">
        {selectedCategory && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onBackToCategories}
            className="hover:bg-gray-100 dark:hover:bg-zinc-800 -ml-2"
            aria-label="Go back to categories"
          >
            <ArrowLeft className="h-5 w-5 text-gray-700 dark:text-zinc-200" />
          </Button>
        )}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-zinc-100">
          {getPageTitle()}
        </h1>
      </div>

      {/* Full-Width Search Bar */}
      <div className="relative w-full">
        <Input
          type="text"
          placeholder={getSearchPlaceholder()}
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full h-14 pl-6 pr-16 text-base bg-gray-50 dark:bg-zinc-900 border-2 border-gray-200 dark:border-zinc-700 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white dark:focus:bg-zinc-900 placeholder:text-gray-500 dark:placeholder:text-zinc-400 text-gray-900 dark:text-zinc-100"
          aria-label="Search artisans"
        />
        {/* Search Button - Positioned absolutely for better UX */}
        <Button
          size="icon"
          className="absolute right-2 top-2 h-10 w-10 bg-blue-600 hover:bg-blue-700 rounded-xl"
          aria-label="Search"
        >
          <Search className="h-5 w-5 text-white" />
        </Button>
      </div>
    </div>
  );
}
