"use client";
import React from "react";
import { withCuratorAuth } from "@/components/auth/withAuth";

const CuratorProfile = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p className="text-gray-600">Manage your curator profile settings.</p>
    </div>
  );
};

export default withCuratorAuth(CuratorProfile);
