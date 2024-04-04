import { Router } from "express";
import { validateResource } from "../middleware/validateResource";
import { forgotPassword, loginUser, resetpassword } from "../user/controller";
import { LoginSchema } from "../schema/login.schema";
import { verifyToken } from "../middleware/authenticate";

const router = Router();

const routes = ()=>{
    router.post("/v1/auth", validateResource(LoginSchema), loginUser)
    router.post("/v1/auth/forgot-password", forgotPassword)
    router.post("/v1/auth/resetpassword", verifyToken, resetpassword)

    return router;


}

export default routes;