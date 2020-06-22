'use strict'

const mysqlx = require('@mysql/xdevapi')

const connectionUri = 'mysqlx://root:ravelredrabbit@localhost:33060/raidboss'
const connectionOptions = {
  pooling: { maxSize: 10, enabled: true }
}
const client = mysqlx.getClient(connectionUri, connectionOptions)

module.exports = client
module.exports.getDefaults = async () => {
  const session = await client.getSession()
  return { session, schema: session.getDefaultSchema() }
}
