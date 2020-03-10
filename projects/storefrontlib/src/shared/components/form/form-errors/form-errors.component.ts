import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

/**
 * This component renders form errors.
 */
@Component({
  selector: 'cx-form-errors',
  templateUrl: './form-errors.component.html',
})
export class FormErrorComponent {
  @Input() control: FormControl;

  /**
   * Checks if the control is invalid (contains any validation errors).
   * Also checks if the control was already touched (either with click or focus).
   * @returns boolean
   */
  shouldShowErrors(): boolean {
    return this.control.invalid && (this.control.dirty || this.control.touched);
  }

  /**
   * Retrieves error names from control's errors array.
   * @returns string[] List of errors' names
   */
  getErrorNames(): string[] {
    if (this.shouldShowErrors() && this?.control?.errors) {
      return Object.entries(this.control.errors)
        .filter(error => error[1])
        .map(error => error[0]);
    }

    return [];
  }
}
