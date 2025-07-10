"use client";
import React from "react";
import { withCuratorAuth } from "@/components/auth/withAuth";

const AccountSettings = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Account Settings</h1>
      <p className="text-gray-600">
        Manage your account preferences and settings.
      </p>
    </div>
  );
};

export default withCuratorAuth(AccountSettings);
