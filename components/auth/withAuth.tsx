"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRole, Role } from "@/app/context/role-context";

interface WithAuthOptions {
  requireAuth?: boolean;
  requiredRole?: Role;
  requireProfileComplete?: boolean;
  allowedRoles?: Role[];
}

export function withAuthentication<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function AuthenticatedComponent(props: P) {
    const router = useRouter();
    const { isAuthenticated, isLoading } = useRole();

    useEffect(() => {
      if (isLoading) return;

      if (!isAuthenticated) {
        router.replace("/connect-wallet");
        return;
      }
    }, [isLoading, isAuthenticated, router]);

    if (isLoading || !isAuthenticated) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Authenticating...</p>
          </div>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
}

export function withAuthorization<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: WithAuthOptions = {}
) {
  return function AuthorizedComponent(props: P) {
    const router = useRouter();
    const { isAuthenticated, userRole, isProfileComplete, isLoading } =
      useRole();

    const {
      requireAuth = true,
      requiredRole,
      requireProfileComplete = false,
      allowedRoles,
    } = options;

    useEffect(() => {
      if (isLoading) return;

      if (requireAuth && !isAuthenticated) {
        router.replace("/connect-wallet");
        return;
      }

      if (requireAuth && !userRole) {
        router.replace("/account-type");
        return;
      }

      if (requiredRole && userRole !== requiredRole) {
        if (userRole === "curator") {
          router.replace("/curator/dashboard");
        } else if (userRole === "finder") {
          router.replace("/finder/dashboard");
        } else {
          router.replace("/account-type");
        }
        return;
      }

      if (allowedRoles && !allowedRoles.includes(userRole!)) {
        if (userRole === "curator") {
          router.replace("/curator/dashboard");
        } else if (userRole === "finder") {
          router.replace("/finder/dashboard");
        } else {
          router.replace("/account-type");
        }
        return;
      }

      if (requireProfileComplete && !isProfileComplete) {
        router.replace("/profile-setup");
        return;
      }
    }, [
      isLoading,
      isAuthenticated,
      userRole,
      isProfileComplete,
      router,
      requireAuth,
      requiredRole,
      allowedRoles,
      requireProfileComplete,
    ]);

    if (
      isLoading ||
      (requireAuth && !isAuthenticated) ||
      (requireAuth && !userRole) ||
      (requiredRole && userRole !== requiredRole) ||
      (allowedRoles && userRole && !allowedRoles.includes(userRole)) ||
      (requireProfileComplete && !isProfileComplete)
    ) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">
              {!isAuthenticated ? "Authenticating..." : "Authorizing..."}
            </p>
          </div>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
}

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: WithAuthOptions = {}
) {
  const AuthenticatedComponent = withAuthentication(WrappedComponent);
  return withAuthorization(AuthenticatedComponent, options);
}

export const withCuratorAuth = <P extends object>(
  Component: React.ComponentType<P>
) =>
  withAuth(Component, {
    requireAuth: true,
    requiredRole: "curator",
    requireProfileComplete: true,
  });

export const withFinderAuth = <P extends object>(
  Component: React.ComponentType<P>
) =>
  withAuth(Component, {
    requireAuth: true,
    requiredRole: "finder",
    requireProfileComplete: true,
  });

export const withAuthOnly = <P extends object>(
  Component: React.ComponentType<P>
) => withAuthentication(Component);

export const withRoleAuth = <P extends object>(
  Component: React.ComponentType<P>
) =>
  withAuth(Component, {
    requireAuth: true,
    requireProfileComplete: false,
    allowedRoles: ["curator", "finder"],
  });

export const withPublicAccess = <P extends object>(
  Component: React.ComponentType<P>
) => withAuth(Component, { requireAuth: false });
