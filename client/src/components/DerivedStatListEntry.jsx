import React from 'react';

const DerivedStatListEntry = function ({derivedStat}) {

  return (
    <div> {derivedStat[0] + ': ' + derivedStat[1]} </div>
  )

}

export default DerivedStatListEntry;