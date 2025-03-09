import { Router } from "express";
import authRoutes from "./auth";
import reportRoutes from "./report";
import occurrenceRoutes from "./occurrence";
import dashboardRoutes from "./dashboard";

const rootRouter: Router = Router()

rootRouter.use('/auth', authRoutes)
rootRouter.use('/report', reportRoutes)
rootRouter.use('/occurrence', occurrenceRoutes)
rootRouter.use('/dashboard', dashboardRoutes)

export default rootRouter