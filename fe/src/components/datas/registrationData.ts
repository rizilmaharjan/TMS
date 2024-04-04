// registration form 
import { FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BiSolidContact } from "react-icons/bi";
import { AiFillLock } from "react-icons/ai";
import { IconType } from "react-icons/lib";
type TRegisterData = {
  id: number;
  title: string;
  placeholder: string;
  type: "text" | "email" | "number" | "password";
  name: "fullname" | "username" | "email" | "phone" | "password" | "confirmPassword"
  icon: IconType
}
export const registerData:TRegisterData[] = [
    {
      id: 1,
      title: "Full Name",
      placeholder: "Enter your name",
      type: "text",
      name: "fullname",
      icon: FaUserAlt
      
    },
    {
      id: 2,
      title: "Username",
      placeholder: "Enter your Username",
      type: "text",
      name: "username",
      icon: FaUserAlt

      
    },
    {
      id: 3,
      title: "Email",
      placeholder: "Enter your Email",
      type: "email",
      name: "email",
      icon: MdEmail


      
    },
    {
      id: 4,
      title: "Phone Number",
      placeholder: "Enter your number",
      type: "number",
      name: "phone",
      icon: BiSolidContact

      
    },
    {
      id: 5,
      title: "Password",
      placeholder: "Enter your password",
      type: "password",
      name: "password",
      icon: AiFillLock,

      
    },
    {
      id: 6,
      title: "Confirm Password",
      placeholder: "Confirm your password",
      type: "password",
      name: "confirmPassword",
      icon: AiFillLock

      
    },
  ]