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
                    <li id={ocena_obiekt.id}>{ocena_obiekt.wartoscOceny}</li>
                ))
            }
        </ul>
            <hr size="5" />
        <p>Średnia ocen ucznia:</p>
        {/* <b>
            {WyswietlSrednia(oceny)}
        </b> */}
    </>)
}