"use client";
import React from "react";
import { withCuratorAuth } from "@/components/auth/withAuth";

const Archive = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Archive</h1>
      <p className="text-gray-600">View archived artisan listings.</p>
    </div>
  );
};

export default withCuratorAuth(Archive);
