import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';

const htmlPath = path.join(process.cwd(), 'public', 'catalogo.html');

export const parsearCatalogo = () => {
  try {
    const html = fs.readFileSync(htmlPath, 'utf-8');
    const $ = cheerio.load(html);
    const libros = [];

    $('.libro').each((index, elemento) => {
      const el = $(elemento);

      libros.push({
        id: index + 1,
        categoria: el.closest('[data-categoria]').attr('data-categoria') || "general",
        titulo: el.find('.titulo').text().trim(),
        autor: el.find('.autor').text().trim(),
        isbn: el.find('.isbn').text().trim(),
        estado: el.find('.estado').text().trim().toLowerCase(), 
        ubicacion: el.find('.ubicacion').text().trim()
      });
    });

    return libros;
  } catch (error) {
    throw new Error('Error al procesar el archivo catalogo.html: ' + error.message);
  }
};
