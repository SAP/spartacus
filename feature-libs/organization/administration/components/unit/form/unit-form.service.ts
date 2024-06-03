/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
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
    const form = new UntypedFormGroup({});
    form.setControl(
      'uid',
      new UntypedFormControl('', [
        Validators.required,
        CustomFormValidators.noSpecialCharacters,
      ])
    );
    form.setControl('name', new UntypedFormControl('', Validators.required));

    form.setControl(
      'approvalProcess',
      new UntypedFormGroup({
        code: new UntypedFormControl(null),
      })
    );

    this.form = form;
    this.toggleParentUnit();
  }

  protected toggleParentUnit(item?: B2BUnit): void {
    if (this.isRootUnit(item)) {
      this.form?.removeControl('parentOrgUnit');
    } else if (!this.form?.get('parentOrgUnit')) {
      this.form?.setControl(
        'parentOrgUnit',
        new UntypedFormGroup({
          uid: new UntypedFormControl(null, Validators.required),
        })
      );
    }
  }

  protected isRootUnit(item: B2BUnit | undefined): boolean {
    // as we don't have full response after toggle item status,
    // we have situation where we have object like {uid, active},
    // so decided to check name as alternative required property
    return Boolean(
      item?.uid &&
        item?.name &&
        (!item?.parentOrgUnit || item?.uid === item?.parentOrgUnit)
    );
  }
}
