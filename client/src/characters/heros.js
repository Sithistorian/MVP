const { Being } = require('./beings');

class Hero extends Being {

  constructor (name, rank, attributes, skills, pace, size, edges, hinderances) {
    super(name, rank, attributes, skills, pace, size),
    this.name = name,
    this.rank = rank,
    this.attributes = attributes,
    this.skills = skills,
    this.size,
    this.edges = edges,
    this.hinderances = hinderances,
    this.derivedStats = this.createDerivedStats()
  }
}

module.exports = {
  Hero
}