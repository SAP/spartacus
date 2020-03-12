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

  /**
   * Marks all form fields as 'touched'
   * Helpful when checking empty or invalid forms
   * @param form Form with fields to mark
   */
  static markFormAsTouched(form: FormGroup): void {
    form.markAllAsTouched();
  }

  /**
   * Prefills form field with passed value
   * @param form Form with field to prefill
   * @param controlName Field name to prefill
   * @param value Value of the filled
   */
  static prefillForm(
    form: FormGroup,
    controlName: string,
    value: string
  ): void {
    form.patchValue({
      [controlName]: value,
    });

    form.get(controlName).markAsTouched(); // this action will check field validity on load
  }
}
