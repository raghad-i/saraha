import connectDB from "../../DB/connection.js";
import massageRouter from "./message/message.router.js";
import authRouter from "./Auth/auth.router.js";
import userRouter from "./user/user.router.js";

const initApp=(app,express)=>{
    connectDB();
    app.use(express.json());
    app.use("/auth",authRouter);
    app.use("/user",userRouter);
    app.use("/massage",massageRouter);
    app.use("/*",(req,res)=>{
        return res.json ({message:"page not found"});
    })
}
export default initApp;