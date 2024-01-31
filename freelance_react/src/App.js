import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './komponente/Navbar';
import Footer from './komponente/Footer';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
