const { ventas } = require('./datos')

console.log(ventas)

const quantity = ventas.length;
console.log(quantity)

const first = ventas[0];
console.log(first)

const last = ventas[ventas.length - 1]
console.log(last)

const productFour = ventas[3].producto
console.log(productFour)

console.table(ventas)