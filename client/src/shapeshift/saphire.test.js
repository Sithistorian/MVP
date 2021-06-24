const Beings = require('./saphire.js');


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

  let saphire = new Beings.Being('Saphire', 'novice', {Smarts: 'd6', Spirit: 'd6', Agility: 'd6', Strength: 'd6', Vigor: 'd6'}, {Athletics: 'd6', 'Common Knowledge': 'd4', Notice: 'd4', Persuasion: 'd4', Stealth: 'd6', Focus: 'd6',
  Theivery: 'd4', Performance: 'd4', Shooting: 'd4', Fighting: 'd4', Intimidation: 'd6', Boating: 'd6'},
  );

  test('New beings should have a name', () => {

    expect(saphire.name).toBe('Saphire');

  })

  test('New beings should have a rank', () => {

    expect(saphire.rank).toBeOneOf(['Novice', 'Seasoned', 'Veteran', 'Heroic']);

  })




})