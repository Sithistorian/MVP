import React from 'react';
import axios from 'axios';
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
      beastAttempt: 'Saphire',
      raise: 0
    };
    //Bindings
    this.onSubmit = this.onSubmit.bind(this);
    this.radioChange = this.radioChange.bind(this);
    this.getCharacter = this.getCharacter.bind(this);
    this.updateSpellDuration = this.updateSpellDuration.bind(this);
  }

  //Requests
  getCharacter(name) {
    axios.get(`/Characters?name=${name}`)
      .then(response => {
        console.log(response.data)
        this.setState({
          character: response.data,
          spellDuration: response.data.spellDuration
        })
      })
      .catch(error => {
        console.error(error);
      })
  }

  updateSpellDuration(name, count) {
    axios.put(`/Characters?name=${name}&count=${count}`)
      .then(response => {
        console.log(response);
        this.setState({
          spellDuration: count
        })
      })
      .catch(error => {
        console.error(error);
      })
  }

  componentDidMount() {
    this.getCharacter('Saphire');
  }

  //Handlers

  onSubmit (e) {
    e.preventDefault();
    let character = this.props.saphire;
    let beast = this.props.beastiary[document.getElementById("selectedBeast").value];

    let beastName = beast.name.match(/^[aeiou]/i) ? `an ${beast.name}` : `a ${beast.name}`

    this.setState({
      character: this.props.shapeshift(character, beast, parseInt(this.state.raise)) ?
      this.props.shapeshift(character, beast, parseInt(this.state.raise)) :
      this.props.saphire,
      rankTooLow: this.props.shapeshift(character, beast, this.state.raise) ?
      false :
      true,
      beastAttempt: this.props.shapeshift(character, beast, this.state.raise) ?
      beastName :
      `${this.state.character.name}`
    })
  }

  radioChange (e) {
    e.preventDefault();
    // debugger;
    this.setState({
      raise: e.target.value
    })
  }


  //Render

  render(){
    return (
      <div className="largestContainer">

        <h2 id="characterName">{this.state.character.name}</h2>
        <div id="attributes"><AttributeList attributes={this.state.character.attributes}/></div>
        <div id="skills"><SkillList skills={this.state.character.skills}/></div>
        <div id="derivedStats"><DerivedStatList derivedStats={this.state.character.derivedStats}/></div>
        <div id="form"><Dropdown beastAttempt={this.state.beastAttempt} rankTooLow={this.state.rankTooLow} onSubmit={this.onSubmit} options={this.props.beastiary} onChange={this.radioChange} raise={this.state.raise} updateSpellDuration={this.updateSpellDuration} characterName={this.state.character.name} spellDuration={this.state.spellDuration} getCharacter={this.getCharacter}/></div>

      </div>
    )
  }
}

export default App;