const { generarVentas,
        totalVendidoI,
        ventaMayorI,
        totalPorCiudadI} = require('./generador');

const generdoraContadores = () => ({v: 0, c: 0})

function primeraVenta(ventas, c) {
    const venta = ventas[0];
    c.v++
    return venta
} 

function orquestador(tamanios){

        return tamanios.map((n)=>{
        const ventas = generarVentas(n)
        let c0 = generdoraContadores();
        let c1 = generdoraContadores(); 
        let c2 = generdoraContadores(); 
        let c3 = generdoraContadores(); 
        
        primeraVenta(ventas, c0);
        totalVendidoI(ventas, c1);
        ventaMayorI(ventas, c2);
        totalPorCiudadI(ventas, c3);
        
        return {
            entrada: n,
            zero: c0,
            one: c1,
            two: c2,
            three: c3
        }
    })
}

console.table(orquestador([100, 1000, 10000, 100000]))

module.exports = { generdoraContadores }