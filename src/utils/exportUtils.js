/**
 * Convierte un array de objetos JSON a formato CSV y dispara la descarga.
 * @param {Array} data - El array de datos (citas, voluntarios, etc.)
 * @param {String} fileNamePrefix - El prefijo del archivo (ej: 'citas', 'voluntarios')
 */
export const exportToCSV = (data, fileNamePrefix) => {
  // Validación simple
  if (!data || data.length === 0) {
    alert("No hay datos disponibles para exportar.");
    return;
  }

  // Generar el nombre del archivo con Timestamp
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const time = `${now.getHours()}${now.getMinutes()}${now.getSeconds()}`; 
  
  const fileName = `registro_${fileNamePrefix}_${day}_${month}_${year}_${time}.csv`;

  // Convertir JSON a CSV
  const headers = Object.keys(data[0]);
  
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(fieldName => {
      let value = row[fieldName] === null || row[fieldName] === undefined ? '' : row[fieldName];
      value = value.toString().replace(/"/g, '""'); 
      return `"${value}"`; 
    }).join(','))
  ].join('\r\n');

  // Crear el Blob y descargar (AQUÍ ESTÁ EL CAMBIO)
  // Se agrega "\uFEFF" al inicio. Eso es el BOM para UTF-8.
  const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
  
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};