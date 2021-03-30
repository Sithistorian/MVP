import React from 'react';
import  SkillListEntry from './SkillListEntry';

const  SkillList = function ({ skills }) {

  return (
  <React.Fragment>
    <div> Skills</div>
    {
      Object.entries(skills).map(skill => {
        return <SkillListEntry skill={skill}/>
      })
    }
  </React.Fragment>
  )


}

export default SkillList;