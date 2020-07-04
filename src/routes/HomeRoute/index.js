import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import CenteredContainer from '../../view_components/CenteredContainer';
import styles from './styles.module.css'


const HomeRoute = props => {
  const [gameId, setGameId] = useState(null);

  return (
    <CenteredContainer maxWidth={500} verticalCentered={true}>
      <h1 className={styles.hero_heading}>Cahoots!</h1>
      <Form className="mb-5">
        <FormGroup>
          <Label for="gameId">Game ID:</Label>
          <Input id="gameId" value={gameId} onChange={e => setGameId(e.target.value)} />
        </FormGroup>
        <Link to={`/join/${gameId}`}>
          <Button color="primary" disabled={!gameId}>Find Game</Button>
        </Link>
      </Form>
      <Link to="/login">
        Sign Up
      </Link>
    </CenteredContainer>
  )
}

export default HomeRoute
