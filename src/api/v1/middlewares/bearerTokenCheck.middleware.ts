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
      token = await auth.verifyIdToken(
        req.headers['authorization'].split(' ')[1]
      )
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
