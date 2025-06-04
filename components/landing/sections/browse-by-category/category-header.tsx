"use client";

import { ArrowLeft, Search, Sun, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Category } from "@/lib/browse-by-categories-types";

interface CategoryHeaderProps {
  selectedCategory: Category | null;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onBackToCategories: () => void;
}

export function CategoryHeader({
  selectedCategory,
  searchQuery,
  onSearchChange,
  onBackToCategories,
}: CategoryHeaderProps) {
  const getSearchPlaceholder = () => {
    if (selectedCategory) {
      return `Search for ${selectedCategory.name.toLowerCase()}s...`;
    }
    return "Search for plumbers, electricians, etc.";
  };

  const getPageTitle = () => {
    if (selectedCategory) {
      return `Browse ${selectedCategory.name}s`;
    }
    return "Browse Categories";
  };

  return (
    <header className="bg-white border-b border-gray-200">
      {/* Top Navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-bold text-gray-900">rtisyn.io</span>
            </div>

            <nav className="hidden md:flex items-center space-x-6">
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-gray-900"
              >
                Home
              </Button>
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-gray-900"
              >
                Find Artisans
              </Button>
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-gray-900"
              >
                Login
              </Button>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Sun className="h-5 w-5" />
            </Button>
            <Button variant="ghost" className="flex items-center space-x-2">
              <Wallet className="h-5 w-5" />
              <span>Connect Wallet</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center space-x-4 mb-6">
          {selectedCategory && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onBackToCategories}
              className="hover:bg-gray-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <h1 className="text-3xl font-bold text-gray-900">{getPageTitle()}</h1>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder={getSearchPlaceholder()}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-12 pr-4 py-3 text-lg border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Button
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            <Search className="h-5 w-5 text-white" />
          </Button>
        </div>
      </div>
    </header>
  );
}
