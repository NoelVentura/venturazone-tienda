// Google Apps Script para Venture Zone - Base de Datos de Clientes
// Reemplaza TODO el contenido de tu Google Apps Script con este código

function doPost(e) {
  try {
    // Obtener datos del POST
    const data = JSON.parse(e.postData.contents);
    
    // ID de la hoja de cálculo - CAMBIA ESTE ID POR EL DE TU HOJA
    const SPREADSHEET_ID = '15HmHDKtyEIMiZRu7U5Zqp3TYwAp05qd6CYphiwicGJY';
    
    // Abrir la hoja de cálculo
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    
    // Obtener o crear la hoja "Clientes Venture Zone"
    let sheet = spreadsheet.getSheetByName('Clientes Venture Zone');
    if (!sheet) {
      sheet = spreadsheet.insertSheet('Clientes Venture Zone');
      setupHeaders(sheet);
    }
    
    // Preparar los datos para insertar
    const rowData = [
      data.fechaHora,           // 1. Fecha y Hora
      data.nombre,             // 2. Nombre
      data.apellido,           // 3. Apellido
      data.email,              // 4. Email
      data.telefono,           // 5. Teléfono
      data.direccion,          // 6. Dirección
      data.ciudad,             // 7. Ciudad
      data.codigoPostal,       // 8. Código Postal
      data.metodoPago,         // 9. Método de Pago
      data.comentarios,        // 10. Comentarios
      data.productos,          // 11. Productos (JSON)
      data.total               // 12. Total
    ];
    
    // Insertar nueva fila
    sheet.appendRow(rowData);
    
    // Aplicar formato a la nueva fila
    const lastRow = sheet.getLastRow();
    formatNewRow(sheet, lastRow);
    
    // Log para debugging
    console.log('Datos insertados exitosamente:', data);
    
    // Respuesta de éxito
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Datos guardados exitosamente',
        row: lastRow
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error al procesar datos:', error);
    
    // Respuesta de error
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Error al guardar datos: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Configurar encabezados de la hoja
function setupHeaders(sheet) {
  const headers = [
    'Fecha y Hora',
    'Nombre',
    'Apellido',
    'Email',
    'Teléfono',
    'Dirección',
    'Ciudad',
    'Código Postal',
    'Método de Pago',
    'Comentarios',
    'Productos',
    'Total'
  ];
  
  // Insertar encabezados en la primera fila
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Formatear encabezados
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground('#4CAF50');
  headerRange.setFontColor('#FFFFFF');
  headerRange.setFontWeight('bold');
  headerRange.setHorizontalAlignment('center');
  
  // Ajustar ancho de columnas
  sheet.autoResizeColumns(1, headers.length);
  
  // Congelar la primera fila
  sheet.setFrozenRows(1);
}

// Formatear nueva fila
function formatNewRow(sheet, row) {
  const range = sheet.getRange(row, 1, 1, 12);
  
  // Alternar colores de fila
  if (row % 2 === 0) {
    range.setBackground('#F5F5F5');
  } else {
    range.setBackground('#FFFFFF');
  }
  
  // Aplicar bordes
  range.setBorder(true, true, true, true, true, true);
  
  // Formatear columna de fecha
  sheet.getRange(row, 1).setNumberFormat('dd/mm/yyyy hh:mm:ss');
  
  // Formatear columna de total
  sheet.getRange(row, 12).setNumberFormat('$#,##0.00');
}

// Función para limpiar datos antiguos (mantener solo últimos 6 meses)
function cleanOldData() {
  try {
    const SPREADSHEET_ID = '15HmHDKtyEIMiZRu7U5Zqp3TYwAp05qd6CYphiwicGJY';
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName('Clientes Venture Zone');
    
    if (!sheet) return;
    
    const data = sheet.getDataRange().getValues();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    let rowsToDelete = [];
    
    // Revisar cada fila (empezando desde la fila 2 para omitir encabezados)
    for (let i = data.length - 1; i >= 1; i--) {
      const rowDate = new Date(data[i][0]);
      if (rowDate < sixMonthsAgo) {
        rowsToDelete.push(i + 1); // +1 porque las filas empiezan en 1
      }
    }
    
    // Eliminar filas antiguas (de abajo hacia arriba)
    rowsToDelete.forEach(row => {
      sheet.deleteRow(row);
    });
    
    console.log(`Se eliminaron ${rowsToDelete.length} filas antiguas`);
    
  } catch (error) {
    console.error('Error al limpiar datos antiguos:', error);
  }
}

// Función para obtener estadísticas de la base de datos
function getDatabaseStats() {
  try {
    const SPREADSHEET_ID = '15HmHDKtyEIMiZRu7U5Zqp3TYwAp05qd6CYphiwicGJY';
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName('Clientes Venture Zone');
    
    if (!sheet) {
      return { error: 'Hoja no encontrada' };
    }
    
    const lastRow = sheet.getLastRow();
    const totalRecords = lastRow - 1; // -1 para excluir encabezados
    
    // Calcular total de ventas
    let totalSales = 0;
    if (lastRow > 1) {
      const totalColumn = sheet.getRange(2, 12, lastRow - 1, 1).getValues();
      totalSales = totalColumn.reduce((sum, row) => sum + (row[0] || 0), 0);
    }
    
    return {
      totalRecords: totalRecords,
      totalSales: totalSales,
      lastUpdate: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    return { error: error.toString() };
  }
}

// Función para exportar datos a CSV
function exportToCSV() {
  try {
    const SPREADSHEET_ID = '15HmHDKtyEIMiZRu7U5Zqp3TYwAp05qd6CYphiwicGJY';
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName('Clientes Venture Zone');
    
    if (!sheet) {
      return { error: 'Hoja no encontrada' };
    }
    
    const data = sheet.getDataRange().getValues();
    const csvContent = data.map(row => row.join(',')).join('\n');
    
    // Crear archivo CSV en Google Drive
    const fileName = `Venture_Zone_Database_${new Date().toISOString().split('T')[0]}.csv`;
    const file = DriveApp.createFile(fileName, csvContent, MimeType.CSV);
    
    return {
      success: true,
      fileName: fileName,
      fileId: file.getId(),
      downloadUrl: file.getDownloadUrl()
    };
    
  } catch (error) {
    console.error('Error al exportar CSV:', error);
    return { error: error.toString() };
  }
}

