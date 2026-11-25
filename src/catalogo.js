const { normalizarPalabra } = require('./analitica');
const { generarVentas } = require('./generador');

const productos = [
  { producto: "Origen Nariño 250 g", precio: 26000 },
  { producto: "Origen Nariño 250 g", precio: 26000 },
  { producto: "Origen Huila 500 g", precio: 42000 },
  { producto: "Origen Sierra 500 g", precio: 45000 },
  { producto: "Filtros de papel x100", precio: 18000 },
  { producto: "Taza de cerámica", precio: 35000 },
  { producto: "Origen Huila 1 kg", precio: 79000 },
  { producto: "Prensa francesa", precio: 95000 },
  { producto: "Molino manual", precio: 120000 },
];

function comboRegalo(catalogo, valor) {
  const recomendaciones = [];
  for (let i = 0; i < catalogo.length; i++) {
    for (let j = i + 1; j < catalogo.length; j++) {
      if (catalogo[i].precio + catalogo[j].precio == valor) {
        return {
          productoUno: catalogo[i].producto,
          productoDos: catalogo[j].producto,
        };
      }
    }
  }
  return null;
}

/*
Implementa la versión optimizada con un Map que guarde los precios ya vistos: para cada producto, pregunta si ya apareció su complemento (valor − precio). Devuelve los dos productos o null si no existe combinación.
*/

function comboRegaloMap(catalogo, valor) {
  const map = new Map();
  let complemento = 0;
  for (const item of catalogo) {
    complemento = valor - item.precio;
    if (map.has(complemento))
      return { productoUno: item.producto, productoDos: map.get(complemento) };
    map.set(item.precio, item.producto);
  }
  return null;
}

/*
Implementa productoEstrellaPorCiudad(ventas) con conteo de frecuencias: un Map por ciudad que cuente las apariciones de cada producto, y devuelve el más frecuente de cada ciudad.
*/
function crearMaps() {
  return new Map();
}

function productoEstrellaPorCiudad(ventas) {
  const mapCiudades = crearMaps();

  for (const venta of ventas) {
    const ciudad = normalizarPalabra(venta.ciudad)
    if(!mapCiudades.has(ciudad)) mapCiudades.set(ciudad, crearMaps());
    const conteo = mapCiudades.get(ciudad);
    conteo.set(venta.producto, (conteo.get(venta.producto) || 0) + 1);
  }

  let masApariciones = [];
  for (const [ciudad, valor] of mapCiudades) {
    const [producto, cantidad] = ([...valor].sort((a, b) => b[1] - a[1])[0]);
    masApariciones.push({ ciudad, 
        producto, cantidad});
  }
  return masApariciones;
}

/**Implementa primerClienteUnico(ventas): el primer cliente, en orden de las ventas, que aparece una sola vez en todo el historial. Usa dos recorridos y un Map. */

function primerClienteUnico(ventas) {
    const map = crearMaps();
    for (const venta of ventas) {
        map.set(venta.cliente, (map.get(venta.cliente) || 0) + 1);
    }
    for (const [clave, valor] of map) {
        if (valor === 1) return clave;
    }
    return null;
}