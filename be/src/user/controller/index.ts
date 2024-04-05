import { NextFunction, Request, Response } from "express";
import {
  ResetPassword,
  createUser,
  editIndividualUser,
  editUserProfile,
  getSingleUser,
  getUserByEmail,
  getUsers,
  siginUser,
} from "../services";
import { TRegisterSchema } from "../../schema/user.schema";
import { TLoginSchema } from "../../schema/login.schema";
import { catchAsync } from "../../utils/catchAsync";
import { appError } from "../../utils/appError";

export const postUser = catchAsync(
  async (req: Request<{}, {}, TRegisterSchema["body"]>, res: Response) => {
    const body = req.body;
    const response = await createUser(body);
    return res.status(response.status).json({ message: response.message });
  }
);

export const loginUser = catchAsync(
  async (
    req: Request<{}, {}, TLoginSchema["body"]>,
    res: Response,
    next: NextFunction
  ) => {
    const body = req.body;
    const { token, status, message } = await siginUser(body);
    if (status === 401) {
      next(new appError(status, "Invalid email or password"));
    }
    return res.status(status).json({ message: message, token: token });
  }
);

export const getUser = catchAsync(async (req: Request, res: Response) => {
  const user = res.locals.user;
  // console.log(user)

  const { status, message, data } = await getSingleUser(user);
  return res.status(status).json({ message: message, data: data });
});
export const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const user = res.locals.user;
  const { searchMember } = req.query;
  const searchRegex = searchMember
    ? new RegExp(searchMember as string, "i")
    : undefined;

  const filters = searchRegex
    ? {
        fullname: searchRegex,
      }
    : {};

  const { status, message, data } = await getUsers(user, filters);
  return res.status(status).json({ message: message, data: data });
});

export const forgotPassword = catchAsync(
  async (req: Request, res: Response) => {
    const { email } = req.body;
    console.log(email);
    const { status, message } = await getUserByEmail(email);
    console.log(status, message);
    return res.status(status).json({ message: message });
  }
);

export const editUser = catchAsync(async (req: Request, res: Response) => {
  const user = res.locals.user;
  console.log("profile edit", req.body);
  const { userId } = user;
  const { status, message, editedUser } = await editIndividualUser(
    { ...req.body },
    userId
  );
  return res.status(status).json({ message: message, editedUser: editedUser });
});

export const resetpassword = catchAsync(async (req: Request, res: Response) => {
  const user = res.locals.user;
  console.log(user);
  console.log(req.body);
  const { status, message } = await ResetPassword(user, { ...req.body });
  return res.status(status).json({ message: message, status: status });
});

export const editProfileImage = catchAsync(
  async (req: Request, res: Response) => {
    let imagePath = "";
    if (req.file) {
      imagePath = req.file.filename;
    }
    const { userId } = res.locals.user;
    const { status, message, data } = await editUserProfile(userId, imagePath);
    console.log("data", data);
    return res.status(status).json({ message: message, data: data });
  }
);
