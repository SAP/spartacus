import { AbstractControl, ValidationErrors } from '@angular/forms';
import { EMAIL_PATTERN, PASSWORD_PATTERN } from '@spartacus/core';

export class CustomFormValidators {
  static emailDomainValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const email = control.value as string;

    return email.match('[.][a-zA-Z]+$') ? null : { InvalidEmail: true };
  }

  static emailValidator(control: AbstractControl): ValidationErrors | null {
    const email = control.value as string;

    return email.match(EMAIL_PATTERN) ? null : { InvalidEmail: true };
  }

  static passwordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.value as string;
    return password.match(PASSWORD_PATTERN) ? null : { InvalidPassword: true };
  }

  static matchPassword(control: AbstractControl): { NotEqual: boolean } {
    if (control.get('password').value !== control.get('passwordconf').value) {
      return { NotEqual: true };
    }
    return null;
  }
}
