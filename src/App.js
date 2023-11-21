import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Navigationbar from './components/Navbar';
import Routes from './routes/Routes';
import { useDispatch, useSelector } from "react-redux";
import { allUsers, getCurrentUser, profile } from './slices/userSlice';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser)
  const { token } = useSelector((state) => state.auth);
  
  useEffect(() => {
    if (token === null) {
      dispatch(allUsers());
    }
  }, []);
  
  useEffect(() => {
    if (token !== null) {
      dispatch(profile({ id: currentUser.id, token: token }));
    }
  }, [token]);

  return (
    <BrowserRouter>
      <Navigationbar />
      <div className='container'>
        <Routes />
      </div>
    </BrowserRouter>
  );
}

export default App;
