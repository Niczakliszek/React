import React from "react";
import { useState, useEffect } from "react";

/*	Zadanie 1 - Latwe
	Stwórz komponent 'ZegarCyfrowy', który wyświetla aktualny czas (godziny, minuty, sekundy).
	Wymagania:
	- Użyj useEffect z [] do uruchomienia interwalu co 1 sekundę
	- Użyj useState do przechowywania aktualnego czasu
	- Wyświetl czas w formacie HH:MM:SS
	- W cleanup zatrzymaj interval (clearInterval)
	- Wskazówka: new Date().toLocaleTimeString()
*/
export function ZegarCyfrowy({ obecnaData = new Date().toLocaleTimeString() }){
    const [czas, setCzas] = useState(obecnaData);

	useEffect(() => {
		const interval = setInterval(() => {
            setCzas(() => {return new Date().toLocaleTimeString()})
    	}, 1000)

		return () => clearInterval(interval)
    })

	return czas;
}


/*	Zadanie 2 - Latwe
	Stwórz komponent 'PowitanieZBazy', który:
	- Przy montowaniu (useEffect z []) "pobiera" imię ucznia z localStorage
		(klucz: 'imie-ucznia') lub ustawia domyślne "Nieznajomy"
	- Wyświetla "Witaj, [imie]!"
	- Ma pole input i przycisk "Zapisz imię"
	- Po kliknieciu przycisku zapisuje imie do localStorage i aktualizuje stan
	- Przy ponownym otwarciu strony pamięta zapisane imię
*/
export function PowitanieZBazy(){
	const [imie, setImie] = useState("");
	const [obecneImie, setObecneImie] = useState("")

	useEffect(() => {
		setImie(localStorage.getItem("imie-ucznia") || "Nieznajomy")
	}, [])

	return (<>
		<h2>Witaj, {imie}</h2>
		<input type="text" onChange={(e) => setObecneImie(e.target.value)} />
		<br />
		<button type="button" onClick={() => {localStorage.setItem("imie-ucznia", obecneImie); setImie(obecneImie)}}>Zapisz imię</button>
	</>)
}


/*	Zadanie 3 - Średnie
	Stwórz komponent 'PodgladTypowania', który implementuje efekt "ktos pisze...":
	- Ma pole tekstowe
	- Gdy użytkownik zaczyna pisać, wyświetla "użytkownik pisze..."
	- Jeśli użytkownik nie pisał przez 1,5 sekundy, komunikat znika
	- Użyj useEffect z [tekst] i clearTimeout w cleanup
	- To częsty pattern w komunikatorach (np. WhatsApp)
*/
export function PodgladTypowania(){
	const [wiadomosc, setWiadomosc] = useState("")
	let [czyPisze, setCzyPisze] = useState(false);

	const timeoutKomunikatu = setTimeout(() =>{
		setCzyPisze(false);
	}, 1500)




	useEffect(() => {
		if(wiadomosc.length != 0){
			setCzyPisze(true);
		}
		return () => {
			clearTimeout(timeoutKomunikatu);
		};
	}, [wiadomosc])


	function czyPiszeFunction(){
		console.log(czyPisze)
		if (czyPisze) {
			return (<div>Użytkownik pisze...</div>)
		} else {
			return (<div></div>)
		}
	}
	return (<>
		<input type="text" onChange={(e) => setWiadomosc(e.target.value)} />
		{czyPiszeFunction()}
	</>)
}



/*	Zadanie 4 - Średnie
	Stwórz system 'OcenySzkolne' z komponentami:
	- Komponent 'DodajOcene': formularz z polem na ocene (1-6) i przyciskiem "Dodaj"
	- Komponent 'StatystykiOcen': przyjmuje tablice ocen przez propsy i wyświetla średnią
	- W komponencie głównym:
		- Przechowyj tablicę ocen w stanie
		- Użyj useEffect ([oceny]) żeby zapisywać oceny do localStorage przy każdej zmianie
		- Przy montowaniu wczytaj oceny z localStorage
		- Wyświetl średnią ocen i liczbę ocen
*/
export function OcenySzkolne(){
	const [tablicaOcen, setTablicaOcen] = useState([])
	const [obecnaOcena, setObecnaOcena] = useState(Number)
	const [liczbaOcen, setLiczbaOcen] = useState(Number)

	useEffect(() => {
		localStorage.setItem("tablicaOcenLocal", [...tablicaOcen, obecnaOcena]);
	}, [tablicaOcen])


	function DodajOcene(){
		return(<>
			<input type="number" onChange={(e) => setObecnaOcena(e.target.value)} />
			<button type="button" onClick={() => {
					setTablicaOcen(...tablicaOcen, obecnaOcena);
					setLiczbaOcen(liczbaOcen + 1)
				}}>Dodaj ocenę</button>
		</>)
	}

	function StatystykiOcen(){
		return(<ul>
			{
				() => {
					if(liczbaOcen != 0){
						tablicaOcen.map(ocena => (
							<li>{ocena}</li>
						))
					}
				}
			}
		</ul>)
	}

	return(<div>
			<DodajOcene />
			<StatystykiOcen />
			</div>)

}
