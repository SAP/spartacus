/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Address, FeatureToggles } from '@spartacus/core';

@Injectable()
export class CheckoutBillingAddressFormService {
  protected fb: UntypedFormBuilder = inject(UntypedFormBuilder);
  protected billingAddress: Address | undefined = undefined;
  protected readonly maxFieldLength = 256;
  private featureToggles = inject(FeatureToggles);
  private form: UntypedFormGroup;
  getBillingAddressForm(): UntypedFormGroup {
    if (!this.form) {
      const maxLength = this.featureToggles.enableFormFieldMaxLength
        ? [Validators.maxLength(this.maxFieldLength)]
        : [];
      this.form = this.fb.group({
        firstName: ['', [Validators.required, ...maxLength]],
        lastName: ['', [Validators.required, ...maxLength]],
        line1: ['', [Validators.required, ...maxLength]],
        line2: ['', maxLength],
        town: ['', [Validators.required, ...maxLength]],
        region: this.fb.group({
          isocodeShort: [null, Validators.required],
        }),
        country: this.fb.group({
          isocode: [null, Validators.required],
        }),
        postalCode: ['', [Validators.required, ...maxLength]],
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
