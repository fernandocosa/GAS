function funciones() {
  // Se obtiene el user interface
  var ui = SpreadsheetApp.getUi();
  // Se agregan las dos opciones del menú
  ui.createMenu('Menu Calendario')
      .addItem('Cargar Datos', 'setEventsFromCalendar')
      .addSeparator()
      .addToUi();
}
function setEventsFromCalendar() {
  // Se obtiene la hoja
  var sheet = SpreadsheetApp.getActiveSheet();
  // Se obtiene el id del calendario que vive en la celda A1
  var idCalendar = sheet.getRange(1, 1).getValue();
  // Se obtiene el calendario
  var calendar = CalendarApp.getCalendarById(idCalendar);
  var hora=sheet.getRange("B2").getValue().split("-");
  // cuantas columnas hay?
  var lastcolumn =sheet.getLastColumn();
  // Cuántas filas hay?
  var last = sheet.getLastRow();
  // Obtener el rango de datos, sin cabeceras
  var range = sheet.getRange(2, 1, last, lastcolumn);
  // Obtener los datos del rango en Object[][]
  var values = range.getValues();
  
  // Recorrer la matriz de datos
  for(var i=0; i<last; i++){
    // Concatenar para formar un String de título
    var fecha = values[i][1];
    // Un String para poder inicializar un Date, de inicio y de fin del evento
    var start = values[i][2]+' UTC+1';
    var end = values[i][2]  + ' UTC+1';
    // Un String de la materia
    var materia = values[i][3];
    // Un String del aula
    var aula = values[i][4];
    // Un string para observaciones
    var observaciones = values[i][4];
    // Se crea el evento
    var event = calendar.createEvent(
      fecha,
      new Date(start),
      new Date(end),
      {location:aula,// localizacion en el evento
       description:observaciones}); // en el evento 
  }
  
}



