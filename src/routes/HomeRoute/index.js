import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { Button, Container, Form, FormGroup, Label, Input } from 'reactstrap';

import styles from './styles.module.css'


const generateGameId = (apiKey, baseId) => {
  return window.btoa(JSON.stringify({apiKey, baseId}))
}

const JoinUrl = ({ apiKey, baseId }) => {
  const gameId = generateGameId(apiKey, baseId)
  return (
    <FormGroup>
      <Label>Join URL:</Label>
      <Input
        disabled
        placeholder={"Enter an API Key and Base ID to generate the URL"}
        value={apiKey && baseId ? `${window.location}games/${encodeURI(gameId)}/join` : null}
      />
    </FormGroup>
  )
}

const HomeRoute = props => {
  const [apiKey, setApiKey] = useState('');
  const [baseId, setBaseId] = useState('');
  const gameId = generateGameId(apiKey, baseId)
  return (
    <Container style={{maxWidth: "500px"}}>
      <h1 className={styles.hero_heading}>Cahoots!</h1>
      <Form className="mb-5">
        <FormGroup>
          <Label for="apiKey">API Key:</Label>
          <Input id="apiKey" value={apiKey} onChange={e => setApiKey(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label>Base ID:</Label>
          <Input value={baseId} onChange={e => setBaseId(e.target.value)} />
        </FormGroup>
        <JoinUrl apiKey={apiKey} baseId={baseId} />
      </Form>

      <Link to={`/games/${encodeURI(gameId)}/host`}>
        <Button color="primary">Host Game</Button>
      </Link>
    </Container>
  )
}

export default HomeRoute
