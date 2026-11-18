Motor de análisis de ventas (v0.1)

Programa en JavaScript (Node.js) que analiza un listado de ventas y responde preguntas del negocio: cuánto se vendió, dónde, qué productos funcionan mejor y cuál fue el ticket promedio. Está pensado para que la gerencia pueda ejecutarlo y leer el reporte sin abrir el código.

¿Qué es una venta?

Cada venta es un objeto con esta estructura:

javascript
{
    id: 12,
    fecha: "2026-09-06",
    cliente: "C08",
    producto: "Origen Nariño 250 g",
    ciudad: "Bogotá",
    cantidad: 3,
    precio: 26000
}

El valor de una venta es cantidad * precio.

Requisitos
Node.js (cualquier versión reciente).
No necesita instalar paquetes: no tiene dependencias.
Estructura
src/
├── analitica.js   funciones de análisis
├── datos.js       arreglo `ventas` con los datos a analizar
├── explorar.js    script de exploración de los datos
└── verificar.js   punto de entrada: ejecuta y verifica el análisis
bitacora.md        registro de errores y correcciones
README.md
Archivo	Para qué sirve
src/datos.js	Exporta el arreglo ventas con los datos a analizar.
src/analitica.js	Funciones de análisis (totales, ciudades, productos, top).
src/verificar.js	Ejecuta las funciones de análisis e imprime los resultados.
src/explorar.js	Script de exploración de los datos.
bitacora.md	Errores encontrados, causa y corrección.
Cómo ejecutarlo

Desde la carpeta del proyecto:

bash
node src/verificar.js

Ese archivo carga los datos de src/datos.js, usa las funciones de src/analitica.js e imprime los resultados en la consola.

¿Qué preguntas responde?

Resumen general

¿Cuánto se vendió en total? → totalVendido
¿Cuántas unidades se vendieron? → unidadesVendidas
¿Cuál fue la venta más grande? → ventaMayorM
¿Cuál es el ticket promedio por venta? → ticketPromedio

Ventas por ciudad

¿Cuánto se vendió en una ciudad? → ventasPorCiudad(ventas, ciudad)
¿Cuánto se vendió en cada ciudad? → totalPorCiudad

Productos

¿Cuántas unidades se vendieron de cada producto? → unidadesPorProducto
¿Cuáles son los 3 productos que más dinero generan? → topProductosPorvalor(ventas, 3)

Por día

¿Qué ventas hubo en una fecha? → ventasDelDia(ventas, "2026-09-06")
Reglas a tener en cuenta
Ciudades y productos se normalizan: "Bogotá", "BOGOTA" y " bogota" cuentan como la misma ciudad, así que no aparecen repetidas en el reporte.
Un día sin ventas no rompe nada: el ticket promedio da 0 en lugar de NaN o null.
El ticket promedio se redondea hacia abajo y solo cuenta ventas con cantidad > 0.
Versión

v0.1: primera entrega.