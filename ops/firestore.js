'use strict'

const Firestore = require('@google-cloud/firestore')
const songmetadata = require('./songdata')

const firestore = new Firestore({
  projectId: 'tnptop-playground'
})

const collectionName = 'aracea-song-metadata'

async function main() {
  let start = new Date().getTime()
  const collectionRef = firestore.collection(collectionName)

/*
  for (let song of songmetadata) {
    let doc = await collectionRef.doc(song.id).get()
    console.log(doc.exists)
    if (!doc.exists)
      await collectionRef.doc(song.id).create(song)
  }
 */

  console.log((await collectionRef.doc('alexandrite').get()).data())
  console.log((new Date().getTime() - start) / 1000)
}

main()
