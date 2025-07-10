"use client";

import Link from "next/link";
import { useNavigation } from "@/hooks/use-navigation";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  onClose: () => void;
}

export const MobileNav = ({ onClose }: MobileNavProps) => {
  const { mobileNavSections, isSidebarItemActive } = useNavigation();

  return (
    <div
      className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-[100]"
      onClick={onClose}
    >
      <div
        className="fixed top-0 left-0 h-full w-full bg-white shadow-lg p-5 z-[101]"
        onClick={(e) => e.stopPropagation()}
      >
        <nav className="flex flex-col space-y-4">
          {mobileNavSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-bold text-gray-500 text-sm mb-2">
                {section.title}
              </h3>
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "block py-2 text-[#5B6B79] hover:text-blue-600 transition-colors",
                    isSidebarItemActive(item.href) &&
                      "text-[#020817] font-semibold"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};
