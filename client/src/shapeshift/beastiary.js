
alligator = {
  name: 'Alligator',
  size: 1,
  attributes: {smarts: 'd4', spirit: 'd6', strength: 'd10', agility: 'd4', vigor: 'd10'},
  'skills': {athletics: 'd6', fighting: 'd8', notice: 'd8', stealth: 'd8'},
  derived_stats: {pace: 3, parry: 6, toughness: "9 (2)"},
  special_abilities: {thick_skin: 'armor + 2', aquatic: pace 5, bite: 'Str + d6',
  rollover: 'Grasp prey in jaws and roll. d10 dam on raise'},
  armor: 2
}

bull = {
  name: 'Bull',
  size: 3,
  attributes: {smarts : 'd4', spirit': 'd8', 'strength': 'd12 + 3', 'agility': 'd6', 'vigor': 'd12'},
  skills: {athletics: 'd8', fighting: 'd4', notice: 'd6'},
  derived_stats: {'pace': 7, 'parry': 4, 'toughness': '11 ()'},
  special_abilities: {'horns': 'str + d6'},
  armor: 0
}

cat = {
    name: 'Cat',
    size: -3, #very small
    skills: {athletics: 'd8', stealth: 'd8', notice: 'd6'},
    attributes: {smarts: 'd6', spirit: 'd10', strength: 'd4 - 3', agility: 'd8', vigor: 'd6'},
    derived_stats: {pace: '6', parry: '2', toughness: '2 ()'},
    special_abilities: {bite/claws: 'str', low_light_vision: 'Cats ignore dim and dark penalties'},
    armor: 0
}

eagle = {
    name: 'Eagle',
    size: -3, #very small
    skills: {athletics: 'd8', fighting: 'd6', stealth: 'd8', notice: 'd10'},
    attributes: {smarts: 'd4', spirit: 'd6', strength: 'd4 - 2', agility: 'd8', vigor: 'd6'},
    derived_stats: {pace: '3', parry: '5', toughness: '2 ()'},
    special_abilities: {bite/claws: 'str + d4', flight: 'Eagles can fly at a pace of 48"'},
    armor: 0
}

ven_snake = {name: 'venomous_snake',
    size': -3,
    skills: {athletics: 'd6', fighting: 'd8', notice: 'd12', stealth: 'd8'},
    attributes: {smarts: 'd4', spirit: 'd6', strength: 'd4 - 2', agility: 'd8', vigor: 'd6'},
    derived_stats: {pace: '4', parry: '6', toughness: '2 ()'},
    special_abilities: {bite:'str + 2', Poison: 'GM chooses poison pg (128)'},
    armor: 0
}