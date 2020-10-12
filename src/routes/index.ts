import { Router } from 'express'

import ActiveRecord from './ActiveRecord'

const routes = Router()

routes.use('/active-record', ActiveRecord)

export default routes
