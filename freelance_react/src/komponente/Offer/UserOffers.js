import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MDBDataTable } from 'mdbreact';
import './UserOffers.css';

const UserOffers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/ponudeKorisnika', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setOffers(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchOffers();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/offers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setOffers(offers.filter(offer => offer.id !== id));
      alert('Ponuda je uspešno obrisana.');
    } catch (error) {
      console.error('Greška prilikom brisanja ponude:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const data = {
    columns: [
      {
        label: 'ID',
        field: 'id',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Cena Ponude',
        field: 'cenaPonude',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Status Naplate',
        field: 'statusNaplate',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Datum Zaključenja',
        field: 'datumZakljucenja',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Naziv Usluge',
        field: 'nazivUsluge',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Pružalac Usluge',
        field: 'pruzalacUsluge',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Akcije',
        field: 'actions',
        sort: 'asc',
        width: 100
      }
    ],
    rows: offers.map(offer => ({
      id: offer.id,
      cenaPonude: offer.cenaPonude,
      statusNaplate: offer.statusNaplate,
      datumZakljucenja: offer.datumZakljucenja,
      nazivUsluge: offer.service_id.naziv,
      pruzalacUsluge: offer.service_id.service_category_id.naziv,
      actions: <button onClick={() => handleDelete(offer.id)}>Obriši</button>
    }))
  };

  return (
    <div className="offers-container">
      <h1>Moje Ponude</h1>
      <MDBDataTable
        striped
        bordered
        small
        data={data}
        entriesOptions={[5, 10, 20, 50]}
        entries={5}
        pagesAmount={4}
        searching={true}
      />
    </div>
  );
};

export default UserOffers;
