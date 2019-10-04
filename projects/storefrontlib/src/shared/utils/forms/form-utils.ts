import { FormGroup, AbstractControl } from '@angular/forms';

/**
 * Utility class when working with forms.
 */
export class FormUtils {
  /**
   *
   * Validates a field of the given form group
   *
   * If the field is NOT valid (or invalid), the method returns `true`.
   *
   * @param form Form with fields to check
   * @param formControlName Name of the form field to check
   * @param submitted Has the form been submitted
   */
  static isNotValidField(
    form: FormGroup,
    formControlName: string,
    submitted: boolean
  ): boolean {
    const control: AbstractControl = form.get(formControlName);
    return control.invalid && (submitted || (control.touched && control.dirty));
  }
}
