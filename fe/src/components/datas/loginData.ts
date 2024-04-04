import { MdEmail } from "react-icons/md";
import { AiFillLock } from "react-icons/ai";
import { IconType } from "react-icons/lib";

type TloginDataItem = {
    id: number;
    title: string;
    type: "text" | "password";
    name: "email" | "password";
    icon: IconType
}

export const loginData: TloginDataItem[] = [
    {
        id: 1,
        title: "Email",
        type: "text",
        name: "email",
        icon: MdEmail
    },  
    {
        id: 2,
        title: "Password",
        type: "password",
        name: "password",
        icon: AiFillLock,

    }
]