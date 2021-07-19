const { Being } = require('./beings');

class Hero extends Being {

  constructor (name, rank, attributes, skills, pace, size, edges, hinderances, race, gear) {
    super(name, rank, attributes, skills, pace, size),
    this.name = name,
    this.rank = rank,
    this.attributes = attributes,
    this.skills = skills,
    this.size,
    this.edges = edges,
    this.hinderances = hinderances,,
    this.race = race,
    this.gear = gear,
    this.derivedStats = this.createDerivedStats()
  }
}

module.exports = {
  Hero
}