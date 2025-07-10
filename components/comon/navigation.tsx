import {
  Home,
  ListPlus,
  User as UserIcon,
  Package,
  BoltIcon,
  Files,
  PaintbrushVerticalIcon,
  User,
} from "lucide-react";
import { ReactNode } from "react";

export interface NavItem {
  label: string;
  href: string;
  icon?: ReactNode;
}

export const generalNavItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Find Artisans", href: "/find-artisyns" },
];

export const curatorNavItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/curator/dashboard",
    icon: <Home size={18} />,
  },
  {
    label: "Listings",
    href: "/curator/listings",
    icon: <ListPlus size={18} />,
  },
  {
    label: "Profile",
    href: "/curator/profile",
    icon: <UserIcon size={18} />,
  },
  {
    label: "Archive",
    href: "/curator/archive",
    icon: <Package size={18} />,
  },
];

export const accountNavItems: NavItem[] = [
  {
    label: "Account Settings",
    href: "/curator/account-settings",
    icon: <BoltIcon size={18} />,
  },
  { label: "Saved", href: "/curator/saved", icon: <Files size={18} /> },
  {
    label: "History",
    href: "/curator/history",
    icon: <PaintbrushVerticalIcon size={18} />,
  },
];

export const profileSetupItem: NavItem = {
  label: "Complete Profile Setup",
  href: "/profile-setup",
  icon: <User size={18} />,
};

export const CURATOR_ROUTES = [...curatorNavItems, ...accountNavItems].map(
  (item) => item.href
);
export const FINDER_ROUTES = ["/finder/dashboard"];
export const PROTECTED_ROUTES: string[] = [...CURATOR_ROUTES, ...FINDER_ROUTES];
