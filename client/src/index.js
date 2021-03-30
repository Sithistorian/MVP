import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import shapeShift from './shapeshift/shapeshift';
import beastiary from './shapeshift/beastiary';
import saphire from './shapeshift/saphire';


ReactDOM.render(<App shapeshift={shapeShift.shapeShift} beastiary={beastiary} saphire={saphire.saphire}/>, document.getElementById('app'));