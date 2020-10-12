import { Router } from 'express'

import ActiveRecord from './ActiveRecord'
import Repository from './Repository'
import Manager from './Manager'
import QueryBuilder from './QueryBuilder'

const routes = Router()

routes.use('/active-record', ActiveRecord)
routes.use('/repository', Repository)
routes.use('/manager', Manager)
routes.use('/query-builder', QueryBuilder)

export default routes
