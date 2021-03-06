const Sequelize = require('sequelize')
const db = require('../db')

const Ticket = db.define('ticket', {
  location: {
    type: Sequelize.STRING,
    allowNull: false
  },
  formDate: {
    type: Sequelize.DATE
  },
  issue: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  neighbor: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  photoUrl: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.ENUM(
      'pending',
      'approved',
      'rejected',
      'in-progress',
      'finished',
      'confirmed',
      'closed'
    ),
    defaultValue: 'pending',
    allowNull: false
  }
})

module.exports = Ticket
