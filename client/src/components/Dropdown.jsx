import React from 'react';

const Dropdown = function ({ options, onSubmit }) {

  return (
    <form onSubmit={onSubmit}>
    <select id="selectedBeast">
      <option value={'select'} key={'select'}>--Select Your Beast---</option>
      {
        Object.entries(options).map(option => {
          return <option value={option[0]} key={option}>{option[1].name}</option>
        })
      }
    </select>
    <input type="submit"/>
    </form>
  )
}

export default Dropdown;