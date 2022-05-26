import { Handler } from 'express'
import crypto from 'crypto'

import * as admin from 'firebase-admin'

const db = admin.firestore()

export const apiKeyCheck: Handler = async (req, res, next) => {
  if (req.query.api_key) {
    const apiKeyBase64 = req.query.api_key as string
    const apiKeyBase64Hashed = crypto
      .createHash('sha1')
      .update(apiKeyBase64)
      .digest('base64')

    try {
      const querySnapshot = await db
        .collection('users')
        .where('api', '==', apiKeyBase64Hashed)
        .get()

      if (!querySnapshot.empty) {
        await db
          .collection('users')
          .doc(querySnapshot.docs[0].id)
          .update({ apiUsage: admin.firestore.FieldValue.increment(1) })
        next()
      } else {
        return res.status(401).send({ error: 'invalid key' })
      }
    } catch (error) {
      console.log(error)
    }
  } else {
    return res.status(401).send({ error: 'no api key' })
  }
}
