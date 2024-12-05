import React from 'react';
import './ONama.css'; 
import { FaInstagram, FaFacebook } from 'react-icons/fa';

const ONama = () => {

    const handleInstagramClick = () => {
        window.open('https://www.instagram.com/', '_blank');
      };
    
      const handleFacebookClick = () => {
        window.open('https://www.facebook.com/', '_blank');
      };

    return (
        <div className='o-nama-stranica'>
        <div className="o-nama">
            <h2>O nama</h2>
            <p className='tekst'>

            Naša freelance platforma, osnovana je sa ciljem pružanja
            prostora za uspeh i povezivanje slobodnih profesionaca
            i poslodavaca. Osnivači ove inovativne platforme su gospodja
            Andjela Milićević, iskusni programer sa decenijskim iskustvom
            u IT industriji, i gospođa Andjela Alempijević, preduzetnica sa bogatim
            iskustvom u vođenju uspešnih poslova.<br/><br/>

            Dve Andjele, kao suosnivači i direktori, predstavljaju srce naše
            platforme. Njihova strast prema povezivanju talentovanih slobodnjaka
            sa poslodavcima odražava se kroz svaki segment naše aplikacije.
            Njihova vizija je stvoriti dinamičnu i efikasnu zajednicu koja
            će olakšati freelancing iskustvo za obe strane.<br/><br/>

            Ova platforma je rezultat njihove predanosti i posvećenosti
            stvaranju prostora gde slobodni profesionalci mogu istraživati
            nove poslovne prilike, a poslodavci pronalaziti najkvalitetnije
            usluge. Andjele veruju da je saradnja ključ uspeha, te
            su osmislili ovu platformu kako bi podržali rast i razvoj
            freelancing zajednice u Srbiji.
            </p>
            <div className="social-media-container">
            <button className="instagram-button" onClick={handleInstagramClick}>
                <FaInstagram style={{ fontSize: '35px' }} />
                Zapratite nas na Instagramu
            </button>
            <button className="facebook-button" onClick={handleFacebookClick}>
                <FaFacebook style={{ fontSize: '35px' }} />
                Zapratite nas na Facebooku
            </button>
            </div>
        </div>
        </div>
    );
};

export default ONama;