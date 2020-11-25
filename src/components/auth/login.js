import React, { useContext, useState } from 'react';
import { LoginContext } from '../../context/context';
import { If, Then, Else } from '../if';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

// const If = (props) => {
//   return props.condition ? props.children : null;
// };

export default function Login() {
  const siteContext = useContext(LoginContext);
  console.log(siteContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'password') {
      setPassword(e.target.value);
    } else if (e.target.name === 'username') {
      setUsername(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    siteContext.login(username, password);
  };
  return (
    <If condition={siteContext.loggedIn}>
      <Then>
        <Button variant="outline-success" onClick={siteContext.logout}>
          Log Out
        </Button>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Then>
      <Else>
        <Form inline onSubmit={handleSubmit}>
          <FormControl
            placeholder="UserName"
            name="username"
            onChange={handleChange}
          />
          <FormControl
            placeholder="password"
            name="password"
            onChange={handleChange}
          />
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </Else>
    </If>
  );
}
