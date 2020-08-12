import { Injectable } from '@angular/core';
import { B2BUnit } from '@spartacus/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UnitFormService {
  getForm(model?: B2BUnit): FormGroup {
    const form = new FormGroup({});
    this.build(form);
    if (model) {
      form.patchValue(model);
    }
    // disable parent unit select for root units
    if (model?.active && !model.parentOrgUnit?.uid) {
      form.removeControl('parentOrgUnit');
    }
    return form;
  }

  protected build(form: FormGroup) {
    form.setControl('uid', new FormControl('', Validators.required));
    form.setControl('name', new FormControl('', Validators.required));

    form.setControl(
      'parentOrgUnit',
      new FormGroup({
        uid: new FormControl(null, Validators.required),
      })
    );
    form.setControl(
      'approvalProcess',
      new FormGroup({
        code: new FormControl(null),
      })
    );
  }
}
