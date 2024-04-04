import { Router } from "express";
import { editProfileImage, editUser, getAllUsers, getUser, postUser } from "./controller";
import { validateResource } from "../middleware/validateResource";
import { RegisterSchema } from "../schema/user.schema";
import { verifyToken } from "../middleware/authenticate";
import { upload } from "../middleware/multer";

const router = Router();

const routes = ()=>{
    router.post("/v1/users", validateResource(RegisterSchema), postUser)
    router.get("/v1/users", verifyToken, getAllUsers)
    router.get("/v1/users/me", verifyToken, getUser)
    router.put("/v1/users/me", verifyToken, editUser)
    // router.post("/v1/users/me/profileImage", verifyToken, upload.single("profileImg"), editProfileImage)
    return router;


}

export default routes;