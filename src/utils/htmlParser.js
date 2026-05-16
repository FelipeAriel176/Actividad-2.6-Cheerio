import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';

const htmlPath = path.join(process.cwd(), 'public', 'catalogo.html');

export const parsearLibros = () => {
  try {
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
    
    //HTML vacío
    if (!htmlContent || htmlContent.trim() === '') {
      throw new Error('El archivo HTML del catálogo está vacío.');
    }
    // 2. Cargar el HTML en Cheerio
    const $ = cheerio.load(htmlContent);

    const contenedoresLibros = $('#catalogo .libro');
    if (contenedoresLibros.length === 0) {
      throw new Error('El selector principal no encontró ningún libro en el documento HTML.');
    }

    const libros = [];

      $('#catalogo .libro').each((index, element) => {
      const el = $(element);

      // Extraer IDs y Categorías desde los atributos data-* del HTML
      const id = parseInt(el.attr('data-id'), 10);
      const categoria = el.attr('data-categoria');
      const titulo = el.find('.titulo').text().trim();
      const autor = el.find('.autor').text().trim();
      
      // Limpiar prefijos de texto ("ISBN:", "Año:", etc.) con replace
      const isbn = el.find('.isbn').text().replace('ISBN:', '').trim();
      const anio = parseInt(el.find('.anio').text().replace('Año:', '').trim(), 10);
      const editorial = el.find('.editorial').text().replace('Editorial:', '').trim();
      const estado = el.find('.estado').text().trim().toLowerCase();
      const ubicacion = el.find('.ubicacion').text().trim();

      libros.push({
        id,
        categoria,
        titulo,
        autor,
        isbn,
        anio,
        editorial,
        estado,
        ubicacion
      });
    });

    return libros;
  } catch (error) {
    throw new Error('Error al intentar leer o procesar el archivo HTML del catálogo.');
  }
};