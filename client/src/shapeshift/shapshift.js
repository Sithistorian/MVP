
const beast = require('./beastiary');
const saphire = require('./saphire');

//Helpers

let increaseDieType = function (die) {
  return 'd' + `${parseInt(die.substring(1)) + 2}`;
}

let alterAttributes = function (character, beast) {
  let copy = {...character};

  copy.attributes.strength = beast.attributes.strength;
  copy.attributes.agility = beast.attributes.agility;
  copy.armor = beast.armor;
  copy.parryModifier = beast.parryModifier;

  if (parseInt(copy.attributes.vigor.substring(1)) < parseInt(beast.attributes.vigor.substring(1))) {
    copy.attributes.vigor = beast.attributes.vigor;
  }


  return copy;
}

let alterSkills = function (character, beast) {
  copy = {...character};

  let alterableSkills = ['athletics', 'fighting', 'shooting', 'stealth']

  for (let i = 0; i < alterableSkills.length; i++) {
    let skill = alterableSkills[i]
    if (beast.skills[skill]) {
    copy.skills[skill] = beast.skills[skill];
    }
  }

  return copy;
}

let alterDerivedStats = function (character, beast) {

   copy = {...character};

   copy.derivedStats = {
     pace: beast.derivedStats.pace,
     parry: `${2 + (parseInt(copy.skills.fighting.substring(1)))/2} (${copy.parryModifier})`,
     toughness: `${2 + (parseInt(copy.attributes.vigor.substring(1)))/2} (${copy.armor})`
   }
   return copy;
}

let shapeShift = function (character, beast, raise = false) {

  if (character.rank.value < beast.rank.value) {
    console.log(`Your character's rank is too low`)
    return false;
  }
  let copy = {...character};
  copy = alterAttributes(copy, beast);
  copy = alterSkills(copy, beast);
  copy = alterDerivedStats(copy, beast);

  if (!raise) {
    return copy;
  } else {
    copy.attributes.strength = increaseDieType(copy.attributes.strength);
    copy.attributes.vigor = increaseDieType(copy.attributes.vigor);
    return copy;
  }

}

let transforming = alterAttributes(saphire.saphire, beast.alligator)

console.log(shapeShift(saphire.saphire, beast.alligator, true))
