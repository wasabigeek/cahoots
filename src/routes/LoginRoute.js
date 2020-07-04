import React, { useState } from 'react'
import { Redirect } from "react-router-dom"
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import signupUser from '../use_cases/signupUser';
import loginUser from '../use_cases/loginUser';
import CenteredContainer from '../view_components/CenteredContainer';

const handleSubmit = (event, { email, password, authFn, successCallback }) => {
  event.preventDefault();
  authFn({ email, password })
    .then(user => successCallback(user))
}

const SignupForm = ({ onUserChange }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Form className="mb-5" onSubmit={f => handleSubmit(f, { email, password, authFn: signupUser, successCallback: onUserChange })}>
      <FormGroup>
        <Label for="email">Email:</Label>
        <Input id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label>Password:</Label>
        <Input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
      </FormGroup>
      <Button color="primary">Sign Up</Button>
    </Form>
  );
}

const LoginForm = ({ onUserChange }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Form className="mb-5" onSubmit={f => handleSubmit(f, { email, password, authFn: loginUser, successCallback: onUserChange })}>
      <FormGroup>
        <Label for="email">Email:</Label>
        <Input id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label>Password:</Label>
        <Input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
      </FormGroup>
      <Button color="primary">Login</Button>
    </Form>
  );
}

const LoginRoute = props => {
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [user, setUser] = useState(null);

  const toggleForm = event => {
    event.preventDefault();
    setIsExistingUser(!isExistingUser);
  }

  if (user) {
    return <Redirect to='/games' />
  } else if (isExistingUser) {
    return (
      <CenteredContainer maxWidth={500} verticalCentered>
        <h1>Login to Cahoots!</h1>
        <LoginForm onUserChange={setUser} />
        <div>
          No account? <br />
          <Button color="link" onClick={toggleForm}>Sign Up!</Button>
        </div>
      </CenteredContainer>
    );
  } else {
    return (
      <CenteredContainer maxWidth={500} verticalCentered>
        <h1>Signup for Cahoots!</h1>
        <SignupForm onUserChange={setUser} />
        <div>
          Have an account? <br />
          <Button color="link" onClick={toggleForm}>Login</Button>
        </div>
      </CenteredContainer>
    );
  }
}

export default LoginRoute
