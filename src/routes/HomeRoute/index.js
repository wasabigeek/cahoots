import React, { useState } from 'react'
import { Link, Redirect } from "react-router-dom"
import { Button, Form, FormGroup, Label, Input, ListGroup, ListGroupItem } from 'reactstrap';

import CenteredContainer from '../../view_components/CenteredContainer';
import styles from './styles.module.css'
import findGamesByShortCode from '../../use_cases/findGamesByShortCode';


const HomeRoute = () => {
  const [games, setGames] = useState([]);
  const [shortCode, setShortCode] = useState('');

  if (games.length > 1) {
    return (
      <CenteredContainer maxWidth={500} verticalCentered={true}>
        <ListGroup>
          {
            games.map(game => (
              <Link key={game.id} to={`/join/${game.id}`}>
                <ListGroupItem
                  tag="button"
                  action
                >
                  {game.name}
                </ListGroupItem>
              </Link>
            ))
          }
        </ListGroup>
      </CenteredContainer>
    );
  }
  else if (games.length == 1) {
    return <Redirect to={`/join/${games[0].id}`} />;
  }
  else {
    return (
      <CenteredContainer maxWidth={500} verticalCentered={true}>
        <h1 className={styles.hero_heading}>Cahoots!</h1>
        <Form
          className="mb-5"
          onSubmit={(e) => {
            e.preventDefault();
            findGamesByShortCode(shortCode).then(setGames);
          }}
        >
          <FormGroup>
            <Label for="shortCode">Game Code:</Label>
            <Input id="shortCode" type="number" value={shortCode} onChange={e => setShortCode(e.target.value)} />
          </FormGroup>
          <Button
            color="primary"
            disabled={!shortCode}
            type="submit"
          >
            Find Game
          </Button>
        </Form>
        <aside>
          Want to create your own quiz?&nbsp;
          <Link to="/login">
            Sign Up
          </Link>
        </aside>
      </CenteredContainer>
    );
  }
}

export default HomeRoute
