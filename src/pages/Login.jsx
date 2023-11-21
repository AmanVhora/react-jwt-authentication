import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Label } from "reactstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../slices/authSlice";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    dispatch(login({ email: credentials.email, password: credentials.password }));
    navigate('/', { replace: true });
  };

  return (
    <div className="container w-50 mt-3">
      <h2>Login</h2>
      <Form>
        <div>
          <Label for="email">Email</Label>
          <Input type="email" id="email" name="email" value={credentials.email} onChange={handleChange} autoComplete="email" />
        </div>

        <div className="mt-3">
          <Label for="password">Password</Label>
          <Input type="password" id="password" name="password" value={credentials.password} onChange={handleChange} autoComplete="password" />
        </div>

        <div className="mt-3">
          <Button color="primary" onClick={handleLogin}>Login</Button>
        </div>
      </Form>
    </div>
  );
};
