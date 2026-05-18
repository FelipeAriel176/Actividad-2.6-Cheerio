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
  return libros.filter(libro => libro.categoria === categoria.toLowerCase());
};