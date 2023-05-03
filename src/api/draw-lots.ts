import { DrawLot, GetListResult } from "@/types"
import { PrivateAPI } from "./base"

export const createDrawLot = () => {
  return PrivateAPI.post<any, { url: string }>({
    path: "draw-lots",
    data: null,
  })
}

export class DrawLotsService {
  static getAll = async () => {
    return PrivateAPI.get<GetListResult<DrawLot>>({
      path: "draw-lots",
    }).then((res) => res.data)
  }

  static getOne = async (path: string) => {
    return PrivateAPI.get<DrawLot>({
      path,
    }).then((res) => res.data)
  }

  static update = async (path: string, { arg }: { arg: Partial<DrawLot> }) => {
    return PrivateAPI.put<DrawLot, DrawLot>({
      path,
      data: arg,
    })
  }
}
