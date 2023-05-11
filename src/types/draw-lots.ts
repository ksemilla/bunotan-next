import { User } from "./users"

export type DrawLot = {
  id: number
  owner: User
  name?: string
  members: Member[]
}

export type Member = {
  uuid?: string
  id: number
  drawLot: Partial<DrawLot>
  name: string
  email?: string
}

export type CreateMember = {
  drawLot: number
  name: string
  email?: string
}

export type QueryMember = {
  drawLot: number
}
