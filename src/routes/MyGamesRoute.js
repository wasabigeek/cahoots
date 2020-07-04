import React, { useState, useEffect } from 'react'
import { Container, ListGroup, ListGroupItem } from 'reactstrap';
import getCurrentUserGames from '../use_cases/getCurrentUserGames';
import { Redirect } from 'react-router-dom';


const MyGamesRoute = () => {
  const [games, setGames] = useState([]);
  const [redirectUrl, setRedirectUrl] = useState(null);

  useEffect(() => {
    getCurrentUserGames().then(setGames);
  }, []);

  if (redirectUrl) {
    return <Redirect to={redirectUrl} />;
  } else {
    return (
      <Container style={{maxWidth: "500px"}}>
        <h1>Your Games</h1>
        <ListGroup>
          {
            games.map(game => (
              <ListGroupItem
                key={game.id}
                onClick={() => setRedirectUrl(`/games/${game.id}`)}
                tag="button"
                action
              >
                {game.name}
              </ListGroupItem>
            ))
          }
          <ListGroupItem
            onClick={() => setRedirectUrl('/games/create')}
            tag="button"
            color="info"
            action
          >
            Create Game
          </ListGroupItem>
        </ListGroup>
      </Container>
    )
  }
}

export default MyGamesRoute
