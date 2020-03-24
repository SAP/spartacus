import { AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';
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

  static starRatingEmpty(control: AbstractControl): ValidationErrors | null {
    const rating = control.value as number;

    return rating >= 1 && rating <= 5 ? null : { cxStarRatingEmpty: true };
  }

  static passwordsMustMatch(
    password: string,
    passwordConfirmation: string
  ): any {
    const mustMatch = (formGroup: FormGroup) =>
      mustMatchFunction(
        formGroup,
        password,
        passwordConfirmation,
        'cxPasswordsMustMatch'
      );

    return mustMatch;
  }

  static emailsMustMatch(
    email: string,
    emailConfirmation: string
  ): any {
    const mustMatch = (formGroup: FormGroup) =>
      mustMatchFunction(
        formGroup,
        email,
        emailConfirmation,
        'cxEmailsMustMatch'
      );

    return mustMatch;
  }
}

/**
 * Generic function for validators, which checks if two passed controls match.
 *
 * @param formGroup
 * @param firstControlName First control to check
 * @param secondControlName Second control to check
 * @param errorName Error which will be returned by validator
 */
function mustMatchFunction(
  formGroup: FormGroup,
  firstControlName: string,
  secondControlName: string,
  errorName: string
): void {
  const firstControl = formGroup.controls[firstControlName];
  const secondControl = formGroup.controls[secondControlName];

  if (secondControl.errors && !secondControl.errors[errorName]) {
    return;
  }

  secondControl.setErrors(
    firstControl.value !== secondControl.value ? { [errorName]: true } : null
  );
}
