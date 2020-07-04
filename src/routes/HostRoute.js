import React from 'react'
import { Switch, Route, useRouteMatch } from "react-router-dom";

import PendingQuestionRoute from './PendingQuestionRoute';
import QuestionResultsRoute from './QuestionResultsRoute';
import FinalResultsRoute from './FinalResultsRoute';
import CurrentQuestionRoute from './CurrentQuestionRoute';


const HostRoute = () => {
  let { url, path } = useRouteMatch();

  return (
    <Switch base>
      <Route path={`${path}/questions/pending`}>
        <PendingQuestionRoute parentUrl={url} />
      </Route>
      <Route path={`${path}/questions/current`}>
        <CurrentQuestionRoute parentUrl={url} />
      </Route>
      <Route path={`${path}/results/final`}>
        <FinalResultsRoute parentUrl={url} />
      </Route>
      <Route path={`${path}/results/:questionId`}>
        <QuestionResultsRoute parentUrl={url} />
      </Route>
    </Switch>
  );
}

export default HostRoute
