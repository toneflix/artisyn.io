"use client";
import React from "react";
import { withCuratorAuth } from "@/components/auth/withAuth";

const ListingsPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Listings</h1>
      <p className="text-gray-600">Manage your artisan listings here.</p>
    </div>
  );
};

export default withCuratorAuth(ListingsPage);
