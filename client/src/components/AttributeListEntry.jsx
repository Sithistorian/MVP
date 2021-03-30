import React from 'react';

const AttributeListEntry = function ({attribute}) {

  return (
    <div> {attribute[0] + ': ' + attribute[1]} </div>
  )

}

export default AttributeListEntry;