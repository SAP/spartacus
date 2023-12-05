import { AbstractControl, UntypedFormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
export declare class CustomFormValidators {
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
    static emailValidator(control: AbstractControl): ValidationErrors | null;
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
    static passwordValidator(control: AbstractControl): ValidationErrors | null;
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
    static starRatingEmpty(control: AbstractControl): ValidationErrors | null;
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
    static passwordsMustMatch(password: string, passwordConfirmation: string): any;
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
    static emailsMustMatch(email: string, emailConfirmation: string): any;
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
    static mustBePositive(control: AbstractControl): ValidationErrors | null;
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
    static noSpecialCharacters(control: AbstractControl): ValidationErrors | null;
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
    static patternValidation(isValidFormat: (date: string) => boolean): ValidatorFn;
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
    static dateRange(startDateKey: string, endDateKey: string, getDate: (value: string) => Date | undefined): (_: UntypedFormGroup) => ValidationErrors | null;
}
/**
 * Generic function for validators, which checks if two passed controls match.
 *
 * @param formGroup
 * @param firstControlName First control to check
 * @param secondControlName Second control to check
 * @param errorName Error which will be returned by validator
 */
export declare function controlsMustMatch(formGroup: UntypedFormGroup, firstControlName: string, secondControlName: string, errorName: string): void;
