import React from 'react';
import useUsluge from '../kuke/useUsluge';
import './Usluge.css'; 
import { useState } from 'react';


const Usluge = () => {
  const { usluge, loading, error } = useUsluge('http://127.0.0.1:8000/api/services');

  const [filter, setFilter] = useState({ naziv: '', duzinaIzrade: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [servicesPerPage] = useState(3);

  if (loading) return <p>Ucitavaju se usluge...</p>;
  if (error) return <p>Greska u ucitavanju usluga: {error.message}</p>;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const handleReset = () => {
    setFilter({ naziv: '', duzinaIzrade: '' });
  };

  const filteredServices = usluge.filter((usluga) => {
    const nazivMatch =
      filter.naziv === '' ||
      usluga.naziv.toLowerCase().includes(filter.naziv.toLowerCase());
    const duzinaIzradeMatch =
      filter.duzinaIzrade === '' || usluga.duzinaIzrade <= parseInt(filter.duzinaIzrade);
    return nazivMatch && duzinaIzradeMatch;
  });

  const indexLastService = currentPage * servicesPerPage;
  const indexFirstService = indexLastService - servicesPerPage;
  const currentServices = filteredServices.slice(indexFirstService, indexLastService);

  const paginate = (brojStrane) => setCurrentPage(brojStrane);

  return (
    <div className='cela-stranica'>
      <div className="usluge-stranica">
        <div className="pretraga">
          <input
            type="text"
            placeholder="Pretraži po nazivu"
            name="naziv"
            value={filter.naziv}
            onChange={handleInputChange}
          />
          <select
            name="duzinaIzrade"
            value={filter.duzinaIzrade}
            onChange={handleInputChange}
          >
            <option value="">Sva trajanja</option>
            <option value="20">Do 20 dana</option>
            <option value="30">Do 30 dana</option>
            <option value="40">Do 40 dana</option>
            <option value="60">Do 60 dana</option>
          </select>
          <button onClick={handleReset}>Resetuj filter</button>
        </div>

        <ul className="usluge-lista">
          {currentServices.map((usluga, index) => (
            <li key={index}>
              <h3>{usluga.naziv}</h3>
              <p>Trajanje: {usluga.duzinaIzrade} dana</p>
              <p>
                Kategorija usluge: {usluga.service_category_id?.naziv}
                {/* Render 'naziv' from the object */}
              </p>
            </li>
          ))}
        </ul>

        <div className="pagination">
          {Array.from({ length: Math.ceil(filteredServices.length / servicesPerPage) }).map(
            (_, index) => (
              <button key={index} onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Usluge;
