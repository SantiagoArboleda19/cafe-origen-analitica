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

console.log(unidadesVendidas(ventas))


const ventaMayor = ventas => {
    let mayor = 0;
    let indice = 0;
    for (const venta of ventas) {
        if (valorVenta(venta) > mayor) {
            console.log(valorVenta(venta))
            mayor = valorVenta(venta);
            indice = venta;
        }
    }
    return mayor;
}

const ticketPromedio = ventas => {
    let total = 0;
    let cantidadVentas = 0;

    for (const venta of ventas) {
        if (venta.cantidad > 0) {
            total += valorVenta(venta);
        }
    }
    
    if (unidadesVendidas(ventas) === 0) {
        return 0;
    }
    return Math.floor(total / unidadesVendidas(ventas));
}
console.log(ticketPromedio(ventas));

const normalizarPalabra = palabra => {
    const limpia = palabra.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (limpia === "") {
        return "";
    }
    return limpia[0].toUpperCase() + limpia.slice(1).toLowerCase();
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

const totalVendidoM = ventas.reduce((acc, venta) => acc += valorVenta(venta), 0);

const unidadesVendidasM = ventas.reduce((acc, venta) => acc += venta.cantidad , 0)

const ventasPorCiudadM = (ventas, ciudad) => {
    return ventas
    .filter(venta => normalizarPalabra(venta.ciudad) === normalizarPalabra(ciudad))
    .reduce((acc, venta) => acc + valorVenta(venta), 0);
}

const totalPorCiudad = ventas.reduce((acc, venta) => {
    if (!(normalizarPalabra(venta.ciudad) in acc)){
        acc[normalizarPalabra(venta.ciudad)] = 0
    }
    acc[normalizarPalabra(venta.ciudad)] += valorVenta(venta)
    return acc
}, {})

const unidadesPorProducto = ventas.reduce((acc, venta) => {
    if(!(normalizarPalabra(venta.producto) in acc)){
        acc[normalizarPalabra(venta.producto)] = 0;
    }
    acc[normalizarPalabra(venta.producto)] += venta.cantidad
    return acc
},{})

const topProductosPorvalor = (ventas, k = 0) => {
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

let mayor = 0;
function ventaMayorM(ventas) {
  return ventas.reduce((acc, venta) => {
    if (valorVenta(venta) > mayor) {
        mayor = valorVenta(venta)
        acc = venta
      }
      return acc
    }, {})
}

const ventasDelDia = (ventas, fecha) => {
    return ventas.reduce((acc, venta) => {
        if (fecha === venta.fecha) {
            acc.push(venta)
        }
        return acc
    }, [])
}

module.exports = {
    totalVendido,
    totalVendidoM,
    unidadesVendidas,
    unidadesVendidasM,
    ventasPorCiudad,
    ticketPromedio,
    ventaMayorM,
    totalPorCiudad,
    ventasPorCiudadM,
    unidadesPorProducto,
    topProductosPorvalor,
    ventasDelDia,
    valorVenta,
    normalizarPalabra
};