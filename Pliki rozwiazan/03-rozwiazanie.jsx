import React from "react";

/*	Zadanie praktyczne 1: Komponent Article
	Utwórz komponent Article, który przyjmuje props:
	- title (string, wymagane)
	- author (string, wymagane)
	- content (string, opcjonalne)

	Komponent powininen wyświetlić artykuł w formacie:
	<h2>Tytuł</h2>
	<p>Autor: imię autora</p>
	<p>Zawartość artykułu</p>

	Dodaj PropTypes do walidacji danych.
	Użycie: <Article title="React 18" author="Jan" content="React jest super!" />
*/
export function Article({ title, author, content = '' }){
    return (<>
        <h2>{title}</h2>
	    <p>Autor: {author}</p>
	    <p>"{content}"</p>
    </>)
}


/*	Zadanie praktyczne 2: Komponent Person Card
	Utwórz komponent PersonCard z destrukturyzacją props:
	- firstName (string)
	- lastName (string)
	- age (number)
	- occuption (string, domyślnie "Bez zawodu")

	Wyświetl dane w karcie osoby.
	Waliduj wszystkie props za pomocą PropTypes.

	Śledź: W Angularze byłaby to @Input property - tutaj to props!
*/
export function PersonCard({ firstName, lastName, age, occupation = "Bez zawodu" }){
    return (<>
        <p>{firstName}</p>
        <p>{lastName}</p>
        <p>{age}</p>
        <p>{occupation}</p>
    </>)
}


/*	Zadanie praktyczne 3: Komponent Lista filmów
	Utwórz komponent MovieList, który przyjmuje:
	- movies (tablica obiektów z polami: id, title, year, rating)

	Komponent powinien:
	- Iterować przez tablicę filmów
	- Wyświetlić każdy film na liście
	- Walidować że movies to tablica obiektów z wymaganymi polami

	Przykład użycia:
	<MovieList movies={[
	  { id: 1, title: "Inception", year: 2010, rating: 8.8 },
	  { id: 2, title: "Avatar", year: 2009, rating: 8.5 }
	]} />
*/


export function MovieList({ movies = [] }) {
	return (
		<ul>
			{movies.map(mov => (
				<li key={mov.id}>{mov.title}, {mov.year}, {mov.rating}</li>
			))}
		</ul>
	);
}