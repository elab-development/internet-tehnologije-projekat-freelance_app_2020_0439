 Aplikacija za freelance usluge pruža korisnicima različite funkcionalnosti koje omogućavaju efikasno upravljanje uslugama, korisnicima i ponudama, kao i komunikaciju između pružalaca usluga i klijenata. Ključne funkcionalnosti uključuju:
1. Autentifikacija korisnika
Komponenta Auth omogućava korisnicima da se registruju i prijave u aplikaciju. Korisnici mogu uneti svoje ime, email i lozinku za registraciju, dok se prijavljuju koristeći email i lozinku. Nakon uspešne prijave, podaci o korisniku i autentifikacioni token se čuvaju u sessionStorage.
2. Upravljanje ponudama
Komponenta OfferForm omogućava korisnicima da kreiraju nove ponude za različite usluge. Korisnici mogu uneti cenu ponude, status naplate i odabrati uslugu iz liste dostupnih usluga. Nakon kreiranja ponude, poruka o uspehu se prikazuje korisniku.
3. Prikaz ponuda korisnika
Komponenta UserOffers prikazuje sve ponude koje je kreirao ulogovani korisnik. Korisnici mogu pregledati svoje ponude u tabelarnom formatu sa mogućnošću sortiranja, pretrage i paginacije. Takođe, korisnici mogu obrisati određene ponude.
4. Upravljanje uslugama
Komponenta ServicesDashboard omogućava pregled, dodavanje, uređivanje i brisanje usluga. Korisnici mogu pregledati statistike o broju ponuda za svaku uslugu pomoću grafova generisanih sa Chart.js. Takođe, mogu generisati PDF izveštaje o uslugama.
5. Navigacija kroz aplikaciju
Komponenta Navbar pruža navigacionu traku koja omogućava korisnicima pristup različitim delovima sajta, kao što su početna stranica, usluge, kategorije usluga, dashboard, ponude i korisničke ponude. Navigaciona traka se prilagođava u zavisnosti od toga da li je korisnik prijavljen i koja je njegova uloga (administrator ili običan korisnik).
6. Početna stranica
Komponenta Pocetna prikazuje osnovne informacije o aplikaciji i slike vezane za rad u kancelariji. Korisnici mogu pregledati slike preuzete sa Unsplash API-ja i pročitati dodatne informacije o aplikaciji u modalnom prozoru.
7. Informacije o osnivačima i viziji
Komponenta ONama pruža informacije o osnivačima platforme i njihovoj viziji. Korisnici mogu pročitati o iskustvu i strasti osnivača prema povezivanju talentovanih slobodnjaka sa poslodavcima. Takođe, mogu pratiti platformu na društvenim mrežama putem interaktivnih dugmadi.
8. Prikaz kategorija usluga
Komponenta KategorijeUsluga prikazuje dostupne kategorije usluga na platformi. Korisnici mogu pregledati listu kategorija i pročitati uvodni tekst koji opisuje široki spektar problema koje usluge pokrivaju.
9. Upravljanje uslugama
Custom hook useUsluge omogućava dinamičko učitavanje podataka o uslugama sa API endpointa. Hook održava stanja za usluge, status učitavanja i eventualne greške, omogućavajući modularnost i ponovnu upotrebu u različitim delovima aplikacije.
10. Upravljanje kategorijama usluga
Custom hook useKategorije omogućava dobijanje podataka o kategorijama usluga sa API endpointa. Ovaj hook koristi asinhrone operacije za učitavanje podataka i obezbeđuje povratne vrednosti koje se mogu koristiti u komponentama za prikaz kategorija.
11. Footer aplikacije
Komponenta Footer prikazuje osnovne kontakt informacije o platformi, uključujući email adresu i kontakt telefon. Ova komponenta doprinosi celokupnom korisničkom iskustvu pružajući relevantne informacije na pristupačnom mestu.
