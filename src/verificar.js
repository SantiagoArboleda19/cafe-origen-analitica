const { ventas } = require('./datos')

const { 
    totalVendido,
    totalVendidoM,
    ventasPorCiudad,
    ventasPorCiudadM,
    unidadesVendidas,
    unidadesVendidasM
} = require('./anatilica')
console.log(totalVendido(ventas));
console.log(totalVendidoM);

console.log(unidadesVendidas(ventas));
console.log(unidadesVendidasM);

console.log(ventasPorCiudad(ventas,"MedeLLIn"))
console.log(ventasPorCiudadM(ventas,"MedeLLin"));

if(totalVendido(ventas) == totalVendidoM){
    console.log("OK")
}
else {
    console.log("DIFERENTE")
}

if(unidadesVendidas(ventas) == unidadesVendidasM){
    console.log("OK")
}
else {
    console.log("DIFERENTE")
}

if(ventasPorCiudad(ventas,"MedeLLIn") == ventasPorCiudadM(ventas,"MedeLLin")){
    console.log("OK")
}
else {
    console.log("DIFERENTE")
}

