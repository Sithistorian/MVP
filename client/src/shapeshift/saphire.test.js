const {Being} = require('./saphire.js');


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
  Theivery: 'd4', Performance: 'd4', Shooting: 'd4', Fighting: 'd4', Intimidation: 'd6', Boating: 'd6'},
  );

  test('New beings should have a name', () => {

    expect(saphire.name).toBe('Saphire');

  })

  test('New beings should have a rank', () => {

    expect(saphire.rank).toBeOneOf(['Novice', 'Seasoned', 'Veteran', 'Heroic']);

  })

  test('New beings getAttribute method should be able to get any of the attributes Agility, Smarts, Strength, Spirit, and Vigor', () => {
    expect(saphire.getAttribute('Smarts')).toBe('d4');
    expect(saphire.getAttribute('Spirit')).toBe('d6');
    expect(saphire.getAttribute('Agility')).toBe('d8');
    expect(saphire.getAttribute('Strength')).toBe('d10');
    expect(saphire.getAttribute('Vigor')).toBe('d12');

  })




})