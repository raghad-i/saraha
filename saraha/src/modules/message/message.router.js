import { Router } from "express";
import * as MassageController from "./message.controller.js";
const massageRouter =Router();
massageRouter.get("/",MassageController.getMassage);
massageRouter.post("/:receiverId",MassageController.sendMassage);


export default massageRouter;