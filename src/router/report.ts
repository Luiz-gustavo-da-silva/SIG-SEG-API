import { Router } from 'express'
import { createReport, deleteReport, updateReport, findAllReport } from '../controllers/report'
import { errorHandler } from '../error-handler'

const reportRoutes: Router = Router()

reportRoutes.post('/', errorHandler(createReport))
reportRoutes.delete('/:id', errorHandler(deleteReport))
reportRoutes.put('/update', errorHandler(updateReport))
reportRoutes.get('/', errorHandler(findAllReport))


export default reportRoutes