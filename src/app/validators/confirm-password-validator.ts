import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function confirmPasswordValidator(paswordKey: string, confirmKey: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const password = group.get(paswordKey);
    const confirm = group.get(confirmKey);

    if (!password || !confirm) {
      return null;
    }

    const mismatch = password.value != confirm.value;

    if (mismatch && confirm.dirty) {
      confirm.setErrors({ differentPasswords: true });
    } 
    else if (confirm.hasError('differentPasswords')) {
      confirm.setErrors(null);
    }

    return null;
  };
}
