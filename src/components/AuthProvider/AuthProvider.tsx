"use client";
import { useAppDispatch } from "@/hooks";
import { setToken } from "@/lib/store/slices/auth";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      if (pathname !== "/register" && pathname !== "/login") {
        router.push("/login");
      }
      return;
    }
    try {
      jwtDecode<JwtPayload>(token);
      dispatch(setToken(token));

      if (pathname === "/login" || pathname === "/register") {
        router.push("/");
      }
    } catch (error) {
      console.error("Invalid User Token ", error);
      localStorage.removeItem("token");
      dispatch(setToken(null));
      router.push("/login");
    }
  }, [router, dispatch, pathname]);

  return <>{children}</>;
};

export default AuthProvider;
