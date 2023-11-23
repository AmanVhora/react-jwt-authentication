import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Form, Input, Label } from "reactstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../slices/userSlice";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { loginError } = useSelector(state => state.users);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    dispatch(login({ email: credentials.email, password: credentials.password })).unwrap()
    .then(() => {
      navigate('/profile', { replace: true });
    })
    .catch(() => {
      navigate('/login', { replace: true });
    });
  };

  return (
    <div className="container w-50 mt-3">
      <h2>Login</h2>
      {loginError ? <Alert color="danger" className="text-center">{loginError}</Alert> : ''}
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
      <div className="mt-3">Don't have an account? <Link to="/signup">Register</Link></div>
    </div>
  );
};
