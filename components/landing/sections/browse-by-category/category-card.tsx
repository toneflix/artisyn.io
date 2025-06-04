"use client";

import { Card, CardContent } from "@/components/ui/card";
import type { Category, IconType } from "@/lib/browse-by-categories-types";
import {
  Wrench,
  Scissors,
  Paintbrush,
  Hammer,
  Car,
  Laptop,
  Zap,
  Home,
  Camera,
  Music,
  Shirt,
  ChefHat,
} from "lucide-react";
import type { JSX } from "react";

/**
 * Icon Component Mapping
 * Maps category types to their corresponding Lucide React icons
 * Each icon maintains consistent sizing and category-specific colors
 */
const iconComponents: Record<IconType, () => JSX.Element> = {
  plumber: () => <Wrench className="w-12 h-12 text-blue-600" />,
  barber: () => <Scissors className="w-12 h-12 text-purple-600" />,
  painter: () => <Paintbrush className="w-12 h-12 text-orange-500" />,
  carpenter: () => <Hammer className="w-12 h-12 text-green-600" />,
  mechanic: () => <Car className="w-12 h-12 text-red-500" />,
  tech_repair: () => <Laptop className="w-12 h-12 text-blue-600" />,
  electrician: () => <Zap className="w-12 h-12 text-yellow-500" />,
  cleaner: () => <Home className="w-12 h-12 text-blue-500" />,
  photographer: () => <Camera className="w-12 h-12 text-gray-600" />,
  musician: () => <Music className="w-12 h-12 text-purple-500" />,
  tailor: () => <Shirt className="w-12 h-12 text-indigo-600" />,
  chef: () => <ChefHat className="w-12 h-12 text-orange-600" />,
};

interface CategoryCardProps {
  category: Category;
  onClick: () => void;
}

/**
 * CategoryCard Component
 *
 * Displays individual category with:
 * - Colored icon with background tint
 * - Category name
 * - Hover animations and interactions
 * - Accessible click handling
 */
export function CategoryCard({ category, onClick }: CategoryCardProps) {
  const IconComponent = iconComponents[category.icon as IconType];

  return (
    <Card
      className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 border-2 border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 group rounded-xl"
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Browse ${category.name} category`}
      onKeyDown={(e) => {
        // Handle keyboard navigation for accessibility
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <CardContent className="flex flex-col items-center justify-center p-8 sm:p-12 text-center min-h-[200px]">
        {/* Icon Container with Hover Animation */}
        <div className="mb-6 transition-transform duration-200 group-hover:scale-110">
          {IconComponent ? (
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center"
              style={{
                // Create subtle background tint using category color
                backgroundColor: `${category.color}15`,
              }}
            >
              <IconComponent />
            </div>
          ) : (
            // Fallback for missing icons
            <div className="w-12 h-12 bg-gray-200 dark:bg-zinc-800 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 dark:text-zinc-400 text-xl">
                ?
              </span>
            </div>
          )}
        </div>

        {/* Category Name */}
        <h3 className="text-xl font-semibold text-gray-900 dark:text-zinc-100">
          {category.name}
        </h3>
      </CardContent>
    </Card>
  );
}
