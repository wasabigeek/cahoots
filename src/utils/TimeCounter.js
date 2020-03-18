import React, { useState } from 'react';

export const calculateTimeLeft = date => {
  const difference = (date - Date.now())/1000
  return difference > 0 ? difference : 0
}

export const TimeCounter = ({ till }) => {
  // there's apparently a memory leak, need to useEffect
  const [ timeLeft, setTimeLeft ] = useState(calculateTimeLeft(till))
  setTimeout(() => setTimeLeft(calculateTimeLeft(till)), 1000)

  return <div>{timeLeft > 0 ? Math.floor(timeLeft) : 0} seconds left</div>
}
