import { Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NotFoundStateProps {
  title: string;
  description: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

/**
 * NotFoundState Component
 *
 * Displays empty state when no results are found:
 * - Contextual messaging based on search/filter state
 * - Optional back navigation
 * - Accessible and user-friendly design
 */
export function NotFoundState({
  title,
  description,
  showBackButton = false,
  onBack,
}: NotFoundStateProps) {
  return (
    <div className="text-center py-16">
      <div className="max-w-md mx-auto">
        {/* Empty State Icon */}
        <div className="w-24 h-24 bg-gray-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6">
          <Search className="h-12 w-12 text-gray-400 dark:text-zinc-400" />
        </div>

        {/* Empty State Content */}
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-zinc-100 mb-4">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-zinc-300 mb-8 leading-relaxed">
          {description}
        </p>

        {/* Optional Back Button */}
        {showBackButton && onBack && (
          <Button
            onClick={onBack}
            variant="outline"
            className="flex items-center space-x-2"
            aria-label="Go back"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Go Back</span>
          </Button>
        )}
      </div>
    </div>
  );
}
