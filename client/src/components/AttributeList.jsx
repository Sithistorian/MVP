import React from 'react';
import AttributeListEntry from './AttributeListEntry';

const AttributeList = function ({ attributes }) {

  return (
  <React.Fragment>
    <h3>Attributes</h3>
    {
      Object.entries(attributes).map(attribute => {
        return <AttributeListEntry attribute={attribute} key={attribute}/>
      })
    }
  </React.Fragment>
  )


}

export default AttributeList;