import { Router } from "express";
import * as userController from "./user.controller.js";
import auth from "../../middlrware/auth.middlware.js";
import{asyncHandler}from '../../utils/errorHandeling.js'
const userRouter =Router();
userRouter.get("/",userController.getUsers);
userRouter.get("/profile",asyncHandler(auth),asyncHandler( userController.profile));
userRouter.delete("/delete",auth,asyncHandler(userController.deleteuser));
userRouter.patch("/update",auth,asyncHandler(userController.updateuser));
export default userRouter;