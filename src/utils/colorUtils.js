/**
 * Devuelve '#000000' o '#ffffff' según la luminancia del color de fondo.
 * Usado para garantizar contraste legible sobre cualquier color de tema.
 */
export const getContrastColor = (hexColor) => {
  const hex = (hexColor || '#000000').replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const luminancia = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminancia > 0.5 ? '#000000' : '#ffffff';
};
