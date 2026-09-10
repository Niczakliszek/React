import React from "react";

//1
let tab1 = [1, 3, 5];
let tab2 = [2, 4, 6];
const tab_razem = [...tab1, ...tab2];

//2
function dowolna(...params){
    let suma = 0;
    params.forEach((el) => {
        suma += el;
    })
    return suma;
}