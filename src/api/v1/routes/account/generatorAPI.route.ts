import { Router } from 'express'
import { generateAPIKeys } from '../../controllers/account/generatorAPI.controller'
import { bearerTokenCheck } from '../../middlewares/bearerTokenCheck.middleware'
import apicache from 'apicache'

const cache = apicache.middleware
const router = Router()

/**
 * @openapi
 *  /generator:
 *    post:
 *      summary: Generate a new API key given a Firebase auth token provided when connected
 *      tags: [Admin]
 */
router.post(
  '/generator',
  [cache('40 secondes'), bearerTokenCheck],
  generateAPIKeys
)

export default router
