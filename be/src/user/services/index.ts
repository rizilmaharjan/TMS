import { TResetPassword, TUser, TUserResetPassword } from "./../Repository/user.types";
import { TLoginSchema } from "../../schema/login.schema";
import { TRegisterSchema } from "../../schema/user.schema";
import {
  editProfileImage,
  editUser,
  getAllUsers,
  getUser,
  getUserEmail,
  loginUser,
  postUser,
  resetUserPassword,
} from "../Repository";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const createUser = async (user: TRegisterSchema["body"]) => {
  try {
    const response = await postUser(user);
    return response;
  } catch (error) {
    throw new Error("Failed to create a user");
  }
};

export const siginUser = async (user: TLoginSchema["body"]) => {
  try {
    const { status, message, data } = await loginUser(user);
    if (status === 200) {
      const token = jwt.sign(
        {
          userId: data?._id,
          username: data?.username,
        },
        process.env.SECRET_KEY as string
      );
      return { token, status, message };
    }
    return { status, message };
  } catch (error) {
    throw new Error("Failed to sign in user");
  }
};

export const getSingleUser = async (user: TUser) => {
  try {
    const response = await getUser(user);
    return response;
  } catch (error) {
    throw new Error("Failed to get user");
  }
};
export const getUsers = async (user: TUser, filters?:any) => {
  try {
    const response = await getAllUsers(user, filters);
    return response;
  } catch (error) {
    throw new Error("Failed to get user");
  }
};

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});
export const getUserByEmail = async (email: string) => {
  try {
    const { status, message, user } = await getUserEmail(email);
    if (status === 200 && user) {
      const userId = user._id.toString();
      const payload = {
        email: user.email,
        id: userId,
      };
      const token = jwt.sign(payload, process.env.SECRET_KEY as string);
      const resetLink = `http://localhost:5173/reset-password?q=${token}`;

      const mailOptions = {
        from: "maharjanrizil1@gmail.com",
        to: email,
        subject: "password reset",
        html: `
                <p>Hello, </p>
                <p>You have requested to reset your password. Click the link below to reset your password:</p>
                <a href="${resetLink}">Reset Password</a>
                `,
      };

      await transporter.sendMail(mailOptions);
      return { status, message: "password reset email sent successfully" };
    }
    return { status, message };
  } catch (error) {
    throw new Error("Failed to get user");
  }
};

export const editIndividualUser = async (
  user: TRegisterSchema["body"],
  id: string,
) => {
  try {
    const { status, message, editedUser } = await editUser(user, id);
    return { status, message, editedUser };
  } catch (error) {
    throw new Error("Failed to edit user");
  }
};

export const ResetPassword = async(user:TUserResetPassword, body:TResetPassword)=>{
  try {
      const result = await resetUserPassword(user, body)
      return {status:result?.status as number, message:result?.message as string};
      
  } catch (error) {
      throw new Error("Failed to reset password")
      
  }
}

export const editUserProfile = async(id:string, imagePath:string)=>{
  try {
    const {status, message, data} = await editProfileImage(id, imagePath)
    return {status, message, data}
  } catch (error) {
    throw new Error("Failed to edit profile image")

    
  }
}
