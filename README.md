-- OBJETIVO --

El objetivo principal es desarrollar un servicio backend mínimo pero funcional en Node.js + Express. 

Dado que la institución no dispone de una API ni de una base de datos accesible  la misión de este servicio es:  
1) Leer de forma local el archivo catalogo.html desde el servidor. 
2) Procesar y parsear el árbol HTML en el servidor utilizando la librería Cheerio.  
3) Extraer y estructurar la información en un conjunto de datos limpio de libre consumo. 
4) Exponer dichos datos estructurados en formato JSON a través de al menos 3 endpoints REST     funcionales, aplicando validaciones básicas y un manejo de errores controlado.

-- INSTALACIÓN --

Instalar dependencias: npm install

-- EJECUCIÓN -- 

A. Modo Desarrollo (Command Prompt): npm run dev

B. Modo Normal (Terminal): npm start

-- ENDPOINTS Y REQUEST/RESPONSE --

1. Obtener todo el catálogo
Ruta: GET http://localhost:3000/api/libros

Descripción: Lee el archivo HTML, procesa el DOM con Cheerio y retorna el listado completo con los 8 libros del sistema legacy.

Código de respuesta: 200 OK

Respuesta:

{
  "exito": true,
  "total": 8,
  "datos": [
    {
      "id": 1,
      "categoria": "programacion",
      "titulo": "Introducción a los Algoritmos",
      "autor": "Thomas H. Cormen",
      "isbn": "978-0-262-03384-8",
      "anio": 2022,
      "editorial": "MIT Press",
      "estado": "disponible",
      "ubicacion": "Estante A-12"
    }
  ]
}

-------------------------------------------------------------------

2. Obtener libros disponibles
Ruta: GET http://localhost:3000/api/libros/disponibles

Descripción: Filtra el catálogo completo en el servidor y devuelve únicamente los libros cuyo campo "estado" sea "disponible".

Código de respuesta: 200 OK

Respuesta: 

{
    "exito": true,
    "total": 5,
    "datos": [
    {
            "id": 5,
            "categoria": "programacion",
            "titulo": "JavaScript: The Good Parts",
            "autor": "Douglas Crockford",
            "isbn": "978-0-596-51774-8",
            "anio": 2008,
            "editorial": "O'Reilly Media",
            "estado": "disponible",
            "ubicacion": "Estante A-20"
        }
    ]
}

-------------------------------------------------------------------

3. Filtrar por categoría dinámica
Ruta: GET http://localhost:3000/api/libros/categoria/redes

Descripción: Retorna los libros correspondientes a la categoría ingresada por parámetro en la URL. El controlador normaliza el texto a minúsculas para asegurar la coincidencia.

Código de respuesta: 200 OK

Respuesta: 

{
  "exito": true,
  "categoria": "redes",
  "total": 2,
  "datos": [
    {
      "id": 5,
      "categoria": "redes",
      "titulo": "Redes de Computadoras",
      "autor": "Andrew S. Tanenbaum",
      "isbn": "978-0-13-212695-3",
      "anio": 2011,
      "editorial": "Prentice Hall",
      "estado": "disponible",
      "ubicacion": "Estante C-10"
    }
  ]
}

-------------------------------------------------------------------

-- EXPLICACIÓN DE SELECTORES Y DATOS EXTRAÍDOS --

La extracción de datos se realiza en el archivo htmlParser.js mediante el uso de la librería Cheerio para recorrer el árbol DOM del archivo local catalogo.html.

1. Mapeo y Selectores CSS:
-------------------------------------------------------------------
('#catalogo .libro'): Selector combinado que busca el elemento contenedor con el ID catalogo y selecciona todas las etiquetas hijas que posean la clase .libro. Esto permite iterar con un ciclo .each() de forma exacta sobre los 8 libros del documento.
-------------------------------------------------------------------
el.attr('data-id') y el.attr('data-categoria'): Extraen directamente los metadatos estructurales definidos como atributos personalizados en las etiquetas HTML.
-------------------------------------------------------------------
el.find('.titulo').text().trim() y el.find('.autor'): Selectores de clase internos que localizan los textos de los elementos de cada libro, limpiando los espacios en blanco laterales con .trim().
-------------------------------------------------------------------
2. Limpieza de datos:
Para asegurar que la API devuelva información atómica y limpia se utilizó el método .replace() para remover los prefijos de texto estático heredados del sistema legacy:

Se elimina el prefijo "ISBN:".

Se elimina el prefijo "Año:" y la cadena limpia se parsea a tipo numérico con parseInt(..., 10).

Se elimina el prefijo "Editorial:".

Se limpia el texto y se normaliza a minúsculas (.toLowerCase()) quedando estandarizado como "disponible" o "prestado" para facilitar los filtros posteriores.
-------------------------------------------------------------------
3. Validaciones y Manejo de Errores

El controlador libroController.js gestiona activamente el flujo de las peticiones para responder con los códigos de estado HTTP correctos según el estándar REST:

Error 400 (Bad Request): Se gatilla si el usuario intenta consultar el endpoint de categorías dejando el parámetro vacío en la URL.

Error 404 (Not Found): Si la sintaxis de la URL es válida pero la categoría consultada no existe en el catálogo estático (por ejemplo, al probar /api/libros/categoria/musica), la API responde de forma controlada indicando que no hay coincidencias en lugar de romperse.

Error 500 (Internal Server Error): Toda la lógica de las capas está envuelta en bloques try/catch. Si el archivo HTML se borra o se corrompe, el servidor no se cae, sino que captura la excepción y responde con un código 500 y un mensaje comprensible.