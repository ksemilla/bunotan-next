import { PrivateAPI } from "./base";

export const createDrawLot = () => {
  return PrivateAPI.post<any, { url: string }>({
    path: "draw-lots",
    data: null,
  });
};
