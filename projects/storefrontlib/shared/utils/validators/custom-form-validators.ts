/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AbstractControl,
  UntypedFormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import {
  CONSECUTIVE_CHARACTERS,
  EMAIL_PATTERN,
  MIN_ONE_DIGIT_PATTERN,
  MIN_ONE_SPECIAL_CHARACTER_PATTERN,
  MIN_ONE_UPPER_CASE_CHARACTER_PATTERN,
  MIN_SIX_CHARACTERS_PATTERN,
  PASSWORD_PATTERN,
  STRONG_PASSWORD_PATTERN,
} from '@spartacus/core';

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

  // TODO: (CXSPA-7567) Remove after removing formErrorsDescriptiveMessages feature toggle
  /**
   * Checks control's value with predefined password regexp
   *
   * NOTE: Use it as a control validator
   *
   * @deprecated Use passwordValidators instead
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

  // TODO: (CXSPA-7567) Remove after removing formErrorsDescriptiveMessages feature toggle
  /**
   * Checks control's value with predefined password regexp
   *
   * NOTE: Use it as a control validator
   *
   * @deprecated Use passwordValidators instead
   * @static
   * @param {AbstractControl} control
   * @returns {(ValidationErrors | null)} Uses 'cxInvalidPassword' validator error
   * @memberof CustomFormValidators
   */
  static strongPasswordValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const password = control.value as string;

    return password &&
      (!password.length || password.match(STRONG_PASSWORD_PATTERN))
      ? null
      : { cxInvalidPassword: true };
  }

  /**
   * Checks control's value with predefined  at least one upper case character regexp
   *
   * NOTE: Use it as a control validator
   *
   * @static
   * @param {AbstractControl} control
   * @returns {(ValidationErrors | null)} Uses 'cxMinOneUpperCaseCharacter' validator error
   * @memberof CustomFormValidators
   */
  static minOneUpperCaseCharacterValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const password = control.value as string;

    return password &&
      (!password.length || password.match(MIN_ONE_UPPER_CASE_CHARACTER_PATTERN))
      ? null
      : { cxMinOneUpperCaseCharacter: true };
  }

  /**
   * Checks control's value with predefined  at least one upper case character regexp
   *
   * NOTE: Use it as a control validator
   *
   * @static
   * @param {AbstractControl} control
   * @returns {(ValidationErrors | null)} Uses 'cxMinOneDigit' validator error
   * @memberof CustomFormValidators
   */
  static minOneDigitValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const password = control.value as string;

    return password &&
      (!password.length || password.match(MIN_ONE_DIGIT_PATTERN))
      ? null
      : { cxMinOneDigit: true };
  }

  /**
   * Checks control's value with predefined  at least one upper case character regexp
   *
   * NOTE: Use it as a control validator
   *
   * @static
   * @param {AbstractControl} control
   * @returns {(ValidationErrors | null)} Uses 'cxMinOneSpecialCharacter' validator error
   * @memberof CustomFormValidators
   */
  static minOneSpecialCharacterValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const password = control.value as string;

    return password &&
      (!password.length || password.match(MIN_ONE_SPECIAL_CHARACTER_PATTERN))
      ? null
      : { cxMinOneSpecialCharacter: true };
  }

  /**
   * Checks control's value with predefined  at least one upper case character regexp
   *
   * NOTE: Use it as a control validator
   *
   * @static
   * @param {AbstractControl} control
   * @returns {(ValidationErrors | null)} Uses 'cxMinSixCharactersLength' validator error
   * @memberof CustomFormValidators
   */
  static minSixCharactersLengthValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const password = control.value as string;

    return password &&
      (!password.length || password.match(MIN_SIX_CHARACTERS_PATTERN))
      ? null
      : { cxMinSixCharactersLength: true };
  }

  /**
   * Validates that the control's value does not contain consecutive identical characters.
   *
   * NOTE: Use this as a control validator.
   *
   * @static
   * @param {AbstractControl} control The form control to validate.
   * @returns {(ValidationErrors | null)} Returns an error object with the key 'cxNoConsecutiveCharacters'
   * if the value contains consecutive characters, or null if the validation passes.
   * @memberof CustomFormValidators
   */
  static noConsecutiveCharacters(
    control: AbstractControl
  ): ValidationErrors | null {
    const password = control.value as string;

    return password &&
      (!password.length || password.match(CONSECUTIVE_CHARACTERS))
      ? { cxNoConsecutiveCharacters: true }
      : null;
  }

  /**
   * Pack of predefined password validators:
   * - at least one upper case character
   * - at least one digit
   * - at least one special character
   * - at least six characters length
   *
   * @memberof CustomFormValidators
   */
  static passwordValidators = [
    this.minOneDigitValidator,
    this.minOneUpperCaseCharacterValidator,
    this.minOneSpecialCharacterValidator,
    this.minSixCharactersLengthValidator,
  ];

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
    const validator = (formGroup: UntypedFormGroup) =>
      controlsMustMatch(
        formGroup,
        password,
        passwordConfirmation,
        'cxPasswordsMustMatch'
      );

    return validator;
  }

  /**
   * Checks if two password controls don't match
   *
   * NOTE: Use it as a form validator and pass password control names as parameters
   *
   * @static
   * @param {string} password First password control name
   * @param {string} passwordConfirmation Second password control name
   * @returns Uses 'cxPasswordsCannotMatch' validator error
   * @memberof CustomFormValidators
   */
  static passwordsCannotMatch(
    password: string,
    passwordConfirmation: string
  ): any {
    const validator = (formGroup: UntypedFormGroup) =>
      controlsMustMatch(
        formGroup,
        password,
        passwordConfirmation,
        'cxPasswordsCannotMatch',
        true
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
    const validator = (formGroup: UntypedFormGroup) =>
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
    getDate: (value: string) => Date | undefined
  ): (_: UntypedFormGroup) => ValidationErrors | null {
    return (formGroup: UntypedFormGroup): ValidationErrors | null => {
      const startDateControl = formGroup.controls[startDateKey];
      const endDateControl = formGroup.controls[endDateKey];
      const startDate = getDate(startDateControl.value);
      const endDate = getDate(endDateControl.value);
      if (startDate && endDate) {
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
      }
      return null;
    };
  }
}

/**
 * Generic function for validators, which checks if two passed controls match.
 *
 * @param formGroup
 * @param firstControlName First control to check
 * @param secondControlName Second control to check
 * @param errorName Error which will be returned by validator
 * @param cannotMatch Reverse check
 */
export function controlsMustMatch(
  formGroup: UntypedFormGroup,
  firstControlName: string,
  secondControlName: string,
  errorName: string,
  cannotMatch = false
): void {
  const firstControl = formGroup.controls[firstControlName];
  const secondControl = formGroup.controls[secondControlName];

  if (secondControl.errors && !secondControl.errors[errorName]) {
    return;
  }

  const shouldSetError = cannotMatch
    ? firstControl.value === secondControl.value
    : firstControl.value !== secondControl.value;

  secondControl.setErrors(shouldSetError ? { [errorName]: true } : null);
}
