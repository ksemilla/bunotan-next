import {
  CreateMember,
  DrawLot,
  GetListResult,
  Member,
  QueryMember,
} from "@/types"
import { PrivateAPI } from "./base"

export class DrawLotsService {
  static create = () => {
    return PrivateAPI.post<any, { url: string }>({
      path: "draw-lots",
      data: null,
    })
  }

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

export class MembersService {
  static create = (formData: CreateMember) => {
    return PrivateAPI.post<CreateMember, { id: number }>({
      path: "members",
      data: formData,
    })
  }

  static getAll = async (query: QueryMember) => {
    return PrivateAPI.get<Member[]>({
      path: "members",
      query: { drawLot: query.drawLot },
    }).then((res) => res.data)
  }

  static update = (formData: Member) => {
    return PrivateAPI.put<Member, { id: number }>({
      path: `members/${formData.id}`,
      data: formData,
    })
  }

  static delete = (id: number) => {
    return PrivateAPI.delete({
      path: `members/${id}`,
    })
  }
}
