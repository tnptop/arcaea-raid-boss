'use strict'

const db = require('./src/db')
const boss = require('./src/db/query/boss')
const songdata = require('../../ops/songdata')
/*
async function insert () {
  try {
    const session = await db.getSession()
    const schema = session.getDefaultSchema()
    const songPackTable = schema.getTable('song_packs')
    const songTable = schema.getTable('songs')

    const songPacks = (
      await songPackTable
        .select(['id', 'en_name'])
        .execute()
    ).fetchAll().reduce((obj, [id, en_name]) => {
      return Object.assign({}, obj, { [en_name]: id })
    }, {})
    const songInsertQueries = songdata.map(({ id, en, side, pack }) => {
      let sideId = side === 'light' ? 1 : 2
      let packId = songPacks[pack]
      return songTable
        .insert(['name', 'en_name', 'side', 'pack'])
        .values([id, en, sideId, packId])
    })
    console.log(songPacks)
/*
    try {
      await session.startTransaction()
      for (const query of songInsertQueries) {
        await query.execute()
      }
      await session.commit()
    } catch (e) {
      await session.rollback()
    }

    await session.close()
  } catch (e) {
    console.error(e)
  }
}
*/

async function get() {
  let start = new Date().getTime()
  try {
    const session = await db.getSession()
    const schema = session.getDefaultSchema()
    const songTable = schema.getTable('songs')

    const song = (
      await songTable
        .select()
        .where('name = "alexandrite"')
        .execute()
    ).fetchOne()

    console.log(song)
    await session.close()
  } catch (e) {
    console.error(e)
  } finally {
    console.log((new Date().getTime() - start) / 1000)
  }
}

async function collection() {
  try {
    const session = await db.getSession()
    const schema = session.getDefaultSchema()

    // await schema.createCollection('collection')
    const collection = schema.getCollection('collection')

    // await collection.add([{key: 'value'}]).execute()
    console.log((await collection.find('_id = :_id').bind('_id', '00005edcd1980000000000000003').execute()).fetchAll())
    await session.close()
  } catch (e) {
    console.error(e)
  }
}

async function manageBoss() {
  try {
    // await boss.create({
    //   name: 'simpleboss'
    // })
    // console.log(await boss.list(true))
    // await boss.setActive('00005edcd1980000000000000004')
    console.log(await boss.getActive())
  } catch (e) {
    console.error(e)
  } finally {
    await db.close()
  }
}

//insert()
// get()
// collection()
manageBoss()
