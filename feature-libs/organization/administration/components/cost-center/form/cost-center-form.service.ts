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
import { CostCenter } from '@spartacus/core';
import { CustomFormValidators } from '@spartacus/storefront';
import { FormService } from '../../shared/form/form.service';

@Injectable({
  providedIn: 'root',
})
export class CostCenterFormService extends FormService<CostCenter> {
  protected build() {
    const form = new UntypedFormGroup({});
    form.setControl(
      'code',
      new UntypedFormControl('', [
        Validators.required,
        CustomFormValidators.noSpecialCharacters,
      ])
    );
    form.setControl('name', new UntypedFormControl('', Validators.required));

    form.setControl(
      'currency',
      new UntypedFormGroup({
        isocode: new UntypedFormControl(undefined, Validators.required),
      })
    );
    form.setControl(
      'unit',
      new UntypedFormGroup({
        uid: new UntypedFormControl(undefined, Validators.required),
      })
    );
    this.form = form;
  }
}
