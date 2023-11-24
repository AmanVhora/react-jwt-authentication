import { useDispatch, useSelector } from "react-redux";
import { allUsers, deleteAccount, logout } from "../../slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button } from "reactstrap";
import { useEffect, useState } from "react";

export const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, username } = useSelector((state) => state.users);
  const currentUser = allUsers.find(user => user.username === username);

  const handleDeleteAccount = () => {
    dispatch(deleteAccount({ id: currentUser.id, token: token }));
    dispatch(logout());
    navigate('/', { replace: true });
  };

  const [visible, setVisible] = useState(true);
  const onDismiss = () => {
    setVisible(false);
    localStorage.setItem('alertDismissed', 'true');
  };

  useEffect(() => {
    const alertDismissed = localStorage.getItem('alertDismissed');
    if (alertDismissed === 'true') {
      setVisible(false);
    }
  }, []);

  let message;

  if (token !== null && visible) {
    message = (
      <Alert isOpen={visible} toggle={onDismiss} className="text-center">
        Welcome {username}, You have successfully logged in.
      </Alert>
    );
  }

  return (
    <div>
      {message}
      <h3 className="mb-4">Your Profile</h3>
      <p>Name: {currentUser.name}</p>
      <p>Username: {currentUser.username}</p>
      <p>Email: {currentUser.email}</p>
      <div><Link to={'/profile/edit'}>Update Profile</Link></div>
      <Button color="danger" className="mt-3" onClick={handleDeleteAccount}>Delete Account</Button>
    </div>
  );
};
