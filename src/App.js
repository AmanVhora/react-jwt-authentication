import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Navigationbar from './components/Navbar';
import Routes from './routes/Routes';

function App() {
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
