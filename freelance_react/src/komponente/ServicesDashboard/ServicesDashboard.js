import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import './ServicesDashboard.css';
import useUsluge from '../../kuke/useUsluge';
import useKategorije from '../../kuke/useKategorije';

const ServicesDashboard = () => {
  const { usluge, loading: loadingUsluge, error: errorUsluge, setUsluge } = useUsluge('http://127.0.0.1:8000/api/services');
  const { kategorije, loading: loadingKategorije, error: errorKategorije } = useKategorije('http://127.0.0.1:8000/api/service-categories');

  const [showModal, setShowModal] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [newService, setNewService] = useState({ naziv: '', duzinaIzrade: '', service_category_id: '' });

  const token = sessionStorage.getItem('token');

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService({ ...newService, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentService) {
        const response = await axios.put(`http://127.0.0.1:8000/api/services/${currentService.id}`, newService, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsluge(usluge.map(service => service.id === currentService.id ? response.data.data : service));
      } else {
        const response = await axios.post('http://127.0.0.1:8000/api/services', newService, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsluge([...usluge, response.data.data]);
      }
      setShowModal(false);
      setCurrentService(null);
      setNewService({ naziv: '', duzinaIzrade: '', service_category_id: '' });
    } catch (error) {
      console.error('Error saving service:', error);
    }
  };

  const handleEdit = (service) => {
    setCurrentService(service);
    setNewService({ naziv: service.naziv, duzinaIzrade: service.duzinaIzrade, service_category_id: service.service_category_id.id });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/services/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
     window.reload();
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };
 
    const fetchUsluge = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/services', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsluge(response.data.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
 

  if (loadingUsluge || loadingKategorije) return <div>Loading...</div>;
  if (errorUsluge || errorKategorije) return <div>Error loading data</div>;

  return (
    <div className='services-dashboard'>
      <h1>Services Dashboard</h1>
      <button onClick={() => setShowModal(true)}>Add New Service</button>
      <table>
        <thead>
          <tr>
            <th>Naziv</th>
            <th>Duzina Izrade</th>
            <th>Kategorija</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {usluge.map((service) => (
            <tr key={service.id}>
              <td>{service.naziv}</td>
              <td>{service.duzinaIzrade}</td>
              <td>{service.service_category_id.naziv}</td>
              <td>
                <button onClick={() => handleEdit(service)}>Edit</button>
                <button onClick={() => handleDelete(service.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleModal}>&times;</span>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Naziv:</label>
                <input type="text" name="naziv" value={newService.naziv} onChange={handleInputChange} required />
              </div>
              <div>
                <label>Duzina Izrade:</label>
                <input type="text" name="duzinaIzrade" value={newService.duzinaIzrade} onChange={handleInputChange} required />
              </div>
              <div>
                <label>Kategorija:</label>
                <select name="service_category_id" value={newService.service_category_id} onChange={handleInputChange} required>
                  <option value="">Select Category</option>
                  {kategorije.map((category) => (
                    <option key={category.id} value={category.id}>{category.naziv}</option>
                  ))}
                </select>
              </div>
              <button type="submit">{currentService ? 'Update' : 'Create'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesDashboard;
