import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import CenteredContainer from '../../view_components/CenteredContainer';
import styles from './styles.module.css'
import findGamesByShortCode from '../../use_cases/findGamesByShortCode';


const findGame = () => {
  findGamesByShortCode(2713).then(console.log)
}

const HomeRoute = props => {
  const [gameId, setGameId] = useState(null);

  return (
    <CenteredContainer maxWidth={500} verticalCentered={true}>
      <h1 className={styles.hero_heading}>Cahoots!</h1>
      <Form className="mb-5">
        <FormGroup>
          <Label for="gameId">Game Code:</Label>
          <Input id="gameId" value={gameId} onChange={e => setGameId(e.target.value)} />
        </FormGroup>
        <Button color="primary" disabled={!gameId} onClick={findGame}>Find Game</Button>
      </Form>
      <aside>
        Want to create your own quiz?&nbsp;
        <Link to="/login">
          Sign Up
        </Link>
      </aside>
    </CenteredContainer>
  )
}

export default HomeRoute
