"use client";

import { CategoryCard } from "./category-card";
import { NotFoundState } from "./not-found-state";
import type { Category } from "@/lib/browse-by-categories-types";

interface CategoryGridProps {
  categories: Category[];
  onCategorySelect: (category: Category) => void;
}

export function CategoryGrid({
  categories,
  onCategorySelect,
}: CategoryGridProps) {
  if (categories.length === 0) {
    return (
      <NotFoundState
        title="No categories found"
        description="Try adjusting your search terms to find what you're looking for."
        showBackButton={false}
      />
    );
  }

  const handleCategoryClick = (category: Category): void => {
    onCategorySelect(category);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {categories.map((category: Category) => (
        <CategoryCard
          key={category.id}
          category={category}
          onClick={() => handleCategoryClick(category)}
        />
      ))}
    </div>
  );
}
