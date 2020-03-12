import React, { useState } from 'react';

const calculateTimeLeft = date => {
  const difference = (date - Date.now())/1000
  return difference > 0 ? difference : 0
}

const TimeCounter = ({ till }) => {
  const [ timeLeft, setTimeLeft ] = useState(calculateTimeLeft(till))
  setTimeout(() => setTimeLeft(calculateTimeLeft(till)), 1000)

  return <div>{timeLeft > 0 ? timeLeft : 0} seconds left</div>
}

export default TimeCounter
