import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, Form, Input, Label } from "reactstrap";
import { createAccount } from "../slices/userSlice";
import { Link, useNavigate } from "react-router-dom";

export const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({ name: '', username: '', email: '', password: '' });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  };

  const handleUpdateProfile = () => {
    dispatch(createAccount({ user: data })).unwrap()
    .then(() => {
      navigate('/login', { replace: true });
    })
    .catch(() => {
      navigate('/signup', { replace: true });
    });
  };

  const canSave = [data.name, data.username, data.email, data.password].every(Boolean);
  const { signupErrors } = useSelector(state => state.users);

  const errors = signupErrors && signupErrors.map(error => {
    return (<li key={error}>{error}</li>);
  });

  return (
    <div className="container w-50 mt-3">
      <h2 className="mb-3">Sign up</h2>
      {signupErrors ? <Alert color="danger">{<ul className="mb-0">{errors}</ul>}</Alert> : ''}
      <Form>
        <div>
          <Label for="name">Name</Label>
          <Input type="text" id="name" name="name" value={data.name} onChange={handleChange} autoComplete="name" />
        </div>

        <div className="mt-3">
          <Label for="username">Username</Label>
          <Input type="text" id="username" name="username" value={data.username} onChange={handleChange} autoComplete="username" />
        </div>

        <div className="mt-3">
          <Label for="email">Email</Label>
          <Input type="email" id="email" name="email" value={data.email} onChange={handleChange} autoComplete="email" />
        </div>

        <div className="mt-3">
          <Label for="password">Password</Label>
          <Input type="password" id="password" name="password" value={data.password} onChange={handleChange} autoComplete="password" />
        </div>

        <div className="mt-3">
          <Button color="primary" onClick={handleUpdateProfile} disabled={!canSave}>Signup</Button>
        </div>
      </Form>
      <div className="mt-3">Already have an account? <Link to="/login">Login</Link></div>
    </div>
  );
};
