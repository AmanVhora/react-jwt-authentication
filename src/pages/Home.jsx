import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PostsList } from "../components/posts/PostsList";
import { useEffect, useState } from "react";
import { Alert } from "reactstrap";

export const Home = () => {
  const { token, username } = useSelector(state => state.users);
  let message;
  
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

  let welcomeMessage;

  if (token !== null && visible) {
    welcomeMessage = (
      <Alert isOpen={visible} toggle={onDismiss} className="text-center">
        Welcome {username}, You have successfully logged in.
      </Alert>
    );
  }

  if (token !== null) {
    message = <PostsList />;
  } else {
    message = (
      <div>
        <p className="fs-4">Want to continue?</p>
        <Link to={'/login'} >Go to login</Link>
      </div>
    );
  }

  return (
    <div>
      {welcomeMessage}
      {message}
    </div>
  );
};
