'use strict'

const DEFAULT_SCHEMA = ['id', 'name', 'side', 'pack', 'en_name', 'en_side', 'en_pack']

const db = require('../')
const utils = require('../../utils')

exports.list = async () => {
  const { session, schema } = await db.getDefaults()
  try {
    const table = schema.getTable('songs_metadata')

    const listQuery = await table.select().orderBy(['en_name']).execute()
    return listQuery.fetchAll().map((song) => utils.applyObjectSchema(song, DEFAULT_SCHEMA))
  } catch (e) {
    throw e
  } finally {
    await session.close()
  }
}

exports.get = async (songName) => {
  const { session, schema } = await db.getDefaults()
  try {
    const table = schema.getTable('songs_metadata')

    const getQuery = await table.select().where(`name = '${songName}'`).execute()
    return utils.applyObjectSchema(getQuery.fetchOne(), DEFAULT_SCHEMA)
  } catch (e) {
    throw e
  } finally {
    await session.close()
  }
}

