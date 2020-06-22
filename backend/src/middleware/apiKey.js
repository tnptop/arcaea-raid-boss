'use strict'

exports.checkApiKey = (req, res, next) => {
  const reqApiKey = req.headers['x-api-key']

  return reqApiKey === process.env.API_KEY ? next() : next({})
}
