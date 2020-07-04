import React, { useState, useEffect } from 'react'
import { useParams, Redirect } from "react-router-dom"

import startNextQuestion from '../use_cases/startNextQuestion';
import { startTimer } from '../utils/calculateTimeLeft';
import CenteredContainer from '../view_components/CenteredContainer';

const SECONDS_TO_QUESTION = 5;

const PendingQuestionRoute = ({ parentUrl }) => {
  let { gameId } = useParams();
  const [ timeLeft, setTimeLeft ] = useState(SECONDS_TO_QUESTION);
  const [ nextQuestion, setNextQuestion ] = useState(null);

  useEffect(() => {
    if (gameId) {
      startTimer({ seconds: SECONDS_TO_QUESTION, intervalCallback: setTimeLeft, endedCallback: setTimeLeft });
      startNextQuestion(gameId).then(setNextQuestion);
    }
  }, [gameId])

  return (
    <CenteredContainer verticalCentered={true}>
      <div className="mb-4">Next question in...</div>
      <div className="display-1">
        {Math.ceil(timeLeft)}
      </div>
      {timeLeft <= 0 && nextQuestion
        ? <Redirect to={`${parentUrl}/questions/current`} />
        : null
      }
    </CenteredContainer>
  )
}

export default PendingQuestionRoute
