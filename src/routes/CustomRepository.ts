import { Router } from 'express'

import UserController from '../controllers/UserController.CustomRepository'

const routes = Router()

routes.get('/user', UserController.index)
routes.get('/user/:id', UserController.show)
routes.post('/user', UserController.create)
routes.put('/user/:id', UserController.update)
routes.delete('/user/:id', UserController.delete)

export default routes
