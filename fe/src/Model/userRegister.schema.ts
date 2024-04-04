import {z} from "zod"

export type TUserRegister={
    _id: string;
    fullname: string,
    username: string,
    email: string,
    phone?: number,
    address: string,
    gender: string,
    position: string
    profileImage: string
    createdAt: string
}

