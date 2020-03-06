import React, { useState, useEffect } from 'react';
import './App.css';

var Airtable = require('airtable')
Airtable.configure({endpointUrl: 'https://api.airtable.com', apiKey: process.env.REACT_APP_AIRTABLE_API_KEY})
var base = Airtable.base('appSUNCUlDaS37SeJ')

const CurrentQuestion = props => {
  const [question, setQuestion] = useState(null);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    base('Questions')
      .select({
        // pick next unfinished question
        filterByFormula: `IS_AFTER({Finished At}, NOW())`,
        maxRecords: 1,
        sort: [{field: "Finished At", direction: "asc"}]
      })
      .firstPage()
      .then(questions => setQuestion(questions[0]))
      //.catch
  }, []);

  if (question) {
    return (
      <div>
        <div>{question.get('Name')}</div>
        <ol>
          <li>{question.get('Answer A')}</li>
          <li>{question.get('Answer B')}</li>
          <li>{question.get('Answer C')}</li>
          <li>{question.get('Answer D')}</li>
        </ol>
      </div>
    )
  }
  else {
    return <div>No more questions!</div>
  }
};

function App() {
  return (
    <div className="App">
      <CurrentQuestion />
    </div>
  );
}

export default App;
