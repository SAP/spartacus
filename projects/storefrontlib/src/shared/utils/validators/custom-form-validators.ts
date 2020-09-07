import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { EMAIL_PATTERN, PASSWORD_PATTERN } from '@spartacus/core';

export class CustomFormValidators {
  /**
   * Checks control's value with predefined email regexp
   *
   * NOTE: Use it as a control validator
   *
   * @static
   * @param {AbstractControl} control
   * @returns {(ValidationErrors | null)} Uses 'cxInvalidEmail' validator error
   * @memberof CustomFormValidators
   */
  static emailValidator(control: AbstractControl): ValidationErrors | null {
    const email = control.value as string;

    return !email.length || email.match(EMAIL_PATTERN)
      ? null
      : { cxInvalidEmail: true };
  }

  /**
   * Checks control's value with predefined password regexp
   *
   * NOTE: Use it as a control validator
   *
   * @static
   * @param {AbstractControl} control
   * @returns {(ValidationErrors | null)} Uses 'cxInvalidPassword' validator error
   * @memberof CustomFormValidators
   */
  static passwordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.value as string;

    return !password.length || password.match(PASSWORD_PATTERN)
      ? null
      : { cxInvalidPassword: true };
  }

  /**
   * Checks if control's value is between 1 and 5
   *
   * NOTE: Use it as a control validator
   *
   * @static
   * @param {AbstractControl} control
   * @returns {(ValidationErrors | null)} Uses 'cxStarRatingEmpty' validator error
   * @memberof CustomFormValidators
   */
  static starRatingEmpty(control: AbstractControl): ValidationErrors | null {
    const rating = control.value as number;

    return rating >= 1 && rating <= 5 ? null : { cxStarRatingEmpty: true };
  }

  /**
   * Checks if two password controls match
   *
   * NOTE: Use it as a form validator and pass password control names as parameters
   *
   * @static
   * @param {string} password First password control name
   * @param {string} passwordConfirmation Second password control name
   * @returns Uses 'cxPasswordsMustMatch' validator error
   * @memberof CustomFormValidators
   */
  static passwordsMustMatch(
    password: string,
    passwordConfirmation: string
  ): any {
    const validator = (formGroup: FormGroup) =>
      controlsMustMatch(
        formGroup,
        password,
        passwordConfirmation,
        'cxPasswordsMustMatch'
      );

    return validator;
  }

  /**
   * Checks if two email controls match
   *
   * NOTE: Use it as a form validator and pass email control names as parameters
   *
   * @static
   * @param {string} email First email control name
   * @param {string} emailConfirmation Second email control name
   * @returns Uses 'cxEmailsMustMatch' validator error
   * @memberof CustomFormValidators
   */
  static emailsMustMatch(email: string, emailConfirmation: string): any {
    const validator = (formGroup: FormGroup) =>
      controlsMustMatch(
        formGroup,
        email,
        emailConfirmation,
        'cxEmailsMustMatch'
      );

    return validator;
  }

  /**
   * Checks if control's value is euqal or greater than 0
   *
   * NOTE: Use it as a control validator
   *
   * @static
   * @param {AbstractControl} control
   * @returns {(ValidationErrors | null)} Uses 'cxNegativeAmount' validator error
   * @memberof CustomFormValidators
   */
  static mustBePositive(control: AbstractControl): ValidationErrors | null {
    const amount = control.value as number;

    return amount >= 0 ? null : { cxNegativeAmount: true };
  }

  /**
   * Checks if control's value does not contain any special characters
   *
   * NOTE: Use it as a control validator
   *
   * @static
   * @param {AbstractControl} control
   * @returns {(ValidationErrors | null)} Uses 'cxContainsSpecialCharacters' validator error
   * @memberof CustomFormValidators
   */
  static noSpecialCharacters(
    control: AbstractControl
  ): ValidationErrors | null {
    const forbiddenChars = ['/'];
    const str = String(control.value);
    const containsSpecialChars = forbiddenChars.some((char) =>
      str.includes(char)
    );

    return !containsSpecialChars ? null : { cxContainsSpecialCharacters: true };
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
export function controlsMustMatch(
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
