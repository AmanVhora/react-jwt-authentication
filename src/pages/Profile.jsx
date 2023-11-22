import { useDispatch, useSelector } from "react-redux";
import { deleteAccount, getCurrentUser, removeCurrentUser } from "../slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { logout } from "../slices/authSlice";

export const Profile = () => {
  const currentUser = useSelector(getCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector(state => state.auth);

  const handleDeleteAccount = () => {
    dispatch(deleteAccount({ id: currentUser.id, token: token }));
    dispatch(removeCurrentUser());
    dispatch(logout());
    navigate('/', { replace: true });
  };

  return (
    <div>
      <h3 className="mb-4">Your Profile</h3>
      <p>Name: {currentUser.name}</p>
      <p>Username: {currentUser.username}</p>
      <p>Email: {currentUser.email}</p>
      <div><Link to={'/profile/edit'}>Update Profile</Link></div>
      <Button color="danger" className="mt-3" onClick={handleDeleteAccount}>Delete Account</Button>
    </div>
  );
};
