'use strict'

const partnerDb = require('../db/query/partner')

exports.listPartners = async (req, res, next) => {
  try {
    const partners = await partnerDb.list()

    res.status(200).json({partners: partners.filter((partner) => ![18, 24].includes(partner.id))})
    // res.status(200).json({ partners })
  } catch (e) {
    next(e)
  }
}

exports.getPartner = async (req, res, next) => {
  try {
    const {name} = req.params
    const partner = await partnerDb.get(name)

    res.status(200).json({partner})
  } catch (e) {
    next(e)
  }
}
