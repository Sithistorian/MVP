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

  getAttributeValue (attributeName) {

    let noModifier = /d[4-8]|d\d\d/g;
    let singleWithModifier = /d[4-8] \(\d\)/g;
    let doubleWithModifer = /d\d\d \(\d\d\)/g;

    let attribute = this.getAttribute(attributeName);

    if (singleWithModifier.test(attribute)) {

      return parseInt(attribute.substring(1, 2))

    } else if (doubleWithModifer.test(attribute)) {

      return parseInt(attribute.substring(1, 3))

    } else if (noModifier.test(attribute)) {

      return parseInt(attribute.substring(1));

    }


  }

  getAttributeModifierValue (attributeName) {
    let attribute = this.getAttribute(attributeName);

    let modifier = attribute.substring(attribute.length - 4);

    if (modifier.length === 2 || modifier.length === 3) {
      return 0;
    } else if (modifier[0] === ' ') {
      return parseInt(modifier.substring(2));
    } else if (modifier[0] === '(') {
      return parseInt(modifier.substring(1, 3));
    }

  }

  modifyAttribute (attribute, num) {
    let baseDie = this.attributes[attribute];

    //regex for d6 (2) or d20 (14) type cases
    let dieRegex = /d[1-9][0-9] \([0-9]|[0-9][0-9]\)|d[4-8] \(\d\)/g;

    if (!dieRegex.test(baseDie)) {
      let baseValue = baseDie.substring(1);
      this.attributes[attribute] = `d${baseValue + num} (${num})`
    } else {


    }
  }


}

module.exports = {
  Hero
}