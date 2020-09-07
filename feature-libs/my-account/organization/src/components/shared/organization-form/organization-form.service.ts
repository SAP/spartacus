import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable()
export abstract class OrganizationFormService<T> {
  protected form: FormGroup;

  protected abstract build(): void;

  getForm(item?: T): FormGroup {
    if (!this.form) {
      this.build();
    }
    this.form.reset();
    if (item) {
      this.form.patchValue(item);
    }
    this.form.enable();
    return this.form;
  }
}
