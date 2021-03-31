
const beast = require('./beastiary');
const saphire = require('./saphire');

//Helpers

let increaseDieType = function (die) {
  return 'd' + `${parseInt(die.substring(1)) + 2}`;
}

let alterAttributes = function (character, beast) {
  // let copy = Object.assign({}, character)
  // let copy = {...character}
  let copy = JSON.parse(JSON.stringify(character));

  copy.attributes.Strength = beast.attributes.strength;
  copy.attributes.Agility = beast.attributes.agility;
  copy.Armor = beast.armor;
  copy.ParryModifier = beast.parryModifier;

  if (parseInt(copy.attributes.Vigor.substring(1)) < parseInt(beast.attributes.vigor.substring(1))) {
    copy.attributes.Vigor = beast.attributes.vigor;
  }
  return copy;
}

let alterSkills = function (character, beast) {
  let copy = JSON.parse(JSON.stringify(character));

  let alterableSkills = ['Athletics', 'Fighting', 'Shooting', 'Stealth']

  for (let i = 0; i < alterableSkills.length; i++) {
    let skill = alterableSkills[i]
    if (beast.skills[skill]) {
    copy.skills[skill] = beast.skills[skill];
    }
  }

  return copy;
}

let alterDerivedStats = function (character, beast) {

  let copy = JSON.parse(JSON.stringify(character));

   copy.derivedStats = {
     Pace: beast.derivedStats.pace,
     Parry: `${2 + (parseInt(copy.skills.Fighting.substring(1)))/2} (${copy.ParryModifier})`,
     Toughness: `${2 + (parseInt(copy.attributes.Vigor.substring(1)))/2} (${copy.Armor})`
   }
   return copy;
}

let shapeShift = function (character, beast, raise = false) {

  if (character.rank.value < beast.rank.value) {
    console.log(`Your character's rank is too low`)
    return false;
  }
  let copy = JSON.parse(JSON.stringify(character));
  copy = alterAttributes(copy, beast);
  copy = alterSkills(copy, beast);
  copy = alterDerivedStats(copy, beast);

  if (!raise) {
    console.log('copy:', copy, 'SAPHIRE:', character)
    return copy;
  } else {
    copy.attributes.Strength = increaseDieType(copy.attributes.strength);
    copy.attributes.Vigor = increaseDieType(copy.attributes.vigor);

    return copy;
  }

}

module.exports = {
  shapeShift
}