# RENDIMIENTO: complejidad del motor de ventas

**Convenciones:** n = número de ventas (aquí n = 10.000). c = ciudades distintas, p = productos distintos. El espacio cuenta solo la memoria extra que crea la función (incluido lo que devuelve), no los datos que recibe. Las "operaciones" son un conteo analítico para n = 10.000, no un tiempo medido.

## Funciones de cálculo

| Función | Qué hace | Tiempo | Espacio | Justificación | Operaciones con n = 10.000 |
| --- | --- | --- | --- | --- | --- |
| `valorVenta` | Multiplica cantidad por precio de una venta | O(1) | O(1) | Una multiplicación, sin ciclos | 1 por llamada |
| `totalVendido` | Suma el valor de todas las ventas | O(n) | O(1) | Un ciclo y un acumulador numérico | 10.000 iteraciones |
| `unidadesVendidas` | Suma las unidades de todas las ventas | O(n) | O(1) | Un ciclo y un acumulador numérico | 10.000 iteraciones |
| `totalVendidoM` | Igual que `totalVendido`, con `reduce` | O(n) | O(1) | `reduce` con acumulador numérico | 10.000 iteraciones |
| `unidadesVendidasM` | Igual que `unidadesVendidas`, con `reduce` | O(n) | O(1) | `reduce` con acumulador numérico | 10.000 iteraciones |
| `ventaMayor` | Devuelve el valor de la venta más grande | O(n) | O(1) | Un ciclo; solo guarda la mayor vista | 10.000 comparaciones |
| `ventaMayorM` | Devuelve la venta más grande con `reduce` | O(n) | O(1) | `acc` guarda una referencia a una sola venta | 10.000 comparaciones |
| `ticketPromedio` | Valor total entre unidades vendidas | O(n) | O(1) | Un ciclo propio más dos llamadas a `unidadesVendidas`: 3n pasos, y la constante 3 se elimina | 30.000 iteraciones |
| `normalizarPalabra` | Quita tildes y espacios y deja formato "Palabra" | O(L) ≈ O(1) | O(L) ≈ O(1) | Depende del largo de la palabra, que es pequeño y acotado | 1 por llamada |
| `ventasPorCiudad` | Suma el valor de las ventas de una ciudad | O(n) | O(1) | Un ciclo; los strings temporales se descartan en cada vuelta | 10.000 iteraciones |
| `ventasPorCiudadM` | Igual, con `filter` y `reduce` | O(n) | O(n) | `filter` crea un arreglo de hasta n ventas | 10.000 (filter) + hasta 10.000 (reduce) |
| `totalCiudadCadena` | Total de una ciudad con `map`, `filter`, `map` y `reduce` | O(n) | O(n) | 4 recorridos (4n pasos, se elimina la constante) y 3 arreglos nuevos de tamaño n | hasta 40.000 pasos (peor caso) |
| `totalCiudadUnaPasada` | Total de una ciudad con un solo ciclo (**versión elegida**) | O(n) | O(1) | 1 recorrido, 0 arreglos nuevos, solo `total`, `ciudadNor` y `ventaNor` | 10.000 iteraciones |
| `totalPorCiudad` | Objeto con el total vendido por cada ciudad | O(n) | O(c) | Un recorrido; el objeto tiene una clave por ciudad distinta, no por venta | 10.000 iteraciones |
| `unidadesPorProducto` | Objeto con las unidades por producto | O(n) | O(p) | Un recorrido; una clave por producto distinto | 10.000 iteraciones |
| `topProductosPorvalor` | Los k productos con mayor valor vendido | O(n + p log p) | O(p) | Agrupa en un objeto con todos los productos, crea `Object.entries` y ordena todo antes del `slice(0, k)`. El espacio es O(p) y no O(k) | 10.000 iteraciones + ordenar p productos |
| `ventasDelDia` | Ventas de una fecha | O(n) | O(n) | `acc` guarda hasta n ventas | 10.000 iteraciones |
| `clientesRecurrentes` | Clientes que aparecen en más de una venta | **O(n²)** (hasta O(n³) en el peor caso teórico) | O(c), O(n) en el peor caso | Dos ciclos anidados comparan cada venta con las siguientes; `includes` es un recorrido oculto sobre `recurrentes`, que solo guarda clientes distintos | n(n-1)/2 = **49.995.000 comparaciones**; tiempo estimado ≈ 0,45 s (regla de tres desde 16.000 → 1,163 s, **no medido**) |

## Funciones de generación y medición

| Función | Qué hace | Tiempo | Espacio | Justificación | Operaciones con n = 10.000 |
| --- | --- | --- | --- | --- | --- |
| `numeroAlAzar` | Número entero al azar en un rango | O(1) | O(1) | Una operación aritmética | 1 por llamada |
| `fechaAzar` | Fecha al azar con formato `AAAA-MM-DD` | O(1) | O(1) | Tres números al azar y un string de 10 caracteres | 3 números al azar por llamada |
| `generarVentas` | Crea un arreglo de n ventas aleatorias | O(n) | O(n) | Un ciclo de n vueltas con trabajo constante; guarda n objetos de tamaño fijo | 10.000 objetos creados |
| `totalVendidoI` | `totalVendido` con contadores | O(n) | O(1) | El contador `{v, c}` siempre ocupa lo mismo, aunque su valor crezca | v = 10.000 |
| `ventaMayorI` | `ventaMayor` con contadores | O(n) | O(1) | Igual: una referencia y un contador de tamaño fijo | v = 10.000, c = 10.000 |
| `totalPorCiudadI` | `totalPorCiudad` con contadores | O(n) | O(c) | El objeto acumulador tiene una clave por ciudad distinta | v = 10.000, c = 10.000 |
| `primeraVenta` | Devuelve la primera venta | O(1) | O(1) | Lee una sola posición | v = 1 |
| `orquestador` | Corre las versiones con contadores para varios tamaños | O(suma de los tamaños) | O(n), con n el mayor tamaño | En cada vuelta crea un arreglo de n ventas que se descarta al terminar | genera 10.000 ventas y corre 4 funciones sobre ellas |
| `tiempos` | Mide `clientesRecurrentes` con `console.time` para varios tamaños | O(n²) por tamaño | O(n), con n el mayor tamaño | `generarVentas` crea un arreglo por vuelta; el tiempo lo domina `clientesRecurrentes` | 49.995.000 comparaciones para n = 10.000 |

## Tiempos medidos de `clientesRecurrentes`

| n | Tiempo | Factor al duplicar n |
| --- | --- | --- |
| 1.000 | 5,976 ms | n/a |
| 2.000 | 12,8 ms | ×2,1 |
| 4.000 | 50,258 ms | ×3,9 |
| 8.000 | 243,194 ms | ×4,8 |
| 16.000 | 1,163 s | ×4,8 |
| 100.000 | 45,23 s | n/a |

Al duplicar n el tiempo se multiplica por casi 4, lo que es consistente con O(n²). La regla de estimación es: si n se multiplica por k, el tiempo se multiplica por k². Desde 16.000 hasta 1.000.000 de ventas la estimación es de más de 1 hora.

---
 
## Minireto 8: Proyección con 1.000.000 de ventas

### 8.1 Método

Para estimar cuánto tardaría cada reporte con 1.000.000 de ventas, se parte de un tiempo medido y se aplica la regla según la complejidad:

- **Si el reporte es O(n):** si n se multiplica por k, el tiempo se multiplica por k.
- **Si el reporte es O(n²):** si n se multiplica por k, el tiempo se multiplica por k × k.

Los tiempos de los reportes lineales se midieron con **10.000 ventas**, con `console.time` y `console.timeEnd`. Cada función se corrió 3 veces y se usó el promedio de las corridas 2 y 3, porque la primera sale más lenta por el calentamiento del motor. De 10.000 a 1.000.000 de ventas, n se multiplica por 100.

### 8.2 Reportes lineales (O(n))

| Reporte                | Medido con 10.000 ventas | Cálculo      | Estimado con 1.000.000 |
| ---------------------- | -----------------------: | ------------ | ---------------------: |
| `totalVendido`         |                  0,26 ms | 0,26 × 100   |                ≈ 26 ms |
| `unidadesVendidas`     |                  0,26 ms | 0,26 × 100   |                ≈ 26 ms |
| `ventaMayor`           |                0,0045 ms | 0,0045 × 100 |              ≈ 0,45 ms |
| `ventaMayorM`          |                  0,18 ms | 0,18 × 100   |                ≈ 18 ms |
| `ticketPromedio`       |                  0,27 ms | 0,27 × 100   |                ≈ 27 ms |
| `ventasDelDia`         |                  0,23 ms | 0,23 × 100   |                ≈ 23 ms |
| `ventasPorCiudad`      |                  2,65 ms | 2,65 × 100   |               ≈ 265 ms |
| `totalCiudadUnaPasada` |                  2,72 ms | 2,72 × 100   |               ≈ 272 ms |
| `ventasPorCiudadM`     |                  4,57 ms | 4,57 × 100   |               ≈ 457 ms |
| `totalPorCiudadI`      |                   7,8 ms | 7,8 × 100    |               ≈ 780 ms |
| `topProductosPorvalor` |                  7,94 ms | 7,94 × 100   |               ≈ 794 ms |
| `totalCiudadCadena`    |                pendiente | pendiente    |              pendiente |

#### Observaciones

- Todos los reportes lineales se estiman en **menos de 1 segundo** con 1.000.000 de ventas.
- Las funciones que llaman a `normalizarPalabra` son unas 10 veces más lentas que las que solo suman, porque normalizar un texto cuesta más que una multiplicación. Siguen siendo O(n): solo cambia la constante.
- `ventaMayor` salió más rápida de lo esperado. Puede ser una optimización del motor, así que el dato se toma con cautela.
- `totalCiudadCadena` tardó 10,9 s con 10.000 ventas por un error de código (`...ventas` en vez de `...venta`), que la volvía cuadrática. Se corrige y se mide de nuevo antes de proyectarla.

### 8.3 Reporte cuadrático: `clientesRecurrentes` (O(n²))

Para esta función se usan las mediciones del Minireto 6, no las de 10.000 ventas:

|         n | Tiempo                |  Origen  |
| --------: | --------------------- | :------: |
|    16.000 | 1,163 s               |  Medido  |
|   100.000 | 45,23 s               |  Medido  |
| 1.000.000 | ≈ 4.523 s ≈ 75 min    | Estimado |

**Cálculo desde 100.000:**

1. 1.000.000 / 100.000 = 10, así que n se multiplica por 10.
2. El tiempo se multiplica por 10 × 10 = 100.
3. 45,23 s × 100 = 4.523 s ≈ **75 minutos**.

**Verificación desde 16.000:** 1.000.000 / 16.000 = 62,5, y 62,5² ≈ 3.906. Entonces 1,163 s × 3.906 ≈ 4.543 s ≈ 76 minutos. Las dos bases coinciden.

### 8.4 Resumen

| Reporte               | Con 1.000.000 de ventas |
| --------------------- | ----------------------- |
| Reportes lineales     | menos de 1 segundo      |
| `clientesRecurrentes` | ≈ 75 minutos            |

### Conclusión

Con 1.000.000 de ventas, los reportes lineales siguen siendo rápidos porque su tiempo crece en línea recta con los datos. `clientesRecurrentes` pasa de 45 segundos (con 100.000 ventas) a más de una hora, porque su tiempo crece al cuadrado: 10 veces más datos significan 100 veces más tiempo. Es el reporte que hay que rediseñar antes de que el negocio llegue a ese volumen, por ejemplo contando los clientes en un solo recorrido con un `Map`, lo que lo bajaría a O(n).

### Limitaciones

- Es una estimación a partir del patrón de crecimiento, no una medición con 1.000.000 de ventas. El tiempo real depende del equipo y de factores como la memoria caché y el recolector de basura.
- Los tiempos con 10.000 ventas son muy pequeños y tienen margen de error (por ejemplo, `totalPorCiudadI` varió entre 6,3 y 9,3 ms entre corridas), y ese error también se multiplica por 100 al proyectar.

## Riesgos

### Criterio

Las funciones se ordenan de mayor a menor riesgo cuando los datos crecen, según tres preguntas en este orden de importancia:

1. **¿Cómo crece el tiempo al crecer n?** Es lo que más pesa, porque un tiempo cuadrático se vuelve inviable muy rápido. El orden es: O(n²) es peor que O(n log n), que es peor que O(n), que es peor que O(1).
2. **¿Cómo crece la memoria?** Entre dos funciones con el mismo tiempo, es más riesgosa la que crea arreglos proporcionales a n. Después viene la que guarda una clave por valor distinto (O(c) u O(p)), y la menos riesgosa es la de O(1).
3. **¿Hay costos ocultos o dependencia de los datos?** Un `includes` o un `some` dentro de un ciclo, o un `sort` sobre claves distintas, puede empeorar el peor caso aunque en los datos actuales casi no se note.

Para ver la diferencia: con 1.000.000 de ventas, una función lineal hace del orden de 1.000.000 de operaciones, y `clientesRecurrentes` hace unas 500.000.000.000, es decir, unas 500.000 veces más.

### Orden de riesgo

| Nivel | Función | Tiempo | Espacio | Por qué |
| --- | --- | --- | --- | --- |
| **1. Crítico** | `clientesRecurrentes` | O(n²) (hasta O(n³) en el peor caso por `includes`) | O(c) | Dos ciclos anidados. Con 1.000.000 de ventas se estiman ≈ 75 min. Es el único que no escala. |
| **2. Alto (según los datos)** | `PRODUCTOS`, `CIUDAD`, `CLIENTES` | O(n²) en el peor caso | O(n) | `some` recorre el arreglo de distintos en cada vuelta, y el `map` intermedio crea n elementos. Con pocos valores distintos casi no se nota, pero con muchos clientes distintos se volvería cuadrático. |
| **2. Alto (según los datos)** | `topProductosPorvalor` | O(n + p log p) | O(p) | Ordena todos los productos antes del `slice`. Con pocos productos es casi lineal, pero si p crece hacia n pasa a O(n log n) y O(n). |
| **3. Medio** | `totalCiudadCadena` | O(n) | O(n) | 4 recorridos y 3 arreglos nuevos de tamaño n, más un objeto nuevo por venta. Es la lineal que más memoria gasta. |
| **3. Medio** | `ventasPorCiudadM`, `ventasDelDia` | O(n) | O(n) | `filter` y `acc` pueden guardar hasta n ventas. |
| **3. Medio** | `generarVentas`, `orquestador`, `tiempos` | O(n) | O(n) | Crean un arreglo de n objetos (el mayor tamaño probado). |
| **4. Bajo** | `totalPorCiudad`, `totalPorCiudadI`, `unidadesPorProducto` | O(n) | O(c) u O(p) | La memoria depende de las ciudades o productos distintos, no de las ventas. |
| **5. Muy bajo** | `totalVendido`, `unidadesVendidas`, `totalVendidoM`, `unidadesVendidasM`, `ventaMayor`, `ventaMayorM`, `ticketPromedio`, `ventasPorCiudad`, `totalCiudadUnaPasada`, `totalVendidoI`, `ventaMayorI` | O(n) | O(1) | Un solo recorrido y memoria fija. Crecen en línea recta con los datos. |
| **6. Sin riesgo** | `valorVenta`, `normalizarPalabra`, `numeroAlAzar`, `fechaAzar`, `primeraVenta` | O(1) | O(1) | No dependen de n. |

### Observaciones

- **El nivel 1 es el único que hay que rediseñar ya.** Una alternativa es contar los clientes en un solo recorrido con un `Map` o un `Set`, lo que lo baja a O(n).
- **El nivel 2 depende de los datos, no de n.** Hoy el riesgo es bajo porque hay pocos clientes, ciudades y productos distintos, pero crece si el negocio suma muchos valores distintos.
- **Dentro de un mismo nivel, la diferencia se ve en la memoria.** Por eso `totalCiudadCadena` (nivel 3) es más riesgosa que `totalCiudadUnaPasada` (nivel 5), aunque las dos son O(n) en tiempo. Esa fue la razón para quedarse con la de una pasada.
- **`ticketPromedio` recorre el arreglo 3 veces (3n),** pero Big O elimina la constante, así que queda en O(n) y en el nivel 5.

## Plan de optimización

### Función de mayor riesgo

`clientesRecurrentes` es la función de mayor riesgo (nivel 1): es O(n²) en tiempo y, con 1.000.000 de ventas, se estima en ≈ 75 minutos. Todas las demás funciones se mantienen lineales.

### ¿Qué trabajo se repite?

- **Cada cliente se busca una y otra vez.** Cada venta se compara con todas las que vienen después, así que la función no recuerda lo que ya vio. Si C01 tiene 5 ventas, se vuelve a buscar a C01 entre las ventas siguientes desde cada una de ellas.
- **La mayoría de las comparaciones no sirven.** Se hacen n(n-1)/2 comparaciones (casi 5 × 10¹¹ con 1.000.000 de ventas), pero lo que se quiere saber es solo si un cliente apareció antes, y casi todas las comparaciones son entre clientes distintos.
- **`includes` vuelve a leer la lista de recurrentes.** Cada vez que dos ventas son del mismo cliente, `includes` recorre `recurrentes` para ver si ya se anotó. Un cliente con muchas ventas dispara esa revisión muchas veces para anotarse una sola vez.

### ¿Qué información se podría guardar para no buscarla de nuevo?

Un registro de **los clientes que ya aparecieron**, para saber en un solo paso si un cliente ya se vio antes. Dos opciones:

| Opción | Qué guarda | Cuándo un cliente es recurrente |
| --- | --- | --- |
| `Set` de vistos y `Set` de recurrentes | Qué clientes ya aparecieron, y cuáles se repitieron | Cuando aparece y ya estaba en vistos |
| `Map` de cliente a cantidad de compras | Cuántas veces aparece cada cliente | Cuando su cantidad es 2 o más |

Tanto `Set` como `Map` funcionan con tablas hash, así que preguntar si un cliente ya existe cuesta en promedio **O(1)**, sin recorrer nada.

### Idea del nuevo recorrido

1. Crear el registro vacío de clientes vistos.
2. Recorrer las ventas **una sola vez**.
3. Para cada venta, preguntar si su cliente ya está en el registro:
   - **Si ya estaba**, es un cliente recurrente.
   - **Si no estaba**, anotarlo.
4. Devolver los clientes recurrentes.

### Cambio esperado

| | Versión actual | Versión propuesta |
| --- | --- | --- |
| Recorridos de ventas | n(n-1)/2 comparaciones | 1 recorrido |
| Tiempo | O(n²) | O(n) |
| Espacio | O(c) | O(c) |
| Con 1.000.000 de ventas | ≈ 75 min (estimado) | del orden de los reportes lineales, a confirmar midiendo |

El espacio sigue siendo O(c), con c los clientes distintos, pero ahora se guardan **todos** los clientes distintos y no solo los recurrentes. Es un poco más de memoria a cambio de pasar de tiempo cuadrático a lineal.

### Qué cuidar al implementarla

- **El orden del resultado puede cambiar.** La versión actual anota a un cliente según su primera venta que tiene una repetición. La nueva lo anota en su segunda aparición. Son los mismos clientes, pero en otro orden, así que para comparar hay que ordenar ambos resultados.
- **Verificar que da lo mismo.** Comparar las dos versiones con las mismas 10.000 ventas, como se hizo con `totalCiudad`.
- **Medir si la mejora es real.** Repetir las mediciones con n = 1.000 a 16.000 y 100.000. Si la función es lineal, al duplicar n el tiempo debería duplicarse (y no cuadruplicarse), y con 100.000 debería quedar muy por debajo de los 45,23 s actuales.

### Estado

Pendiente de implementar. Este plan solo describe la idea.