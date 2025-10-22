import type { PropsWithChildren } from "react";
import { useAuthStore } from "../store/auth.store";
import { useQuery } from "@tanstack/react-query";
import { CustomFullScreenLoading } from "../components/CustomFullScreenLoading";
import { Navigate } from "react-router";

export const CheckAuthProvider = ({ children }: PropsWithChildren) => {
  const { checkAuthStatus } = useAuthStore();
  const { isLoading,isError  } = useQuery({
    queryKey: ["auth"],
    queryFn: checkAuthStatus,
    retry: false,
    refetchInterval: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });
  if (isLoading) return <CustomFullScreenLoading />;
  if (isError) return <Navigate to="/auth/login" />;

  return children;
};
