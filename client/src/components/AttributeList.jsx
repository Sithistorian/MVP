import React from 'react';
import AttributeListEntry from './AttributeListEntry';

const AttributeList = function ({ attributes }) {

  return (
  <React.Fragment>
    <div>Attributes</div>
    {
      Object.entries(attributes).map(attribute => {
        return <AttributeListEntry attribute={attribute}/>
      })
    }
  </React.Fragment>
  )


}

export default AttributeList;