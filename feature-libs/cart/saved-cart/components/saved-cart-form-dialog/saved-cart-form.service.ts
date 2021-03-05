import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class SavedCartFormService {
  protected form: FormGroup;

  getForm(
    nameMaxLength: number,
    descriptionMaxLength: number,
    item?: any
  ): FormGroup {
    if (this.form && !!item) {
      this.patchData(item);
      return this.form;
    }

    if (!this.form) {
      this.build(nameMaxLength, descriptionMaxLength);
    }

    this.form.reset();
    this.form.enable();
    this.patchData(item);
    return this.form;
  }

  protected build(nameMaxLength: number, descriptionMaxLength: number) {
    const form = new FormGroup({});
    form.setControl(
      'name',
      new FormControl('', [
        Validators.required,
        Validators.maxLength(nameMaxLength),
      ])
    );
    form.setControl(
      'description',
      new FormControl('', [Validators.maxLength(descriptionMaxLength)])
    );
    this.form = form;
  }

  protected patchData(item?: any): void {
    this.form.patchValue({ ...item });
  }
}
