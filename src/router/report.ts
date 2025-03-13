import { Router } from 'express'
import { createReport, deleteReport, updateReport, findAllReport, findAllReportPublic, findReport, findAllReportSimple, findAllReportSimpleComplet } from '../controllers/report'
import { errorHandler } from '../error-handler'
import authMiddleware from '../middlewares/auth'

const reportRoutes: Router = Router()

reportRoutes.post('/', errorHandler(createReport))
reportRoutes.delete('/:id', [authMiddleware], errorHandler(deleteReport))
reportRoutes.put('/update', [authMiddleware], errorHandler(updateReport))
reportRoutes.get('/public/:code', errorHandler(findReport))
reportRoutes.get('/simple', [authMiddleware], errorHandler(findAllReportSimple))
reportRoutes.get('/complet', [authMiddleware], errorHandler(findAllReportSimpleComplet))

//reportRoutes.get('/public', errorHandler(findAllReportPublic))

reportRoutes.get('/', [authMiddleware], errorHandler(findAllReport))


export default reportRoutes