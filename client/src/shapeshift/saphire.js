
class Being {

  constructor (name, rank, attributes, skills, pace, size) {
    this.name = name,
    this.rank = rank,
    this.attributes = attributes,
    this.skills = skills,
    this.pace,
    this.size
  }

  getAttribute (attribute) {
    return this.attributes[attribute]
  }

}

const saphire = {
  name: 'Saphire',
  rank: {rank: 'Novice', value: 3},
  attributes: {Smarts: 'd6', Spirit: 'd6', Agility: 'd6', Strength: 'd6', Vigor: 'd6'},
  derivedStats: {Pace: 6, Parry: '6 (2)', Toughness: '5 (2)', Encumberance: 40},
  skills: {Athletics: 'd6', 'Common Knowledge': 'd4', Notice: 'd4', Persuasion: 'd4', Stealth: 'd6', Focus: 'd6',
  Theivery: 'd4', Performance: 'd4', Shooting: 'd4', Fighting: 'd4', Intimidation: 'd6', Boating: 'd6'},
  Armor: 2,
  ParryModifier: 2
}

module.exports = {
  saphire,
  Being
}