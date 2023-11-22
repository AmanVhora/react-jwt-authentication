import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Navigationbar from './components/Navbar';
import Routes from './routes/Routes';
import { useDispatch, useSelector } from "react-redux";
import { allUsers } from './slices/userSlice';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.users);
  
  useEffect(() => {
    if (token === null) {
      dispatch(allUsers());
    }
  }, []);

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
