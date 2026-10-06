import React from "react";
import { useState } from "react";

/*	Zadanie 1 - Proste (Przełącznik trybu ciemnego)
	Stwórz komponent 'TrybKoloru', ktory:
	- Przechowuje stan 'ciemnyTryb' (boolean, domyślnie false)
	- Wyświetla przycisk "Włącz tryb ciemny" lub "Wyłącz tryb ciemny"
		w zależności od aktualnego stanu
	- Po kliknięciu przełącza tryb na przeciwny
	- Wyświetla tekst "Aktualny tryb: ciemny" lub "Aktualny tryb: jasny"

	Podpowiedz:
	- useState(false) dla wartości logicznej
	- setTryb(poprzedni => !poprzedni) do przełączania
*/

function zmienTrybFunction(obecnyTryb){
  if (obecnyTryb){
    return false;
  }else{
    return true;
  }
}

export function TrybKoloru({ domyslnieTrybCiemny = false, zmienTrybFunction }){
    const [obecnyTrybCiemny, setObecnyTrybCiemny] = useState(false)
    let napis = obecnyTrybCiemny ?
        'Tryb ciemny'
    :
        'Tryb jasny';

    return (<>
        <button onClick={() => setObecnyTrybCiemny(!obecnyTrybCiemny)}>{napis}</button>
    </>)
}


/*	Zadanie 2 - Łatwe (Oceny ucznia)
	Stwórz komponent 'OcenyUcznia', który:
	- Przechowuje tablice ocen (stan), np. [5, 4, 3]
	- Umożliwia dodanie oceny przez input numeryczny (wartosci 1-6)
	- Wyświetla wszystkie oceny jako listę
	- Wyświetla średnią ocen obliczoną na bieżąco
		(podpowiedź: suma / ilość, metoda reduce lub pętla) - zaokrąglona do 2 miejsc po przecinku

	Podpowiedź obliczania średniej (
		const srednia = oceny.length > 0
			? (oceny.reduce((suma, o) => suma + o, 0) / oceny.length).toFixed(2)
			: 0;
	)
*/
function dodajOcene(oceny, dodawanaOcena){
    let najwyzsze_id = 0;
    oceny.length && oceny.map(obiekt => {
        if (obiekt.id > najwyzsze_id) {
            najwyzsze_id = obiekt.id + 1;
        }
    })
    
    if(dodawanaOcena >= 1 && dodawanaOcena <= 6){
        return [...oceny, {id: najwyzsze_id, wartoscOceny: dodawanaOcena}]
    }else{
        return oceny
    }
}

export function OcenyUcznia({ ocenyLista = [] }){ //ocenyLista to obiekty w liście: [{id: 1, wartoscOceny: 5}, {id: 2, wartoscOcent: 3}]
    const [oceny, setOceny] = useState(ocenyLista);

    let ostatniaWpisana;
    return (<>
        <input type="number" id="dodawacz_ocen" onChange={(e) => ostatniaWpisana = e.target.value} />
        <button onClick={() => setOceny(dodajOcene(oceny, ostatniaWpisana))}>Dodaj ocenę</button>
            <hr size="5" />
        <p>Lista wszystkich ocen tego ucznia:</p>
        <ul>
            {
                oceny.map(ocena_obiekt => (
                    <li key={ocena_obiekt.id}>{ocena_obiekt.wartoscOceny}</li>
                ))
            }
        </ul>
            <hr size="5" />
    </>)
}




/*	Zadanie 3 - Średnie (Lista obecności)
	Stwórz komponent 'ListaObecnosci', który:
	- Ma tablice uczniów (stan), każdy uczeń to obiekt: { id, imie, obecny: false }
	- Zaczyna z co najmniej 4 predefiniowanymi uczniami
	- Wyświetla listę uczniów z checkboxem przy każdym
	- Kliknięcie checkboxa przełącza pole 'obecny' dla danego ucznia
		(WAZNE: nie mutuj tablicy - użyj map() do stworzenia nowej wersji)
	- Na dole wyświetla: "Obecnych: X / Y" (X - obecni, Y - wszyscy)

	Podpowiedź do przełączania obecności (
		setUczniowie(poprzedni =>
			poprzedni.map(u =>
				u.id === id ? { ...u, obecny: !u.obecny } : u
			)
		);
	)
*/

function zmienObecnosc(uczniowie, checkbox, id, imie){
    uczniowie.map(uczen => {
        if(uczen.id == id){
            uczen.obecny = checkbox;
        }
    })
    return [...uczniowie];
}

function liczObecnosc(uczniowie){
    let wszystkich = 0;
    let obecnych = 0;
    uczniowie.map(uczen => {
        wszystkich += 1;
        if(uczen.obecny){
            obecnych += 1;
        }
    })
    return (obecnych + "/" + wszystkich)
}

export function ListaObecnosci({ uczniowie_lista = [] }){ //Uczniowie = [{id, imie, obecny: false}]
    const [uczniowie, setUczniowie] = useState(uczniowie_lista);

    return(<>
        <ol>
            {
                uczniowie.map(uczen => (
                    <li key = {uczen.id} > 
                    {uczen.imie} | 
                    <input type="checkbox" checked={uczen.obecny} onChange={(e) => setUczniowie(zmienObecnosc(uczniowie, e.target.checked, uczen.id, uczen.imie))} />
                    </li>
                ))
            }
        </ol>

        <h3>Obecnych uczniów: {liczObecnosc(uczniowie)}</h3>
    </>)
}


/*	Zadanie 4 - Średniozaawansowane (Koszyk ocen z usuwaniem)
	Stwórz komponent 'DziennikOcen', który symuluje dziennik:
	- Stan: tablica obiektów { id, przedmiot, ocena, data }
	- Formularz z polem select dla przedmiotu (min 4 przedmioty),
		polem number dla oceny (1-6) - data ustawiania automatycznie (new Date().toLocaleDateString())
	- Po kliknięciu "Dodaj ocenę" - dodaje wpis do stanu
	- Wyświetla wszystkie wpisy w tabeli HTML (kolumny: Przedmiot, Ocena, Data, Akcja)
	- Przycisk "Usuń" w każdym wierszu usuwa dany wpis
	- Na dole: średnia wszystkich ocen (lub komunikat "Brak ocen")
*/
function dodajWpis(wpisy, dodawanyPrzedmiot, dodawanaOcena){
    console.log(dodawanyPrzedmiot)

    let noweId = 0;
    wpisy.map(wpis => {
        if(wpis.id <= noweId){
            noweId += 1;
        }
    })

    if(dodawanaOcena >= 1 && dodawanaOcena <= 6){
        let dzisiejszaData = new Date().toLocaleDateString();
        console.log(dodawanaOcena)
        return([...wpisy, {id: noweId, przedmiot: dodawanyPrzedmiot, ocena: dodawanaOcena, data: dzisiejszaData}])
    }

    
}

export function DziennikOcen({ wpisy_lista = [] }){
    const [wpisy, setWpisy] = useState(wpisy_lista);
    const przedmioty = [{id: 0, nazwa: "Polski"}, {id: 1, nazwa: "Matematyka"}, {id: 2, nazwa: "Historia"}, {id: 3, nazwa: "Chemia"}];
    
    // let dodawanyPrzedmiot = przedmioty[0].nazwa;
    let dodawanyPrzedmiot;
    let dodawanaOcena;
    
    return(<>
        <button onClick={() => console.log(dodawanaOcena)} />
        <select onChange={(e) => dodawanyPrzedmiot = e.target.value}>
            {przedmioty.map(przedmiot => (
                <option key={przedmiot.id} value={przedmiot.nazwa}>{przedmiot.nazwa}</option>
            ))}
        </select>
        <br />
        <input type="number" onChange={(e) => dodawanaOcena = e.target.value} />
        <br />
        <button onClick={() => setWpisy(dodajWpis(wpisy, dodawanyPrzedmiot, dodawanaOcena))}>Dodaj ocenę</button>
        <br />
        <table border={1}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>PRZEDMIOT</th>
                    <th>OCENA</th>
                    <th>DATA</th>
                </tr>
            </thead>
            <tbody>
            {
                wpisy.map(wpis => (
                    <tr key={wpis.id}>
                        <td>{wpis.id}</td>
                        <td>{wpis.przedmiot}</td>
                        <td>{wpis.ocena}</td>
                        <td>{wpis.data}</td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    </>)
}