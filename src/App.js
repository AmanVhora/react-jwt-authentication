import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Navigationbar from './components/Navbar';
import Routes from './routes/Routes';

function App() {
  return (
    <BrowserRouter>
      <Navigationbar />
      <Routes />
    </BrowserRouter>
  );
}

export default App;
