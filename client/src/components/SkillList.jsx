import React from 'react';
import  SkillListEntry from './SkillListEntry';

const  SkillList = function ({ skills }) {

  return (
  <React.Fragment>
    <h3> Skills</h3>
    {
      Object.entries(skills).map(skill => {
        return <SkillListEntry skill={skill} key={skill}/>
      })
    }
  </React.Fragment>
  )


}

export default SkillList;