# Bitácora: motor de análisis de ventas

## Contenido

**Semana 1**
1. [Minireto 1: Diccionario de datos y casos borde](#minireto-1-diccionario-de-datos-y-casos-borde)
2. [Minireto 2: Pseudocódigo, pruebas y trazas](#minireto-2-pseudocódigo-pruebas-y-trazas)
3. [Minireto 3: Funciones con métodos de arreglos](#minireto-3-funciones-con-métodos-de-arreglos)
4. [Minireto 4: Errores encontrados (v0.1)](#minireto-4-errores-encontrados-motor-v01)

**Semana 2**

5. [Minireto 5: Medición de operaciones](#minireto-5-medición-de-operaciones)
6. [Minireto 6: Complejidad de `clientesRecurrentes`](#minireto-6-complejidad-de-clientesrecurrentes)
7. [Minireto 7: Análisis de recursos (tiempo y espacio)](#minireto-7-análisis-de-recursos-tiempo-y-espacio)

---

# SEMANA 1

## Minireto 1: Diccionario de datos y casos borde

### Diccionario de datos

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | Number | Identificador único de cada registro de venta. Permite diferenciar una venta de otra. |
| `fecha` | String | Fecha en la que se realizó la venta, en formato AAAA-MM-DD. |
| `cliente` | String | Código que identifica al cliente que realizó la compra. Ejemplo: C01. |
| `producto` | String | Nombre del producto que fue vendido. |
| `ciudad` | String | Ciudad asociada a la venta o ubicación del cliente. |
| `cantidad` | Number | Número de unidades del producto registradas en la venta. |
| `precio` | Number | Precio unitario del producto vendido, en pesos colombianos (COP). |

### Casos borde

**Caso 1. Inconsistencia en el nombre de las ciudades**
- **Problema:** en el registro con ID 5 aparece "medellín" con minúscula, mientras que en otros aparece "Medellín" con mayúscula inicial.
- **Decisión:** normalizar los nombres de las ciudades para que todos tengan el mismo formato. Así, al agrupar con `reduce()` no se crean categorías duplicadas.

**Caso 2. Cantidad de productos igual a cero**
- **Problema:** en el registro con ID 8 la cantidad es 0, lo que representa una venta sin unidades vendidas.
- **Decisión:** revisar el registro para saber si es una venta cancelada o un error de digitación. Si no hubo venta real, no se contabiliza como venta efectiva. No se modifica el dato sin verificarlo.

**Caso 3. Validación de los códigos de clientes**
- **Problema:** los clientes se identifican con códigos como C01, C02 y C03, pero no hay un listado maestro para comprobar que todos correspondan a clientes registrados.
- **Decisión:** validar los códigos contra una base de datos de clientes. Si alguno no existe, se reporta para revisión antes de procesar las ventas.

### Conclusión

La revisión permitió identificar inconsistencias en los nombres de las ciudades, cantidades que requieren validación y códigos de clientes que deben contrastarse con un registro maestro. Estos controles ayudan a que los resultados de los análisis sean confiables.

---

## Minireto 2: Pseudocódigo, pruebas y trazas

### 2.1 Plan en pseudocódigo

#### 1. `valorVenta(venta)`

| Pregunta | Respuesta |
|---|---|
| Qué recorro | Recibo un registro de una venta |
| Condición | Ninguna |
| Qué acumulo | Nada. Calculo cantidad × precio |
| Valor inicial | No necesito |

```
INICIO
    recibir una venta
    calcular cantidad × precio
    devolver el resultado
FIN
```

#### 2. `totalVendido(ventas)`

| Pregunta | Respuesta |
|---|---|
| Qué recorro | Todas las ventas |
| Condición | Ninguna |
| Qué acumulo | El valor de cada venta |
| Valor inicial | El total comienza en 0 |

```
INICIO
    iniciar total en 0

    PARA CADA venta EN ventas
        calcular el valor de la venta
        sumar el valor de la venta al total
    FIN PARA

    devolver total
FIN
```

#### 3. `unidadesVendidas(ventas)`

| Pregunta | Respuesta |
|---|---|
| Qué recorro | Todas las ventas |
| Condición | Ninguna |
| Qué acumulo | La cantidad de unidades de cada venta |
| Valor inicial | Las unidades comienzan en 0 |

```
INICIO
    iniciar unidades en 0

    PARA CADA venta EN ventas
        sumar la cantidad de la venta a unidades
    FIN PARA

    devolver unidades
FIN
```

#### 4. `ventaMayor(ventas)`

| Pregunta | Respuesta |
|---|---|
| Qué recorro | Todas las ventas |
| Condición | Comparo el valor de cada venta con el de la mayor encontrada hasta ese momento |
| Qué acumulo | No acumulo una suma. Guardo el registro de la venta con mayor valor |
| Valor inicial | La venta mayor comienza con el primer registro |

```
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
```

#### 5. `ticketPromedio(ventas)`

| Pregunta | Respuesta |
|---|---|
| Qué recorro | Todas las ventas |
| Condición | Solo cuento las ventas con cantidad mayor que 0 |
| Qué acumulo | El valor de las ventas válidas y cuántas ventas válidas hay |
| Valor inicial | Total en 0 y cantidad de ventas válidas en 0 |

```
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
```

#### 6. `ventasPorCiudad(ventas, ciudad)`

| Pregunta | Respuesta |
|---|---|
| Qué recorro | Todas las ventas |
| Condición | Comparo la ciudad de cada venta con la recibida, ignorando mayúsculas y espacios sobrantes |
| Qué acumulo | El valor de las ventas de la ciudad indicada |
| Valor inicial | El total comienza en 0 |

```
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
```

### 2.2 Pruebas con tres entradas

| Función | Arreglo completo | Un elemento | Arreglo vacío |
|---|---|---|---|
| `valorVenta` | 84.000 (venta del arreglo) | 26.000 (otra venta) | 0 (venta con cantidad 0) |
| `totalVendido` | 985.000 | 84.000 | 0 |
| `unidadesVendidas` | 21 | 2 | 0 |
| `ventaMayor` | Venta id 10 (ver abajo) | Venta id 1 (ver abajo) | `undefined` |
| `ticketPromedio` | 89.545  | 0 | 0 |
| `ventasPorCiudad` (Medellín) | 356.000 | 84.000 | 0 |

Resultado de `ventaMayor` con el arreglo completo:

```js
{ id: 10, fecha: '2026-09-05', cliente: 'C07', producto: 'Origen Huila 500 g',
  ciudad: 'Pereira', cantidad: 4, precio: 42000 }
```

Resultado de `ventaMayor` con un elemento:

```js
{ id: 1, fecha: '2026-09-01', cliente: 'C01', producto: 'Origen Huila 500 g',
  ciudad: 'Medellín', cantidad: 2, precio: 42000 }
```

### 2.3 Tablas de traza

#### Traza de `valorVenta(venta)`

Multiplica la cantidad por el precio.

| Entrada | Cantidad | Precio | Resultado |
|---|---|---|---|
| `ventas[0]` | 2 | 42.000 | 84.000 |
| `ventas[1]` | 1 | 26.000 | 26.000 |

#### Traza de `totalVendido(ventas)`

**Prueba 1: arreglo completo**

| Iteración | Venta | Valor venta | Total acumulado |
|---|---|---|---|
| 1 | 1 | 84.000 | 84.000 |
| 2 | 2 | 26.000 | 110.000 |
| 3 | 3 | 95.000 | 205.000 |
| 4 | 4 | 42.000 | 247.000 |
| 5 | 5 | 135.000 | 382.000 |
| 6 | 6 | 52.000 | 434.000 |
| 7 | 7 | 120.000 | 554.000 |
| 8 | 8 | 0 | 554.000 |
| 9 | 9 | 90.000 | 644.000 |
| 10 | 10 | 168.000 | 812.000 |
| 11 | 11 | 95.000 | 907.000 |
| 12 | 12 | 78.000 | 985.000 |

**Prueba 2: un solo elemento**

| Iteración | Venta | Valor venta | Total acumulado |
|---|---|---|---|
| 1 | 1 | 84.000 | 84.000 |

#### Traza de `unidadesVendidas(ventas)`

**Prueba 1: arreglo completo**

| Iteración | Venta | Cantidad | Unidades acumuladas |
|---|---|---|---|
| 1 | 1 | 2 | 2 |
| 2 | 2 | 1 | 3 |
| 3 | 3 | 1 | 4 |
| 4 | 4 | 1 | 5 |
| 5 | 5 | 3 | 8 |
| 6 | 6 | 2 | 10 |
| 7 | 7 | 1 | 11 |
| 8 | 8 | 0 | 11 |
| 9 | 9 | 2 | 13 |
| 10 | 10 | 4 | 17 |
| 11 | 11 | 1 | 18 |
| 12 | 12 | 3 | 21 |

**Prueba 2: un solo elemento**

| Iteración | Venta | Cantidad | Unidades acumuladas |
|---|---|---|---|
| 1 | 1 | 2 | 2 |

#### Traza de `ventaMayor(ventas)`

El acumulador es el registro con la venta de mayor valor encontrada.

**Prueba 1: arreglo completo**

| Iteración | Venta actual | Valor actual | Mayor encontrado |
|---|---|---|---|
| Inicial | Venta 1 | 84.000 | 84.000 |
| 1 | Venta 1 | 84.000 | 84.000 |
| 2 | Venta 2 | 26.000 | 84.000 |
| 3 | Venta 3 | 95.000 | 95.000 |
| 4 | Venta 4 | 42.000 | 95.000 |
| 5 | Venta 5 | 135.000 | 135.000 |
| 6 | Venta 6 | 52.000 | 135.000 |
| 7 | Venta 7 | 120.000 | 135.000 |
| 8 | Venta 8 | 0 | 135.000 |
| 9 | Venta 9 | 90.000 | 135.000 |
| 10 | Venta 10 | 168.000 | 168.000 |
| 11 | Venta 11 | 95.000 | 168.000 |
| 12 | Venta 12 | 78.000 | 168.000 |

Resultado: registro completo de la venta con ID 10.

**Prueba 2: un solo elemento**

| Iteración | Venta actual | Valor actual | Mayor encontrado |
|---|---|---|---|
| Inicial | Venta 1 | 84.000 | 84.000 |
| 1 | Venta 1 | 84.000 | 84.000 |

Resultado: registro completo de la venta con ID 1.

#### Traza de `ticketPromedio(ventas)`

Solo cuenta ventas con cantidad mayor que cero.

**Prueba 1: arreglo completo**

| Venta | Cantidad | Valor venta | ¿Válida? | Total acumulado | Ventas válidas |
|---|---|---|---|---|---|
| 1 | 2 | 84.000 | Sí | 84.000 | 1 |
| 2 | 1 | 26.000 | Sí | 110.000 | 2 |
| 3 | 1 | 95.000 | Sí | 205.000 | 3 |
| 4 | 1 | 42.000 | Sí | 247.000 | 4 |
| 5 | 3 | 135.000 | Sí | 382.000 | 5 |
| 6 | 2 | 52.000 | Sí | 434.000 | 6 |
| 7 | 1 | 120.000 | Sí | 554.000 | 7 |
| 8 | 0 | 0 | No | 554.000 | 7 |
| 9 | 2 | 90.000 | Sí | 644.000 | 8 |
| 10 | 4 | 168.000 | Sí | 812.000 | 9 |
| 11 | 1 | 95.000 | Sí | 907.000 | 10 |
| 12 | 3 | 78.000 | Sí | 985.000 | 11 |

Operación final: 985.000 ÷ 11 = 89.545,45

**Prueba 2: un solo elemento**

| Venta | Cantidad | Valor venta | Total | Ventas válidas |
|---|---|---|---|---|
| 1 | 2 | 84.000 | 84.000 | 1 |

Operación final: 84.000 ÷ 1 = 84.000

#### Traza de `ventasPorCiudad(ventas, ciudad)`

Ciudad buscada: Medellín.

**Prueba 1: arreglo completo**

| Venta | Ciudad | Valor venta | ¿Coincide? | Total acumulado |
|---|---|---|---|---|
| 1 | Medellín | 84.000 | Sí | 84.000 |
| 2 | Bogotá | 26.000 | No | 84.000 |
| 3 | Cali | 95.000 | No | 84.000 |
| 4 | Medellín | 42.000 | Sí | 126.000 |
| 5 | medellín | 135.000 | Sí | 261.000 |
| 6 | Bogotá | 52.000 | No | 261.000 |
| 7 | Bogotá | 120.000 | No | 261.000 |
| 8 | Cali | 0 | No | 261.000 |
| 9 | Cali | 90.000 | No | 261.000 |
| 10 | Pereira | 168.000 | No | 261.000 |
| 11 | Medellín | 95.000 | Sí | 356.000 |
| 12 | Bogotá | 78.000 | No | 356.000 |

**Prueba 2: un solo elemento**

| Venta | Ciudad | Valor venta | ¿Coincide? | Total acumulado |
|---|---|---|---|---|
| 1 | Medellín | 84.000 | Sí | 84.000 |

---

## Minireto 3: Funciones con métodos de arreglos

Para cada función se responde: qué recorro, qué filtro, qué transformo, qué acumulo y cómo agrupo.

### 1. `totalVendidoM(ventas)`
- **Recorro:** todas las ventas con `reduce()`.
- **Filtro:** nada, se procesan todos los registros.
- **Transformo:** no transformo los registros; calculo el valor de cada venta (cantidad × precio).
- **Acumulo:** el valor monetario de todas las ventas.
- **Agrupo:** no agrupo; un único acumulador guarda el total vendido.

### 2. `unidadesVendidasM(ventas)`
- **Recorro:** todas las ventas con `reduce()`.
- **Filtro:** nada, se procesan todos los registros.
- **Transformo:** obtengo la cantidad de unidades de cada venta.
- **Acumulo:** las unidades vendidas de todos los registros.
- **Agrupo:** no agrupo; un único acumulador para el total de unidades.

### 3. `ventasPorCiudadM(ventas, ciudad)`
- **Recorro:** todas las ventas con `filter()`, para revisar la ciudad de cada registro.
- **Filtro:** las ventas cuya ciudad coincide con el parámetro, normalizando ambos textos para evitar diferencias de mayúsculas, minúsculas y tildes.
- **Transformo:** no cambio la estructura de los registros; calculo el valor de cada venta con `valorVenta()`.
- **Acumulo:** el valor de las ventas de la ciudad buscada, con `reduce()`.
- **Agrupo:** no agrupo por varias ciudades; selecciono una y sumo sus ventas.

### 4. `totalPorCiudad(ventas)`
- **Recorro:** todas las ventas con `reduce()`.
- **Filtro:** nada, se procesan todos los registros.
- **Transformo:** el nombre de cada ciudad con `normalizarPalabra()`, para obtener una clave uniforme y evitar categorías duplicadas.
- **Acumulo:** el valor de las ventas de cada ciudad.
- **Agrupo:** con un objeto acumulador; cada ciudad normalizada es una propiedad que guarda la suma de sus ventas.

### 5. `unidadesPorProducto(ventas)`
- **Recorro:** todas las ventas con `reduce()`.
- **Filtro:** nada, se procesan todos los registros.
- **Transformo:** normalizo el nombre de cada producto para usarlo como clave.
- **Acumulo:** las unidades vendidas de cada producto.
- **Agrupo:** con un objeto acumulador; cada producto normalizado guarda su total de unidades.

### 6. `topProductosPorValor(ventas, k)`
- **Recorro:** todas las ventas con `reduce()`.
- **Filtro:** no filtro ventas, pero valido que `k` sea un entero mayor que cero y al final tomo solo los primeros k productos.
- **Transformo:** normalizo el nombre de cada producto como clave y uso `Object.entries()` para convertir el objeto en un arreglo de pares [producto, dinero generado].
- **Acumulo:** el valor monetario de las ventas de cada producto.
- **Agrupo:** con un objeto acumulador (producto normalizado → total de dinero). Luego `sort()` ordena de mayor a menor y `slice()` toma los primeros k.

---

## Minireto 4: Errores encontrados (motor v0.1)

**Fecha:** 2026-11-18

**Alcance de las pruebas:** se hicieron sobre `src/analitica.js` en dos estados, antes y después de las correcciones. Para observar los errores se usó un conjunto de 5 ventas diseñado para activarlos; los datos reales de `src/datos.js` no se modificaron.

### Error 1: Bogotá aparece dos veces

| Campo | Detalle |
|---|---|
| Síntoma | En el reporte de ventas por ciudad, Bogotá salía repetida como dos (o más) filas, con el total partido entre ellas. |
| Entrada que lo produce | Ventas con la ciudad escrita distinto: "Bogotá", "Bogota", "BOGOTÁ", " bogotá" (con espacio al inicio). |
| Hipótesis | Las claves del objeto de totales se toman tal cual vienen. Para JavaScript "Bogotá" y "Bogota" son textos distintos, y cada variante crea su propia clave. |
| Prueba realizada | Importé `analitica.js` con las 5 ventas de prueba y miré las claves de `totalPorCiudad`, antes y después de la corrección. |
| Causa | `normalizarPalabra` tomaba la primera letra antes del `trim()`: con " bogotá" la "primera letra" era el espacio, y quedaba la clave `bogota` en minúscula, aparte de `Bogota`. Una versión sin normalizar (como la preliminar) crea una clave por cada variante. |
| Corrección | `normalizarPalabra` hace `trim()` y quita tildes primero, y solo después pone la inicial en mayúscula y el resto en minúscula. Si el texto queda vacío devuelve `""` en vez de fallar. |

**Resultados (`totalPorCiudad`):**

```
Antes   (3 claves): Bogota 270000 | bogota 90000 | Medellin 200000
Después (2 claves): Bogota 360000 | Medellin 200000
```

La suma de las cuatro variantes (100000 + 20000 + 150000 + 90000 = 360000) queda en una sola clave `Bogota`.

### Error 2: El ticket promedio da NaN en un día sin ventas

| Campo | Detalle |
|---|---|
| Síntoma | Al filtrar un día sin ventas, el ticket promedio mostraba `NaN` en lugar de un número (según lo reportado por la gerente). |
| Entrada que lo produce | Un arreglo vacío de ventas, por ejemplo `ventas.filter(v => v.fecha === "2026-09-07")` cuando ese día no existe en los datos. |
| Hipótesis | El promedio divide el total entre la cantidad de ventas. Con cero ventas es 0 / 0, que en JavaScript da `NaN`. |
| Prueba realizada | (1) Calculé a mano el promedio de un arreglo vacío: `Math.floor(total / ventas.length)` con total = 0 y `ventas.length` = 0. (2) Filtré un día inexistente (2026-09-07), obtuve `[]` y llamé a `ticketPromedio` antes y después de la corrección. (3) Probé un día con ventas para confirmar que el cálculo normal no cambió. |
| Causa | Dividir entre una cantidad de ventas igual a 0 (0 / 0 da `NaN`). Además, en el `analitica.js` anterior la función evitaba la división pero devolvía `null`, y `null.toLocaleString(...)` en `verificar.js` falla al imprimir. |
| Corrección | `ticketPromedio` solo cuenta ventas con cantidad > 0 y, si no queda ninguna, devuelve 0 antes de dividir. Así siempre devuelve un número que se puede formatear. |

**Resultados:**

```
Cálculo directo, arreglo vacío:  0 / 0 -> NaN
Día sin ventas (2026-09-07) -> []
ticketPromedio antes:           null
ticketPromedio después:         0
Después, día con ventas (06-09): 90000   (270000 / 3 ventas)
```

El promedio de un día vacío ya no produce `NaN` ni `null`: devuelve 0.

**Decisión de diseño pendiente de confirmar con la gerente:** se devuelve 0 para un día sin ventas. Si prefiere ver un mensaje tipo "Sin ventas" en el reporte, eso se resuelve al imprimir, no en la función.

### Conclusión

Ninguno de los dos errores se presenta en v0.1. Cada uno quedó demostrado con una prueba que lo reproduce en el `analitica.js` anterior y muestra el resultado correcto en el corregido. Además, `verificar.js` corre completo con los datos reales: antes se detenía en la última línea porque `ventasDelDia` no estaba exportada ni importada, y ya lo está.

---

# SEMANA 2

## Minireto 5: Medición de operaciones

**Funciones medidas:** `totalVendido`, `ventaMayor` y `totalPorCiudad`, cada una con su propio contador.

- **Visita:** cada vez que la función llega a una venta del arreglo.
- **Comparación:** cada vez que se evalúa una condición, aunque dé falso. El contador va antes del `if`, no dentro de su cuerpo.

### Predicción (antes de medir)

Si n (cantidad de ventas) se multiplica por 10, las operaciones de cada función se multiplican por 10.

| Función | Visitas | Comparaciones | Al pasar de n a 10n |
|---|---|---|---|
| `totalVendido` | n | 0 | visitas ×10 |
| `ventaMayor` | n | n | ambas ×10 |
| `totalPorCiudad` | n | n | ambas ×10 |

Las tres recorren el arreglo una sola vez, sin ciclos anidados, así que el crecimiento es lineal: O(n). Con 10 ventas se esperan 10 visitas por función; con 100, 100.

**Aclaración:** la condición se evalúa en todas las vueltas, pero su cuerpo no siempre se ejecuta. Con los datos actuales, `ventaMayor` entra al cuerpo 4 veces de 12 (cada nuevo máximo) y `totalPorCiudad` 4 veces de 12 (una por ciudad nueva). Eso no cambia el conteo de comparaciones.

### Resultados

(v = visitas, c = comparaciones)

| n | `primeraVenta` | `totalVendido` | `ventaMayor` | `totalPorCiudad` |
|---|---|---|---|---|
| 100 | v: 1, c: 0 | v: 100, c: 0 | v: 100, c: 100 | v: 100, c: 100 |
| 1.000 | v: 1, c: 0 | v: 1.000, c: 0 | v: 1.000, c: 1.000 | v: 1.000, c: 1.000 |
| 10.000 | v: 1, c: 0 | v: 10.000, c: 0 | v: 10.000, c: 10.000 | v: 10.000, c: 10.000 |
| 100.000 | v: 1, c: 0 | v: 100.000, c: 0 | v: 100.000, c: 100.000 | v: 100.000, c: 100.000 |

### Comparación con la predicción

La predicción se cumplió: al multiplicar n por 10, las operaciones de las tres funciones también se multiplicaron por 10. `primeraVenta`, que agregué después, no creció (×1).

### Clasificación

| Función | Clase | Por qué |
|---|---|---|
| `primeraVenta` | **O(1)** | Accede directamente a `ventas[0]`. Siempre hace 1 visita, sin importar si n es 100 o 100.000. |
| `totalVendido` | **O(n)** | Un solo recorrido con `reduce`. Una visita por venta. |
| `ventaMayor` | **O(n)** | Un solo recorrido. Por cada venta hace una visita y una comparación (2n operaciones). Las constantes no cuentan en Big O. |
| `totalPorCiudad` | **O(n)** | Un solo recorrido. Por cada venta hace una visita y una consulta al objeto de ciudades (también 2n). |

Ninguna función es O(n²), porque ninguna tiene ciclos anidados: todas recorren el arreglo una sola vez.

### Conclusión

El costo depende de cuántas veces se toca cada elemento, no de cuántas operaciones se hacen por elemento. Por eso `totalVendido` (n) y `ventaMayor` (2n) son de la misma clase, O(n), mientras que `primeraVenta` es O(1).

---

## Minireto 6: Complejidad de `clientesRecurrentes`

### 6.1 Traza con 5 ventas

Clientes del arreglo de prueba: `[C01, C02, C01, C03, C02]` (posiciones 0 a 4).

| i | Cliente i | j que recorre | Coincidencias | Comparaciones | `recurrentes` |
|---|---|---|---|---|---|
| 0 | C01 | 1, 2, 3, 4 | j=2 (C01): no estaba, se agrega | 4 | [C01] |
| 1 | C02 | 2, 3, 4 | j=4 (C02): no estaba, se agrega | 3 | [C01, C02] |
| 2 | C01 | 3, 4 | ninguna | 2 | [C01, C02] |
| 3 | C03 | 4 | ninguna | 1 | [C01, C02] |
| 4 | C02 | (ninguna) | no hay posiciones posteriores | 0 | [C01, C02] |

**Total de comparaciones de cliente: 4 + 3 + 2 + 1 + 0 = 10**

Resultado: `[C01, C02]`. C03 no aparece porque compró una sola vez.

### 6.2 Generalización

Para cada posición i, el ciclo interno compara con las posiciones i+1 hasta n-1, es decir, hace (n - 1 - i) comparaciones. Sumando todas las vueltas:

(n-1) + (n-2) + ... + 1 + 0 = **n(n-1)/2**

| n | Comparaciones |
|---|---|
| 5 | 10 |
| 100 | 4.950 |
| 1.000 | 499.500 |
| 100.000 | 4.999.950.000 |

n(n-1)/2 = n²/2 - n/2. Big O descarta la constante (½) y el término menor (-n/2), así que la función es **O(n²)**: si n se multiplica por 10, las comparaciones se multiplican por ~100.

**Observaciones**
- La cantidad de comparaciones depende solo de n, no de los datos. Con clientes repetidos o todos distintos, el ciclo interno hace las mismas n(n-1)/2 comparaciones.
- `recurrentes.includes(...)` solo se ejecuta cuando hay coincidencia (cortocircuito de `&&`), así que no entra en este conteo. Puede agregar trabajo extra, pero no cambia el orden de crecimiento.
- Esto explica por qué con el historial anual la función "se quedó pensando": con n grande, el trabajo crece al cuadrado.

### 6.3 Tiempos de ejecución (`console.time` / `console.timeEnd`)

| n | Tiempo | Factor vs. fila anterior |
|---|---|---|
| 1.000 | 5,976 ms | n/a |
| 2.000 | 12,8 ms | ×2,1 |
| 4.000 | 50,258 ms | ×3,9 |
| 8.000 | 243,194 ms | ×4,8 |
| 16.000 | 1,163 s | ×4,8 |

**Observación:** al duplicar n, el tiempo no se duplica (como pasaría en O(n)), sino que se multiplica por un valor cercano a 4. De 1.000 a 2.000 solo se duplica, pero de ahí en adelante crece entre ×3,9 y ×4,8: los últimos saltos quedan un poco por encima de 4, entre cuadruplicarse y quintuplicarse.

**Relación con O(n²):** en un algoritmo cuadrático, T(2n) / T(n) = (2n)² / n² = 4. Duplicar la entrada cuadruplica el número de operaciones. Los datos medidos siguen ese patrón, así que el algoritmo es consistente con O(n²), típica de dos ciclos anidados.

**Por qué los factores no son exactamente 4**
- **Primera fila (×2,1):** con n pequeño pesan más el calentamiento del motor, la compilación JIT y el ruido de la medición que el trabajo real.
- **Últimas filas (×4,8):** con arreglos grandes entran en juego la memoria caché y el recolector de basura, que añaden un costo extra a cada duplicación.

Big O describe la tendencia cuando n crece, no una igualdad exacta en cada medición.

**Conclusión:** el tiempo crece de forma cuadrática. Con n = 16.000 ya supera 1 segundo y, con 10 veces más datos, tardaría unas 100 veces más. Por eso este enfoque no escala, y una alternativa con `Map` o `Set` (que baja la detección de duplicados a O(n)) es mucho más eficiente.

### 6.4 Estimación para 100.000 y 1.000.000 de ventas

**Regla:** en una función O(n²), si n se multiplica por k, el tiempo se multiplica por k × k.

**n = 100.000**
- Punto de partida: n = 16.000 tardó 1,163 s.
- 100.000 / 16.000 = 6,25, así que n se multiplica por 6,25.
- El tiempo se multiplica por 6,25 × 6,25 ≈ 39.
- 1,163 s × 39 ≈ **45 s**.

Como la estimación es menor a 2 minutos, se ejecutó. El tiempo medido fue **45,23 s**, casi igual a lo estimado, lo que confirma O(n²).

**n = 1.000.000**
- 1.000.000 / 16.000 = 62,5, así que n se multiplica por 62,5.
- El tiempo se multiplica por 62,5 × 62,5 ≈ 3.900.
- 1,163 s × 3.900 ≈ 4.500 s ≈ **75 minutos**.

Como la estimación supera los 2 minutos, no se ejecutó.

| n | Tiempo | Cómo se obtuvo |
|---|---|---|
| 16.000 | 1,163 s | Medido |
| 100.000 | 45,23 s | Estimado ≈ 45 s y luego medido |
| 1.000.000 | ≈ 75 min | Solo estimado |

**Observación:** al pasar de 100.000 a 1.000.000 de ventas (10 veces más datos), el tiempo se multiplica por 10 × 10 = 100: de menos de 1 minuto a más de 1 hora. Con una función cuadrática, el reporte se vuelve inviable cuando los datos crecen.

### 6.5 Costo oculto de `includes`

`recurrentes.includes` también recorre un arreglo, así que es un ciclo escondido dentro de los dos ciclos de las comparaciones. En el peor caso (muchas coincidencias y un arreglo `recurrentes` muy grande), cada comparación cuesta hasta n pasos extra, y la complejidad sube de O(n²) a **O(n³)**.

En la práctica, `recurrentes` solo guarda clientes distintos y en nuestros datos es pequeño (3 clientes), por lo que `includes` cuesta casi un paso constante y el tiempo medido sigue el patrón de O(n²). Si el negocio tuviera miles de clientes recurrentes distintos, este costo oculto se notaría y el reporte sería aún más lento.

### 6.6 Conclusión para la gerente

Gerente, el reporte de clientes recurrentes se vuelve lento por la forma en que la función busca. Toma la primera venta y la compara con todas las demás para ver si ese cliente aparece en otra venta. Además, revisa si ese cliente ya está en la lista de clientes recurrentes. Luego pasa a la segunda venta y repite todo, y así sucesivamente hasta terminar con todas las ventas.

El problema es que cada venta nueva obliga a la función a compararse con todas las demás, así que el trabajo no crece al mismo ritmo que las ventas, sino mucho más rápido. Si las ventas se duplican, el tiempo se multiplica por cuatro o cinco.

En nuestras pruebas: con 16.000 ventas el reporte tarda 1 segundo, pero con 100.000 ventas (unas 6 veces más) tarda 45 segundos (unas 39 veces más). Con 1.000.000 de ventas tardaría más de una hora.

Por eso el reporte funciona bien con pocas ventas, pero se vuelve inviable cuando el negocio crece. La solución es cambiar la forma de buscar, por ejemplo llevando un registro de los clientes que ya aparecieron, para no comparar cada venta con todas las demás. Así el tiempo crecería al mismo ritmo que las ventas.

---

## Minireto 7: Análisis de recursos (tiempo y espacio)

### 7.1 Recorridos, arreglos creados, tiempo y espacio

#### Traza con 4 ventas

Ventas de ejemplo: V1 (Medellín), V2 (Cali), V3 (Medellín), V4 (Bogotá). Se busca el total de Medellín.

**Versión encadenada (`totalCiudadCadena`)**

| Paso | Qué hace | Elementos que recorre | Arreglo nuevo |
|---|---|---|---|
| 1. `map` (normalizar) | Crea una copia de cada venta con la ciudad normalizada | 4 (V1, V2, V3, V4) | Sí, de 4 elementos |
| 2. `filter` | Deja solo las de Medellín | 4 | Sí, de 2 elementos (V1, V3) |
| 3. `map` (`valorVenta`) | Calcula el valor de cada venta que quedó | 2 | Sí, de 2 elementos |
| 4. `reduce` | Suma los valores | 2 | No (devuelve un número) |

Total: **4 recorridos** y **3 arreglos nuevos**.

**Versión de una pasada (`totalCiudadUnaPasada`)**

| Venta | Qué hace | `total` |
|---|---|---|
| V1 | Normaliza, es de Medellín, suma | valor(V1) |
| V2 | Normaliza, no es de Medellín, no suma | sin cambio |
| V3 | Normaliza, es de Medellín, suma | valor(V1) + valor(V3) |
| V4 | Normaliza, no es de Medellín, no suma | sin cambio |

Total: **1 recorrido** y **0 arreglos nuevos** (solo usa `total`, `ciudadNor` y `ventaNor`).

#### Generalización con n ventas (peor caso: todas son de Medellín)

| | Recorridos | Arreglos nuevos | Pasos aprox. | Tiempo | Espacio extra |
|---|---|---|---|---|---|
| Cadena | 4 | 3 (de tamaño n) | 4n | O(n) | 3n → O(n) |
| Una pasada | 1 | 0 | n | O(n) | O(1) |

**Observaciones**
- La versión encadenada no modifica las ventas originales: el primer `map` crea un objeto nuevo por venta. Esto cuesta algo más de memoria, pero sigue siendo O(n) y evita efectos secundarios.
- En la versión de una pasada, `valorVenta` se calcula solo para las ventas de Medellín (dentro del `if`), lo que evita trabajo innecesario.

**Conclusión:** ambas versiones son O(n) en tiempo: si las ventas se duplican, el tiempo también se duplica (no se cuadruplica, como pasaba con `clientesRecurrentes`). La diferencia está en el espacio: la cadena crea arreglos intermedios que crecen con n, mientras que la de una pasada usa memoria fija. Además, la de una pasada hace menos trabajo por venta, aunque Big O no distingue esa diferencia.

### 7.2 ¿Por qué ambas son O(n) aunque una recorra el arreglo cuatro veces?

**Conteo de pasos (peor caso)**
- Cadena: n + n + n + n = **4n** pasos.
- Una pasada: **n** pasos.

**Regla de simplificación aplicada:** Big O elimina las constantes que multiplican. Describe cómo *crece* el tiempo cuando n crece, no cuántos pasos exactos se hacen. El 4 de 4n es una constante: no depende del tamaño de la entrada, así que se descarta y 4n queda como O(n).

**Por qué tiene sentido:** si las ventas se duplican, la cadena pasa de 4n a 8n pasos (el doble) y la versión de una pasada pasa de n a 2n pasos (también el doble). Ambas crecen al mismo ritmo, de forma lineal. Recorrer el arreglo 4 veces solo hace la curva más empinada desde el inicio, pero no cambia su forma.

| n | Cadena (4n) | Una pasada (n) | Al duplicar n |
|---|---|---|---|
| 1.000 | 4.000 | 1.000 | |
| 2.000 | 8.000 | 2.000 | ×2 en ambas |
| 4.000 | 16.000 | 4.000 | ×2 en ambas |

**Conclusión:** cuatro recorridos es una cantidad fija que no depende de n, por eso Big O la elimina como constante y ambas versiones quedan en O(n) de tiempo. La de una pasada sigue siendo algo más rápida en la práctica, pero Big O no distingue esa diferencia, solo cómo crece el tiempo al aumentar n.

### 7.3 Complejidad espacial de las funciones del motor

**Criterio:** se cuenta solo la memoria extra que crea la función (incluido lo que devuelve), no los datos que ya recibe. Los contadores numéricos, aunque crezcan hasta n, ocupan siempre el mismo espacio.

#### O(1): memoria adicional constante

| Función | Por qué |
|---|---|
| `valorVenta` | Calcula y devuelve un número |
| `totalVendido`, `unidadesVendidas` | Una variable acumuladora |
| `totalVendidoM`, `unidadesVendidasM` | `reduce` con acumulador numérico |
| `ventaMayor`, `ventaMayorM` | Guardan solo la mayor venta vista (una referencia) |
| `ticketPromedio` | Variables sueltas y llamadas a `unidadesVendidas` |
| `ventasPorCiudad` | Un contador; los strings temporales se descartan en cada vuelta |
| `totalCiudadUnaPasada` | Un ciclo con `total`, `ciudadNor` y `ventaNor` |
| `normalizarPalabra` | Strings del largo de una palabra, acotado (O(1) en la práctica) |
| `numeroAlAzar`, `fechaAzar` | Resultado de tamaño fijo (un número o un string de 10 caracteres) |
| `totalVendidoI`, `ventaMayorI`, `primeraVenta` | Variables y un contador de tamaño fijo (`{v, c}`) |

#### O(n): proporcional a los datos

| Función | Por qué |
|---|---|
| `ventasPorCiudadM` | `filter` crea un arreglo de hasta n ventas |
| `ventasDelDia` | `acc` guarda las ventas de esa fecha (hasta n) |
| `totalCiudadCadena` | Tres arreglos intermedios de tamaño n |
| `generarVentas` | Crea un arreglo de n objetos de tamaño fijo |
| `PRODUCTOS`, `CIUDAD`, `CLIENTES` | El `map` intermedio tiene n elementos (sin él serían O(c)) |
| `orquestador`, `tiempos` | O(n), con n el mayor tamaño probado: el arreglo de cada vuelta se descarta al terminar |

#### Proporcional a las claves distintas: O(c) u O(p)

| Función | Espacio | Por qué |
|---|---|---|
| `totalPorCiudad`, `totalPorCiudadI` | O(c) | Un objeto con una clave por ciudad distinta, no por venta |
| `unidadesPorProducto` | O(p) | Un objeto con una clave por producto distinto |
| `topProductosPorvalor` | O(p), no O(k) | Construye el objeto con todos los productos, crea el arreglo de `Object.entries` y ordena todo antes del `slice(0, k)` |
| `clientesRecurrentes` | O(c) | `recurrentes` solo guarda clientes distintos que se repiten |

En el peor caso teórico (todas las claves distintas), c y p llegan a n, así que formalmente estas funciones son O(n). En la práctica, con pocas ciudades, productos y clientes, usan muy poca memoria.

**Los dos casos que pedía el ejercicio**
- **`totalPorCiudad`:** su objeto crece con la cantidad de ciudades distintas, no con la cantidad de ventas. Con 1.000.000 de ventas y 5 ciudades, tiene 5 claves.
- **`topProductosPorValor`:** aunque devuelva solo k elementos, internamente guarda todos los productos distintos. Que el resultado sea pequeño no significa que la memoria usada también lo sea.

**Espacio y tiempo son cosas distintas:** `clientesRecurrentes` usa poca memoria (O(c)), pero es O(n²) en tiempo. `totalCiudadCadena` y `totalCiudadUnaPasada` son ambas O(n) en tiempo y se diferencian en el espacio: O(n) la cadena y O(1) la de una pasada.

### 7.4 Decisión: versión de `totalCiudad` que se queda en el motor

**Versión elegida:** `totalCiudadUnaPasada`.

**Justificación por recursos**

| | Cadena | Una pasada |
|---|---|---|
| Recorridos | 4 | 1 |
| Arreglos nuevos | 3 (de tamaño n) | 0 |
| Tiempo | O(n) | O(n) |
| Espacio | O(n) | O(1) |

Ambas tienen el mismo tiempo en Big O, pero la de una pasada hace menos trabajo por venta y no crea arreglos ni objetos intermedios, así que su memoria no crece con los datos. Con 1.000.000 de ventas, la cadena crearía varios arreglos de ese tamaño, y la de una pasada solo usa tres variables.

**Justificación por legibilidad**

La cadena (`map`, `filter`, `map`, `reduce`) se lee como una receta, pero es más difícil de seguir paso a paso y hay que fijarse en qué arreglo intermedio tiene cada paso. La de una pasada se lee de arriba abajo con un solo ciclo: normaliza, compara y suma. En este caso la más simple en recursos también es la más fácil de seguir, así que no hay que sacrificar una por la otra.

**Decisión:** se deja `totalCiudadUnaPasada` porque tiene menor uso de memoria (O(1) frente a O(n)), hace un solo recorrido y es más fácil de leer.

## Revisión del informe

**Fuente de la revisión:** borrador preparado con ayuda de Claude, pendiente de validar con un compañero de clase.

### Aspectos positivos

- La conclusión para la gerente explica la lentitud con una comparación cotidiana y números concretos (1 s, 45 s, más de 1 hora).
- Cada afirmación de complejidad está respaldada por una medición o por un conteo de operaciones.
- El análisis separa bien el tiempo del espacio (por ejemplo, `clientesRecurrentes` usa poca memoria pero mucho tiempo).

### Observaciones

1. **`totalCiudadCadena` quedó sin proyección.** En el Minireto 8 la fila aparece como "pendiente", y la medición de 10,9 s con 10.000 ventas no es coherente con una función O(n).
2. **El tiempo de `ventaMayor` parece demasiado bajo.** 0,0045 ms con 10.000 ventas es mucho menos que `totalVendido`, que hace un trabajo parecido, y la proyección se apoya en ese dato.
3. **La proyección mezcla dos tamaños de medición.** Los reportes lineales se midieron con 10.000 ventas y `clientesRecurrentes` con 16.000 y 100.000, y el lector puede no entender por qué.
4. **Posible inconsistencia en el Minireto 2.** La traza de `ticketPromedio` divide entre las ventas válidas (985.000 ÷ 11), pero la versión del código que se usó después divide entre las unidades vendidas. Conviene confirmar que la bitácora describe el código actual.

### Respuestas a las observaciones

**Observación 1: aceptada.** Se trata de un error de código: en el primer `map` se escribió `...ventas` en lugar de `...venta`, así que cada venta copiaba el arreglo completo y la función se volvía O(n²). Se debe corregir, medir de nuevo y completar la fila del Minireto 8. Mientras tanto, la fila queda marcada como pendiente y no se proyecta con un dato inválido.

**Observación 2: aceptada.** Se dejó una nota de cautela en las observaciones del Minireto 8. Para confirmarlo se repetirá la medición con más corridas y con 100.000 ventas, y si el tiempo sigue siendo muy bajo se documentará como posible optimización del motor.

**Observación 3: aceptada, sin cambios en los datos.** El Minireto 8.3 ya aclara que `clientesRecurrentes` usa las mediciones del Minireto 6. No se repitieron con 10.000 ventas porque ya existían tres tamaños medidos (16.000, 100.000 y los anteriores) y con ellos se verificó la proyección desde dos bases distintas.

**Observación 4: pendiente de verificar.** Se revisará el código actual de `ticketPromedio` contra la traza del Minireto 2. Si no coinciden, se corregirá la que esté desactualizada.

## Minireto 9 (Semana 2): Optimización de `clientesRecurrentes` con `Set` y `Map`

### 9.1 Objetivo

Aplicar el plan de optimización: reemplazar la comparación de cada venta con todas las siguientes por un **registro de los clientes que ya aparecieron**, para recorrer las ventas una sola vez. Se implementan dos versiones y se comparan con la original.

### 9.2 Versiones implementadas

**Con `Set`:** guarda los clientes vistos y los recurrentes. Si un cliente ya estaba en vistos, es recurrente.

```javascript
function clientesRecurrentesSet(ventas) {
    const clientesVistos = new Set();
    const clientesRecurrentes = new Set();
    for (const venta of ventas) {
        if (clientesVistos.has(venta.cliente)) clientesRecurrentes.add(venta.cliente);
        else clientesVistos.add(venta.cliente);
    }
    const recurrentes = [];
    for (const cliente of clientesRecurrentes) {
        recurrentes.push(cliente);
    }
    return recurrentes;
}
```

**Con `Map`:** guarda cuántas compras hizo cada cliente. Los recurrentes son los que tienen más de una compra.

```javascript
function comprasPorClientes(ventas) {
    const comprasCliente = new Map();
    for (const venta of ventas) {
        comprasCliente.set(venta.cliente, (comprasCliente.get(venta.cliente) || 0) + 1);
    }
    const recurrentes = [];
    for (const [cliente, cantidad] of comprasCliente) {
        if (cantidad > 1) recurrentes.push(cliente);
    }
    return recurrentes;
}
```

| Versión | Tiempo | Espacio | Por qué |
| --- | --- | --- | --- |
| Original (`clientesRecurrentes`) | O(n²) | O(c) | Dos ciclos anidados: cada venta se compara con las siguientes |
| `clientesRecurrentesSet` | O(n) | O(c) | Un recorrido, y `has` y `add` cuestan O(1) en promedio |
| `comprasPorClientes` | O(n) | O(c) | Un recorrido, y `get` y `set` cuestan O(1) en promedio |

Tanto `Set` como `Map` funcionan con tablas hash, por eso preguntar si un cliente ya existe no obliga a recorrer nada. El espacio sigue siendo O(c), con c los clientes distintos, pero ahora se guardan todos los clientes y no solo los recurrentes.

### 9.3 Mediciones

Se midió con `console.time` y `console.timeEnd`, una corrida por tamaño. La original solo se corrió hasta 100.000, que ya tarda unos 46 segundos.

| n | Original | `Set` | `Map` |
| ---: | ---: | ---: | ---: |
| 1.000 | 6,13 ms | 0,473 ms | 0,487 ms |
| 10.000 | 368,175 ms | 7,06 ms | 5,302 ms |
| 100.000 | 45,939 s | 57,179 ms | 57,794 ms |

**Cuánto crece el tiempo al multiplicar n por 10:**

| Versión | De 1.000 a 10.000 | De 10.000 a 100.000 | Esperado |
| --- | ---: | ---: | --- |
| Original | × 60 | × 125 | × 100 (O(n²)) |
| `Set` | × 15 | × 8 | × 10 (O(n)) |
| `Map` | × 11 | × 11 | × 10 (O(n)) |

**Cuántas veces más rápida es cada versión que la original:**

| n | `Set` | `Map` |
| ---: | ---: | ---: |
| 1.000 | ≈ 13 veces | ≈ 13 veces |
| 10.000 | ≈ 52 veces | ≈ 69 veces |
| 100.000 | ≈ 803 veces | ≈ 795 veces |

### 9.4 Análisis

- **La original crece al cuadrado.** Al multiplicar n por 10, el tiempo se multiplica por un valor cercano a 100, igual que en el Minireto 6.
- **`Set` y `Map` crecen en línea recta.** Al multiplicar n por 10, el tiempo se multiplica por un valor cercano a 10.
- **La ventaja crece con n.** Con 1.000 ventas la mejora es de 13 veces, y con 100.000 pasa de 800 veces: la original tarda casi 46 segundos y las otras dos menos de 60 milisegundos.
- **`Set` y `Map` empatan.** Las diferencias entre ellos (por ejemplo 7,06 y 5,302 ms con 10.000 ventas) están dentro del ruido de la medición, y con 100.000 dan prácticamente lo mismo.
- **Proyección con 1.000.000 de ventas** (n × 10 en las lineales, n × 10 al cuadrado en la original, desde 100.000):

| Versión | Estimado con 1.000.000 |
| --- | ---: |
| Original | ≈ 4.594 s ≈ 77 min |
| `Set` | ≈ 0,57 s |
| `Map` | ≈ 0,58 s |

### 9.5 Intercambio entre tiempo y memoria

La solución nueva **gasta algo más de memoria para ahorrar muchísimo tiempo**.

| Versión | Qué guarda en memoria | Memoria | Tiempo |
| --- | --- | --- | --- |
| Original | Solo los clientes recurrentes | O(c) | O(n²) |
| `Set` | Los clientes vistos y los recurrentes (2 conjuntos) | O(c) | O(n) |
| `Map` | Cada cliente con su cantidad de compras (1 mapa) | O(c) | O(n) |

c es la cantidad de clientes distintos.

**Qué se gana.** La original compara cada venta con las siguientes, lo que da unas 5 × 10¹¹ comparaciones con 1.000.000 de ventas. Las versiones nuevas hacen un solo recorrido, del orden de 1.000.000 de pasos, unas 500.000 veces menos trabajo.

**Qué se paga.** La original solo guardaba a los clientes recurrentes. Las nuevas guardan un registro de **todos** los clientes distintos, incluidos los que compraron una sola vez, para no tener que buscarlos de nuevo. En Big O el espacio sigue siendo O(c), pero la constante es mayor. En el peor caso, si cada venta fuera de un cliente distinto, el registro tendría n entradas, y el espacio sería O(n).

**Por qué conviene.** El tiempo baja de cuadrático a lineal, mientras que la memoria crece como mucho en proporción a los datos y nunca más rápido que ellos. Es un buen intercambio porque lo que hacía inviable el reporte era el tiempo, no la memoria.

**Cuándo no valdría la pena.** Con muy pocas ventas la original es suficiente, porque el tiempo es despreciable y no se necesita el registro adicional. Tampoco convendría si la memoria disponible fuera muy limitada y hubiera muchísimos clientes distintos.

**Diferencia entre las dos versiones.** `Set` usa dos conjuntos y `Map` uno solo, que guarda además cuántas compras hizo cada cliente. En Big O es lo mismo (O(c)), y a cambio `Map` aporta más información.

### 9.6 Limitaciones de la medición

- **El tiempo incluye `generarVentas`.** Cada medición genera las ventas dentro del cronómetro. En la original eso casi no se nota, porque el tiempo lo domina el algoritmo cuadrático. En `Set` y `Map` sí pesa, y es probable que gran parte de esos 57 ms sea generar las ventas. Por eso la mejora real es mayor que la de la tabla, y los tiempos de `Set` y `Map` son una cota superior.
- **Una sola corrida por tamaño.** Con tiempos tan pequeños (0,4 ms) el calentamiento del motor y el ruido pesan, y por eso el factor de 1.000 a 10.000 en `Set` (× 15) sale mayor que 10.
- **Las proyecciones son estimaciones** a partir del patrón de crecimiento, no mediciones con 1.000.000 de ventas.

### 9.7 Conclusión

Guardar los clientes que ya aparecieron evita volver a buscarlos en cada comparación, y baja `clientesRecurrentes` de O(n²) a O(n). Con 100.000 ventas, el reporte pasa de casi 46 segundos a menos de 60 milisegundos, y con 1.000.000 pasaría de más de una hora a menos de un segundo. `Set` y `Map` rinden igual, así que la elección depende de lo que se necesite: `Map` además guarda cuántas compras hizo cada cliente.