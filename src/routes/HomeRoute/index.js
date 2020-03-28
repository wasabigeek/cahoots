import React, { useState } from 'react'
import { Link } from "react-router-dom"

import styles from './styles.module.css'

const HomeRoute = props => {
  const [apiKey, setApiKey] = useState('');
  const [baseId, setBaseId] = useState('');
  const gameId = window.btoa(JSON.stringify({apiKey, baseId}))
  return (
    <div>
      <h1 className={styles.hero_heading}>Cahoots!</h1>
      <div>
        <label>
          API Key:
          <input value={apiKey} onChange={e => setApiKey(e.target.value)} />
        </label>
        <label>
          Base ID:
          <input value={baseId} onChange={e => setBaseId(e.target.value)} />
        </label>
      </div>
      <Link to={`/games/${encodeURI(gameId)}/host`}>
        <button className={styles.btn_primary}>Host Game</button>
      </Link>
      <div>
        Join URL:
        {`${window.location}games/${encodeURI(gameId)}/join`}
      </div>
    </div>
  )
}

export default HomeRoute
