import { LoginData } from "@/types";
import { PublicApi } from "./base";

export class UsersService {
  static create(data: LoginData) {
    return PublicApi.post<LoginData, { id: number }>({
      path: "users",
      data,
    });
  }
}
