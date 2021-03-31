import React from 'react';
import AttributeList from './AttributeList';
import SkillList from './SkillList';
import DerivedStatList from './DerivedStatList';
import Dropdown from './Dropdown';

class App extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      character: props.saphire,
      shifted: false,
      beast: null
    };
    //Bindings
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit (e) {
    e.preventDefault();
    this.setState({
      beast: this.props.shapeshift(this.state.character, this.props.beastiary[document.getElementById("selectedBeast").value])
    })
  }



  render(){
    return (
      <div className="largestContainer">

        <h2 id="characterName">{this.state.character.name}</h2>
        <div id="attributes"><AttributeList attributes={this.state.character.attributes}/></div>
        <div id="skills"><SkillList skills={this.state.character.skills}/></div>
        <div id="derivedStats"><DerivedStatList derivedStats={this.state.character.derivedStats}/></div>
        <div id="form"><Dropdown onSubmit={this.onSubmit} options={this.props.beastiary}/></div>

      </div>
    )
  }

}

export default App;