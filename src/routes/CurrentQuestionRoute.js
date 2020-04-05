import React, { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom"
import { Button, Container } from 'reactstrap';

import Game from '../utils/Game'
import Question from '../utils/Question'
import { TimeCounter } from '../utils/TimeCounter'

const CurrentQuestionRoute = props => {
  let { gameId } = useParams()
  const [question, setQuestion] = useState(null)
  const game = new Game({ gameId })

  useEffect(() => {
    game.startNextQuestion()
    .then(() => game.getCurrentQuestion().then(setQuestion))
  }, [])

  return (
    <Container>
      {question ?
          <div>
            <Question data={question} />
            <TimeCounter className="mb-4" till={new Date(question.get('Finished At'))} />
            <Link to={`/games/${encodeURI(gameId)}/results/${question.getId()}`}>
              <Button color="primary">Show Result</Button>
            </Link>
          </div>
        : <div>Loading...</div>
      }
    </Container>
  )
}

export default CurrentQuestionRoute

// no result, no question, start button
// no result, question, no buttons if time out, else show button if within time
// have result, show result, hide question, next button (clears result)
