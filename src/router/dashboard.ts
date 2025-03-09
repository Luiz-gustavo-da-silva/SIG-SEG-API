import { Router } from 'express'
import { errorHandler } from '../error-handler'
import authMiddleware from '../middlewares/auth'
import { getDashboardData } from '../controllers/dashboard'

const dashboardRoutes: Router = Router()

dashboardRoutes.get('/', [authMiddleware], errorHandler(getDashboardData))

export default dashboardRoutes