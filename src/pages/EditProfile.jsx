import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, Label } from "reactstrap";
import { editProfile, getCurrentUser } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";

export const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector(getCurrentUser);
  const { token } = useSelector((state) => state.auth);
  const [data, setData] = useState({ name: currentUser.name, username: currentUser.username, email: currentUser.email, password: '123456' });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  };

  const handleUpdateProfile = () => {
    console.log(data);
    dispatch(editProfile({
      id: currentUser.id,
      token: token,
      user: {
        ...data
      }
    }));
    navigate('/profile', { replace: true })
  };

  return (
    <div className="container w-50 mt-3">
      <h2>Edit your profile</h2>
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
          <Button color="primary" onClick={handleUpdateProfile}>Update</Button>
        </div>
      </Form>
    </div>
  );
};
