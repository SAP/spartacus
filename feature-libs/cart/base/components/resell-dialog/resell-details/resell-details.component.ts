/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'cx-resell',
  templateUrl: './resell-details.component.html',
})
export class ResellDetailsComponent {
  form: UntypedFormGroup = new UntypedFormGroup({
    condition: new UntypedFormControl('', Validators.required),
    price: new UntypedFormControl(0, Validators.required),
    postageOrDeliveryOption: new UntypedFormControl('', Validators.required),
    message: new UntypedFormControl('', Validators.required),
  });

  conditions = [{ code: 'new', name: 'New' }];

  postageOrDeliveryOption = [
    { code: 'collection', name: 'Collection' },
    { code: 'delivery', name: 'Delivery £5' },
  ];

  constructor() {
    // Intentional empty constructor
  }

  submitLogin() {
    console.log(this.form);
    return false;
  }
}
