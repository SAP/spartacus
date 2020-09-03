import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserGroup } from '@spartacus/my-account/organization/core';

@Injectable({
  providedIn: 'root',
})
export class UserGroupFormService {
  getForm(model?: UserGroup): FormGroup {
    const form = new FormGroup({});
    this.build(form);
    if (model) {
      form.patchValue(model);
    }
    return form;
  }

  protected build(form: FormGroup) {
    form.setControl('uid', new FormControl('', Validators.required));
    form.setControl('name', new FormControl('', Validators.required));
    form.setControl(
      'orgUnit',
      new FormGroup({
        uid: new FormControl(undefined, Validators.required),
      })
    );
  }
}
