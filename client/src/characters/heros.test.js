const {Hero} = require('./heros.js');

describe('Hero class', () => {

  let saphire = new Hero('Saphire', 'Novice', {Smarts: 'd4', Spirit: 'd6', Agility: 'd8', Strength: 'd10', Vigor: 'd12'}, {Athletics: 'd6', 'Common Knowledge': 'd4', Notice: 'd4', Persuasion: 'd4', Stealth: 'd6', Focus: 'd6', Theivery: 'd4', Performance: 'd4', Shooting: 'd4', Fighting: 'd4', Intimidation: 'd6', Boating: 'd6'}, 6, 0, ['Attractive']
  );

  test('Hero should have names', () => {
    expect(saphire.name).toBe('Saphire');
  })

  test('Hero should inherit methods from Being', () => {
    expect(saphire.getAttribute('Vigor')).toBe('d12');
    expect(saphire.getSkill('Notice')).toBe('d4');
    expect(saphire.getDerivedStat('Parry')).toBe('4')
  })

  test('Heros should have derivedStats', () => {
    expect(saphire.derivedStats).toStrictEqual({Parry: '4', Toughness: '8', 'Load Limit': '50'})
  })


})