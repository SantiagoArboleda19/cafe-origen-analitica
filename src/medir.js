const { generarVentas,
        totalVendidoI,
        ventaMayorI,
        totalPorCiudadI} = require('./generador');

const { ventas } = require('./datos');

const generdoraContadores = () => ({v: 0, c: 0})

function primeraVenta(ventas, c) {
    const venta = ventas[0];
    c.v++
    return venta
} 

function orquestador(tamanios){

        return tamanios.map((n)=>{
        const ventasOrquestador = generarVentas(n)
        let c0 = generdoraContadores();
        let c1 = generdoraContadores(); 
        let c2 = generdoraContadores(); 
        let c3 = generdoraContadores(); 
        
        primeraVenta(ventasOrquestador, c0);
        totalVendidoI(ventasOrquestador, c1);
        ventaMayorI(ventasOrquestador, c2);
        totalPorCiudadI(ventasOrquestador, c3);
        
        return {
            entrada: n,
            zero: c0,
            one: c1,
            two: c2,
            three: c3
        }
    })
}

//console.table(orquestador([100, 1000, 10000, 100000]))

console.log("=======================");

function clientesRecurrentes(ventas) {
    const recurrentes = [];

    for (let i = 0; i < ventas.length; i++) {
        for (let j = i + 1; j < ventas.length; j++) {
            if (ventas[i].cliente === ventas[j].cliente && !recurrentes.includes(ventas[i].cliente)) {
                recurrentes.push(ventas[i].cliente);
            }
        }
    }

  return recurrentes;
}

function tiempos(tamanios){
    for (const tamanio of tamanios) {
        console.time();
        clientesRecurrentes(generarVentas(tamanio));
        console.timeEnd();
    }
}

tiempos([100000])
module.exports = { generdoraContadores }