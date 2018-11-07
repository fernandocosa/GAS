function exportar(){

//Exportar eventos del calendario de Google a una hoja de cálculo de Google
//
// Este código recupera eventos entre 2 fechas para el calendario especificado.
// Registra los resultados en la hoja de cálculo actual a partir de la celda A2 que enumera los eventos,
// fechas / horas, etc. e incluso calcula la duración del evento (mediante la creación de fórmulas en la hoja de cálculo) y da formato a los valores.
//
// Reescribo el encabezado de la hoja de cálculo en la fila 1 con cada ejecución, ya que encontré más rápido eliminar el contenido de la hoja completa,
// cambiar mis parámetros y volver a ejecutar mis exportaciones en lugar de intentar guardar la fila del encabezado manualmente ... así que asegúrese de cambiar
// cualquier código, mantienes el encabezado de acuerdo para facilitar la lectura!
//
// 1. Modifique el valor de mycal para que sea SU dirección de correo electrónico del calendario o una visible en su sección MIS calendarios de su Google Calendar
// 2. Modifique los valores para que los eventos sean el rango de fecha / hora que desee y cualquier parámetro de búsqueda para encontrar u omitir los eventos del calendario
// Nota: los eventos se pueden filtrar / eliminar fácilmente una vez que se exportan del calendario


var mycal = "fernandocosa.15@campuscamara.es";
var cal = CalendarApp.getCalendarById(mycal);

// Explicación de cómo funciona la sección de búsqueda  como parte de la función getEvents:
// {search: 'word1'} Buscar eventos con word1
// {search: '-word1'} Buscar eventos sin word1
// {search: 'word1 word2'} Buscar eventos con word2 SOLAMENTE
// {search: 'word1-word2'} Buscar eventos con ????
// {search: 'word1 -word2'} Buscar eventos sin word2
// {search: 'word1 + word2'} Buscar eventos con word1 AND word2
// {search: 'word1 + -word2'} Buscar eventos con word1 AND sin word2
//
var events = cal.getEvents(new Date("November 5, 2018 00:00:00 CST"), new Date("November 12, 2018 23:59:59 CST"), {search: 'community manager'}); //solo busca community manager


var sheet = SpreadsheetApp.getActiveSheet();
// Crear un registro de encabezado en la hoja de cálculo actual en las celdas A1: N1: haga coincidir el número de entradas en el "encabezado =" con el último parámetro
// de la entrada getRange a continuación
var header = [["Email", "evento titulo", "Descripcion evento", "Localizacion evento", "Empieza", "Termina", "duracion", "Visibilidad", "fecha Creada", "ultima actualizacion", "MyStatus", "Creado por"]]
var range = sheet.getRange(1,1,1,12);
range.setValues(header);

  

// Recorra todos los eventos del calendario encontrados y escríbalos comenzando en la FILA 2 (i + 2) calculada
for (var i=0;i<events.length;i++) {
var row=i+2;
var myformula_placeholder = '';
// Coincidiendo con la entrada "header =" anterior, esta es la entrada detallada de la fila "details =", y debe coincidir con el número de entradas de la entrada GetRange 
var details=[[mycal,events[i].getTitle(), events[i].getDescription(), events[i].getLocation(), events[i].getStartTime(), events[i].getEndTime(), myformula_placeholder, ('' + events[i].getVisibility()), events[i].getDateCreated(), events[i].getLastUpdated(), events[i].getMyStatus(), events[i].getCreators()]];
var range=sheet.getRange(row,1,1,12);
range.setValues(details);

//Calculo de duracion de tiempo del evento
var cell=sheet.getRange(row,7);
cell.setFormula('=(HOUR(F' +row+ ')+(MINUTE(F' +row+ ')/60))-(HOUR(E' +row+ ')+(MINUTE(E' +row+ ')/60))');
cell.setNumberFormat('.00');

}
}
// Reference Websites:
// https://developers.google.com/apps-script/reference/calendar/calendar
// https://developers.google.com/apps-script/reference/calendar/calendar-event
//
function onOpen() {
  Browser.msgBox('App Instructions - Please Read This Message', '1) Click Tools then Script Editor\\n2) Read/update the code with your desired values.\\n3) Then when ready click Run export_gcal_to_gsheet from the script editor.', Browser.Buttons.OK);

}

