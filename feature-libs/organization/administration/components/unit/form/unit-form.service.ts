import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { B2BUnit } from '@spartacus/core';
import { CustomFormValidators } from '@spartacus/storefront';
import { FormService } from '../../shared/form/form.service';

@Injectable({
  providedIn: 'root',
})
export class UnitFormService extends FormService<B2BUnit> {
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

    this.form = form;
    this.toggleParentUnit();
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
    // as we don't have full response after toggle item status,
    // we have situation where we have object like {uid, active},
    // so decided to check name as alternative required property
    return (
      item?.uid &&
      item?.name &&
      (!item?.parentOrgUnit || item?.uid === item?.parentOrgUnit)
    );
  }
}
