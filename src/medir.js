const { generarVentas,
        totalVendidoI,
        ventaMayorI,
        totalPorCiudadI} = require('./generador');

const { normalizarPalabra, valorVenta } = require('./analitica');

const generadorContadores = () => ({v: 0, c: 0})

function primeraVenta(ventas, c) {
    const venta = ventas[0];
    c.v++
    return venta
} 

function orquestador(tamanios){

        return tamanios.map((n) => {
        const ventasOrquestador = generarVentas(n)
        let c0 = generadorContadores();
        let c1 = generadorContadores(); 
        let c2 = generadorContadores(); 
        let c3 = generadorContadores(); 
        
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

function tiempos(tamanios, funcion){
    for (const tamanio of tamanios) {
        console.time();
        clientesRecurrentes(generarVentas(tamanio));
        console.timeEnd();
    }
}

function totalCiudadCadena(ventas, ciudad)  {
    const ciudadNor = normalizarPalabra(ciudad)
    return ventas
    .map(venta => ({ ...ventas, ciudad: normalizarPalabra(venta.ciudad) }))
    .filter(venta =>  venta.ciudad === ciudadNor)
    .map(venta => valorVenta(venta))
    .reduce((acc, venta) => acc += venta, 0)
}

function totalCiudadUnaPasada(ventas, ciudad){
    let total = 0;
    const ciudadNor = normalizarPalabra(ciudad);
    for (const venta of ventas) {
        let ventaNor = normalizarPalabra(venta.ciudad);
        if(ciudadNor === ventaNor){
            total += valorVenta(venta);
        }
    }
    return total
}

module.exports = { generadorContadores, clientesRecurrentes }