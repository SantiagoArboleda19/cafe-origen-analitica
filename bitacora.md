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