export const api_url = 'https://proyectoprograavanzada.azurewebsites.net';
export const serverImageURL = 'https://4b975bc4ed09.ngrok.io';
export const fechF = (fecha, hora) => {
  var fechare = fecha.substring(0, 10);

  var horare = hora.hours + 'h ' + hora.minutes + 'm ' + hora.seconds + 's';

  return fechare + '\t' + horare;
};
export const fecha = (fecha) => {
  var fechare = fecha.substring(0, 10);

  return fechare;
};
