const {Being} = require('./beings.js');

class Hero extends Being {

  constructor (name, rank, attributes, skills, pace, size) {
    super(name, rank, attributes, skills, pace, size),
    this.name = name,
    this.rank = rank,
    this.attributes = attributes,
    this.skills = skills,
    this.size,
    this.derivedStats = this.createDerivedStats()
  }
}

module.exports = {
  Hero
}