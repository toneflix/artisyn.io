"use client";
import React from "react";
import { withCuratorAuth } from "@/components/auth/withAuth";

const Saved = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Saved</h1>
      <p className="text-gray-600">
        View your saved artisan profiles and listings.
      </p>
    </div>
  );
};

export default withCuratorAuth(Saved);
