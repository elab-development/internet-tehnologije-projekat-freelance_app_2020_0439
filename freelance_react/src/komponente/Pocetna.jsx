import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Pocetna.css';

const Pocetna = () => {
    const [showModal, setShowModal] = useState(false);
    const [readMoreClicked, setReadMoreClicked] = useState(false);
    const [images, setImages] = useState([]);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handleReadMoreClick = () => {
        setReadMoreClicked(!readMoreClicked);
        toggleModal();
    };

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('https://api.unsplash.com/search/photos', {
                    params: { query: 'office work', per_page: 5 },
                    headers: {
                        Authorization: 'Client-ID YvBxTVU_ggpMkTDjaZOyGnMh79OzyJlZUiC1D1gu9oE'  
                    }
                });
                setImages(response.data.results);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);

    return (
        <div className='home-stranica'>
            <div className="home">
                <h1>Dobrodošli na sajt za freelance usluge!</h1>
                <p>Nadjite najbolju uslugu i resite vas problem sto pre!</p>
                <div className="service-images-container">
                    {images.map((image) => (
                        <img key={image.id} src={image.urls.small} alt={image.alt_description} className="service-image" />
                    ))}
                </div>
                <p>
                    Freelance aplikacija pruža korisnicima 
                    platformu za jednostavno povezivanje i 
                    saradnju na raznolikim projektima. 
                    Omogućava slobodu izbora poslova i 
                    usluga prema vlastitim 
                    interesima i ekspertizama.
                </p>
                <p className={`readmore ${readMoreClicked ? 'clicked' : ''}`} onClick={handleReadMoreClick}> 
                    ...PROČITAJ VIŠE...
                </p>

                {showModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={toggleModal}>&times;</span>
                            <img className='logo'  src="https://i.ibb.co/QrSXky7/image-Photo-Room-png-Photo-Room.png" alt="logo" border="0"/>
                            <p className='tekst'>
                            Freelance aplikacija pruža korisnicima platformu
                             za jednostavno povezivanje i saradnju na raznolikim
                              projektima. Omogućava slobodu izbora poslova i 
                              usluga prema vlastitim interesima i ekspertizama.
                               Korisnici mogu pregledavati, ponuditi, i prihvatiti
                                freelance projekte, stvarajući dinamičnu zajednicu
                                 nezavisnih profesionalaca i poslodavaca. Sa intuitivnim
                                  okruženjem, recenzijama i sigurnim načinom plaćanja,
                                   naša aplikacija olakšava učinkovitu saradnju između
                                    freelancer-a i klijenata, stvarajući prostor za rast
                                     i uspeh u svetu freelance-inga.
                            </p>

                            {images.slice(1).map((image) => (
                                <img key={image.id} src={image.urls.small} alt={image.alt_description} className="service-image" />
                            ))}
                        
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Pocetna;
