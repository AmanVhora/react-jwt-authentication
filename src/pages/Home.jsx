import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Home = () => {
  const { token, username } = useSelector(state => state.users);
  let message;
  
  if (token !== null) {
    message = <div>Hello {username}.</div>;
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
      {message}
    </div>
  );
};
