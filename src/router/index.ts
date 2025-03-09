import { Router } from "express";
import authRoutes from "./auth";
import reportRoutes from "./report";

const rootRouter: Router = Router()

rootRouter.use('/auth', authRoutes)
rootRouter.use('/report', reportRoutes)

export default rootRouter