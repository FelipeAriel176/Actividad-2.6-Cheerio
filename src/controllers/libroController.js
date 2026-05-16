import * as libroService from '../services/libroService.js';

export const getLibros = (req, res) => {
  try {
    const libros = libroService.obtenerTodosLosLibros();
    return res.status(200).json({
      exito: true,
      total: libros.length,
      datos: libros
    });
  } catch (error) {
    return res.status(500).json({ exito: false, mensaje: error.message });
  }
};

export const getLibrosDisponibles = (req, res) => {
  try {
    const libros = libroService.obtenerLibrosDisponibles();
    return res.status(200).json({
      exito: true,
      total: libros.length,
      datos: libros
    });
  } catch (error) {
    return res.status(500).json({ exito: false, mensaje: error.message });
  }
};

export const getLibrosPorCategoria = (req, res) => {
  try {
    const { categoria } = req.params;

    // Validación básica: que el parámetro no venga vacío o lleno de espacios
    if (!categoria || categoria.trim() === '') {
      return res.status(400).json({
        exito: false,
        mensaje: "El parámetro de categoría es requerido."
      });
    }

    const librosFiltrados = libroService.obtenerLibrosPorCategoria(categoria);

    // Validación de categoría inexistente o vacía (Error 404)
    if (librosFiltrados.length === 0) {
      return res.status(404).json({
        exito: false,
        mensaje: `No se encontraron libros para la categoría: "${categoria}".`
      });
    }

    return res.status(200).json({
      exito: true,
      categoria: categoria.toLowerCase(),
      total: librosFiltrados.length,
      datos: librosFiltrados
    });
  } catch (error) {
    return res.status(500).json({ exito: false, mensaje: error.message });
  }
};
