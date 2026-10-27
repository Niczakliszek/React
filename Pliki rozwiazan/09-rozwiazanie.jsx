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
        setUczen({...uczen, class: newClass});
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

export function ClassChanger(){
    const { uczen, changeClass } = useContext(StudentContext);

    return(
        <div>
            <button type="button" onClick={() => changeClass("1A")}>1A</button>
            <button type="button" onClick={() => changeClass("2B")}>2B</button>
            <button type="button" onClick={() => changeClass("3C")}>3C</button>
        </div>
    )
}


/*	Zadanie 3 - Poziom: Sredni
	Temat: Custom Hook dla Context

	Stwórz system zarządzania listą obecności z custom hookiem.
	Wymagania:
	1. Utwórz AttendanceContext z listą uczniów:
		[
			{ id: 1, name: 'Anna Nowak', present: false },
			{ id: 2, name: 'Piotr Kowalski', present: false },
			{ id: 3, name: 'Maria Wiśniewska', present: false }
		]
	2. Dodaj funkcję toggleAttendance(id) przełączającą obecność ucznia
	3. Stwórz custom hook useAttendance() z sprawdzaniem czy Provider jest aktywny
	4. Stwórz komponent AttendanceList wyświetlający listę z checkboxami
		(checkbox zaznaczony jeśli present === true)
	5. Stwórz komponent AttendanceSummary wyświetlający:
		"Obecnych: X z Y uczniów"

	Oczekiwany wynik:
	Lista uczniów z checkboxami. Kliknięcie checkboxa zmienia status.
	Podsumowanie aktualizuje się automatycznie.

    TU SĄ CUSTOM HOOKI, NA RAZIE DED
*/




/*	Zadanie 4 - Poziom: Sredni
	Temat: Kilka Contextów i komunikacja między nimi

	Stwórz mini panel ocen dla systemu szkolnego.
	Wymagania:
	1. UserContext: przechowuje zalogowanego nauczyciela { name: 'dr Makowski', subject: 'Matematyka' }
	2. GradesContext: przechowuje tablicę ocen z funkcjami addGrade i deleteGrade:
		- addGrade(studentName, grade) - dodaje ocenę { id, studentName, grade, addedBy, date }
		- pole addedBy powinno pobierać imię z UserContext... ale Contexty nie mogą się wzajemnie
			odczytywać bezpośrednio! Wskazówka: przekaż imię nauczyciela jako parametr do addGrade.
		- deleteGrade(id) - usuwa ocenę po ID
	3. Komponent AddGradeForm: formularz z polem na imię ucznia i select z ocenami (1-6)
	4. Komponent GradesList: lista wszystkich ocen z przyciskiem usuwania
	5. Komponent TeacherInfo: wyświetla informacje o zalogowanym nauczycielu

	Oczekiwany wynik:
	Widoczne imię nauczyciela, formularz dodawania ocen, lista ocen.
	Po dodaniu oceny pojawia się na liście z imieniem nauczyciela.
*/

const UserContext = createContext(null);
const GradesContext = createContext(null);

export function UserProvider( {children} ){
    const teacherName = "dr. Makowski";
    const subject = "Matematyka";

    return(
        <UserContext.Provider value={{teacherName, subject}}>
            {children}
        </UserContext.Provider>
    )
}

export function GradesProvider( {children} ){
    const [noweId, setNoweId] = useState(1)
    const [tablicaOcen, setTablicaOcen] = useState([])

    const addGrade = (studentName, grade, teacherName) => {
        // let noweId = 0;
        // tablicaOcen.map( (ocena) => {
        //     if(ocena.id >= noweId){
        //         noweId = ocena.id + 1;
        //     }
        // })

        const nowaTablicaOcen = [
            ...tablicaOcen, 
            {
                id: noweId, 
                studentName: studentName, 
                grade: grade, 
                addedBy: teacherName, 
                date: new Date().toLocaleTimeString()
            }
        ]
    
        setNoweId(noweId + 1);
        setTablicaOcen(nowaTablicaOcen);

        return (nowaTablicaOcen);
    }

    const deleteGrade = (idRemoved) => {
        setTablicaOcen(tablicaOcen.filter((ocena) => {
            return ocena.id != idRemoved
        }))

        return (tablicaOcen);
    }

    return(
        <GradesContext.Provider value={{tablicaOcen, addGrade, deleteGrade}}>
            {children}
        </GradesContext.Provider>
    )
}



export function AddGradeForm() {
    const {teacherName, subject} = useContext(UserContext);
    const {tablicaOcen, addGrade, deleteGrade} = useContext(GradesContext);

    const [studentName, setStudentName] = useState("");
    const [wybranaOcena, setWybranaOcena] = useState(1);

    const dodajOcene = () => {
        console.log('studentName:', studentName);
        console.log('wybranaOcena:', wybranaOcena);
        console.log('teacherName:', teacherName);
        console.log('tablicaOcen przed:', tablicaOcen);
        const nowaTablicaOcen = addGrade(studentName, wybranaOcena, teacherName);
        console.log('nowaTablicaOcen:', nowaTablicaOcen);
        console.log('tablicaOcen po:', tablicaOcen);
    }

    return (
        <div>
            Imię ucznia: <br />
            <input type="text" onChange={ (e) => { setStudentName(e.target.value) } } />
                <br /><br />
            Wartość oceny: <br />
            <select onChange={ (e) => { setWybranaOcena(e.target.value) } }>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
            </select>
                <br /><br />
            <button type="button" onClick={dodajOcene}>Dodaj Ocenę</button>
        </div>
    )
}


export function GradesList(){
    const {tablicaOcen, addGrade, deleteGrade} = useContext(GradesContext);

    return(
        <div>
            <h2>Lista ocen:</h2>
            <ul>
                {
                    tablicaOcen.map( (ocena) => (
                        <li key={ocena.id}>{ocena.grade}</li>
                    ))
                }
            </ul>
        </div>
    )
}