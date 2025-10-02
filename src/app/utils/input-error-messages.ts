import { ValidationErrors } from '@angular/forms';

export const inputErrorMessages: Record<string,string | ((error?: any) => string)> = {
  minlength: (error) => `Mínimo de ${error?.requiredLength} caracretes`,
  maxlength: (error) => `Máximo de ${error?.requiredLength} caracretes`,
  required: 'Campo obrigatório',
  email: 'Email inválido',
  differentPasswords: 'As senhas não coincidem',
  invalidCredentials: 'Credenciais inválidas',
};

export function getInputErrorMessage(errors: ValidationErrors | null): string | null {
  if (!errors) {
    return null;
  }

  const firstKey = Object.keys(errors)[0];

  if (!firstKey) {
    return null;
  }

  const message = inputErrorMessages[firstKey];

  if (!message) {
    return null;
  }

  return typeof message === 'function' ? message(errors[firstKey]) : message;
}
