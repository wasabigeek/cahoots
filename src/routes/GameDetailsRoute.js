import React, { useState, useEffect } from 'react'
import { Button } from 'reactstrap';
import { Link, useParams } from 'react-router-dom';
import getGame from '../use_cases/getGame';
import getQuestions from '../use_cases/getQuestions';
import { EditableQuestion } from '../view_components/EditableQuestion';
import saveQuestion from '../use_cases/saveQuestion';
import CenteredContainer from '../view_components/CenteredContainer';

const GameDetailsRoute = props => {
  const { gameId } = useParams();
  const [game, setGame] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (gameId && game === null) {
      getGame(gameId)
        .then(game => {
          setGame(game);
          return game;
        })
        .then(game => getQuestions({ gameId: game.id }))
        .then(setQuestions);
    }
  }, [gameId, game]);

  if (game) {
    return (
      <CenteredContainer maxWidth={500}>
        <h1 className="mb-4">{game.name}</h1>
        {questions.length > 0
          ? <Link to={`/lobby/${gameId}`}>
              <Button color="success" size="lg">
                Start Game
              </Button>
            </Link>
          : null
        }
        {questions.map(question => <EditableQuestion key={question.id} question={question}/>)}
        <Button
          onClick={() => {
            saveQuestion({ gameId: gameId, order: questions.length + 1 })
              .then(newQn => setQuestions(questions.concat([newQn])))
          }}
        >
          Add Question
        </Button>
      </CenteredContainer>
    );
  } else {
    return (<CenteredContainer maxWidth={500}>Loading...</CenteredContainer>)
  }
}

export default GameDetailsRoute
