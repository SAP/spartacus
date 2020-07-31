import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { B2BUser } from '@spartacus/core';
import { CustomFormValidators } from '@spartacus/storefront';

@Injectable({
  providedIn: 'root',
})
export class UserFormService {
  getForm(model?: B2BUser): FormGroup {
    const form = new FormGroup({});
    this.build(form);
    if (model) {
      form.patchValue(model);
    }
    return form;
  }

  protected build(form: FormGroup) {
    form.setControl('titleCode', new FormControl(''));
    form.setControl(
      'email',
      new FormControl('', [
        Validators.required,
        CustomFormValidators.emailValidator,
      ])
    );
    form.setControl('firstName', new FormControl('', Validators.required));
    form.setControl('lastName', new FormControl('', Validators.required));
    form.setControl(
      'orgUnit',
      new FormGroup({
        uid: new FormControl(undefined, Validators.required),
      })
    );
    form.setControl('isAssignedToApprovers', new FormControl(false));
    form.setControl('roles', new FormArray([]));
  }
}
