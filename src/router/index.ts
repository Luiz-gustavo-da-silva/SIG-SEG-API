import { Router } from "express";
import authRoutes from "./auth";
import reportRoutes from "./report";
import occurrenceRoutes from "./occurrence";

const rootRouter: Router = Router()

rootRouter.use('/auth', authRoutes)
rootRouter.use('/report', reportRoutes)
rootRouter.use('/occurrence', occurrenceRoutes)

export default rootRouter