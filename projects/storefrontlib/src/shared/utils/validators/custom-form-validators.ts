import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
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

    return email && (!email.length || email.match(EMAIL_PATTERN))
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

    return password && (!password.length || password.match(PASSWORD_PATTERN))
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

  /**
   * Checks if control's value passes pattern
   *
   * NOTE: Use it as a control validator
   *
   * @static
   * @param {(date: string) => boolean} isValidFormat Pattern verification function
   * @returns {(control: AbstractControl): ValidationErrors | null} Uses 'pattern' validator error
   * @memberof CustomFormValidators
   */
  static patternValidation(
    isValidFormat: (date: string) => boolean
  ): ValidatorFn {
    const validator = (control: AbstractControl): ValidationErrors | null => {
      const errors: ValidationErrors = {};
      if (
        control.value &&
        control.value !== '' &&
        !isValidFormat(control.value)
      ) {
        errors.pattern = true;
      }
      return Object.keys(errors).length === 0 ? null : errors;
    };
    return validator;
  }

  /**
   * Checks if two email controls match
   *
   * NOTE: Use it as a form validator and pass dates for range
   *
   * @static
   * @param {string} startDateKey First date control name
   * @param {string} endDateKey Second date control name
   * @param {(value: string) => Date} getDate Converting function
   * @returns Uses 'min' and 'max validator error
   * @memberof CustomFormValidators
   */
  static dateRange(
    startDateKey: string,
    endDateKey: string,
    getDate: (value: string) => Date
  ): (FormGroup) => any {
    const validator = (formGroup: FormGroup): ValidationErrors | null => {
      const startDateControl = formGroup.controls[startDateKey];
      const endDateControl = formGroup.controls[endDateKey];
      const startDate = getDate(startDateControl.value);
      const endDate = getDate(endDateControl.value);
      if (!startDateControl.errors?.pattern) {
        if (startDate > endDate) {
          startDateControl.setErrors({ max: true });
        }
      }
      if (!endDateControl.errors?.pattern) {
        if (endDate < startDate) {
          endDateControl.setErrors({ min: true });
        }
      }
      return null;
    };
    return validator;
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
