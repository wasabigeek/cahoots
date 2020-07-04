import React, { useState, useEffect } from 'react'
import { Container, FormGroup, Label, Input, Button } from 'reactstrap';
import getCurrentUser from '../use_cases/getCurrentUser';
import createGame from '../use_cases/createGame';
import { Redirect } from 'react-router-dom';


const save = (gameAttributes, onCreate) => {
  return createGame(gameAttributes).then(onCreate);
}

const CreateGameRoute = props => {
  const [user, setUser] = useState(null);
  const [gameName, setGameName] = useState('');
  const [game, setGame] = useState(null);

  useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);

  if (game) {
    return <Redirect to="/games" />;
  } else {
    return (
      <Container style={{maxWidth: "500px"}}>
        <h1>Create a Game</h1>
        <FormGroup>
          <Label for="name">Name:</Label>
          <Input id="name" name="name" value={gameName} onChange={e => setGameName(e.target.value)} />
        </FormGroup>
        <Button color="primary" onClick={() => save({ name: gameName, ownerId: user.id }, setGame)}>Save</Button>
      </Container>
    )
  }
}

export default CreateGameRoute
