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

  let leviathan = new Being('Leviathan', 'Novice', {Smarts: 'd4', Spirit: 'd6', Agility: 'd8', Strength: 'd10', Vigor: 'd12'}, {Athletics: 'd6', 'Common Knowledge': 'd4', Notice: 'd4', Persuasion: 'd4', Stealth: 'd6', Focus: 'd6',
  Theivery: 'd4', Performance: 'd4', Shooting: 'd4', Fighting: 'd4', Intimidation: 'd6', Boating: 'd6'}, 6, 10
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
    expect(saphire.getSkill('Driving')).toBe('d4 - 2');
    expect(saphire.getSkill('Gambling')).toBe('d4 - 2');
  })


  test('getDerivedStat should get the proper derived stat', () => {
    expect(saphire.getDerivedStat('Toughness')).toBe('8');
    expect(saphire.getDerivedStat('Parry')).toBe('4');
    expect(saphire.getDerivedStat('Load Limit')).toBe('50')
    expect(leviathan.getDerivedStat('Toughness')).toBe('18 (10)')
  })



})