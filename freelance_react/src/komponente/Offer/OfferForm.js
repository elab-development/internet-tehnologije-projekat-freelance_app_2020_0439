import React, { useState } from 'react';
import axios from 'axios';
import useUsluge from '../../kuke/useUsluge';
import './OfferForm.css';

const OfferForm = () => {
  const { usluge, loading, error } = useUsluge('http://127.0.0.1:8000/api/services');
  const [cenaPonude, setCenaPonude] = useState('');
  const [statusNaplate, setStatusNaplate] = useState('Nije placeno');
  const [serviceId, setServiceId] = useState('');
  const [message, setMessage] = useState('');
  const token = sessionStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://127.0.0.1:8000/api/offers',
        {
          cenaPonude,
          statusNaplate,
          service_id: serviceId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setMessage('Ponuda je uspešno kreirana.');
      setCenaPonude('');
      setStatusNaplate('Nije placeno');
      setServiceId('');
      setTimeout(() => setMessage(''), 5000); // Clear the message after 5 seconds
    } catch (error) {
      if (error.response && error.response.data && error.response.data.greska) {
        alert(error.response.data.greska);
      } else {
        console.error('Greška prilikom kreiranja ponude:', error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="auth-container">
      <div className="auth-home">
        <h1>Kreiraj Ponudu</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="cenaPonude">Cena Ponude</label>
            <input
              type="number"
              id="cenaPonude"
              value={cenaPonude}
              onChange={(e) => setCenaPonude(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="statusNaplate">Status Naplate</label>
            <select
              id="statusNaplate"
              value={statusNaplate}
              onChange={(e) => setStatusNaplate(e.target.value)}
              required
            >
              <option value="Placeno">Placeno</option>
              <option value="Nije placeno">Nije placeno</option>
              <option value="U toku obrade">U toku obrade</option>
            </select>
          </div>
          <div>
            <label htmlFor="serviceId">Usluga</label>
            <select
              id="serviceId"
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
              required
            >
              <option value="">Izaberi Uslugu</option>
              {usluge.map((usluga) => (
                <option key={usluga.id} value={usluga.id}>
                  {usluga.naziv}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Kreiraj Ponudu</button>
        </form>
        {message && <p className="success-message">{message}</p>}
      </div>
    </div>
  );
};

export default OfferForm;
