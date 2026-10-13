import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

// import Naglowek from './test'

// import { Article } from '../../Pliki rozwiazan/03-rozwiazanie'
// import { PersonCard } from '../../Pliki rozwiazan/03-rozwiazanie'
// import { MovieList } from '../../Pliki rozwiazan/03-rozwiazanie'

//#region 04-rozwiazanie
import { TrybKoloru } from '../../Pliki rozwiazan/04-rozwiazanie'
import { OcenyUcznia } from '../../Pliki rozwiazan/04-rozwiazanie'
import { ListaObecnosci } from '../../Pliki rozwiazan/04-rozwiazanie'
// import { DziennikOcen } from '../../Pliki rozwiazan/04-rozwiazanie'
//#endregion

//#region 06-rozwiazanie
import { ZegarCyfrowy } from '../../Pliki rozwiazan/06-rozwiazanie'
import { PowitanieZBazy } from '../../Pliki rozwiazan/06-rozwiazanie'
import { PodgladTypowania } from '../../Pliki rozwiazan/06-rozwiazanie'
import { OcenySzkolne } from '../../Pliki rozwiazan/06-rozwiazanie'
//#endregion

//#region 08-rozwiazanie
import { KartaKlasy, ListaPrzedmiotow } from '../../Pliki rozwiazan/08-rozwiazanie'
import { DziennikOcen } from '../../Pliki rozwiazan/08-rozwiazanie'
//#endregion


function App() {
  let movies_list = [
	    { id: 1, title: "Inception", year: 2010, rating: 8.8 },
	    { id: 2, title: "Avatar", year: 2009, rating: 8.5 }
	  ]

  let uczniowie = [{id: 0, imie: "Bartek", obecny: false}, 
    {id: 1, imie: "Paw", obecny: false}, 
    {id: 2, imie: "Pyrka", obecny: true},
    {id: 3, imie: "Dom", obecny: false}]

  
  const uczniowie2 = [
		  { id: 1, imie: 'Celina', nazwisko: 'Wiśniowska', nrDziennika: 3 },
		  { id: 2, imie: 'Anna', nazwisko: 'Kowalska', nrDziennika: 1 },
		  { id: 3, imie: 'Bartek', nazwisko: 'Nowak', nrDziennika: 2 },
	  ];

  const oceny = [
    {id: 1, przedmiot: "Polski", ocena: 5, data: new Date().toLocaleDateString()},
    {id: 2, przedmiot: "Matematyka", ocena: 3, data: new Date().toLocaleDateString()},
    {id: 3, przedmiot: "Chemia", ocena: 2, data: new Date().toLocaleDateString()},
    {id: 4, przedmiot: "Angielski", ocena: 6, data: new Date().toLocaleDateString()},
    {id: 5, przedmiot: "Fizyka", ocena: 4, data: new Date().toLocaleDateString()}
  ]
  return (<>
    {/* <TrybKoloru zmienTrybFunction={zmienTrybFunction} /> */}
    {/* <OcenyUcznia />
    <ListaObecnosci uczniowie_lista={uczniowie}/>
    <DziennikOcen /> */}

    {/* <ZegarCyfrowy />
    <br />
    <PowitanieZBazy />
    <br /><br /><br />
    <PodgladTypowania />
    <br /><br /><br />
    <OcenySzkolne /> */}

    <ListaPrzedmiotow />
    <br /><br />
    <KartaKlasy tablicaObiektowUczniow = {uczniowie2} />
    <br /><br />
    <DziennikOcen tablicaOcenParam={oceny}/>

    </>)
}

export default App
