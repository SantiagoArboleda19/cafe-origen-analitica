const { numeroAlAzar } = require('./generador');
const { productos } = require('./catalogo');

const ventasDiarias = [320, 410, 280, 390, 510, 620, 700, 300, 290, 450,
480, 530, 610, 680, 350, 330, 420, 470, 560, 640,
710, 380, 360, 440, 500, 590, 650, 720, 400, 370];

/**Implementa por fuerza bruta mejorSemanaBruta(dias, k), que sume cada bloque de k días desde cero, y anota su complejidad. */

function mejorSemanaBruta(dias, k){
    if(dias.length < k) return null;

    let maximo = 0;
    let dia = {};
    for (let i = 0; i <= dias.length - k; i++) {
        let suma = 0;
        for (let j = i; j < i + k; j++) {
            suma += dias[j];
        }    
        if(suma > maximo) {
        maximo = suma
        dia = { indice: i, valor: dias[i] }
        }
    }
    return { maximo, ...dia}
    //return {totalMaximo, diaInicioSemana}
}

/**Implementa mejorSemana(dias, k) con ventana deslizante: calcula la primera ventana y luego suma el día que entra y resta el que sale. Devuelve el total máximo y el día en que inicia esa semana.*/

function mejorSemana(dias, k){
    if(dias.length < k) return null;

    let suma = 0;
    for (let i = 0; i < k; i++) {
        suma += dias[i];
    }
    let maximo = suma;
    let dia = { indice: 0, valor: dias[0] };
    for (let i = k; i < dias.length; i++) {
        suma = suma + dias[i] - dias[i - k];
        if (suma > maximo) {
            maximo = suma;
            dia = { indice: i - k + 1, valor: dias[i - k + 1]};
        }
    }
    return { maximo, ...dia}
}

const ventasNumeros = generarNumeros(100000)

console.time();
console.log(mejorSemanaBruta(ventasDiarias, 7));
console.timeEnd();
console.time();
console.log(mejorSemana(ventasDiarias, 7));
console.timeEnd();
console.timeEnd();
console.time();
console.time();
console.log(mejorSemanaBruta(ventasNumeros, 7));
console.timeEnd();
console.time();
console.log(mejorSemana(ventasNumeros, 7));
console.timeEnd();
/**Implementa parMasCercano(precios, presupuesto) con dos punteros sobre los precios del catálogo ordenados de menor a mayor: devuelve los dos productos cuya suma sea la mayor posible sin superar el presupuesto. */

function parMasCercano(precios, presupuesto) {
    const ordenados = [...precios].sort((a, b) => a.precio - b.precio);
    console.log(ordenados);
    if(ordenados[0].precio + ordenados[1].precio > presupuesto) return null;

    let izq = 0, der = precios.length - 1;
    let precioFinal = 0;
    let productos = {productoUno: {producto: null, precio: 0 }, productoDos: { producto: null, precio: 0}}

    while(izq < der){
        const suma = ordenados[izq].precio + ordenados[der].precio;
        if((suma) > presupuesto) der--;
        else {
            if((suma) > precioFinal){
                precioFinal = suma;
                productos = {productoUno: {producto: ordenados[izq].producto, precio: ordenados[izq].precio }, productoDos: {producto: ordenados[der].producto, precio: ordenados[der].precio}}
            }
            izq++
        }
    }
    return productos
}
console.log(parMasCercano(productos, 10));

function generarNumeros(n){
    const numeros = [];
    for (let i = 0; i < n; i++) {
        numeros.push(numeroAlAzar(300, 999))
    }
    return numeros
} 