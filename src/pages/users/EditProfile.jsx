import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, Label } from "reactstrap";
import { allUsers, editProfile } from "../../slices/userSlice";
import { useNavigate } from "react-router-dom";

export const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, username } = useSelector((state) => state.users);
  const currentUser = allUsers.find(user => user.username === username);

  const [data, setData] = useState({ name: currentUser.name, username: currentUser.username, email: currentUser.email, password: '' });

  const handleChange = (e) => {
    setData(prevData => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const handleUpdateProfile = () => {
    dispatch(editProfile({
      id: currentUser.id,
      token: token,
      user: {
        name: data.name,
        username: data.username,
        email: data.email,
        password: data.password
      }
    }));
    navigate('/profile', { replace: true });
  };

  const canUpdate = [data.name, data.username, data.email, data.password].every(Boolean);

  return (
    <div className="container w-50 mt-3">
      <h2 className="mb-3">Edit your profile</h2>
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
          <Button color="primary" onClick={handleUpdateProfile} disabled={!canUpdate}>Update</Button>
        </div>
      </Form>
    </div>
  );
};
