import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { B2BUnit } from '@spartacus/core';
import { CustomFormValidators } from '@spartacus/storefront';
import { OrganizationFormService } from '../../shared/organization-form/organization-form.service';

@Injectable({
  providedIn: 'root',
})
export class UnitFormService extends OrganizationFormService<B2BUnit> {
  protected patchData(item?: B2BUnit) {
    this.toggleParentUnit(item);
    super.patchData(item);
  }

  protected build() {
    const form = new FormGroup({});
    form.setControl(
      'uid',
      new FormControl('', [
        Validators.required,
        CustomFormValidators.noSpecialCharacters,
      ])
    );
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
        uid: new FormControl(null, Validators.required),
      })
    );

    this.form = form;
  }

  protected toggleParentUnit(item?: B2BUnit): void {
    if (this.isRootUnit(item)) {
      this.form?.removeControl('parentOrgUnit');
    } else if (!this.form.get('parentOrgUnit')) {
      this.form.setControl(
        'parentOrgUnit',
        new FormGroup({
          uid: new FormControl(null, Validators.required),
        })
      );
    }
  }

  protected isRootUnit(item: B2BUnit): boolean {
    return (
      item?.uid && (!item?.parentOrgUnit || item?.uid === item?.parentOrgUnit)
    );
  }
}
