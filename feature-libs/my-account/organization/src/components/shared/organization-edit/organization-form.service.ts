import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable()
export abstract class OrganizationFormService<T> {
  protected form: FormGroup;

  protected abstract build(): void;

  getForm(model?: T): FormGroup {
    if (!this.form) {
      this.build();
    }
    this.form.reset();
    if (model) {
      this.form.patchValue(model);
    }
    this.form.enable();
    return this.form;
  }
}
