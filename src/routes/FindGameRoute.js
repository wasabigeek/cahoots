import React, { useState } from 'react'
import { Redirect, useLocation } from "react-router-dom"
import { Button, FormGroup, Label, Input } from 'reactstrap';

import CenteredContainer from '../view_components/CenteredContainer';


const useQueryParams = key => {
  return new URLSearchParams(useLocation().search);
}

const FindGameRoute = props => {
  const queryParams = useQueryParams();
  const gameIdPrefix = queryParams.get('game');

  return (
    <CenteredContainer maxWidth={500} verticalCentered>
      {gameIdPrefix}
    </CenteredContainer>
  )
}

export default FindGameRoute;
