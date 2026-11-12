const { ventas } = require('./datos')

const valorVenta = (venta) => {
        return venta.cantidad * venta.precio;
}

const totalVendido = ventas => {
    let total = 0;
    for (const venta of ventas) {
        total += valorVenta(venta);
    }
    return total;
}

const unidadesVendidas = ventas => {
    let total = 0;
    for (const venta of ventas) {
        total += venta.cantidad;
    }
    return total;
}

const ventaMayor = ventas => {
    let mayor = 0;
    let indice = 0;
    for (const venta in ventas) {
        if (valorVenta(ventas[venta]) > mayor) {
            mayor = valorVenta(ventas[venta]);
            indice = venta;
        }
    }
    return ventas[indice];
}

const ticketPromedio = ventas => {
    let total = 0;
    let cantidadVentas = 0;

    for (const venta of ventas) {
        if (venta.cantidad > 0) {
            total += valorVenta(venta);
            cantidadVentas++;
        }
    }
    if (cantidadVentas === 0) {
        return 0;
    }
    return total / cantidadVentas;
}

const normalizarPalabra = palabra => {
    let palabraNormalizada = "";
    let firstLetter = palabra[0].trim().toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    let endWord = palabra.slice(1).trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    palabraNormalizada = firstLetter + endWord;
    return palabraNormalizada;
}

const ventasPorCiudad = (ventas, ciudad) => {
    let cantidadVentas = 0;
    for (const venta of ventas) {
        if (normalizarPalabra(venta.ciudad) == normalizarPalabra(ciudad)) {
            cantidadVentas += valorVenta(venta);
        }
    }
    return cantidadVentas;
}

const totalVendidoM = ventas.reduce((acc, venta) => acc += (venta.cantidad * venta.precio), 0) 

const unidadesVendidasM = ventas.reduce((acc, venta) => acc += venta.cantidad , 0)

const ventasPorCiudadM = (ventas, ciudad) => {
    return ventas.filter(venta => normalizarPalabra(venta.ciudad) === normalizarPalabra(ciudad)).reduce((acc, venta) => acc + valorVenta(venta), 0);
}

const totalPorCiudad = ventas.reduce((acc, venta) => {
    if (!(normalizarPalabra(venta.ciudad) in acc)){
        acc[normalizarPalabra(venta.ciudad)] = 0
    }
    acc[normalizarPalabra(venta.ciudad)] += valorVenta(venta)
    return acc
},{})

const unidadesPorProducto = ventas.reduce((acc, venta) => {
    if(!(normalizarPalabra(venta.producto) in acc)){
        acc[normalizarPalabra(venta.producto)] = 0;
    }
    acc[normalizarPalabra(venta.producto)] += venta.cantidad
    return acc
},{})


const topProductosPorvalor = (ventas, k=3) => {
    return Object.entries(
        ventas.reduce((acc, venta) => {
            if(!(normalizarPalabra(venta.producto) in acc)){
                acc[normalizarPalabra(venta.producto)] = 0;
            }
            acc[normalizarPalabra(venta.producto)] += valorVenta(venta);
            return acc
        }, {})
    )
    .sort((a, b) => b[1] - a[1])
    .slice(0, k);
}


console.log(topProductosPorvalor(ventas));





module.exports = {
    totalVendido,
    totalVendidoM,
    unidadesVendidas,
    unidadesVendidasM,
    ventasPorCiudad,
    ventasPorCiudadM,
};



//console.log(totalPorCiudad)

const productosFijos = ventas.map(venta => venta.producto)
const ciudadesFijos = ventas.map(venta => venta.ciudades)
const preciosFijos = ventas.map(venta => venta.precios)
/*
const clientesFijos = ventas.map(venta => venta.cliente)
const clientesFijosA = ventas.reduce((acc, venta) => {
    if (acc.lenght <= 3 && !(acc.includes(venta.cliente))){
        acc = acc + venta.cliente
    }
    return acc
}
,[])


console.log(clientesFijosA)
console.log(clientesFijos)
*/
/*const generarClienteAleatorio = staticClients.map(cliente => {
    let arregloClienteAleatorios = []
    for (let i = 1; i < 3; index++) {

    }
},[])*/
/*
const generarVentas = (numerosRandoms) => {
    const ventasGeneradas = [
        Object.keys(...ventas) 
    ];
    return ventasGeneradas;
} 

console.log(Object.keys(...ventas) );
*/

/*

console.log(valorVenta(ventas[10]));
console.log(totalVendido(ventas));

console.log("\nTotal unidades vendas:");
console.log(unidadesVendidas(ventas));

console.log("\nVenta mayor:");
console.log(ventaMayor(ventas));

console.log("\nPromedio de ventas:");
console.log(Math.round(ticketPromedio(ventas)));

console.log("\nVentas por ciudad: ");
console.log(ventasPorCiudad(ventas, "MedelLiN"));




("<=======================================================>")
console.log("\n--- Pruebas valorVenta ---");
console.log("Venta del arreglo:", valorVenta(ventas[0]));
console.log("Otra venta:", valorVenta(ventas[1]));
console.log("Venta con cantidad 0:", valorVenta(ventas[7]));

console.log("\n--- Pruebas totalVendido ---");
console.log("Arreglo completo:", totalVendido(ventas));
console.log("Un elemento:", totalVendido([ventas[0]]));
console.log("Arreglo vacío:", totalVendido([]));

console.log("\n--- Pruebas unidadesVendidas ---");
console.log("Arreglo completo:", unidadesVendidas(ventas));
console.log("Un elemento:", unidadesVendidas([ventas[0]]));
console.log("Arreglo vacío:", unidadesVendidas([]));

console.log("\n--- Pruebas ventaMayor ---");
console.log("Arreglo completo:", ventaMayor(ventas));
console.log("Un elemento:", ventaMayor([ventas[0]]));
console.log("Arreglo vacío:", ventaMayor([]));

console.log("\n--- Pruebas ticketPromedio ---");
console.log("Arreglo completo:", Math.round(ticketPromedio(ventas)));
console.log("Un elemento:", ticketPromedio([ventas[7]]));
console.log("Arreglo vacío:", ticketPromedio([]));

console.log("\n--- Pruebas ventasPorCiudad ---");
console.log("Arreglo completo:", ventasPorCiudad(ventas, "Medellín"));
console.log("Un elemento:", ventasPorCiudad([ventas[0]], "Medellín"));
console.log("Arreglo vacío:", ventasPorCiudad([], "Medellín")); 
*/