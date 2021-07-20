const { Being } = require('./beings');

class Hero extends Being {

  constructor (name, rank, attributes, skills, pace, size, edges = {}, hinderances = {}, race, gear = {}) {
    super(name, rank, attributes, skills, pace, size),
    this.name = name,
    this.rank = rank,
    this.attributes = attributes,
    this.skills = skills,
    this.size,
    this.edges = edges,
    this.hinderances = hinderances,
    this.race = race,
    this.gear = gear,
    this.derivedStats = this.createDerivedStats()
  }

  getDieValue(die) {

    let noModifier = /d[4-8]|d\d\d/g;
    let singleWithModifier = /d[4-8] \(\d\)/g;
    let doubleWithModifer = /d\d\d \(\d\d\)/g;

    if (singleWithModifier.test(die)) {

      return parseInt(die.substring(1, 2))

    } else if (doubleWithModifer.test(die)) {

      return parseInt(die.substring(1, 3))

    } else if (noModifier.test(die)) {

      return parseInt(die.substring(1));

    }


  }

  //here die could look like d4 (10)
  getModifierValue(die) {

      let modifier = die.substring(die.length - 4);

      if (modifier.length === 2 || modifier.length === 3) {
        return 0;
      } else if (modifier[0] === ' ') {
        return parseInt(modifier.substring(2));
      } else if (modifier[0] === '(') {
        return parseInt(modifier.substring(1, 3));
      }

    }

  getSkillValue (skillName) {

      let skill = this.getSkill(skillName);

      return this.getDieValue(skill);

    }

  getAttributeValue (attributeName) {

    let attribute = this.getAttribute(attributeName);

    return this.getDieValue(attribute);

  }

  getAttributeModifierValue (attributeName) {
    let attribute = this.getAttribute(attributeName);

   return this.getModifierValue(attribute);
  }

  getSkillModifierValue (skillName) {
    let skill = this.getSkill(skillName);

    return this.getModifierValue(skill);
  }

  modifyAttribute (attributeName, num) {

    return `d${this.getAttributeValue(attributeName)} (${this.getAttributeModifierValue(attributeName) + num})`
  }
}

module.exports = {
  Hero
}