const {Being} = require('./beings.js');


expect.extend({
  toBeOneOf(received, array) {
    const pass = array.includes(received);
    if (pass) {
      return {
        message: () =>
          `expected ${received} to be within ${array}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
        `expected ${received} to be within ${array}`,
        pass: false,
      };
    }
  },
});

describe('Being class', () => {

  let saphire = new Being('Saphire', 'Novice', {Smarts: 'd4', Spirit: 'd6', Agility: 'd8', Strength: 'd10', Vigor: 'd12'}, {Athletics: 'd6', 'Common Knowledge': 'd4', Notice: 'd4', Persuasion: 'd4', Stealth: 'd6', Focus: 'd6',
  Theivery: 'd4', Performance: 'd4', Shooting: 'd4', Fighting: 'd4', Intimidation: 'd6', Boating: 'd6'}, 6, 0
  );

  let leviathan = new Being ('Leviathan', 'Novice', {Smarts: 'd4', Spirit: 'd6', Agility: 'd8 (4)', Strength: 'd20 (10)', Vigor: 'd12'}, {Athletics: 'd6', 'Common Knowledge': 'd4', Notice: 'd4', Persuasion: 'd4', Stealth: 'd6', Focus: 'd6', Theivery: 'd4 (9)', Performance: 'd4', Shooting: 'd4', Fighting: 'd10 (12)', Intimidation: 'd6 (4)', Boating: 'd6'}, 6, 10
  );

  test('New beings should have a name', () => {

    expect(saphire.name).toBe('Saphire');

  })

  test('New beings should have a rank', () => {

    expect(saphire.rank).toBeOneOf(['Novice', 'Seasoned', 'Veteran', 'Heroic', 'Legendary']);

  })

  test('New beings should have derived stats', () => {
    expect(saphire.derivedStats).toMatchObject({Parry: '4', Toughness: '8'})
  })

  test('getAttribute method should get any of the attributes', () => {
    expect(saphire.getAttribute('Smarts')).toBe('d4');
    expect(saphire.getAttribute('Spirit')).toBe('d6');
    expect(saphire.getAttribute('Agility')).toBe('d8');
    expect(saphire.getAttribute('Strength')).toBe('d10');
    expect(saphire.getAttribute('Vigor')).toBe('d12');

  })

  test('getSkill method should return the skill die if the being is skilled', () => {
    expect(saphire.getSkill('Athletics')).toBe('d6');
    expect(saphire.getSkill('Common Knowledge')).toBe('d4');
  })

  test('getSkill method should return d4 - 2 if the being is unskilled', () => {
    expect(saphire.getSkill('Driving')).toBe('d4 (-2)');
    expect(saphire.getSkill('Gambling')).toBe('d4 (-2)');
  })


  test('getDerivedStat should get the proper derived stat', () => {
    expect(saphire.getDerivedStat('Toughness')).toBe('8');
    expect(saphire.getDerivedStat('Parry')).toBe('4');
    expect(saphire.getDerivedStat('Load Limit')).toBe('50')
    expect(leviathan.getDerivedStat('Toughness')).toBe('18 (10)')
  })


  //Tests for getDieValue

  test('getDieValue should return a number', () => {
    expect(typeof saphire.getDieValue('d4')).toBe('number');
  })

  test('getDieValue should get correct results', () => {
    expect(saphire.getDieValue('d4')).toBe(4);
    expect(saphire.getDieValue('d10 (8)')).toBe(10);
    expect(saphire.getDieValue('d20 (12)')).toBe(20);
    expect(saphire.getDieValue('d10 (2)')).toBe(10);

  })

  //Tests for getModifierValue

  test('getModifierValue should return a number', () => {
    expect(typeof saphire.getModifierValue('d6')).toBe('number')
  })

  test('getModifierValue should return correct values', () => {
    expect(saphire.getModifierValue('d6')).toBe(0);
    expect(saphire.getModifierValue('d8 (5)')).toBe(5);
    expect(saphire.getModifierValue('d10 (9)')).toBe(9);
    expect(saphire.getModifierValue('d12 (13)')).toBe(13);
  })

  //Tests for getAttributeValue

  test('getAttributeValue should get correct values', () => {
    expect(saphire.getAttributeValue('Smarts')).toBe(4);
    expect(saphire.getAttributeValue('Strength')).toBe(10);
    expect(leviathan.getAttributeValue('Strength')).toBe(20);
    expect(leviathan.getAttributeValue('Agility')).toBe(8);
  })

  //Tests for getAttributeModifierValue

  test('getAttributeModifierValue should return correct values', () => {
    expect(saphire.getAttributeModifierValue('Agility')).toBe(0);
    expect(leviathan.getAttributeModifierValue('Strength')).toBe(10);
    expect(leviathan.getAttributeModifierValue('Agility')).toBe(4);
  })

  //Test for getSkillModifierValue
  test('getSkillModifierValue should return correct values', () => {

    expect(saphire.getSkillModifierValue('Performance')).toBe(0);
    expect(leviathan.getSkillModifierValue('Fighting')).toBe(12);
    expect(leviathan.getSkillModifierValue('Intimidation')).toBe(4);
    expect(leviathan.getSkillModifierValue('Theivery')).toBe(9);

  })

  //Tests for modifyAttribute

  test('modifyAttribute should add a modifier if none already exists', () => {
    expect(saphire.modifyAttribute('Spirit', -2)).toBe('d6 (-2)')
  })

  test('modifyAttribute should add a modifier to the existing modifier', () => {
    expect(leviathan.modifyAttribute('Agility', 2)).toBe('d8 (6)')
    expect(leviathan.modifyAttribute('Strength', 12)).toBe('d20 (22)');
  })

  //Tests for getSkillValue

  test('getSkillValue should return the correct skill value', () => {
    expect(saphire.getSkillValue('Performance')).toBe(4);
    expect(saphire.getSkillValue('Boating')).toBe(6);
    expect(leviathan.getSkillValue('Theivery')).toBe(4);
    expect(leviathan.getSkillValue('Fighting')).toBe(10);
  })



})