import React from 'react';

const SkillListEntry = function ({skill}) {

  return (
    <div> {skill[0] + ': ' + skill[1]} </div>
  )

}

export default SkillListEntry;