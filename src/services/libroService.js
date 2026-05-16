import { parsearLibros } from '../utils/htmlParser.js';

export const obtenerTodosLosLibros = () => {
  return parsearLibros();
};

export const obtenerLibrosDisponibles = () => {
  const libros = parsearLibros();
  return libros.filter(libro => libro.estado === 'disponible');
};

export const obtenerLibrosPorCategoria = (categoria) => {
  const libros = parsearLibros();
  // Normalizamos el parámetro a minúsculas para asegurar la coincidencia con el HTML
  return libros.filter(libro => libro.categoria === categoria.toLowerCase());
};