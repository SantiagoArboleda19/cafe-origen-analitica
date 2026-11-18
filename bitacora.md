MINIRETO 1 SEMANA 1 ==========================================================

DICCIONARIOS DE DATOS:

id-Number

Identificador único de cada registro de venta. Permite diferenciar una venta de otra.

fecha-String

Fecha en la que se realizó la venta, expresada en formato AAAA-MM-DD.

cliente-String

Código que identifica al cliente que realizó la compra. Ejemplo: C01.

producto-String

Nombre del producto que fue vendido.

ciudad-String

Ciudad asociada a la venta o ubicación del cliente.

cantidad-Number

Número de unidades del producto registradas en la venta.

precio-Number

Precio unitario del producto vendido, expresado en pesos colombianos (COP).

CASOS BORDES:

Caso 1. Inconsistencia en el nombre de las ciudades

Problema: En el registro con ID 5 aparece la ciudad "medellín" con minúscula, mientras que en otros registros aparece "Medellín" con mayúscula inicial.

Decisión: Normalizar los nombres de las ciudades para que todos tengan el mismo formato. De esta manera, al utilizar métodos como reduce() para agrupar las ventas por ciudad, no se crearán categorías duplicadas.

Caso 2. Cantidad de productos igual a cero

Problema: En el registro con ID 8 aparece una cantidad de 0, lo que representa una venta sin unidades vendidas.

Decisión: Revisar el registro para determinar si corresponde a una venta cancelada o a un error de digitación. Si no hubo una venta real, no se debe contabilizar como una venta efectiva. No modificaría el dato sin verificarlo.

Caso 3. Validación de los códigos de clientes

Problema: Los clientes están identificados mediante códigos como C01, C02 y C03, pero no contamos con un listado maestro de clientes para comprobar que todos los códigos correspondan a clientes registrados.

Decisión: Validar los códigos contra una base de datos de clientes. Si alguno no existe, se debe reportar para su revisión antes de procesar las ventas.

Conclusión

La revisión permitió identificar inconsistencias en los nombres de las ciudades, cantidades que requieren validación y códigos de clientes que deben contrastarse con un registro maestro. Estos controles ayudan a garantizar que los resultados de los análisis sean confiables.

MINIRETO 2 SEMANA 1 ======================================================

# Plan en pseudocódigo

## 1. valorVenta(venta)

**Qué recorro:**  
Recibo un registro de una venta.

**Qué condición aplico:**  
No necesito aplicar ninguna condición.

**Qué acumulo:**  
No acumulo valores. Calculo la cantidad multiplicada por el precio.

**Valor inicial:**  
No necesito un valor inicial.

**Pseudocódigo:**
INICIO
    recibir una venta
    calcular cantidad × precio
    devolver el resultado
FIN
---

## 2. totalVendido(ventas)

**Qué recorro:**  
Recorro todas las ventas.

**Qué condición aplico:**  
No necesito aplicar ninguna condición.

**Qué acumulo:**  
Acumulo el valor de cada venta.

**Valor inicial:**  
El total comienza en 0.

**Pseudocódigo:**
INICIO
    iniciar total en 0

    PARA CADA venta EN ventas
        calcular el valor de la venta
        sumar el valor de la venta al total
    FIN PARA

    devolver total
FIN
---

## 3. unidadesVendidas(ventas)

**Qué recorro:**  
Recorro todas las ventas.

**Qué condición aplico:**  
No necesito aplicar ninguna condición.

**Qué acumulo:**  
Acumulo la cantidad de unidades de cada venta.

**Valor inicial:**  
Las unidades comienzan en 0.

**Pseudocódigo:**
INICIO
    iniciar unidades en 0

    PARA CADA venta EN ventas
        sumar la cantidad de la venta a unidades
    FIN PARA

    devolver unidades
FIN
---

## 4. ventaMayor(ventas)

Qué recorro:
Recorro todas las ventas.

Qué condición aplico:
Comparo el valor de cada venta con el valor de la venta mayor encontrada hasta ese momento.

**Qué acumulo:**  
No acumulo una suma. Voy guardando el registro de la venta con mayor valor.

**Valor inicial:**  
La venta mayor comienza con el primer registro de ventas.

**Pseudocódigo:**
INICIO
    iniciar ventaMayor con la primera venta

    PARA CADA venta EN ventas
        calcular el valor de la venta

        SI el valor de la venta es mayor
        que el valor de ventaMayor
            actualizar ventaMayor con la venta actual
        FIN SI
    FIN PARA

    devolver el registro completo de ventaMayor
FIN
---

## 5. ticketPromedio(ventas)

**Qué recorro:**  
Recorro todas las ventas.

**Qué condición aplico:**  
Solo tengo en cuenta las ventas cuya cantidad sea mayor que 0.

**Qué acumulo:**  
Acumulo el valor de las ventas válidas y cuento cuántas ventas válidas existen.

**Valor inicial:**  
El total comienza en 0 y la cantidad de ventas válidas comienza en 0.

**Pseudocódigo:**
INICIO
    iniciar total en 0
    iniciar cantidadVentasValidas en 0

    PARA CADA venta EN ventas
        SI la cantidad de la venta es mayor que 0
            calcular el valor de la venta
            sumar el valor al total
            aumentar cantidadVentasValidas en 1
        FIN SI
    FIN PARA

    dividir total entre cantidadVentasValidas
    devolver el resultado
FIN
---

## 6. ventasPorCiudad(ventas, ciudad)

**Qué recorro:**  
Recorro todas las ventas.

**Qué condición aplico:**  
Comparo la ciudad de cada venta con la ciudad recibida. Antes de comparar, ignoro las mayúsculas y los espacios sobrantes.

**Qué acumulo:**  
Acumulo el valor de las ventas que pertenecen a la ciudad indicada.

**Valor inicial:**  
El total comienza en 0.

**Pseudocódigo:**
INICIO
    iniciar total en 0

    PARA CADA venta EN ventas
        normalizar la ciudad de la venta
        normalizar la ciudad recibida

        SI las ciudades son iguales
            calcular el valor de la venta
            sumar el valor al total
        FIN SI
    FIN PARA

    devolver total
FIN

Prueba cada función con tres entradas:

--- Pruebas valorVenta ---
Venta del arreglo: 84000
Otra venta: 26000
Venta con cantidad 0: 0

--- Pruebas totalVendido ---
Arreglo completo: 985000
Un elemento: 84000
Arreglo vacío: 0

--- Pruebas unidadesVendidas ---
Arreglo completo: 21
Un elemento: 2
Arreglo vacío: 0

--- Pruebas ventaMayor ---
Arreglo completo: {
  id: 10,
  fecha: '2026-09-05',
  cliente: 'C07',
  producto: 'Origen Huila 500 g',
  ciudad: 'Pereira',
  cantidad: 4,
  precio: 42000
}

Un elemento: {
  id: 1,
  fecha: '2026-09-01',
  cliente: 'C01',
  producto: 'Origen Huila 500 g',
  ciudad: 'Medellín',
  cantidad: 2,
  precio: 42000
}
Arreglo vacío: undefined

--- Pruebas ticketPromedio ---
Arreglo completo: 89545
Un elemento: 0
Arreglo vacío: 0

--- Pruebas ventasPorCiudad ---
Arreglo completo: 356000
Un elemento: 84000
Arreglo vacío: 0

TABLAS DE TRAZA=========================================================


1. Traza de valorVenta(venta)
Esta función multiplica la cantidad por el precio.
Entrada	Cantidad	Precio	Resultado
ventas[0]	2	42.000	84.000
ventas[1]	1	26.000	26.000

2. Traza de totalVendido(ventas)
Prueba 1: arreglo completo
Iteración	Venta	Valor venta	Total acumulado
1	1	84.000	84.000
2	2	26.000	110.000
3	3	95.000	205.000
4	4	42.000	247.000
5	5	135.000	382.000
6	6	52.000	434.000
7	7	120.000	554.000
8	8	0	554.000
9	9	90.000	644.000
10	10	168.000	812.000
11	11	95.000	907.000
12	12	78.000	985.000

Prueba 2: un solo elemento
Iteración	Venta	Valor venta	Total acumulado
1	1	84.000	84.000

3. Traza de unidadesVendidas(ventas)
Prueba 1: arreglo completo
Iteración	Venta	Cantidad	Unidades acumuladas
1	1	2	2
2	2	1	3
3	3	1	4
4	4	1	5
5	5	3	8
6	6	2	10
7	7	1	11
8	8	0	11
9	9	2	13
10	10	4	17
11	11	1	18
12	12	3	21

Prueba 2: un solo elemento
Iteración	Venta	Cantidad	Unidades acumuladas
1	1	2	2

4. Traza de ventaMayor(ventas)
Prueba 1: arreglo completo

El acumulador es el registro que contiene la venta de mayor valor encontrado.
Iteración	Venta actual	Valor actual	Mayor encontrado
Inicial	Venta 1	84.000	84.000
1	Venta 1	84.000	84.000
2	Venta 2	26.000	84.000
3	Venta 3	95.000	95.000
4	Venta 4	42.000	95.000
5	Venta 5	135.000	135.000
6	Venta 6	52.000	135.000
7	Venta 7	120.000	135.000
8	Venta 8	0	135.000
9	Venta 9	90.000	135.000
10	Venta 10	168.000	168.000
11	Venta 11	95.000	168.000
12	Venta 12	78.000	168.000

Resultado: registro completo de la venta con ID 10.

Prueba 2: un solo elemento
Iteración	Venta actual	Valor actual	Mayor encontrado
Inicial	Venta 1	84.000	84.000
1	Venta 1	84.000	84.000

Resultado: registro completo de la venta con ID 1.
5. Traza de ticketPromedio(ventas)
Recuerda que esta función solamente cuenta ventas cuya cantidad sea mayor que cero.

Prueba 1: arreglo completo
Venta	Cantidad	Valor venta	¿Válida?	Total acumulado	Ventas válidas
1	2	84.000	Sí	84.000	1
2	1	26.000	Sí	110.000	2
3	1	95.000	Sí	205.000	3
4	1	42.000	Sí	247.000	4
5	3	135.000	Sí	382.000	5
6	2	52.000	Sí	434.000	6
7	1	120.000	Sí	554.000	7
8	0	0	No	554.000	7
9	2	90.000	Sí	644.000	8
10	4	168.000	Sí	812.000	9
11	1	95.000	Sí	907.000	10
12	3	78.000	Sí	985.000	11

Operación final:
985.000 \div 11 = 89.545,45

Prueba 2: un solo elemento
Venta	Cantidad	Valor venta	Total	Ventas válidas
1	2	84.000	84.000	1

Operación final:
84.000 \div 1 = 84.000

6. Traza de ventasPorCiudad(ventas, ciudad)
Ciudad buscada: Medellín.

Prueba 1: arreglo completo
Venta	Ciudad	Valor venta	¿Coincide?	Total acumulado
1	Medellín	84.000	Sí	84.000
2	Bogotá	26.000	No	84.000
3	Cali	95.000	No	84.000
4	Medellín	42.000	Sí	126.000
5	medellín	135.000	Sí	261.000
6	Bogotá	52.000	No	261.000
7	Bogotá	120.000	No	261.000
8	Cali	0	No	261.000
9	Cali	90.000	No	261.000
10	Pereira	168.000	No	261.000
11	Medellín	95.000	Sí	356.000
12	Bogotá	78.000	No	356.000

Prueba 2: un solo elemento
Venta	Ciudad	Valor venta	¿Coincide?	Total acumulado
1	Medellín	84.000	Sí	84.000

MINIRETO 2 SEMANA 1 ======================================================

MINIRETO 3 – SEMANA 1
Análisis de las funciones con métodos de arreglos
1. totalVendidoM(ventas)
¿Qué recorro?

Recorro todas las ventas del arreglo mediante reduce().

¿Qué filtro?

No aplico ningún filtro. Se procesan todos los registros.

¿Qué transformo?

No transformo los registros. Calculo el valor de cada venta multiplicando la cantidad por el precio unitario.

¿Qué acumulo?

Acumulo el valor monetario de todas las ventas.

¿Cómo agrupo?

No agrupo los registros. Utilizo un único acumulador que almacena el total vendido.
2. unidadesVendidasM(ventas)
¿Qué recorro?

Recorro todas las ventas del arreglo mediante reduce().

¿Qué filtro?

No aplico ningún filtro. Se tienen en cuenta todos los registros.

¿Qué transformo?

Obtengo la cantidad de unidades de cada venta.

¿Qué acumulo?

Acumulo las unidades vendidas de todos los registros.

¿Cómo agrupo?

No agrupo por ninguna categoría. Utilizo un único acumulador para obtener el total de unidades.
3. ventasPorCiudadM(ventas, ciudad)
¿Qué recorro?

Recorro todas las ventas mediante filter() para revisar a qué ciudad pertenece cada registro.

¿Qué filtro?

Filtro las ventas cuya ciudad coincide con la ciudad recibida como parámetro. Para realizar la comparación, normalizo ambos textos y evito diferencias por mayúsculas, minúsculas y tildes.

¿Qué transformo?

No transformo los registros en otra estructura. Después de filtrarlos, calculo el valor monetario de cada venta mediante valorVenta().

¿Qué acumulo?

Acumulo el valor monetario de las ventas que pertenecen a la ciudad buscada, utilizando reduce().

¿Cómo agrupo?

No realizo una agrupación por varias ciudades. Selecciono una ciudad específica y sumo sus ventas.
4. totalPorCiudad(ventas)
¿Qué recorro?

Recorro todas las ventas del arreglo mediante reduce().

¿Qué filtro?

No aplico un filtro para excluir ciudades. Se procesan todos los registros.

¿Qué transformo?

Transformo el nombre de cada ciudad mediante normalizarPalabra() para obtener una clave uniforme y evitar categorías duplicadas por diferencias en la escritura.

¿Qué acumulo?

Acumulo el valor monetario de las ventas correspondientes a cada ciudad.

¿Cómo agrupo?

Agrupo las ventas mediante un objeto acumulador. Cada ciudad normalizada se convierte en una propiedad del objeto y almacena la suma de sus ventas.
5. unidadesPorProducto(ventas)
¿Qué recorro?

Recorro todas las ventas del arreglo mediante reduce().

¿Qué filtro?

No aplico ningún filtro. Se procesan todos los registros.

¿Qué transformo?

Normalizo el nombre de cada producto para utilizarlo como clave y evitar que diferencias en mayúsculas, minúsculas o tildes generen categorías duplicadas.

¿Qué acumulo?

Acumulo la cantidad de unidades vendidas de cada producto.

¿Cómo agrupo?

Agrupo las ventas mediante un objeto acumulador. Cada producto normalizado se convierte en una propiedad que almacena la cantidad total de unidades vendidas.
6. topProductosPorValor(ventas, k)
¿Qué recorro?

Recorro todas las ventas del arreglo mediante reduce().

¿Qué filtro?

No aplico un filtro sobre las ventas. Sin embargo, valido que el parámetro k sea un número entero mayor que cero. Al final, selecciono únicamente los primeros k productos.

¿Qué transformo?

Normalizo el nombre de cada producto para utilizarlo como clave. Después, utilizo Object.entries() para convertir el objeto de agrupación en un arreglo de pares que contienen el nombre del producto y el dinero generado.

¿Qué acumulo?

Acumulo el valor monetario de las ventas correspondientes a cada producto.

¿Cómo agrupo?

Agrupo las ventas mediante un objeto acumulador, donde cada producto normalizado tiene asociado el total de dinero que generó. Posteriormente, utilizo sort() para ordenar los productos de mayor a menor valor y slice() para obtener los primeros k resultados.

MINIRETO 4 SEMANA 1 =================================================
Bitácora – Motor de análisis de ventas v0.1

Fecha: 2026-11-18

Alcance de las pruebas: se hicieron sobre src/analitica.js en dos estados, antes y después de las correcciones. Para que los errores se pudieran observar, durante la prueba se usó un conjunto de 5 ventas diseñado para activarlos; los datos reales de src/datos.js no se modificaron.

Error 1 – Bogotá aparece dos veces
Campo	Detalle
Síntoma	En el reporte de ventas por ciudad, Bogotá salía repetida como dos (o más) filas distintas, con el total partido entre ellas.
Entrada que lo produce	Ventas cuya ciudad se escribe distinto: "Bogotá", "Bogota", "BOGOTÁ", " bogotá" (con espacio al inicio).
Hipótesis	Las claves del objeto de totales se toman tal cual vienen. Para JavaScript "Bogotá" y "Bogota" son textos distintos, así que cada variante crea su propia clave.
Prueba realizada	Importé analitica.js con las 5 ventas de prueba y miré las claves de totalPorCiudad, antes y después de la corrección.
Causa	normalizarPalabra tomaba la primera letra antes del trim(): con " bogotá" la "primera letra" era el espacio, y quedaba la clave bogota en minúscula, aparte de Bogota. Una versión sin normalizar (como la preliminar) crea una clave por cada variante.
Corrección	normalizarPalabra hace trim() y quita tildes primero, y solo después pone la inicial en mayúscula y el resto en minúscula. Si el texto queda vacío devuelve "" en vez de fallar.

Resultados de la prueba (totalPorCiudad):

Antes   (3 claves): Bogota 270000 | bogota 90000 | Medellin 200000
Después (2 claves): Bogota 360000 | Medellin 200000

Después de la corrección, la suma de las cuatro variantes (100000 + 20000 + 150000 + 90000 = 360000) queda en una sola clave Bogota.

Error 2 – El ticket promedio da NaN en un día sin ventas
Campo	Detalle
Síntoma	Al filtrar un día sin ventas, el ticket promedio mostraba NaN en lugar de un número (según lo reportado por la gerente).
Entrada que lo produce	Un arreglo vacío de ventas, por ejemplo ventas.filter(v => v.fecha === "2026-09-07") cuando ese día no existe en los datos.
Hipótesis	El promedio divide el total entre la cantidad de ventas. Con cero ventas es 0 / 0, que en JavaScript da NaN.
Prueba realizada	(1) Calculé a mano el promedio de un arreglo vacío: Math.floor(total / ventas.length) con total = 0 y ventas.length = 0. (2) Filtré un día inexistente (2026-09-07), obtuve [] y llamé a ticketPromedio antes y después de la corrección. (3) Probé un día con ventas para confirmar que el cálculo normal no cambió.
Causa	Dividir entre una cantidad de ventas igual a 0 (0 / 0 da NaN). Además, en el analitica.js anterior la función evitaba la división pero devolvía null, y null.toLocaleString(...) en verificar.js falla al imprimir.
Corrección	ticketPromedio solo cuenta ventas con cantidad > 0 y, si no queda ninguna, devuelve 0 antes de dividir. Así siempre devuelve un número que se puede formatear.

Resultados de la prueba:

Cálculo directo, arreglo vacío:  0 / 0 -> NaN
Día sin ventas (2026-09-07) -> []
ticketPromedio antes:           null
ticketPromedio después:         0
Después, día con ventas (06-09): 90000   (270000 / 3 ventas)

El promedio de un día vacío ya no produce NaN ni null: devuelve 0.

Decisión de diseño pendiente de confirmar con la gerente: se devuelve 0 para un día sin ventas. Si prefiere ver un mensaje tipo "Sin ventas" en el reporte, eso se resuelve al imprimir, no en la función.

Conclusión

Ninguno de los dos errores se presenta en v0.1. Cada uno quedó demostrado con una prueba que lo reproduce en el analitica.js anterior y muestra el resultado correcto en el corregido. Además, verificar.js corre completo con los datos reales: antes se detenía en la última línea porque ventasDelDia no estaba exportada ni importada, y ya lo está.