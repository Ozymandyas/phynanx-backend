import { Router } from 'express'
import { getNombreParts } from '../../controllers/partsFoyer/nombreParts.controller'
import { apiKeyCheck } from '../../middlewares/apiKeyCheck.middleware'
import { cookieCheck } from '../../middlewares/cookieCheck.middleware'

const router = Router()

/**
 * @openapi
 *  /income-splitting
 *    post:
 *      summary: Compute number of parts given all information
 *      tags: [Income Splitting]
 *
 */
router.post('/income-splitting', [cookieCheck, apiKeyCheck], getNombreParts)

export default router
