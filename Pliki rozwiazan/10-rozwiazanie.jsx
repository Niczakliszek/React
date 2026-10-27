import React from "react";
import { useState, useEffect, useRef } from "react";


// Zadanie 1 — Łatwe
// Stwórz prosty komponent FormularzImienia, który:

// ma jedno pole tekstowe input[type="text"] dla imienia
// pod polem wyświetla na bieżąco wpisany tekst jako: Witaj, [imie]!
// gdy pole jest puste, wyświetl: Wpisz swoje imię
// Wskazówka: użyj jednego useState i warunkowego renderowania (operator || lub ternary)

export function FormularzImienia(){
    const [imie, setImie] = useState("Wpisz swoje imię")

    return(
        <div>
            <input type="text" onChange={ (e) => setImie(e.target.value) } />
            <p>Witaj, {imie}!</p>
        </div>
    )
}


// Zadanie 2 — Łatwe/Średnie
// Stwórz formularz oceniania ucznia dla Systemu Zarządzania Szkołą. Formularz ma zawierać:

// pole tekstowe: imię i nazwisko ucznia
// lista rozwijana (select): ocena od 1 do 6
// pole select: przedmiot (matematyka, polski, angielski, historia, biologia)
// przycisk Dodaj ocenę
// Po wysłaniu formularza wyświetl pod nim listę dodanych ocen w formacie:

// [Imie Nazwisko] - [Przedmiot]: [Ocena]

// Wskazówka: użyj tablicy w stanie do przechowywania listy wpisów.

export function SystemSzkoly(){
    const [tablicaOcen, setTablicaOcen] = useState([]);
    const [noweId, setNoweId] = useState(0);

    const ImieINazwisko = useRef();
    const WartoscOceny = useRef();
    const Przedmiot = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        setTablicaOcen(
            () => {
                setNoweId(noweId + 1)
                return([
                    ...tablicaOcen,
                    {
                        id: noweId,
                        imieINazwisko: ImieINazwisko.current.value,
                        przedmiot: Przedmiot.current.value,
                        wartosc: WartoscOceny.current.value
                    }
                ])
            }
        )
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" ref={ImieINazwisko} /> 
                    <br />
                <select ref={WartoscOceny}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                </select>
                <select ref={Przedmiot}>
                    <option value={"Matematyka"}>Matematyka</option>
                    <option value={"Historia"}>Historia</option>
                    <option value={"Polski"}>Polski</option>
                    <option value={"Biologia"}>Biologia</option>
                    <option value={"Angielski"}>Angielski</option>
                </select>
                    <br />
                <button type="submit">Prześlij ocene</button>
            </form>
            
            <h2>Dodane oceny:</h2>
            <ul>
                {
                    tablicaOcen.map( (ocena) => (
                        <li key={ocena.id}>{ocena.imieINazwisko} - {ocena.przedmiot} : {ocena.wartosc}</li>
                    ))
                }
            </ul>
        </div>
    )
}



// Zadanie 3 — Średnie
// Zbuduj formularz rejestracji ucznia z walidacją (bez bibliotek — tylko useState i własna logika).

// Pola formularza:

// Imie (wymagane, min. 2 znaki)
// Nazwisko (wymagane, min. 2 znaki)
// Email (wymagane, musi zawierać @ i .)
// Hasło (wymagane, min. 8 znaków)
// Powtórz hasło (wymagane, musi być identyczne jak hasło)
// Wymagania:

// pokaż czerwony komunikat błędu pod każdym niepoprawnym polem
// walidacja ma uruchamiać się przy próbie wysłania formularza
// po poprawnym wypełnieniu wyświetl zielony komunikat Rejestracja zakończona pomyślnie!
// wyczyść formularz po pomyślnej rejestracji
// Wskazówka: użyj jednego obiektu stanu dla danych i jednego dla błędów.

export function RejestracjaZWalidacja(){
    const [tablicaBledow, setTablicaBledow] = useState([])
    
    const [bladImieState, setBladImieState] = useState('');
    const [bladNazwiskoState, setBladNazwiskoState] = useState('');
    const [bladEmailState, setBladEmailState] = useState('');
    const [bladHasloState, setBladHasloState] = useState('');
    const [bladPowHasloState, setBladPowHasloState] = useState('');

    const imie = useRef();
    const nazwisko = useRef()
    const email = useRef()
    const haslo = useRef()
    const pow_haslo = useRef()

    const Weryfikuj = (e) => {
        e.preventDefault()
            setBladImieState(
                imie.current.value.length < 2
                ?   "Imie musi mieć przynajmniej 2 znaki!"
                :   ''
            )

            setBladNazwiskoState(
                nazwisko.current.value.length < 2
                ?   "Nazwisko musi mieć przynajmniej 2 znaki!"
                :   ''
            )

            setBladEmailState(
                !email.current.value.includes("@") || !email.current.value.includes(".")
                ?   "Email musi zawierać '@' i '.'!"
                :   ''
            )

            setBladHasloState(
                haslo.current.value.length < 8
                ? "Hasło musi mieć przynajmniej 8 znaków!"
                : ""
            )

            setBladPowHasloState(
                pow_haslo.current.value != haslo.current.value
                ? "Hasła muszą być zgodne!"
                : ""
            )
    }

    return(
        <div>
            <form onSubmit={Weryfikuj}>
                <input type="text" ref={imie} /> Imię <br />
                    <p style={{color: "red"}}> <i>{bladImieState}</i> </p>
                <input type="text" ref={nazwisko} /> Nazwisko <br />
                    <p style={{color: "red"}}> <i>{bladNazwiskoState}</i> </p>
                <input type="email" ref={email} /> Email <br />
                    <p style={{color: "red"}}> <i>{bladEmailState}</i> </p>
                <input type="password" ref={haslo} /> Hasło <br />
                    <p style={{color: "red"}}> <i>{bladHasloState}</i> </p>
                <input type="password" ref={pow_haslo} /> Powtórz hasło <br />
                    <p style={{color: "red"}}> <i>{bladPowHasloState}</i> </p>
                <button type="submit">Zarejestruj się!</button>
            </form>
        </div>
    )
}