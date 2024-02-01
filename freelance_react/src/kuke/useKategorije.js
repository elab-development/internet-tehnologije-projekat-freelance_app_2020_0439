import { useState, useEffect } from 'react';
import axios from 'axios';

const useKategorije = (urlAdresa) => {

  const [kategorije, setKategorije] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsluge = async () => {
      try {

        const response = await axios.get(urlAdresa);

        setKategorije(response.data.data);

        setLoading(false);

      } catch (error) {

        setError(error);

        setLoading(false);

      }
    };

    fetchUsluge();

  }, [urlAdresa]); 

  //sta sve vracamo
  return { kategorije, loading, error };
};

export default useKategorije;