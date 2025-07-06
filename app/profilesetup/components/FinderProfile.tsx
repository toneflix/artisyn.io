"use client";
import React, { useState } from "react";
import { ArrowLeft, Camera, User } from "lucide-react";
import Image from 'next/image'

export default function FinderProfile({ onBack }: { onBack: () => void }) {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 w-full max-w-md mx-auto">
      <button
        onClick={onBack}
        className="mb-5 p-2 -ml-2 border-none bg-transparent cursor-pointer hover:bg-gray-100 rounded-lg transition-colors"
      >
        <ArrowLeft size={20} color="#111" />
      </button>

      <div className="mb-6">
        <h2 className="font-semibold text-lg sm:text-xl mb-2 text-gray-900">
          Finder Profile
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          Update profile to gain access to our advanced recommendation engine
          and personalization.
        </p>
      </div>

      <form className="space-y-4">
        {/* Profile Picture Upload */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gray-100 border-2 border-gray-200 flex items-center justify-center overflow-hidden">
              {profileImage ? (
                <Image
                  src={profileImage}
                  alt="Profile preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={32} className="text-gray-400" />
              )}
            </div>
            <label
              htmlFor="finder-profile-upload"
              className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors shadow-lg"
            >
              <Camera size={16} className="text-white" />
            </label>
            <input
              id="finder-profile-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Click the camera icon to upload your profile picture
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name
          </label>
          <input
            type="text"
            placeholder="First Name"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name
          </label>
          <input
            type="text"
            placeholder="Last Name"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Email Address"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country of Residence
          </label>
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-700 bg-white"
            defaultValue=""
          >
            <option value="" disabled className="text-gray-500">
              Choose Country of Residence
            </option>
            <option value="nigeria">Nigeria</option>
            <option value="ghana">Ghana</option>
            <option value="kenya">Kenya</option>
            <option value="south-africa">South Africa</option>
            <option value="us">United States</option>
            <option value="gb">United Kingdom</option>
            <option value="ca">Canada</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-full shadow-sm transition-colors mt-6"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
