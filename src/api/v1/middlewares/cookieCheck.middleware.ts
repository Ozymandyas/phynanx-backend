import { Handler } from 'express'

export const cookieCheck: Handler = async (req, res, next) => {
  if (
    req.headers.origin === 'http://localhost:3000' &&
    req.cookies.user === 'public' &&
    req.query.api_key === undefined
  ) {
    req.query.api_key = 'MmU1MTI0MTUtYjhiNS00NjdjLWJhNWItODUyZTM3ZDJkOGNi'
    next()
  } else if (req.query.api_key !== undefined) {
    next()
  } else {
    return res.status(300).json({ error: 'Unauthorized' })
  }
}
