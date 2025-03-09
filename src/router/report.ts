import { Router } from 'express'
import { createReport, deleteReport, updateReport, findAllReport, findAllReportPublic } from '../controllers/report'
import { errorHandler } from '../error-handler'
import authMiddleware from '../middlewares/auth'

const reportRoutes: Router = Router()

reportRoutes.post('/', errorHandler(createReport))
reportRoutes.delete('/:id', [authMiddleware], errorHandler(deleteReport))
reportRoutes.put('/update', [authMiddleware], errorHandler(updateReport))
reportRoutes.get('/public', errorHandler(findAllReportPublic))
reportRoutes.get('/', [authMiddleware], errorHandler(findAllReport))


export default reportRoutes