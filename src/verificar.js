const { ventas } = require('./datos')

const { 
    totalVendido,
    totalVendidoM,
    ventasPorCiudad,
    ventasPorCiudadM,
    unidadesVendidas,
    ticketPromedio,
    unidadesVendidasM,
    ventaMayorM,
    totalPorCiudad,
    unidadesPorProducto,
    ventasDelDia
} = require('./analitica')

/*
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
*/

console.log("--- Venta mayor ---");
console.log(ventaMayorM(ventas));

console.log("--- Total vendido ---");
console.log(totalVendidoM.toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }));

console.log("--- Unidades vendidas ---");
console.log(unidadesVendidasM);

console.log("--- Ticket promedio ---");
console.log(ticketPromedio(ventas).toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }));

console.log("--- Total por ciudad ---");
console.log(totalPorCiudad);

console.log("--- Unidades por producto ---");
console.log(unidadesPorProducto);

console.log("--- Top 3 productos por valor ---");
console.log(topProductosPorvalor(ventas, 3));

console.log("--- Ventas del dia---");
console.log(ventasDelDia(ventas, "2026-09-06"));
