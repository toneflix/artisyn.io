"use client";
import { useState } from "react";
import { useRole } from "@/app/context/role-context";

export default function FindArtisynsPage() {
  const { userRole } = useRole();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    "All",
    "Pottery",
    "Woodworking",
    "Jewelry",
    "Textiles",
    "Metalwork",
    "Glasswork",
  ];

  const artisans = [
    {
      id: 1,
      name: "Sarah Johnson",
      specialty: "Ceramic Artist",
      location: "San Francisco, CA",
      rating: 4.9,
      image: "/placeholder-artisan.jpg",
      category: "Pottery",
      description: "Specializes in traditional Japanese pottery techniques",
    },
    {
      id: 2,
      name: "Mike Chen",
      specialty: "Woodworker",
      location: "Portland, OR",
      rating: 4.8,
      image: "/placeholder-artisan.jpg",
      category: "Woodworking",
      description: "Creates custom furniture and decorative pieces",
    },
    {
      id: 3,
      name: "Emma Wilson",
      specialty: "Jewelry Maker",
      location: "New York, NY",
      rating: 4.7,
      image: "/placeholder-artisan.jpg",
      category: "Jewelry",
      description: "Handcrafted jewelry with ethically sourced materials",
    },
    {
      id: 4,
      name: "David Martinez",
      specialty: "Textile Artist",
      location: "Santa Fe, NM",
      rating: 4.9,
      image: "/placeholder-artisan.jpg",
      category: "Textiles",
      description: "Traditional weaving and natural dyeing techniques",
    },
    {
      id: 5,
      name: "Lisa Thompson",
      specialty: "Glassblower",
      location: "Seattle, WA",
      rating: 4.6,
      image: "/placeholder-artisan.jpg",
      category: "Glasswork",
      description: "Contemporary glass art and functional pieces",
    },
    {
      id: 6,
      name: "Robert Kim",
      specialty: "Metalsmith",
      location: "Austin, TX",
      rating: 4.8,
      image: "/placeholder-artisan.jpg",
      category: "Metalwork",
      description: "Forged metal sculptures and architectural elements",
    },
  ];

  const filteredArtisans = artisans.filter((artisan) => {
    const matchesCategory =
      selectedCategory === "All" || artisan.category === selectedCategory;
    const matchesSearch =
      artisan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artisan.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artisan.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Artisans</h1>
        <p className="text-gray-600">
          Discover talented artisans and their unique crafts
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search artisans, specialties, or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Search
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Results Section */}
      <div className="mb-4">
        <p className="text-gray-600">
          Showing {filteredArtisans.length} artisan
          {filteredArtisans.length !== 1 ? "s" : ""}
          {selectedCategory !== "All" && ` in ${selectedCategory}`}
        </p>
      </div>

      {/* Artisan Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArtisans.map((artisan) => (
          <div
            key={artisan.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="aspect-square bg-gray-200 relative">
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                <span className="text-sm">Artisan Photo</span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {artisan.name}
                </h3>
                <div className="flex items-center text-yellow-500">
                  <span className="text-sm">⭐ {artisan.rating}</span>
                </div>
              </div>
              <p className="text-blue-600 font-medium mb-1">
                {artisan.specialty}
              </p>
              <p className="text-gray-600 text-sm mb-3">{artisan.location}</p>
              <p className="text-gray-700 text-sm mb-4">
                {artisan.description}
              </p>
              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  View Profile
                </button>
                {userRole === "curator" && (
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Curate
                  </button>
                )}
                {userRole === "finder" && (
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Save
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredArtisans.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">
            No artisans found matching your criteria
          </p>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchTerm("");
            }}
            className="mt-4 px-6 py-2 text-blue-600 hover:text-blue-800 font-medium"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
