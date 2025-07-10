"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useRole } from "@/app/context/role-context";
import { withRoleAuth } from "@/components/auth/withAuth";

function ProfileSetup() {
  const router = useRouter();
  const {
    userRole,
    setIsProfileComplete,
    isWalletConnected,
    isRoleSelected,
    setHasStartedProfile,
  } = useRole();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
  });

  useEffect(() => {
    if (isWalletConnected && isRoleSelected) {
      window.history.pushState(null, "", "/");
      window.history.pushState(null, "", "/profile-setup");
    }
  }, [isWalletConnected, isRoleSelected]);

  useEffect(() => {
    const handlePopState = () => {
      router.replace("/");
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [router]);

  useEffect(() => {
    if (!isWalletConnected || !isRoleSelected) {
      if (!isWalletConnected) {
        router.push("/connect-wallet");
        return;
      }
      if (!isRoleSelected) {
        router.push("/account-type");
        return;
      }
    }
  }, [isWalletConnected, isRoleSelected, router]);

  useEffect(() => {
    const savedFormData = localStorage.getItem("profileFormData");
    if (savedFormData) {
      try {
        const parsedData = JSON.parse(savedFormData);
        setFormData(parsedData);
        setHasStartedProfile(true);
      } catch (error) {
        console.error("Failed to parse saved form data:", error);
      }
    }
  }, [setHasStartedProfile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFormData = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setFormData(newFormData);
    setHasStartedProfile(true);
    localStorage.setItem("profileFormData", JSON.stringify(newFormData));
  };

  const handleContinue = () => {
    setIsProfileComplete(true);
    setHasStartedProfile(false);
    localStorage.removeItem("profileFormData");
    localStorage.removeItem("profileStarted");

    if (userRole === "curator") {
      router.push("/curator/dashboard");
    } else if (userRole === "finder") {
      router.push("/finder/dashboard");
    }
  };

  const isFormValid =
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.country;

  if (!isWalletConnected || !isRoleSelected) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="flex items-center justify-center p-4 pt-20">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              {userRole === "curator" ? "Curator Profile" : "Finder Profile"}
            </h1>
            <p className="text-gray-600">
              {userRole === "curator"
                ? "Update your profile to start listing Artisans."
                : "Update profile to get access to our advanced recommendation engine and personalization."}
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Country of Residence
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                placeholder="Choose Country of Residence"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <Button
              onClick={handleContinue}
              disabled={!isFormValid}
              className={`w-full py-3 px-6 rounded-full font-medium text-white transition-all ${
                isFormValid
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              Complete Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRoleAuth(ProfileSetup);
