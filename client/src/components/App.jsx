import React from 'react';
import AttributeList from './AttributeList';
import SkillList from './SkillList';
import DerivedStatList from './DerivedStatList';

class App extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      character: props.saphire,
      shifted: true,
      beast: null
    };
  }

  //Bindings

  render(){
    return (
      <div className="largestContainer">

        <h2 id="characterName">{this.state.character.name}</h2>
        <div id="attributes"><AttributeList attributes={this.state.character.attributes}/></div>
        <div id="skills"><SkillList skills={this.state.character.skills}/></div>
        <div id="derivedStats"><DerivedStatList derivedStats={this.state.character.derivedStats}/></div>
        <div id="form">Beast Form</div>

      </div>
    )
  }

}

export default App;