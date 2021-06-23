import React from 'react';
import Transformed from './Transformed';

const Dropdown = function ({ options, onSubmit, beastAttempt, rankTooLow, onChange, raise, updateSpellDuration, characterName, spellDuration, getCharacter }) {

  let count = spellDuration <= 6 ? spellDuration : 0;

  return (
    <React.Fragment>
    <form onSubmit={onSubmit}>
    <Transformed beastAttempt={beastAttempt} rankTooLow={rankTooLow}/>
    <select id="selectedBeast">
      <option value={'select'} key={'select'}>--Select Your Beast---</option>
      {
        Object.entries(options).map(option => {
          return <option value={option[0]} key={option}>{option[1].name}</option>
        })
      }
    </select>
    <input type="submit"/>
    <div>
      [Optional] Did you get a Raise?
      Yes<input type="radio" value={1} checked={raise == 1} onChange={onChange}/>
      No<input type="radio" value={0} checked={raise == 0} onChange={onChange}/>
    </div>
    </form>
    Spell Duration - One round = 10 seconds. Spell Lasts 1 minute:
    <button onClick={(e) => {
      e.preventDefault();
      updateSpellDuration(characterName, count + 1)
      if (count === 6) {
        getCharacter(characterName);
      }
      }}>{count}</button>
    </React.Fragment>
  )
}

export default Dropdown;