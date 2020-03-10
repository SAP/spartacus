import { AbstractControl, ValidationErrors } from '@angular/forms';
import { EMAIL_PATTERN, PASSWORD_PATTERN } from '@spartacus/core';

export class CustomFormValidators {
  static emailDomainValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const email = control.value as string;

    return !email.length || email.match('[.][a-zA-Z]+$')
      ? null
      : { cxInvalidEmail: true };
  }

  static emailValidator(control: AbstractControl): ValidationErrors | null {
    const email = control.value as string;

    return !email.length || email.match(EMAIL_PATTERN)
      ? null
      : { cxInvalidEmail: true };
  }

  static passwordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.value as string;

    return !password.length || password.match(PASSWORD_PATTERN)
      ? null
      : { cxInvalidPassword: true };
  }

  static matchPassword(control: AbstractControl): ValidationErrors | null {
    const pass1 = control?.get('password')?.value;
    const pass2 = control?.get('passwordconf')?.value;

    return (!pass1.length && !pass2.length) || pass1 === pass2
      ? null
      : { cxPasswordsNotEqual: true };
  }
}
