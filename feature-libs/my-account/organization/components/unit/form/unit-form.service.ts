import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { B2BUnit } from '@spartacus/core';
import { OrganizationFormService } from '../../shared/organization-form';

@Injectable({
  providedIn: 'root',
})
export class UnitFormService extends OrganizationFormService<B2BUnit> {
  // getForm(model?: B2BUnit): FormGroup {
  //   const form = new FormGroup({});
  //   this.build(form);
  //   if (model) {
  //     form.patchValue(model);
  //   }
  //   // disable parent unit select for root units
  //   if (model?.active && !model.parentOrgUnit?.uid) {
  //     form.removeControl('parentOrgUnit');
  //   }
  //   return form;
  // }

  getForm(item?: B2BUnit): FormGroup {
    const form = super.getForm(item);

    if (item && !item.parentOrgUnit) {
      // form.removeControl('parentOrgUnit');
      form.get('parentOrgUnit').disable();
    } else {
    }

    // disable parent unit select for root units

    // if (!item || !item.parentOrgUnit) {
    //   form.get('parentOrgUnit').enable();
    //   // form.get('parentOrgUnit')?.get('uid')?.setValidators(Validators.required);
    // } else {
    //   form.get('parentOrgUnit').disable();
    // }

    return form;
  }

  protected build() {
    const form = new FormGroup({});
    form.setControl('uid', new FormControl('', Validators.required));
    form.setControl('name', new FormControl('', Validators.required));

    form.setControl(
      'approvalProcess',
      new FormGroup({
        code: new FormControl(null),
      })
    );

    form.setControl(
      'parentOrgUnit',
      new FormGroup({
        uid: new FormControl(null),
        // , Validators.required
      })
    );

    this.form = form;
  }
}
