import React, { useState, useEffect } from 'react';

const calculateTimeLeft = date => {
  const difference = (date - Date.now())/1000
  return difference > 0 ? difference : 0
}

const TimeCounter = ({ till }) => {
  const [ timeLeft, setTimeLeft ] = useState(calculateTimeLeft(till))
  setTimeout(() => setTimeLeft(calculateTimeLeft(till)), 1000)

  return <div>{timeLeft > 0 ? timeLeft : 0} seconds left</div>
}

const Question = ({ data }) => (
  <div>
    <div>{data.get('Name')}</div>
    <ol>
      <li>{data.get('Answer A')}</li>
      <li>{data.get('Answer B')}</li>
      <li>{data.get('Answer C')}</li>
      <li>{data.get('Answer D')}</li>
    </ol>
    <TimeCounter till={new Date(data.get('Finished At'))} />
  </div>
)

export default Question
