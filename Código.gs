function LeerFecha() {
 var activacion = SpreadsheetApp.getActive().getSheetByName('Hoja 1'); //me activa la hoja de calculo
  //var hoja = activacion.getSheetByName("Hoja 1"); // me selecciona la hoja de la hoja de calculo
  var b2 = activacion.getRange(4,5).getValue(); // me rescata el valor 4,5
  Logger.log("tendria que salir la fecha");
  var b3 = b2;
      activacion.getRange(8,5).setValue(b3);
Logger.log(b2);
}
