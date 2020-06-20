'use strict'

const db = require('../')

const base_boss_params = {
  health: 10000,
  shield: 9200000, // Grade A, a bare minimum shield value
  weakness: [], // A list of song_ids marked as this boss' weaknesses (*1.3)
  greater_weakness: [], // A list of song_ids marked as this boss' greater weaknesses (*1.5)
  resistance: [], // A list of song_ids marked as this boss' resistances (*0.7)
  greater_resistance: [], // A list of song_ids marked as this boss' greater resistances (*0)
}

/*
exports.list = async (requireDetail) => {
  try {
    const session = await db.getSession()
    const schema = session.getDefaultSchema()
    const table = schema.getTable('bosses')
    const collection = schema.getCollection('boss_parameters')
    const activeCollection = schema.getCollection('active_boss_parameters')

    const getQuery = await table.select().execute()
    const bosses = getQuery.fetchAll()

    if (requireDetail) {
      const bossDetails = (await collection.find().execute()).fetchAll()
      const activeBossId = bosses.find(([id, c_id, name, is_active]) => is_active)[1]
      console.log(activeBossId)
      // const activeBossDetail = (await activeCollection.getOne(activeBossId)).fetchOne()
    }

    await session.close()
    return bosses
  } catch (e) {
    throw e
  }
}
*/

exports.get = async (bossId) => {
  try {
    const { session, schema } = await db.getDefaults()
    const table = schema.getTable('bosses')

    const getQuery = await table.select(['is_active']).where(`_id = '${bossId}'`).execute()
    const isActive = getQuery.fetchOne()[0]
    const collection = schema.getCollection(`${isActive ? 'active_' : ''}boss_parameters`)
    const boss = await collection.getOne(bossId)
    await session.close()
    return boss
  } catch (e) {
    throw e
  }
}

exports.create = async (bossParams) => {
  try {
    const { session, schema } = await db.getDefaults()
    const table = schema.getTable('bosses')
    const collection = schema.getCollection('boss_parameters')

    const insert = await collection.add([
      Object.assign({}, base_boss_params, bossParams)
    ]).execute()
    const newBossParamsId = insert.getGeneratedIds()[0]
    await table
      .insert(['_id', 'name', 'is_active'])
      .values([newBossParamsId, bossParams.name, false])
      .execute()
    await session.close()
    return newBossParamsId
  } catch (e) {
    throw e
  }
}

exports.getActive = async () => {
  try {
    const { session, schema } = await db.getDefaults()
    const table = schema.getTable('bosses')
    const collection = schema.getCollection('active_boss_parameters')

    const query = await table.select(['_id']).where('is_active = 1').execute()
    const activeBossId = query.fetchOne()[0]
    const currBossParams = await collection.getOne(activeBossId)
    await session.close()
    return currBossParams
  } catch (e) {
    throw e
  }
}

exports.setActive = async (bossId) => {
  try {
    const { session, schema } = await db.getDefaults()
    const table = schema.getTable('bosses')
    const collection = schema.getCollection('boss_parameters')
    const activeCollection = schema.getCollection('active_boss_parameters')

    const boss_params = await collection.getOne(bossId)
    await activeCollection.add(boss_params).execute()
    await table.update().where(`_id = '${bossId}'`).set('is_active', 1).execute()
    await session.close()
  } catch (e) {
    throw e
  }
}

exports.updateActive = async (bossId, updateBossParams) => {
  try {
    const { session, schema } = await db.getDefaults()
    const collection = schema.getCollection('active_boss_parameters')

    await collection.replaceOne(bossId, updateBossParams)
    await session.close()
  } catch (e) {
    throw e
  }
}

/*
exports.setActiveParams = async (bossParams) => {
  try {
    const session = await db.getSession()
    const schema = session.getDefaultSchema()
    const table = schema.getTable('bosses')
    const collection = schema.getCollection('active_boss_parameters')

    const tableQuery = await table.select().where('is_active = 1').execute()
    if (tableQuery.fetchOne().length) {
      return false // indicating there is already an active boss
    }

    await collection.add(bossParams).execute()
    await session.close()
    return true // indicating the new boss is successfully set as active
  } catch (e) {
    throw e
  }
}
*/
