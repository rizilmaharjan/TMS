import { userModel } from "../../Model/Users.model";
import { TLoginSchema } from "../../schema/login.schema";
import { TRegisterSchema } from "../../schema/user.schema";
import bcrypt from "bcryptjs";
import { TUser, TUserResetPassword } from "./user.types";
import { TResetPassword } from "./user.types";

export const postUser = async (user: TRegisterSchema["body"]) => {
  try {
    const existingUser = await userModel.findOne({
      $or: [
        { username: user.username },
        { email: user.email },
        { phone: user.phone },
      ],
    });

    if (existingUser) {
      return { status: 409, message: "User already exists" };
    }

    // save user to the database
    const saveUser = new userModel(user);
    await saveUser.save();
    return { status: 201, message: "user registered successfully" };
  } catch (error) {
    return { status: 500, message: "Error occured" };
  }
};

export const loginUser = async (user: TLoginSchema["body"]) => {
  try {
    const { email, password } = user;
    const findUser = await userModel.findOne({ email: email });
    if (!findUser) return { status: 401, message: "Invalid cardentials" };
    const isMatch = await bcrypt.compare(password, findUser.password);
    if (!isMatch) return { status: 401, message: "Invalid cardentials" };

    return {
      status: 200,
      message: "User logged in successfully",
      data: findUser,
    };
  } catch (error: any) {
    // console.log("repository catch block");
    throw new Error(error.message);
    // return { status: 500, message: "Internal server error" };
  }
};

export const getUser = async (user: TUser) => {
  try {
    const getSingleUser = await userModel
      .findById(user.userId)
      .select("-password");
    if (!getSingleUser) return { status: 404, message: "User doesn't exist" };
    return {
      status: 200,
      message: "User fetched successfully",
      data: getSingleUser,
    };
  } catch (error: any) {
    throw new Error(error.message);
    // return { status: 500, message: "Internal server error" };
  }
};
export const getAllUsers = async (user: TUser, filters?: any) => {
  try {
    const { username } = user;

    const getUsers = await userModel.find({
      username: { $ne: username },
      ...(filters ? filters : {}),
    });
    if (!getUsers) return { status: 404, message: "Users don't exist" };
    return {
      status: 200,
      message: "Users fetched successfully",
      data: getUsers,
    };
  } catch (error: any) {
    throw new Error(error.message);
    // return { status: 500, message: error };
  }
};

export const getUserEmail = async (email: string) => {
  try {
    const userEmail = await userModel.findOne({ email: email });
    if (!userEmail) return { status: 404, message: "User does not exist" };
    return {
      status: 200,
      message: "User fetched successfully",
      user: userEmail,
    };
  } catch (error: any) {
    throw new Error(error.message);
    // return { status: 500, messsage: "Internal Server Error" };
  }
};

export const editUser = async (user: TRegisterSchema["body"], id: string) => {
  try {
    const findUser = await userModel.findById(id);
    if (!findUser) return { status: 404, message: "User does not exist" };
    // const hashedPassword = await bcrypt.hash(findUser.password, 12)

    const EditUser = await userModel.findOneAndUpdate(
      { _id: id },
      {
        $set: { ...user },
      },
      { new: true, select: "-password" }
    );
    if (!EditUser) return { status: 404, message: "user not found" };
    console.log("edited user", EditUser);
    return {
      status: 200,
      message: "User updated successfully",
      editedUser: EditUser,
    };
  } catch (error: any) {
    throw new Error(error.message);
    // return { status: 500, message: "Internal Server Error" };
  }
};

export const resetUserPassword = async (
  user: TUserResetPassword,
  body: TResetPassword
) => {
  try {
    const userEmail = await userModel.findOne({ _id: user.id });
    if (!userEmail) return { status: 404, message: "user not found" };
    console.log("this is useremail", userEmail);
    console.log("this is userPassword", body.password);
    const hashedPassword = await bcrypt.hash(body.password, 12);
    const updatePassword = await userModel.findOneAndUpdate(
      { _id: user.id },
      {
        password: hashedPassword,
      },
      { new: true }
    );
    if (updatePassword)
      return { status: 200, message: "password updated successfully" };
  } catch (error: any) {
    throw new Error(error.message);
    // return { status: 500, message: "Error occured" };
  }
};

export const editProfileImage = async (id: string, imagePath: string) => {
  try {
    const user = await userModel.findById(id);
    if (!user) return { status: 404, message: "User not found" };
    const profileImage = "http://localhost:8000/uploads/" + imagePath;
    const editProfileImage = await userModel.findById(id).select("-password");
    if (!editProfileImage)
      return { status: 404, message: "No such profile found" };
    editProfileImage.profileImage = profileImage;
    const savedEditedProfileImage = await editProfileImage.save();
    console.log("editedprofileimage", savedEditedProfileImage);
    return {
      status: 200,
      message: "Profile edited successfully",
      data: savedEditedProfileImage,
    };
  } catch (error: any) {
    throw new Error(error.message);
    // return { status: 500, message: "Internal Server Error" };
  }
};
