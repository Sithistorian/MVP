import React from 'react';
import DerivedStatListEntry from './DerivedStatListEntry';

const DerivedStatList = function ({ derivedStats }) {

  return (
  <React.Fragment>
    <div>DerivedStats</div>
    {
      Object.entries(derivedStats).map(derivedStat => {
        return <DerivedStatListEntry derivedStat={derivedStat}/>
      })
    }
  </React.Fragment>
  )


}

export default DerivedStatList;