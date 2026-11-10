const { ventas } = require('./datos.js');

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

console.log("<=======================================================>")
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