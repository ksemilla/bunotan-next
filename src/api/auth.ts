import { LoginData } from "@/types";
import { PublicApi } from "./base";

export const login = (data: LoginData) => {
  return PublicApi.post<LoginData, { accessToken: string }>({
    path: "auth",
    data,
  });
};

export const verifyToken = (accessToken: string) => {
  return PublicApi.post<{ accessToken: string }, any>({
    path: "auth/verify",
    data: { accessToken },
  });
};
