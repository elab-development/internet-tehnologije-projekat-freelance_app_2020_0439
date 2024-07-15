import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './komponente/Navbar';
import Footer from './komponente/Footer';
import Pocetna from './komponente/Pocetna';
import ONama from './komponente/ONama';
import Usluge from './komponente/Usluge';
import KategorijeUsluga from './komponente/KategorijeUsluga';
import Auth from './komponente/Auth/Auth';
import ServicesDashboard from './komponente/ServicesDashboard/ServicesDashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
            <Route path="/" element={<Pocetna/>} />
            <Route path="/o-nama" element={<ONama/>} />
            <Route path="/usluge" element={<Usluge/>} />
            <Route path="/kategorije" element={<KategorijeUsluga/>} />


            <Route path="/auth" element={<Auth/>} />
            <Route path="/servicesdashboard" element={<ServicesDashboard/>} />


        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
