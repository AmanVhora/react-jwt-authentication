import { useDispatch, useSelector } from "react-redux";
import { allUsers, deleteAccount, logout } from "../../slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

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
