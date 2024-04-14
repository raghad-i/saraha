import { Router } from "express";
import * as authController from "./auth.controller.js";
import validation from "../../middlrware/validation.js";
import { signinSchema, signupSchema } from "./auth.validation.js";
import{asyncHandler}from '../../utils/errorHandeling.js'

const authRouter =Router();
authRouter.post("/signup",validation(signupSchema),asyncHandler(authController.signUp));
authRouter.post("/signin",validation(signinSchema),asyncHandler(authController.signIn));
authRouter.post("/confirmEmail/:token",asyncHandler(authController.confirmEmail));

export default authRouter;