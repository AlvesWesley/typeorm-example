import { Router } from 'express'

import ActiveRecord from './ActiveRecord'
import Repository from './Repository'
import Manager from './Manager'
import QueryBuilder from './QueryBuilder'
import CustomRepository from './CustomRepository'

const routes = Router()

routes.use('/active-record', ActiveRecord)
routes.use('/repository', Repository)
routes.use('/manager', Manager)
routes.use('/query-builder', QueryBuilder)
routes.use('/custom-repository', CustomRepository)

export default routes
