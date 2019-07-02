const Sequelize = require('sequelize')
const db = require('../db')

const Resident = db.define('resident', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  phoneNumber: {
    type: Sequelize.STRING
  },
  imageUrl: {
    type: Sequelize.STRING
  },
  mailingAddress: {
    type: Sequelize.STRING
  }
})

module.exports = Resident
