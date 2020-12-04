export function validateRequired(value) {
  let error;
  if (!value) error = "Campo requerido";
  return error;
}
export function validateEmail(value) {
  let error;
  if (!value) {
    error = "Campo requerido";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "Email inválido";
  }
  return error;
}