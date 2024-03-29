import { randomUUID } from 'crypto'
import { Handler } from 'express'
import crypto from 'crypto'

import * as admin from 'firebase-admin'

const db = admin.firestore()

/* the api key flow is as follow: first a key is generated at request 
 when a token is sent to the backend to prove that the user exists
 then an API key is generated by the backend using randomuid, 
 it is sent to the client. A hash of this key is created using crypto
 node module and this hash is stored in Firstore alongside the email address.
 At each request, the used and clear API key is hashed using the same method and
 checked against the database to see if it exists */

export const generateAPIKeys: Handler = async (req, res) => {
  try {
    console.log('IN CONTROLLER')
    const email = req.body.email
    const uuid = randomUUID()
    const uuidBase64 = Buffer.from(uuid).toString('base64')
    const hash = crypto.createHash('sha1').update(uuidBase64).digest('base64')
    console.log('END HASH')

    const querySnapshot = await db
      .collection('users')
      .where('email', '==', email)
      .get()
    console.log('END QUERYSNAPSHOT')
    await db
      .collection('users')
      .doc(querySnapshot.docs[0].id)
      .update({ api: hash })
    console.log('END DB UPDATE')
    return res.status(200).send({ apiKeyUnhashed: uuidBase64 })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ error: 'unexpected error' })
  }
}
