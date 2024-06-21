/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Address } from '@spartacus/core';

@Injectable()
export class CheckoutBillingAddressFormService {
  protected fb: UntypedFormBuilder = inject(UntypedFormBuilder);
  protected billingAddress: Address | undefined = undefined;
  private form: UntypedFormGroup;
  getBillingAddressForm(): UntypedFormGroup {
    if (!this.form) {
      this.form = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        line1: ['', Validators.required],
        line2: [''],
        town: ['', Validators.required],
        region: this.fb.group({
          isocodeShort: [null, Validators.required],
        }),
        country: this.fb.group({
          isocode: [null, Validators.required],
        }),
        postalCode: ['', Validators.required],
      });
    }
    return this.form;
  }

  setDeliveryAddressAsBillingAddress(address: Address | undefined) {
    this.billingAddress = address;
  }

  isBillingAddressSameAsDeliveryAddress(): boolean {
    if (this.billingAddress === undefined) {
      return false;
    }
    return true;
  }

  isBillingAddressFormValid(): boolean {
    return this.getBillingAddressForm().valid;
  }

  markAllAsTouched() {
    this.getBillingAddressForm().markAllAsTouched();
  }

  getBillingAddress(): Address {
    if (this.billingAddress) {
      // billing address same as delivery address
      return this.billingAddress;
    } else {
      // billing address and delivery address are different
      return this.getBillingAddressForm().value;
    }
  }
}
