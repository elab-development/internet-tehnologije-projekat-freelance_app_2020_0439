import React from 'react';
import useKategorije from '../kuke/useKategorije';
import './KategorijeUsluga.css'; 

const KategorijeUsluga = () => {

  const { kategorije, loading, error } = useKategorije('http://127.0.0.1:8000/api/service-categories');

  if (loading) return <p>Loading kategorije...</p>;
  if (error) return <p>Error loading kategorije: {error.message}</p>;


  return (


    <div className='kategorije-page'>
     <div className="kanta">
     <img className='gif'  src="https://cdn.dribbble.com/users/31566/screenshots/2138452/dribbble-shot.gif" alt="logo" border="0"/>
     <h2>O kategorijama usluga koje nudimo...</h2>
        <p className='tekst'>
        Budite sigurni da naše usluge pokrivaju široki spektar problema na koje možete naići
        tokom svakodnevnog života. Zato šta čekate, rešite vaš problem uz minimalan napor!
        Kategorije usluga koje nudimo su sledeće:
        </p>
      <ul className="kategorije-lista">
        {kategorije.map((kategorija) => (
          <li key={kategorija.id}>
            {kategorija.naziv}
          </li>
        ))}
      </ul>
        </div>   

    </div>

  );
};

export default KategorijeUsluga;