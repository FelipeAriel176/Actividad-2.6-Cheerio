import { parsearCatalogo } from '../utils/htmlParser.js';

export const obtenerTodos = () => {
  return parsearCatalogo();
};

export const obtenerDisponibles = () => {
  const libros = parsearCatalogo();
  return libros.filter(libro => libro.estado === 'disponible');
};

export const obtenerPorCategoria = (categoria) => {
  const libros = parsearCatalogo();
  const categoriaNormalizada = categoria.toLowerCase().trim();
  return libros.filter(libro => libro.categoria.toLowerCase() === categoriaNormalizada);
};
