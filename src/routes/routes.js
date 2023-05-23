import { Router } from 'express'
import { getMerchants } from '../controllers/merchants.js'
import { getCatalogs } from '../controllers/catalogs.js'

const routes = Router()

routes.get('/api/v1/merchants', getMerchants)
routes.get('/api/v1/catalogs', getCatalogs)

export default routes