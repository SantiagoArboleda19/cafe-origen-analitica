const { ventas } = require('./datos')
const { clientesRecurrentes } = require('./medir')
const { generarVentas } = require('./generador')
/*
Implementa clientesRecurrentesSet(ventas) usando un Set de clientes ya vistos y otro Set para los recurrentes.
*/
const ventasGeneradas = generarVentas(5000)

function clientesRecurrentesSet(ventas) {
    const clientesVistos = new Set();
    const clientesRecurrentes = new Set();
    for (const venta of ventas) {
        if(clientesVistos.has(venta.cliente)) clientesRecurrentes.add(venta.cliente);
        else clientesVistos.add(venta.cliente);
    }
    const recurrentes = [];
    for (const cliente of clientesRecurrentes) {
        recurrentes.push(cliente)
    }
    return recurrentes;
}

/*
Implementa comprasPorCliente(ventas) con un Map que guarde cuántas compras hizo cada cliente, y obtén los recurrentes a partir de ese Map.
*/

function comprasPorClientes(ventas){
    const comprasCliente = new Map();
    for (const venta of ventas) {
        comprasCliente.set(venta.cliente, (comprasCliente.get(venta.cliente) || 0) + 1)
    }
    const recurrentes = []
    for (const [cliente, cantidad] of comprasCliente) {
        if(cantidad > 1) recurrentes.push(cliente);
    }
    return recurrentes
}

console.log(clientesRecurrentes(ventas));
console.log(clientesRecurrentesSet(ventas));
console.log(comprasPorClientes(ventas));

console.log(clientesRecurrentes(ventasGeneradas).sort((a, b) => Number(a.slice(1)) - Number(b.slice(1))));
console.log(clientesRecurrentesSet(ventasGeneradas).sort((a, b) => Number(a.slice(1) - b.slice(1))));
console.log(comprasPorClientes(ventasGeneradas).sort((a, b) => Number(a.slice(1)) - Number(b.slice(1))));

function tiemposSet(tamanios){
    for (const tamanio of tamanios) {
        console.time();
        clientesRecurrentesSet(generarVentas(tamanio));
        console.timeEnd();
    }
}
function tiemposMap(tamanios){
    for (const tamanio of tamanios) {
        console.time();
        comprasPorClientes(generarVentas(tamanio));
        console.timeEnd();
    }
}
function tiemposOriginal(tamanios){
    for (const tamanio of tamanios) {
        console.time();
        clientesRecurrentes(generarVentas(tamanio));
        console.timeEnd();
    }
}

//tiemposSet([1000, 10000, 100000]);
//tiemposMap([1000, 10000, 100000]);
//tiemposOriginal([1000, 10000, 100000]);
