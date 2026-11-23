const { valorVenta, normalizarPalabra} = require('./analitica');
const { ventas } = require('./datos');

const PRODUCTOS = ventas
    .map(venta => {
    return { "producto": venta.producto, "precio": venta.precio}})
    .reduce((acc, venta) => {
    if(acc.some(p => p.producto === venta.producto)){
        return acc
    }
    acc.push(venta)
    return acc}, []);


const CIUDAD = ventas
    .map((venta) => venta.ciudad)
    .reduce((acc, ciudad) => {
        if(acc.some(p => p === ciudad)) return acc
        acc.push(ciudad)
        return acc
    }, []);

const CLIENTES = ventas
    .map((venta) => venta.cliente)
    .reduce((acc, cliente) => {
        if(acc.some(p => p === cliente)) return acc
        acc.push(cliente)
        return acc
    }, []);

const numeroAlAzar = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const fechaAzar = () => 
    `20${String(numeroAlAzar(25, 27))}-${String(numeroAlAzar(1, 12)).padStart(2, '0')}-${String(numeroAlAzar(1, 30)).padStart(2, '0')}`;
//console.log(fechaAzar());

const generarVentas = (n) => {
    let generado = [];
    for (let i = 0; i < n; i++) {
        const prod = PRODUCTOS[numeroAlAzar(0, PRODUCTOS.length - 1)];
    generado.push(
        {
            id: i,
            fecha: fechaAzar(),
            cliente: CLIENTES[numeroAlAzar(0, CLIENTES.length - 1)],
            producto: prod.producto,
            ciudad: CIUDAD[numeroAlAzar(0, CIUDAD.length - 1)],
            cantidad: numeroAlAzar(1, 5),
            precio: prod.precio
        }
    )
    }
    return generado;
}

function totalVendidoI(ventas, c) {
    return ventas.reduce((acc, venta) => {
    c.v++
    return acc += valorVenta(venta);
}, 0);
}

function ventaMayorI(ventas, c) {
    let mayor = 0;
    return ventas.reduce((acc, venta) => {
        c.v++
        c.c++
        if (valorVenta(venta) > mayor) { 
            mayor = valorVenta(venta); 
            acc = venta;
        }
    return acc
    }, {})
}

function totalPorCiudadI(ventas, c) {
    return ventas.reduce((acc, venta) => {
    c.v++
    c.c++
    if (!(normalizarPalabra(venta.ciudad) in acc)){
        acc[normalizarPalabra(venta.ciudad)] = 0;
    }
    acc[normalizarPalabra(venta.ciudad)] += valorVenta(venta)
    return acc
}, {})
}

module.exports = {totalVendidoI, ventaMayorI, totalPorCiudadI, generarVentas
}

