"use client";

import { MapPin, Phone, CheckCircle, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import type { Artisan } from "@/lib/browse-by-categories-types";

interface ArtisanCardProps {
  artisan: Artisan;
}

/**
 * ArtisanCard Component
 *
 * Displays individual artisan information in a card format with:
 * - Profile image with fallback placeholder
 * - Verification badge overlay
 * - Contact information and action buttons
 * - Responsive design with hover effects
 */
export function ArtisanCard({ artisan }: ArtisanCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 border-2 border-gray-200 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-900">
      {/* Image Container with Verification Badge */}
      <div className="relative">
        {artisan.image ? (
          <div className="relative w-full h-56">
            <Image
              src={artisan.image || "/placeholder.svg"}
              alt={`${artisan.name} profile picture`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-top" // Focus on top portion for better face visibility
              priority={false}
            />
          </div>
        ) : (
          // Fallback placeholder when no image is available
          <div className="w-full h-56 bg-gray-100 dark:bg-zinc-800 flex items-center justify-center">
            <User className="h-16 w-16 text-gray-400 dark:text-zinc-500" />
          </div>
        )}

        {/* Verification Badge - Only shown for verified artisans */}
        {artisan.verified && (
          <Badge className="absolute top-3 right-3 bg-blue-600 hover:bg-blue-700 text-white">
            <CheckCircle className="h-3 w-3 mr-1" />
            Verified
          </Badge>
        )}
      </div>

      {/* Card Content - Artisan Details */}
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Name and Category */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-zinc-100 mb-1">
              {artisan.name}
            </h3>
            <div className="flex items-center space-x-1 text-gray-600 dark:text-zinc-300">
              <User className="h-4 w-4" />
              <span className="capitalize">
                {artisan.category.replace("_", " ")}
              </span>
            </div>
          </div>

          {/* Location Information */}
          <div className="flex items-center space-x-1 text-gray-600 dark:text-zinc-300">
            <MapPin className="h-4 w-4" />
            <span>{artisan.location}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
              View Profile
            </Button>
            <Button
              variant="outline"
              className="flex items-center space-x-2 border-gray-300 dark:border-zinc-600 text-gray-700 dark:text-zinc-200 hover:bg-gray-50 dark:hover:bg-zinc-800"
            >
              <Phone className="h-4 w-4" />
              <span>Call</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
