import React from 'react';

const Transformed = function ({ rankTooLow, beastAttempt }) {

  return (rankTooLow ? <div id="rankWarning">Rank Too Low</div> : <div>You are now {beastAttempt}</div>)
}

export default Transformed;