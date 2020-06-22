'use strict'

const DEFAULT_SCHEMA = ['id', 'name', 'en_name', 'type', 'skill_type']

const db = require('../')
const utils = require('../../utils')

exports.list = async () => {
  const { session, schema } = await db.getDefaults()
  try {
    const table = schema.getTable('partners_metadata')

    const listQuery = await table.select()
      .where(`name like '%hikari%' or name like '%tairitsu%'`)  // to be deleted
      .orderBy(['id']).execute()
    return listQuery.fetchAll().map((song) => utils.applyObjectSchema(song, DEFAULT_SCHEMA))
  } catch (e) {
    throw e
  } finally {
    await session.close()
  }
}

exports.get = async (partnerName) => {
  const { session, schema } = await db.getDefaults()
  try {
    const table = schema.getTable('partners_metadata')

    const getQuery = await table.select().where(`name = '${partnerName}'`).execute()
    return utils.applyObjectSchema(getQuery.fetchOne(), DEFAULT_SCHEMA)
  } catch (e) {
    throw e
  } finally {
    await session.close()
  }
}
