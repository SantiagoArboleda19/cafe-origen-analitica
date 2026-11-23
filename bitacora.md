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

MINIRETO5 SEMANA2----------------------------------------------

Medición de operaciones (versiones instrumentadas)

Funciones medidas: totalVendido, ventaMayor y totalPorCiudad, cada una con su propio contador.

Visita: cada vez que la función llega a una venta del arreglo.
Comparación: cada vez que se evalúa una condición, aunque dé falso. El contador va antes del if, no dentro de su cuerpo.
Predicción (antes de medir)

Si n (cantidad de ventas) se multiplica por 10, el número de operaciones de cada función se multiplica por 10.

Función	        Visitas	Comparaciones	Al pasar de n a 10n
totalVendido	n	    0	            visitas ×10
ventaMayor	    n	    n	            ambas ×10
totalPorCiudad	n	    n	            ambas ×10

Las tres recorren el arreglo una sola vez, sin ciclos anidados, así que el crecimiento es lineal: O(n). Con 10 ventas se esperan 10 visitas por función; con 100, 100.

Aclaración: la condición se evalúa en todas las vueltas, pero su cuerpo no siempre se ejecuta. Con los datos actuales, ventaMayor entra al cuerpo 4 veces de 12 (cada nuevo máximo) y totalPorCiudad 4 veces de 12 (una por ciudad nueva). Eso no cambia el conteo de comparaciones.

### Resultados

| n | primeraVenta | totalVendido | ventaMayor | totalPorCiudad |
|---|---|---|---|---|
| 100 | v: 1, c: 0 | v: 100, c: 0 | v: 100, c: 100 | v: 100, c: 100 |
| 1.000 | v: 1, c: 0 | v: 1.000, c: 0 | v: 1.000, c: 1.000 | v: 1.000, c: 1.000 |
| 10.000 | v: 1, c: 0 | v: 10.000, c: 0 | v: 10.000, c: 10.000 | v: 10.000, c: 10.000 |
| 100.000 | v: 1, c: 0 | v: 100.000, c: 0 | v: 100.000, c: 100.000 | v: 100.000, c: 100.000 |

(v = visitas, c = comparaciones)

### Comparación con la predicción
La predicción se cumplió: al multiplicar n por 10, las operaciones de las tres
funciones también se multiplicaron por 10. `primeraVenta`, que agregué después,
no creció (×1).

### Clasificación

- **`primeraVenta`: O(1).** Accede directamente a `ventas[0]`. Siempre hace 1
  visita, sin importar si n es 100 o 100.000.
- **`totalVendido`: O(n).** Un solo recorrido con `reduce`. Hace una visita por
  venta, así que las visitas son iguales a n.
- **`ventaMayor`: O(n).** Un solo recorrido. Por cada venta hace una visita y
  una comparación (2n operaciones en total). Las constantes no cuentan en
  Big O, así que sigue siendo lineal.
- **`totalPorCiudad`: O(n).** Un solo recorrido. Por cada venta hace una visita
  y una consulta al objeto de ciudades (también 2n). Es lineal por la misma razón.

Ninguna función es O(n²), porque ninguna tiene ciclos anidados: todas recorren
el arreglo una sola vez.

### Conclusión
El costo depende de cuántas veces se toca cada elemento, no de cuántas
operaciones se hacen por elemento. Por eso `totalVendido` (n) y `ventaMayor`
(2n) son de la misma clase, O(n), mientras que `primeraVenta` es O(1).

MINIRETO6 SEMANA2---------------------------------------------------
## Traza de `clientesRecurrentes` con 5 ventas

Clientes del arreglo de prueba: `[C01, C02, C01, C03, C02]` (posiciones 0 a 4)

| i | cliente i | j que recorre | Coincidencias                   | Comparaciones | recurrentes |
|---|---        |---            |---                              |---            |---          |
| 0 | C01       | 1, 2, 3, 4    | j=2 (C01): no estaba, se agrega | 4             | [C01]       |
| 1 | C02       | 2, 3, 4       | j=4 (C02): no estaba, se agrega | 3             | [C01, C02]  |
| 2 | C01       | 3, 4          | ninguna                         | 2             | [C01, C02]  |
| 3 | C03       | 4             | ninguna                         | 1             | [C01, C02]  |
| 4 | C02       | (ninguna)     | no hay posiciones posteriores   | 0             | [C01, C02]  |

**Total de comparaciones de cliente: 4 + 3 + 2 + 1 + 0 = 10**

Resultado: `[C01, C02]`. C03 no aparece porque compró una sola vez.

### Generalización

Para cada posición i, el ciclo interno compara con las posiciones i+1 hasta n-1,
es decir, hace (n - 1 - i) comparaciones. Sumando todas las vueltas:

(n-1) + (n-2) + ... + 1 + 0 = **n(n-1)/2**

| n       | comparaciones |
|---      |---            |
| 5       | 10            |
| 100     | 4.950         |
| 1.000   | 499.500       |
| 100.000 | 4.999.950.000 |

n(n-1)/2 = n²/2 - n/2. Big O descarta la constante (½) y el término menor (-n/2),
así que la función es **O(n²)**: si n se multiplica por 10, las comparaciones
se multiplican por ~100.

### Observaciones

- La cantidad de comparaciones depende solo de n, no de los datos. Con
  clientes repetidos o todos distintos, el ciclo interno hace las mismas
  n(n-1)/2 comparaciones.
- `recurrentes.includes(...)` solo se ejecuta cuando hay coincidencia (por el
  cortocircuito de `&&`), así que no entra en este conteo. Puede agregar
  trabajo extra, pero no cambia el orden de crecimiento.
- Esto explica por qué con el historial anual la función "se quedó pensando":
  con n grande, el trabajo crece al cuadrado.

### Análisis de tiempos de ejecución (console.time / console.timeEnd)

Resultados medidos

n	    Tiempo	    Factor vs. fila anterior
1.000	5,976 ms	n/a
2.000	12,8 ms	    ×2,1
4.000	50,258 ms	×3,9
8.000	243,194 ms	×4,8
16.000	1,163 s	    ×4,8

Observación

Al duplicar n, el tiempo no se duplica (como pasaría en O(n)), sino que se multiplica por un valor cercano a 4. De 1.000 a 2.000 el tiempo solo se duplica, pero de ahí en adelante crece entre ×3,9 y ×4,8: los últimos saltos quedan un poco por encima de 4, entre cuadruplicarse y quintuplicarse.

Relación con O(n²)

En un algoritmo cuadrático, T(2n) / T(n) = (2n)² / n² = 4, es decir, duplicar la entrada cuadruplica el número de operaciones. Los datos medidos siguen ese patrón, por lo que el algoritmo es consistente con una complejidad O(n²), típica de dos ciclos anidados.

Por qué los factores no son exactamente 4

Primera fila (×2,1): con n pequeño pesan más el calentamiento del motor, la compilación JIT y el ruido de la medición que el trabajo real del algoritmo.
Últimas filas (×4,8): con arreglos grandes entran en juego la memoria caché y el recolector de basura, que añaden un costo extra a cada duplicación.

Big O describe la tendencia cuando n crece, no una igualdad exacta en cada medición.

### Conclusión

El tiempo crece de forma cuadrática: con n = 16.000 ya supera 1 segundo y, con 10 veces más datos, tardaría unas 100 veces más. Por eso este enfoque no escala con datos grandes, y una alternativa con Map o Set (que baja la detección de duplicados a O(n)) es mucho más eficiente.

### Estimación para 100.000 y 1.000.000 de ventas

Regla usada: en una función O(n²), si n se multiplica por k, el tiempo se multiplica por k × k.

Estimación para n = 100.000

Punto de partida: n = 16.000 tardó 1,163 s.
100.000 / 16.000 = 6,25, así que n se multiplica por 6,25.
El tiempo se multiplica por 6,25 × 6,25 ≈ 39.
1,163 s × 39 ≈ 45 s.

Como la estimación es menor a 2 minutos, se ejecutó. El tiempo medido fue 45,23 s, casi igual a lo estimado, lo que confirma que la función es O(n²).

Estimación para n = 1.000.000

1.000.000 / 16.000 = 62,5, así que n se multiplica por 62,5.
El tiempo se multiplica por 62,5 × 62,5 ≈ 3.900.
1,163 s × 3.900 ≈ 4.500 s ≈ 75 minutos.

Como la estimación supera los 2 minutos, no se ejecutó.

Resumen

n	Tiempo	Cómo se obtuvo
16.000	1,163 s	Medido
100.000	45,23 s	Estimado ≈ 45 s y luego medido
1.000.000	≈ 75 min	Solo estimado

Observación: al pasar de 100.000 a 1.000.000 de ventas (10 veces más datos), el tiempo se multiplica por 10 × 10 = 100: de menos de 1 minuto a más de 1 hora. Con una función cuadrática, el reporte se vuelve inviable cuando los datos crecen.

### Costo oculto de includes

recurrentes.includes también recorre un arreglo, así que es un ciclo escondido dentro de los dos ciclos de las comparaciones. En el peor caso (muchas coincidencias y un arreglo recurrentes muy grande), cada comparación cuesta hasta n pasos extra, y la complejidad sube de O(n²) a O(n³).

En la práctica, recurrentes solo guarda clientes distintos y en nuestros datos es pequeño (3 clientes), por lo que includes cuesta casi un paso constante y el tiempo medido sigue el patrón de O(n²). Sin embargo, si el negocio tuviera miles de clientes recurrentes distintos, este costo oculto se notaría y el reporte sería aún más lento.

### Conclusión para la gerente

Gerente, el reporte de clientes recurrentes se vuelve lento por la forma en que la función busca. Toma la primera venta y la compara con todas las demás para ver si ese cliente aparece en otra venta. Además, revisa si ese cliente ya está en la lista de clientes recurrentes. Luego pasa a la segunda venta y repite todo, y así sucesivamente hasta terminar con todas las ventas.

El problema es que cada venta nueva obliga a la función a compararse con todas las demás, así que el trabajo no crece al mismo ritmo que las ventas, sino mucho más rápido. Si las ventas se duplican, el tiempo se multiplica por cuatro o cinco.

En nuestras pruebas: con 16.000 ventas el reporte tarda 1 segundo, pero con 100.000 ventas (unas 6 veces más) tarda 45 segundos (unas 39 veces más). Con 1.000.000 de ventas tardaría más de una hora.

Por eso el reporte funciona bien con pocas ventas, pero se vuelve inviable cuando el negocio crece. La solución es cambiar la forma de buscar, por ejemplo llevando un registro de los clientes que ya aparecieron, para no comparar cada venta con todas las demás. Así el tiempo crecería al mismo ritmo que las ventas.

### Recorridos, arreglos creados, tiempo y espacio
Traza con 4 ventas

Ventas de ejemplo: V1 (Medellín), V2 (Cali), V3 (Medellín), V4 (Bogotá). Se busca el total de Medellín.

Versión encadenada (totalCiudadCadena)

Paso	    Qué hace	                                                            Elementos que recorre	Arreglo nuevo
1. map      (normalizar) Crea una copia de cada venta con la ciudad normalizada	    4 (V1, V2, V3, V4)	    Sí, de 4 elementos
2. filter	Deja solo las de Medellín	                                            4	Sí, de 2 elementos  (V1, V3)
3. map      (valorVenta)	Calcula el valor de cada venta que quedó	            2	                    Sí, de 2 elementos
4. reduce	Suma los valores	                                                    2	                    No (devuelve un número)

Total: 4 recorridos y 3 arreglos nuevos.

Versión de una pasada (totalCiudadUnaPasada)

Venta	Qué hace	                            total
V1	    Normaliza, es de Medellín, suma	        valor(V1)
V2	    Normaliza, no es de Medellín, no suma	sin cambio
V3	    Normaliza, es de Medellín, suma	        valor(V1) + valor(V3)
V4	    Normaliza, no es de Medellín, no suma	sin cambio

Total: 1 recorrido y 0 arreglos nuevos (solo usa las variables total, ciudadNor, ventaNor).

Generalización con n ventas (peor caso: todas son de Medellín)
	        Recorridos	Arreglos nuevos	    Pasos aprox.	Tiempo	Espacio extra
Cadena	    4	        3 (de tamaño n)	    4n	            O(n)	3n → O(n)
Una pasada	1	        0	                n	            O(n)	O(1)
Observaciones
La versión encadenada no modifica las ventas originales: el primer map crea un objeto nuevo por venta. Esto cuesta algo más de memoria, pero sigue siendo O(n) y evita efectos secundarios.
En la versión de una pasada, valorVenta se calcula solo para las ventas de Medellín (dentro del if), lo que evita trabajo innecesario.
Conclusión

Ambas versiones son O(n) en tiempo: si las ventas se duplican, el tiempo también se duplica (no se cuadruplica, como pasaba con la función de clientes recurrentes). La diferencia está en el espacio: la versión encadenada crea arreglos intermedios que crecen con n, mientras que la de una pasada usa una cantidad fija de memoria sin importar cuántas ventas haya. Además, la de una pasada hace menos trabajo por venta, aunque Big O no distingue esa diferencia.

### ¿Por qué ambas versiones son O(n) aunque una recorra el arreglo cuatro veces?

Conteo de pasos (peor caso)

Cadena: n + n + n + n = 4n pasos.
Una pasada: n pasos.

Regla de simplificación aplicada

Big O elimina las constantes que multiplican. Describe cómo crece el tiempo cuando n crece, no cuántos pasos exactos se hacen. El 4 de 4n es una constante: no depende del tamaño de la entrada, así que se descarta y 4n queda como O(n).

Por qué tiene sentido

Si las ventas se duplican, la cadena pasa de 4n a 8n pasos (el doble) y la versión de una pasada pasa de n a 2n pasos (también el doble). Ambas crecen al mismo ritmo, de forma lineal. Recorrer el arreglo 4 veces solo hace la curva más empinada desde el inicio, pero no cambia su forma.

n	Cadena (4n)	Una pasada (n)	Al duplicar n
1.000	4.000	1.000	
2.000	8.000	2.000	×2 en ambas
4.000	16.000	4.000	×2 en ambas

Conclusión

Cuatro recorridos es una cantidad fija que no depende de n, por eso Big O la elimina como constante y ambas versiones quedan en O(n) de tiempo. La versión de una pasada sigue siendo algo más rápida en la práctica, pero Big O no distingue esa diferencia, solo cómo crece el tiempo al aumentar n.

### Complejidad espacial de las funciones del motor

Criterio: se cuenta solo la memoria extra que crea la función (incluido lo que devuelve), no los datos que ya recibe. Los contadores numéricos, aunque crezcan hasta n, ocupan siempre el mismo espacio.

O(1): memoria adicional constante
Función	Por qué
valorVenta	Calcula y devuelve un número
totalVendido, unidadesVendidas	Una variable acumuladora
totalVendidoM, unidadesVendidasM	reduce con acumulador numérico
ventaMayor, ventaMayorM	Guardan solo la mayor venta vista (una referencia)
ticketPromedio	Variables sueltas y llamadas a unidadesVendidas
ventasPorCiudad	Un contador; los strings temporales se descartan en cada vuelta
totalCiudadUnaPasada	Un ciclo con total, ciudadNor y ventaNor
normalizarPalabra	Strings del largo de una palabra, acotado (O(1) en la práctica)
numeroAlAzar, fechaAzar	Resultado de tamaño fijo (un número o un string de 10 caracteres)
totalVendidoI, ventaMayorI, primeraVenta	Variables y un contador de tamaño fijo ({v, c})
O(n): proporcional a los datos
Función	Por qué
ventasPorCiudadM	filter crea un arreglo de hasta n ventas
ventasDelDia	acc guarda las ventas de esa fecha (hasta n)
totalCiudadCadena	Tres arreglos intermedios de tamaño n
generarVentas	Crea un arreglo de n objetos de tamaño fijo
PRODUCTOS, CIUDAD, CLIENTES	El map intermedio tiene n elementos (sin él serían O(c))
orquestador, tiempos	O(n), con n el mayor tamaño probado: el arreglo de cada vuelta se descarta al terminar
Proporcional a las claves distintas: O(c) u O(p)
Función	Espacio	Por qué
totalPorCiudad, totalPorCiudadI	O(c)	Un objeto con una clave por ciudad distinta, no por venta
unidadesPorProducto	O(p)	Un objeto con una clave por producto distinto
topProductosPorvalor	O(p), no O(k)	Construye el objeto con todos los productos, crea el arreglo de Object.entries y ordena todo antes del slice(0, k)
clientesRecurrentes	O(c)	recurrentes solo guarda clientes distintos que se repiten

En el peor caso teórico (todas las claves distintas), c y p llegan a n, así que formalmente estas funciones son O(n). En la práctica, con pocas ciudades, productos y clientes, usan muy poca memoria.

Los dos casos que pedía el ejercicio
totalPorCiudad: su objeto crece con la cantidad de ciudades distintas, no con la cantidad de ventas. Con 1.000.000 de ventas y 5 ciudades, tiene 5 claves.
topProductosPorValor: aunque devuelva solo k elementos, internamente guarda todos los productos distintos. Que el resultado sea pequeño no significa que la memoria usada también lo sea.
Observación: espacio y tiempo son cosas distintas

clientesRecurrentes usa poca memoria (O(c)), pero es O(n²) en tiempo. Por su parte, totalCiudadCadena y totalCiudadUnaPasada son ambas O(n) en tiempo, y se diferencian en el espacio: O(n) la cadena y O(1) la de una pasada.

### Eleccion total ciudad

Decisión: versión de totalCiudad que se queda en el motor

Versión elegida: totalCiudadUnaPasada.

Justificación por recursos

	                Cadena	Una pasada
Recorridos	        4	    1
Arreglos nuevos	    3       (de tamaño n)	0
Tiempo	            O(n)	O(n)
Espacio	            O(n)	O(1)

Ambas tienen el mismo tiempo en Big O, pero la de una pasada hace menos trabajo por venta y no crea arreglos ni objetos intermedios, así que su memoria no crece con los datos. Con 1.000.000 de ventas, la cadena crearía varios arreglos de ese tamaño, y la de una pasada solo usa tres variables.

Justificación por legibilidad

La cadena (map, filter, map, reduce) se lee como una receta, pero es más difícil de seguir paso a paso y hay que fijarse en qué arreglo intermedio tiene cada paso. La versión de una pasada se lee de arriba abajo con un solo ciclo: normaliza, compara y suma. En este caso la más simple en recursos también es la más fácil de seguir, así que no hay que sacrificar una por la otra.

Decisión: se deja totalCiudadUnaPasada porque tiene menor uso de memoria (O(1) frente a O(n)), hace un solo recorrido y es más fácil de leer.