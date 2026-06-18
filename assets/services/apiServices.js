

/**
 
 * @param {string} termino 
 * @returns {Promise<Array>} 
 */
export const obtenerListaCanciones = async (termino) => {
  if (!termino) return [];
  
  try {
    const response = await fetch(`https://api.deezer.com/search?q=${encodeURIComponent(termino)}`);
    const json = await response.json();
    
    // Retornamos solo el arreglo de datos que necesitamos para la lista
    return json.data || [];
  } catch (error) {
    console.error("Error al consumir la API de música:", error);
    return [];
  }
};