import React, { useState } from 'react';
import './Pocetna.css';

const Pocetna = () => {
    const [showModal, setShowModal] = useState(false);
    const [readMoreClicked, setReadMoreClicked] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handleReadMoreClick = () => {
        setReadMoreClicked(!readMoreClicked);
        toggleModal();
    };

    return (
        <div className='home-stranica'>
            <div className="home">
                <h1>Dobrodošli na sajt za freelance usluge!</h1>
                <p>Nadjite najbolju uslugu i resite vas problem sto pre!</p>
                <div className="service-images-container">
                     <img src={require('../slike/slika1.jpg')} alt="Image 1" className="service-image"/>
                     <img src={require('../slike/slika2.jpg')} alt="Image 2" className="service-image"/>
                     <img src={require('../slike/slika3.jpg')} alt="Image 3" className="service-image"/>
                     <img src={require('../slike/slika4.jpg')} alt="Image 4" className="service-image"/>
                     <img src={require('../slike/slika5.jpg')} alt="Image 5" className="service-image"/>
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

                            <img src='https://i.ibb.co/HPNKGSs/istockphoto-1398577959-612x612.jpg' alt="Image 6" className="service-image"/>
                            <img src='https://thesweetbits.com/wp-content/uploads/2023/03/4Kvideo.jpg' alt="Image 7" className="service-image"/>
                            <img src='https://www.shutterstock.com/shutterstock/videos/21274588/thumb/1.jpg?ip=x480' alt="Image 8" className="service-image"/>
                            <img src='https://c4.wallpaperflare.com/wallpaper/126/971/651/fitness-gym-coach-training-wallpaper-preview.jpg' alt="Image 9" className="service-image"/>
                        
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Pocetna;

