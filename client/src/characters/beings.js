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

    this.attributes[attributeName] = `d${this.getAttributeValue(attributeName)} (${this.getAttributeModifierValue(attributeName) + num})`
  }

}

module.exports = {
  Being
}