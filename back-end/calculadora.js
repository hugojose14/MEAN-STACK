'use strict'

//capturar los parametros que se introducen por consola
var params = process.argv.slice(2);

//Los numeros se guardarán en las variables
var numero1 = parseFloat(params[0]);
var numero2 = parseFloat(params[1]);
//Operaciones que haremos con esos parametros mediante una plantilla
var plantilla = `

    La suma es: ${numero1+numero2}
    La resta es: ${numero1-numero2}
    La multiplicacion es: ${numero1*numero2}
    La division es: ${numero1/numero2}
`;

console.log(plantilla);