import React, { useState, useEffect } from 'react';
import './App.css';

var Airtable = require('airtable')
Airtable.configure({endpointUrl: 'https://api.airtable.com', apiKey: process.env.REACT_APP_AIRTABLE_API_KEY})
var base = Airtable.base('appSUNCUlDaS37SeJ')

const Hello = props => {
  const [questions, setQuestions] = useState([]);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    base('Question')
      .select()
      .eachPage((records, fetchNextPage) => {
        // This function (`page`) will get called for each page of records.
        setQuestions(records.concat(questions))

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage()
        console.log(questions)
    }, function done(err) {
        if (err) { console.error(err); return; }
    })
  }, []);

  console.log(questions)
  return (
    <div>
      {questions.map(question => <div>{question.get('Name')}</div>)}
    </div>
  )
};

function App() {
  return (
    <div className="App">
      <Hello/>
    </div>
  );
}

export default App;
