function generaEventos() {
  function darformatofecha(fecha){
  var month=["January","February","March","April", "May", "June", "July", "August", "September","October","November","December"];
    var date= new Date(fecha);
    var verlo= months[date.getMonth()];
    
    return verlo+" "+date.getDate()+", "+date.getFullYear();
  }
  var proyecto = SpreadsheetsApp.getActive().getSheetByName("Eventos");
  var fecha = proyecto.getRange
}
