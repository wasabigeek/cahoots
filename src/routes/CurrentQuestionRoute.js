import React, { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom"
import { Button } from 'reactstrap';

import showCurrentQuestion from '../use_cases/showCurrentQuestion'
import Question from '../view_components/Question'
import { startTimer } from '../utils/calculateTimeLeft';
import CenteredContainer from '../view_components/CenteredContainer';

const SECONDS_TO_QUESTION = 10;

const ShowResultsBtn = ({ isVisible, linkTo }) => {
  return isVisible ?
    (
      <Link to={linkTo}>
        <Button color="primary">Show Result</Button>
      </Link>
    ) : null
}

const CurrentQuestionRoute = ({ parentUrl }) => {
  let { gameId } = useParams();
  const [question, setQuestion] = useState(null);
  const [timeLeft, setTimeLeft] = useState(SECONDS_TO_QUESTION);

  useEffect(() => {
    if (gameId) {
      startTimer({ seconds: SECONDS_TO_QUESTION, intervalCallback: setTimeLeft, endedCallback: setTimeLeft });
      showCurrentQuestion(gameId).then(setQuestion);
    }
  }, [gameId])

  return (
    <CenteredContainer verticalCentered={true}>
      {question ?
          <div>
            <Question question={question} />
            <div className="mt-4">Time left:</div>
            <div className="display-1">
              {Math.ceil(timeLeft)}
            </div>
            <ShowResultsBtn
              isVisible={timeLeft <= 0}
              linkTo={`${parentUrl}/results/${question.id}`}
            />
          </div>
        : <div>Loading...</div>
      }
    </CenteredContainer>
  )
}

export default CurrentQuestionRoute
