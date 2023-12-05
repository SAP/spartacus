/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
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
    static emailValidator(control) {
        const email = control.value;
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
    static passwordValidator(control) {
        const password = control.value;
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
    static starRatingEmpty(control) {
        const rating = control.value;
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
    static passwordsMustMatch(password, passwordConfirmation) {
        const validator = (formGroup) => controlsMustMatch(formGroup, password, passwordConfirmation, 'cxPasswordsMustMatch');
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
    static emailsMustMatch(email, emailConfirmation) {
        const validator = (formGroup) => controlsMustMatch(formGroup, email, emailConfirmation, 'cxEmailsMustMatch');
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
    static mustBePositive(control) {
        const amount = control.value;
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
    static noSpecialCharacters(control) {
        const forbiddenChars = ['/'];
        const str = String(control.value);
        const containsSpecialChars = forbiddenChars.some((char) => str.includes(char));
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
    static patternValidation(isValidFormat) {
        const validator = (control) => {
            const errors = {};
            if (control.value &&
                control.value !== '' &&
                !isValidFormat(control.value)) {
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
    static dateRange(startDateKey, endDateKey, getDate) {
        return (formGroup) => {
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
 */
export function controlsMustMatch(formGroup, firstControlName, secondControlName, errorName) {
    const firstControl = formGroup.controls[firstControlName];
    const secondControl = formGroup.controls[secondControlName];
    if (secondControl.errors && !secondControl.errors[errorName]) {
        return;
    }
    secondControl.setErrors(firstControl.value !== secondControl.value ? { [errorName]: true } : null);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLWZvcm0tdmFsaWRhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvc2hhcmVkL3V0aWxzL3ZhbGlkYXRvcnMvY3VzdG9tLWZvcm0tdmFsaWRhdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBUUgsT0FBTyxFQUFFLGFBQWEsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRWxFLE1BQU0sT0FBTyxvQkFBb0I7SUFDL0I7Ozs7Ozs7OztPQVNHO0lBQ0gsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUF3QjtRQUM1QyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBZSxDQUFDO1FBRXRDLE9BQU8sS0FBSyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDM0QsQ0FBQyxDQUFDLElBQUk7WUFDTixDQUFDLENBQUMsRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxPQUF3QjtRQUMvQyxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsS0FBZSxDQUFDO1FBRXpDLE9BQU8sUUFBUSxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUN2RSxDQUFDLENBQUMsSUFBSTtZQUNOLENBQUMsQ0FBQyxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxNQUFNLENBQUMsZUFBZSxDQUFDLE9BQXdCO1FBQzdDLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxLQUFlLENBQUM7UUFFdkMsT0FBTyxNQUFN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KiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7XG4gIEFic3RyYWN0Q29udHJvbCxcbiAgVW50eXBlZEZvcm1Hcm91cCxcbiAgVmFsaWRhdGlvbkVycm9ycyxcbiAgVmFsaWRhdG9yRm4sXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEVNQUlMX1BBVFRFUk4sIFBBU1NXT1JEX1BBVFRFUk4gfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuXG5leHBvcnQgY2xhc3MgQ3VzdG9tRm9ybVZhbGlkYXRvcnMge1xuICAvKipcbiAgICogQ2hlY2tzIGNvbnRyb2wncyB2YWx1ZSB3aXRoIHByZWRlZmluZWQgZW1haWwgcmVnZXhwXG4gICAqXG4gICAqIE5PVEU6IFVzZSBpdCBhcyBhIGNvbnRyb2wgdmFsaWRhdG9yXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQHBhcmFtIHtBYnN0cmFjdENvbnRyb2x9IGNvbnRyb2xcbiAgICogQHJldHVybnMgeyhWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCl9IFVzZXMgJ2N4SW52YWxpZEVtYWlsJyB2YWxpZGF0b3IgZXJyb3JcbiAgICogQG1lbWJlcm9mIEN1c3RvbUZvcm1WYWxpZGF0b3JzXG4gICAqL1xuICBzdGF0aWMgZW1haWxWYWxpZGF0b3IoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwge1xuICAgIGNvbnN0IGVtYWlsID0gY29udHJvbC52YWx1ZSBhcyBzdHJpbmc7XG5cbiAgICByZXR1cm4gZW1haWwgJiYgKCFlbWFpbC5sZW5ndGggfHwgZW1haWwubWF0Y2goRU1BSUxfUEFUVEVSTikpXG4gICAgICA/IG51bGxcbiAgICAgIDogeyBjeEludmFsaWRFbWFpbDogdHJ1ZSB9O1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBjb250cm9sJ3MgdmFsdWUgd2l0aCBwcmVkZWZpbmVkIHBhc3N3b3JkIHJlZ2V4cFxuICAgKlxuICAgKiBOT1RFOiBVc2UgaXQgYXMgYSBjb250cm9sIHZhbGlkYXRvclxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbSB7QWJzdHJhY3RDb250cm9sfSBjb250cm9sXG4gICAqIEByZXR1cm5zIHsoVmFsaWRhdGlvbkVycm9ycyB8IG51bGwpfSBVc2VzICdjeEludmFsaWRQYXNzd29yZCcgdmFsaWRhdG9yIGVycm9yXG4gICAqIEBtZW1iZXJvZiBDdXN0b21Gb3JtVmFsaWRhdG9yc1xuICAgKi9cbiAgc3RhdGljIHBhc3N3b3JkVmFsaWRhdG9yKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsIHtcbiAgICBjb25zdCBwYXNzd29yZCA9IGNvbnRyb2wudmFsdWUgYXMgc3RyaW5nO1xuXG4gICAgcmV0dXJuIHBhc3N3b3JkICYmICghcGFzc3dvcmQubGVuZ3RoIHx8IHBhc3N3b3JkLm1hdGNoKFBBU1NXT1JEX1BBVFRFUk4pKVxuICAgICAgPyBudWxsXG4gICAgICA6IHsgY3hJbnZhbGlkUGFzc3dvcmQ6IHRydWUgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgY29udHJvbCdzIHZhbHVlIGlzIGJldHdlZW4gMSBhbmQgNVxuICAgKlxuICAgKiBOT1RFOiBVc2UgaXQgYXMgYSBjb250cm9sIHZhbGlkYXRvclxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbSB7QWJzdHJhY3RDb250cm9sfSBjb250cm9sXG4gICAqIEByZXR1cm5zIHsoVmFsaWRhdGlvbkVycm9ycyB8IG51bGwpfSBVc2VzICdjeFN0YXJSYXRpbmdFbXB0eScgdmFsaWRhdG9yIGVycm9yXG4gICAqIEBtZW1iZXJvZiBDdXN0b21Gb3JtVmFsaWRhdG9yc1xuICAgKi9cbiAgc3RhdGljIHN0YXJSYXRpbmdFbXB0eShjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCB7XG4gICAgY29uc3QgcmF0aW5nID0gY29udHJvbC52YWx1ZSBhcyBudW1iZXI7XG5cbiAgICByZXR1cm4gcmF0aW5nID49IDEgJiYgcmF0aW5nIDw9IDUgPyBudWxsIDogeyBjeFN0YXJSYXRpbmdFbXB0eTogdHJ1ZSB9O1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0d28gcGFzc3dvcmQgY29udHJvbHMgbWF0Y2hcbiAgICpcbiAgICogTk9URTogVXNlIGl0IGFzIGEgZm9ybSB2YWxpZGF0b3IgYW5kIHBhc3MgcGFzc3dvcmQgY29udHJvbCBuYW1lcyBhcyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQHBhcmFtIHtzdHJpbmd9IHBhc3N3b3JkIEZpcnN0IHBhc3N3b3JkIGNvbnRyb2wgbmFtZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGFzc3dvcmRDb25maXJtYXRpb24gU2Vjb25kIHBhc3N3b3JkIGNvbnRyb2wgbmFtZVxuICAgKiBAcmV0dXJucyBVc2VzICdjeFBhc3N3b3Jkc011c3RNYXRjaCcgdmFsaWRhdG9yIGVycm9yXG4gICAqIEBtZW1iZXJvZiBDdXN0b21Gb3JtVmFsaWRhdG9yc1xuICAgKi9cbiAgc3RhdGljIHBhc3N3b3Jkc011c3RNYXRjaChcbiAgICBwYXNzd29yZDogc3RyaW5nLFxuICAgIHBhc3N3b3JkQ29uZmlybWF0aW9uOiBzdHJpbmdcbiAgKTogYW55IHtcbiAgICBjb25zdCB2YWxpZGF0b3IgPSAoZm9ybUdyb3VwOiBVbnR5cGVkRm9ybUdyb3VwKSA9PlxuICAgICAgY29udHJvbHNNdXN0TWF0Y2goXG4gICAgICAgIGZvcm1Hcm91cCxcbiAgICAgICAgcGFzc3dvcmQsXG4gICAgICAgIHBhc3N3b3JkQ29uZmlybWF0aW9uLFxuICAgICAgICAnY3hQYXNzd29yZHNNdXN0TWF0Y2gnXG4gICAgICApO1xuXG4gICAgcmV0dXJuIHZhbGlkYXRvcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgdHdvIGVtYWlsIGNvbnRyb2xzIG1hdGNoXG4gICAqXG4gICAqIE5PVEU6IFVzZSBpdCBhcyBhIGZvcm0gdmFsaWRhdG9yIGFuZCBwYXNzIGVtYWlsIGNvbnRyb2wgbmFtZXMgYXMgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBlbWFpbCBGaXJzdCBlbWFpbCBjb250cm9sIG5hbWVcbiAgICogQHBhcmFtIHtzdHJpbmd9IGVtYWlsQ29uZmlybWF0aW9uIFNlY29uZCBlbWFpbCBjb250cm9sIG5hbWVcbiAgICogQHJldHVybnMgVXNlcyAnY3hFbWFpbHNNdXN0TWF0Y2gnIHZhbGlkYXRvciBlcnJvclxuICAgKiBAbWVtYmVyb2YgQ3VzdG9tRm9ybVZhbGlkYXRvcnNcbiAgICovXG4gIHN0YXRpYyBlbWFpbHNNdXN0TWF0Y2goZW1haWw6IHN0cmluZywgZW1haWxDb25maXJtYXRpb246IHN0cmluZyk6IGFueSB7XG4gICAgY29uc3QgdmFsaWRhdG9yID0gKGZvcm1Hcm91cDogVW50eXBlZEZvcm1Hcm91cCkgPT5cbiAgICAgIGNvbnRyb2xzTXVzdE1hdGNoKFxuICAgICAgICBmb3JtR3JvdXAsXG4gICAgICAgIGVtYWlsLFxuICAgICAgICBlbWFpbENvbmZpcm1hdGlvbixcbiAgICAgICAgJ2N4RW1haWxzTXVzdE1hdGNoJ1xuICAgICAgKTtcblxuICAgIHJldHVybiB2YWxpZGF0b3I7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGNvbnRyb2wncyB2YWx1ZSBpcyBldXFhbCBvciBncmVhdGVyIHRoYW4gMFxuICAgKlxuICAgKiBOT1RFOiBVc2UgaXQgYXMgYSBjb250cm9sIHZhbGlkYXRvclxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbSB7QWJzdHJhY3RDb250cm9sfSBjb250cm9sXG4gICAqIEByZXR1cm5zIHsoVmFsaWRhdGlvbkVycm9ycyB8IG51bGwpfSBVc2VzICdjeE5lZ2F0aXZlQW1vdW50JyB2YWxpZGF0b3IgZXJyb3JcbiAgICogQG1lbWJlcm9mIEN1c3RvbUZvcm1WYWxpZGF0b3JzXG4gICAqL1xuICBzdGF0aWMgbXVzdEJlUG9zaXRpdmUoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwge1xuICAgIGNvbnN0IGFtb3VudCA9IGNvbnRyb2wudmFsdWUgYXMgbnVtYmVyO1xuXG4gICAgcmV0dXJuIGFtb3VudCA+PSAwID8gbnVsbCA6IHsgY3hOZWdhdGl2ZUFtb3VudDogdHJ1ZSB9O1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBjb250cm9sJ3MgdmFsdWUgZG9lcyBub3QgY29udGFpbiBhbnkgc3BlY2lhbCBjaGFyYWN0ZXJzXG4gICAqXG4gICAqIE5PVEU6IFVzZSBpdCBhcyBhIGNvbnRyb2wgdmFsaWRhdG9yXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQHBhcmFtIHtBYnN0cmFjdENvbnRyb2x9IGNvbnRyb2xcbiAgICogQHJldHVybnMgeyhWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCl9IFVzZXMgJ2N4Q29udGFpbnNTcGVjaWFsQ2hhcmFjdGVycycgdmFsaWRhdG9yIGVycm9yXG4gICAqIEBtZW1iZXJvZiBDdXN0b21Gb3JtVmFsaWRhdG9yc1xuICAgKi9cbiAgc3RhdGljIG5vU3BlY2lhbENoYXJhY3RlcnMoXG4gICAgY29udHJvbDogQWJzdHJhY3RDb250cm9sXG4gICk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsIHtcbiAgICBjb25zdCBmb3JiaWRkZW5DaGFycyA9IFsnLyddO1xuICAgIGNvbnN0IHN0ciA9IFN0cmluZyhjb250cm9sLnZhbHVlKTtcbiAgICBjb25zdCBjb250YWluc1NwZWNpYWxDaGFycyA9IGZvcmJpZGRlbkNoYXJzLnNvbWUoKGNoYXIpID0+XG4gICAgICBzdHIuaW5jbHVkZXMoY2hhcilcbiAgICApO1xuXG4gICAgcmV0dXJuICFjb250YWluc1NwZWNpYWxDaGFycyA/IG51bGwgOiB7IGN4Q29udGFpbnNTcGVjaWFsQ2hhcmFjdGVyczogdHJ1ZSB9O1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBjb250cm9sJ3MgdmFsdWUgcGFzc2VzIHBhdHRlcm5cbiAgICpcbiAgICogTk9URTogVXNlIGl0IGFzIGEgY29udHJvbCB2YWxpZGF0b3JcbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAcGFyYW0geyhkYXRlOiBzdHJpbmcpID0+IGJvb2xlYW59IGlzVmFsaWRGb3JtYXQgUGF0dGVybiB2ZXJpZmljYXRpb24gZnVuY3Rpb25cbiAgICogQHJldHVybnMgeyhjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbH0gVXNlcyAncGF0dGVybicgdmFsaWRhdG9yIGVycm9yXG4gICAqIEBtZW1iZXJvZiBDdXN0b21Gb3JtVmFsaWRhdG9yc1xuICAgKi9cbiAgc3RhdGljIHBhdHRlcm5WYWxpZGF0aW9uKFxuICAgIGlzVmFsaWRGb3JtYXQ6IChkYXRlOiBzdHJpbmcpID0+IGJvb2xlYW5cbiAgKTogVmFsaWRhdG9yRm4ge1xuICAgIGNvbnN0IHZhbGlkYXRvciA9IChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICBjb25zdCBlcnJvcnM6IFZhbGlkYXRpb25FcnJvcnMgPSB7fTtcbiAgICAgIGlmIChcbiAgICAgICAgY29udHJvbC52YWx1ZSAmJlxuICAgICAgICBjb250cm9sLnZhbHVlICE9PSAnJyAmJlxuICAgICAgICAhaXNWYWxpZEZvcm1hdChjb250cm9sLnZhbHVlKVxuICAgICAgKSB7XG4gICAgICAgIGVycm9ycy5wYXR0ZXJuID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyhlcnJvcnMpLmxlbmd0aCA9PT0gMCA/IG51bGwgOiBlcnJvcnM7XG4gICAgfTtcbiAgICByZXR1cm4gdmFsaWRhdG9yO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0d28gZW1haWwgY29udHJvbHMgbWF0Y2hcbiAgICpcbiAgICogTk9URTogVXNlIGl0IGFzIGEgZm9ybSB2YWxpZGF0b3IgYW5kIHBhc3MgZGF0ZXMgZm9yIHJhbmdlXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXJ0RGF0ZUtleSBGaXJzdCBkYXRlIGNvbnRyb2wgbmFtZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gZW5kRGF0ZUtleSBTZWNvbmQgZGF0ZSBjb250cm9sIG5hbWVcbiAgICogQHBhcmFtIHsodmFsdWU6IHN0cmluZykgPT4gRGF0ZX0gZ2V0RGF0ZSBDb252ZXJ0aW5nIGZ1bmN0aW9uXG4gICAqIEByZXR1cm5zIFVzZXMgJ21pbicgYW5kICdtYXggdmFsaWRhdG9yIGVycm9yXG4gICAqIEBtZW1iZXJvZiBDdXN0b21Gb3JtVmFsaWRhdG9yc1xuICAgKi9cbiAgc3RhdGljIGRhdGVSYW5nZShcbiAgICBzdGFydERhdGVLZXk6IHN0cmluZyxcbiAgICBlbmREYXRlS2V5OiBzdHJpbmcsXG4gICAgZ2V0RGF0ZTogKHZhbHVlOiBzdHJpbmcpID0+IERhdGUgfCB1bmRlZmluZWRcbiAgKTogKF86IFVudHlwZWRGb3JtR3JvdXApID0+IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsIHtcbiAgICByZXR1cm4gKGZvcm1Hcm91cDogVW50eXBlZEZvcm1Hcm91cCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICAgIGNvbnN0IHN0YXJ0RGF0ZUNvbnRyb2wgPSBmb3JtR3JvdXAuY29udHJvbHNbc3RhcnREYXRlS2V5XTtcbiAgICAgIGNvbnN0IGVuZERhdGVDb250cm9sID0gZm9ybUdyb3VwLmNvbnRyb2xzW2VuZERhdGVLZXldO1xuICAgICAgY29uc3Qgc3RhcnREYXRlID0gZ2V0RGF0ZShzdGFydERhdGVDb250cm9sLnZhbHVlKTtcbiAgICAgIGNvbnN0IGVuZERhdGUgPSBnZXREYXRlKGVuZERhdGVDb250cm9sLnZhbHVlKTtcbiAgICAgIGlmIChzdGFydERhdGUgJiYgZW5kRGF0ZSkge1xuICAgICAgICBpZiAoIXN0YXJ0RGF0ZUNvbnRyb2wuZXJyb3JzPy5wYXR0ZXJuKSB7XG4gICAgICAgICAgaWYgKHN0YXJ0RGF0ZSA+IGVuZERhdGUpIHtcbiAgICAgICAgICAgIHN0YXJ0RGF0ZUNvbnRyb2wuc2V0RXJyb3JzKHsgbWF4OiB0cnVlIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWVuZERhdGVDb250cm9sLmVycm9ycz8ucGF0dGVybikge1xuICAgICAgICAgIGlmIChlbmREYXRlIDwgc3RhcnREYXRlKSB7XG4gICAgICAgICAgICBlbmREYXRlQ29udHJvbC5zZXRFcnJvcnMoeyBtaW46IHRydWUgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICB9XG59XG5cbi8qKlxuICogR2VuZXJpYyBmdW5jdGlvbiBmb3IgdmFsaWRhdG9ycywgd2hpY2ggY2hlY2tzIGlmIHR3byBwYXNzZWQgY29udHJvbHMgbWF0Y2guXG4gKlxuICogQHBhcmFtIGZvcm1Hcm91cFxuICogQHBhcmFtIGZpcnN0Q29udHJvbE5hbWUgRmlyc3QgY29udHJvbCB0byBjaGVja1xuICogQHBhcmFtIHNlY29uZENvbnRyb2xOYW1lIFNlY29uZCBjb250cm9sIHRvIGNoZWNrXG4gKiBAcGFyYW0gZXJyb3JOYW1lIEVycm9yIHdoaWNoIHdpbGwgYmUgcmV0dXJuZWQgYnkgdmFsaWRhdG9yXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb250cm9sc011c3RNYXRjaChcbiAgZm9ybUdyb3VwOiBVbnR5cGVkRm9ybUdyb3VwLFxuICBmaXJzdENvbnRyb2xOYW1lOiBzdHJpbmcsXG4gIHNlY29uZENvbnRyb2xOYW1lOiBzdHJpbmcsXG4gIGVycm9yTmFtZTogc3RyaW5nXG4pOiB2b2lkIHtcbiAgY29uc3QgZmlyc3RDb250cm9sID0gZm9ybUdyb3VwLmNvbnRyb2xzW2ZpcnN0Q29udHJvbE5hbWVdO1xuICBjb25zdCBzZWNvbmRDb250cm9sID0gZm9ybUdyb3VwLmNvbnRyb2xzW3NlY29uZENvbnRyb2xOYW1lXTtcblxuICBpZiAoc2Vjb25kQ29udHJvbC5lcnJvcnMgJiYgIXNlY29uZENvbnRyb2wuZXJyb3JzW2Vycm9yTmFtZV0pIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBzZWNvbmRDb250cm9sLnNldEVycm9ycyhcbiAgICBmaXJzdENvbnRyb2wudmFsdWUgIT09IHNlY29uZENvbnRyb2wudmFsdWUgPyB7IFtlcnJvck5hbWVdOiB0cnVlIH0gOiBudWxsXG4gICk7XG59XG4iXX0=