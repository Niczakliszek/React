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
export function ZegarCyfrowy({ obecnaData = [new Date().getHours(), new Date().getMinutes(), new Date().getSeconds()] }){
    const [czas, setCzas] = useState(obecnaData);


    const interval = setInterval(() => {
        useEffect(() => {
            //wszystko sie chrzani
        })
    }, 1000)
}