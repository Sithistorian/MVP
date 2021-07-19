const {Hero} = require('./heros.js');

describe('Hero class', () => {

  let saphire = new Hero('Saphire', 'Novice', {Smarts: 'd4', Spirit: 'd6', Agility: 'd8', Strength: 'd10', Vigor: 'd12'}, {Athletics: 'd6', 'Common Knowledge': 'd4', Notice: 'd4', Persuasion: 'd4', Stealth: 'd6', Focus: 'd6', Theivery: 'd4', Performance: 'd4', Shooting: 'd4', Fighting: 'd4', Intimidation: 'd6', Boating: 'd6'}, 6, 0, ['Attractive'], ['Blind'], 'Changling', ['Chainmail']
  );

  let leviathan = new Hero('Leviathan', 'Novice', {Smarts: 'd4', Spirit: 'd6', Agility: 'd8 (4)', Strength: 'd20 (10)', Vigor: 'd12'}, {Athletics: 'd6', 'Common Knowledge': 'd4', Notice: 'd4', Persuasion: 'd4', Stealth: 'd6', Focus: 'd6', Theivery: 'd4', Performance: 'd4', Shooting: 'd4', Fighting: 'd4', Intimidation: 'd6', Boating: 'd6'}, 6, 0, ['Attractive'], ['Blind'], 'Beast', ['Chainmail']
  );

  test('Hero should have names', () => {
    expect(saphire.name).toBe('Saphire');
  })

  test('Hero should have rank', () => {
    expect(saphire.rank).toBe('Novice');
  })

  test('Hero should have attributes', () => {
    expect(saphire.attributes).toStrictEqual({Smarts: 'd4', Spirit: 'd6', Agility: 'd8', Strength: 'd10', Vigor: 'd12'});
  })

  test('Hero should have skills', () => {
    expect(saphire.skills).toStrictEqual({Athletics: 'd6', 'Common Knowledge': 'd4', Notice: 'd4', Persuasion: 'd4', Stealth: 'd6', Focus: 'd6', Theivery: 'd4', Performance: 'd4', Shooting: 'd4', Fighting: 'd4', Intimidation: 'd6', Boating: 'd6'});
  })

  test('Hero should have pace', () => {
    expect(saphire.pace).toBe(6);
  })

  test('Hero should have size', () => {
    expect(saphire.size).toBe(0);
  })

  test('Hero should have race', () => {
    expect(saphire.race).toBe('Changling');
  })

  test('Hero should have gear', () => {
    expect(saphire.gear).toStrictEqual(['Chainmail']);
  })

  test('Hero should have edges', () => {
    expect(saphire.edges).toStrictEqual(['Attractive']);
  })

  test('Hero should have size', () => {
    expect(saphire.hinderances).toStrictEqual(['Blind']);
  })

  test('Hero should inherit methods from Being', () => {
    expect(saphire.getAttribute('Vigor')).toBe('d12');
    expect(saphire.getSkill('Notice')).toBe('d4');
    expect(saphire.getDerivedStat('Parry')).toBe('4')
  })

  test('Heros should have derivedStats', () => {
    expect(saphire.derivedStats).toStrictEqual({Parry: '4', Toughness: '8', 'Load Limit': '50'})
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

})