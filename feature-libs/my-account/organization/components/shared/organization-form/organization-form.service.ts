import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable()
export abstract class OrganizationFormService<T> {
  protected form: FormGroup;

  /**
   * Builds the form structure.
   */
  protected abstract build(item?: T): void;

  getForm(item?: T): FormGroup {
    if (!this.form) {
      this.build(item);
    }
    // while we should be able to reset with initial value, this doesn't always work
    // hence, we're patching afterwards.
    this.form.reset();
    this.form.enable();
    this.patchData(item);
    return this.form;
  }

  protected patchData(item?: T): void {
    this.form.patchValue({ ...this.defaultValue, ...item });
  }

  /**
   * returns the default form value.
   */
  protected get defaultValue(): T {
    return {} as T;
  }
}
