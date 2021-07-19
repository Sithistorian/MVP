class Being {

  constructor (name, rank, attributes, skills, pace, size) {
    this.name = name,
    this.rank = rank,
    this.attributes = attributes,
    this.skills = skills,
    this.size = size, //this number is actually the toughness modifer that size gives
    this.pace = pace,
    this.derivedStats = this.createDerivedStats()
  }

  getAttribute (attribute) {
    return this.attributes[attribute]
  }

  getSkill (skillName) {
    if (this.skills[skillName]) {
      return this.skills[skillName]
    } else {
      return 'd4 (-2)'
    }
  }

  createDerivedStats () {

    let derivedStats = {};

    derivedStats.Parry = `${2 + (parseInt(this.getSkill('Fighting').substring(1)))/2}`;

    derivedStats.Toughness = `${2 + (parseInt(this.getAttribute('Vigor').substring(1)))/2 + this.size}${this.size ? ` (${this.size})` : ''}`;

    derivedStats['Load Limit'] = `${5 * (parseInt(this.getAttribute('Strength').substring(1)))}`

    return derivedStats;
  }

  getDerivedStat (derivedStat) {
    return this.derivedStats[derivedStat]
  }

}

module.exports = {
  Being
}