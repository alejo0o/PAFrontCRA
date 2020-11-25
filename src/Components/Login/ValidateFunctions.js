export function validateNick(value) {
  let error;
  if (!value) {
    error = 'Campo requerido';
  } else if (!/^[A-Z._-][A-Z0-9._-]{0,254}$/i.test(value)) {
    error =
      'Nickname no puede contener caracteres especiales o empezar con números, puede contener -_. ';
  }
  return error;
}
export function validateRequired(value) {
  let error;
  if (!value) error = 'Campo requerido';
  return error;
}
export function validateEmail(value) {
  let error;
  if (!value) {
    error = 'Campo requerido';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Email inválido';
  }
  return error;
}
export function validateFoto(value) {
  let error;
  if (!value) {
    error = 'Campo requerido';
  } else if (
    !/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test(
      value
    )
  ) {
    error = 'URL inválido';
  }
  return error;
}
export const options = [
  { key: 'Masculino', text: 'Masculino', value: 'Masculino' },
  { key: 'Femenino', text: 'Femenino', value: 'Femenino' },
  { key: 'Otro', text: 'Otro', value: 'Otro' },
];
