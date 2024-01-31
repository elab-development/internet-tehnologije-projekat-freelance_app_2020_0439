import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './komponente/Navbar';
import Footer from './komponente/Footer';
import Pocetna from './komponente/Pocetna';
import ONama from './komponente/ONama';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
            <Route path="/" element={<Pocetna/>} />
            <Route path="/o-nama" element={<ONama/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
