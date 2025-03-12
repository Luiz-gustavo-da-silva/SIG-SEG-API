import { Router } from 'express'
import { createOccurrence, deleteOccurrence, updateOccurrence, findAllOccurrence, findAllOccurrencePublic } from '../controllers/occurrence' 
import { errorHandler } from '../error-handler'
import authMiddleware from '../middlewares/auth'

const occurrenceRoutes: Router = Router()

occurrenceRoutes.post('/', [authMiddleware], errorHandler(createOccurrence))
occurrenceRoutes.delete('/:id', [authMiddleware], errorHandler(deleteOccurrence))
occurrenceRoutes.put('/update', [authMiddleware], errorHandler(updateOccurrence))
occurrenceRoutes.get('/', [authMiddleware], errorHandler(findAllOccurrence))
occurrenceRoutes.get('/public', errorHandler(findAllOccurrencePublic))


export default occurrenceRoutes