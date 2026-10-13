import React from "react";
import { useState, useEffect } from "react";

/*	Zadanie 1 (proste) - Lista przedmiotów szkolnych
	Stwórz komponent 'ListaPrzedmiotow'.
	Dane: tablica stringów z nazwami przedmiotów: Matematyka, Polski, Angielski, Historia, Fizyka, Chemia, Biologia.
	Wyświetl je jako listę nieuporządkowaną <ul>.
	Ponieważ są to stringi (nie obiekty z id), możesz użyć indeksu jako klucza
	- lista jest statyczna i się nie zmienia.

	Oczekiwany wynik:
	Lista przedmiotów:
	- Matematyka
	- Polski
	- Angielski
	- (i tak dalej...)
*/
export function ListaPrzedmiotow({ przedmioty = ["Matematyka", "Polski", "Angielski", "Historia", "Fizyka", "Chemia", "Biologia"] }) {
    const [przedmiotyLista, setPrzedmiotyLista] = useState(przedmioty);
    
    let index = 0;
    return (<ul>
        {
            przedmiotyLista.map( (przedmiot) => {
                return (<li key={index++}> {przedmiot} </li>)
            })
        }
    </ul>)
}


/*	Zadanie 2 (lekko trudniejsze) - Karta klasy
	Stwórz komponent 'KartaKlasy'.
	Dane: tablica obiektów uczniów, każdy z polami: id, imie, nazwisko, nrDziennika.
	Wyświetl uczniów jako tabelę HTML z kolumnami: Nr dziennika, Imię, Nazwisko.
	Posortuj uczniów po nrDziennika przed wyświetleniem.
	Użyj id ucznia jako klucza.

	Przykładowe dane do użycia:
	const uczniowie = [
		{ id: 1, imie: 'Celina', nazwisko: 'Wiśniowska', nrDziennika: 3 },
		{ id: 2, imie: 'Anna', nazwisko: 'Kowalska', nrDziennika: 1 },
		{ id: 3, imie: 'Bartek', nazwisko: 'Nowak', nrDziennika: 2 },
	];
*/
export function KartaKlasy({ tablicaObiektowUczniow = [] }) {
    const [tablicaUczniow, setTablicaUczniow] = useState(tablicaObiektowUczniow);

    function posortujUczniow(tablicaUczniow){
        return [...tablicaUczniow].sort( (a, b) => (a.nrDziennika - b.nrDziennika) )
    }

    return(<table border={1}>
        <thead>
            <tr>
                <th>ID</th>
                <th>IMIE</th>
                <th>NAZWISKO</th>
                <th>NR. DZIENNIKA</th>
            </tr>
        </thead>

        <tbody>
            {
                posortujUczniow(tablicaUczniow).map( (uczen) => {
                    return (<tr key={uczen.id}>
                        <td>{uczen.id}</td>
                        <td>{uczen.imie}</td>
                        <td>{uczen.nazwisko}</td>
                        <td>{uczen.nrDziennika}</td>
                    </tr>)
                })
            }
        </tbody>
    </table>)
}


/*	Zadanie 3 (średnie) - Dziennik ocen z filtrami
	Stwórz komponent 'DziennikOcen'.
	Dane: tablica ocen z polami: id, przedmiot, ocena (1-6), data.
	Wymagania:
	- Wyświetl listę ocen
	- Dodaj filtr (select) pozwalający wybrać konkretny przedmiot lub 'Wszystkie'
	- Wyświetl średnią ocen z aktualnie wyświetlanych przedmiotów
	- Użyj id jako klucza
	- Jeśli po filtrowaniu nie ma żadnych ocen, wyświetl tekst 'Brak ocen z tego przedmiotu'

	Wskazówka: listę unikalnych przedmiotów do selecta możesz stworzyć używając:
	[...new Set(oceny.map(o => o.przedmiot))]
*/
export function DziennikOcen({ tablicaOcenParam = [] }) {
    const [tablicaOcen, setTablicaOcen] = useState(tablicaOcenParam);

    return (<div>
        <ul>
            {
                tablicaOcen.map( (ocena) => {
                    return (<li key={ocena.id}>{ocena.ocena}</li>)
                })
            }
        </ul>
    </div>)
}