import * as libroService from '../services/libroService.js';

export const getLibros = (req, res) => {
  try {
    const datos = libroService.obtenerTodos();
    return res.status(200).json({ exito: true, total: datos.length, datos });
  } catch (error) {
    return res.status(500).json({ exito: false, mensaje: error.message });
  }
};

export const getDisponibles = (req, res) => {
  try {
    const datos = libroService.obtenerDisponibles();
    return res.status(200).json({ exito: true, total: datos.length, datos });
  } catch (error) {
    return res.status(500).json({ exito: false, mensaje: error.message });
  }
};

export const getPorCategoria = (req, res) => {
  try {
    const { categoria } = req.params;
    
    if (!categoria) {
      return res.status(400).json({ exito: false, mensaje: "Categoría no válida" });
    }

    const datos = libroService.obtenerPorCategoria(categoria);

    if (datos.length === 0) {
      return res.status(404).json({
        exito: false,
        mensaje: `No se encontraron libros para la categoría: "${categoria}".`
      });
    }

    return res.status(200).json({ exito: true, categoria, total: datos.length, datos });
  } catch (error) {
    return res.status(500).json({ exito: false, mensaje: error.message });
  }
};
