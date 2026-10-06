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
import { DziennikOcen } from '../../Pliki rozwiazan/04-rozwiazanie'
//#endregion

//#region 06-rozwiazanie
import { ZegarCyfrowy } from '../../Pliki rozwiazan/06-rozwiazanie'
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
  return (<>
    {/* <TrybKoloru zmienTrybFunction={zmienTrybFunction} /> */}
    {/* <OcenyUcznia />
    <ListaObecnosci uczniowie_lista={uczniowie}/>
    <DziennikOcen /> */}

    <ZegarCyfrowy />
    </>)
}

export default App
