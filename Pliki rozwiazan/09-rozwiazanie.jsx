import React from "react";
import { useState, useEffect } from "react";
import { createContext, useContext } from "react";

/*	Zadanie 1 - Poziom: Łatwy
	Temat: Pierwszy własny Context

	Stwórz Context o nazwie SchoolNameContext przechowujący nazwę szkoły.
	Wymagania:
	1. Utwórz SchoolNameContext używając createContext()
	2. Stwórz komponent SchoolNameProvider który w stanie przechowuje
		nazwę szkoły "Liceum Ogólnokształcące nr 1 im. Jana Kochanowskiego"
	3. Stwórz komponent SchoolHeader który pobiera nazwę z Context
		i wyświetla ją w tagu <h1>
	4. Złóż wszystko w App i uruchom

	Oczekiwany wynik:
	Na stronie widoczny nagłówek z pełną nazwą szkoły.
    
	Wskazówka: Pamiętaj o "owinięciu" SchoolHeader w SchoolNameProvider!
*/

const SchoolNameContext = createContext(null);
export function SchoolNameProvider({ Szkola = "Technikum nr.1 im. Bartłomieja Guza w Piasecznie" }){
    const [nazwaSzkoly, setNazwaSzkoly] = useState(Szkola);

    return(
        <SchoolNameContext.Provider value={nazwaSzkoly}>
            <SchoolHeader />
        </SchoolNameContext.Provider>
    );
}

function SchoolHeader(){
    const nazwaSzkoly = useContext(SchoolNameContext);
    return(
        <h1> {nazwaSzkoly} </h1>
    );
}


/*	Zadanie 2 - Poziom: Łatwy
	Temat: Context z możliwością zmiany danych

	Stwórz system zmiany klasy dla ucznia.
	Wymagania:
	1. Utwórz StudentContext przechowujący obiekt { name: 'Jan Kowalski', class: '1A' }
	2. Dodaj do Providera funkcję changeClass(newClass) która aktualizuje klasę ucznia
	3. Stwórz komponent StudentInfo wyświetlający imię i klasę ucznia
	4. Stwórz komponent ClassChanger z przyciskami: "1A", "2B", "3C"
		- Kliknięcie przycisku zmienia klasę ucznia w Contexcie
	5. Oba komponenty mają działać bez przekazywania props

	Oczekiwany wynik:
	Wyświetla się "Jan Kowalski - Klasa: 1A"
	Po kliknięciu "2B" zmienia się na "Jan Kowalski - Klasa: 2B"
*/
const StudentContext = createContext(null);
export function StudentProvider({ children }) {
    const [uczen, setUczen] = useState( { name: 'Jan Kowalski', class: '1A' } )

    const changeClass = (newClass) =>{
        return setUczen({...uczen, class: newClass});
    }

    return(
        <StudentContext.Provider value={{uczen, changeClass}}>
            {children}
        </StudentContext.Provider>
    )
}

export function StudentInfo(){
    const { uczen, changeClass } = useContext(StudentContext);

    return(
        <div>
            <p>Imię ucznia: {uczen.name}</p>
            <p>Klasa ucznia: {uczen.class}</p>
        </div>
    )
}