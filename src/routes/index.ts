import { Router } from 'express'

import ActiveRecord from './ActiveRecord'
import Repository from './Repository'
import Manager from './Manager'

const routes = Router()

routes.use('/active-record', ActiveRecord)
routes.use('/repository', Repository)
routes.use('/manager', Manager)

export default routes
