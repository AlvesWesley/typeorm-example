import { Router } from 'express'

import ActiveRecord from './ActiveRecord'
import Repository from './Repository'

const routes = Router()

routes.use('/active-record', ActiveRecord)
routes.use('/repository', Repository)

export default routes
