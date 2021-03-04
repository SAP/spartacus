import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class SavedCartFormService {
  descriptionMaxLength: number = 500;

  protected form: FormGroup;
  protected nameMaxLength: number = 50;

  getForm(item?: any): FormGroup {
    if (this.form && !!item) {
      this.patchData(item);
      return this.form;
    }

    if (!this.form) {
      this.build();
    }

    this.form.reset();
    this.form.enable();
    this.patchData(item);
    return this.form;
  }

  protected build() {
    const form = new FormGroup({});
    form.setControl(
      'name',
      new FormControl('', [
        Validators.required,
        Validators.maxLength(this.nameMaxLength),
      ])
    );
    form.setControl(
      'description',
      new FormControl('', [Validators.maxLength(this.descriptionMaxLength)])
    );
    this.form = form;
  }

  protected patchData(item?: any): void {
    this.form.patchValue({ ...item });
  }
}
