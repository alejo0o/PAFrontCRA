export const api_url = "https://localhost:5001" || process.env.API_URL;
export const fechF = (fecha, hora) => {
  var fechare = fecha.substring(0, 10);

  var horare = hora.hours + "h " + hora.minutes + "m " + hora.seconds + "s";

  return fechare + "\t" + horare;
};
export const fecha = (fecha) => {
  var fechare = fecha.substring(0, 10);

  return fechare;
};
