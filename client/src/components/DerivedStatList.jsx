import React from 'react';
import DerivedStatListEntry from './DerivedStatListEntry';

const DerivedStatList = function ({ derivedStats }) {

  return (
  <React.Fragment>
    <h3>DerivedStats</h3>
    {
      Object.entries(derivedStats).map(derivedStat => {
        return <DerivedStatListEntry derivedStat={derivedStat} key={derivedStat}/>
      })
    }
  </React.Fragment>
  )


}

export default DerivedStatList;