import { Handler } from 'express'

import * as admin from 'firebase-admin'

const auth = admin.auth()

export const bearerTokenCheck: Handler = async (req, res, next) => {
  let token
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      console.log('BEGIN BEARERTOKENCHECK')
      token = await auth.verifyIdToken(
        req.headers['authorization'].split(' ')[1]
      )
      console.log('END BEARERTOKENCHECK')
      next()
    } else {
      return res.status(401).send({ error: 'invalid request' })
    }
  } catch (error: any) {
    if (error.code == 'auth/argument-error') {
      return res.status(500).json({ error: error.message })
    } else if (error.code == 'auth/id-token-expired') {
      return res.status(500).json({ error: error.message })
    }
    return res.status(500).json({ error: error.message })
  }
}
