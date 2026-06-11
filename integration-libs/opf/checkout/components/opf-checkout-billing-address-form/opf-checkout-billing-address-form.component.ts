/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import { CheckoutStepService } from '@spartacus/checkout/base/components';
import {
  Address,
  Country,
  TranslatePipe,
  UserAddressService,
} from '@spartacus/core';
import {
  CardComponent,
  ICON_TYPE,
  IconComponent,
  SpinnerComponent,
} from '@spartacus/storefront';
import { AddressFormComponent } from '@spartacus/user/profile/components';
import { Observable, Subscription } from 'rxjs';
import { GetAddressCardContent } from './get-address-card-content.pipe';
import { OpfCheckoutBillingAddressFormService } from './opf-checkout-billing-address-form.service';

@Component({
  selector: 'cx-opf-checkout-billing-address-form',
  templateUrl: './opf-checkout-billing-address-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    CardComponent,
    IconComponent,
    AddressFormComponent,
    SpinnerComponent,
    AsyncPipe,
    TranslatePipe,
    GetAddressCardContent,
  ],
})
export class OpfCheckoutBillingAddressFormComponent
  implements OnInit, OnDestroy
{
  protected service = inject(OpfCheckoutBillingAddressFormService);
  protected userAddressService = inject(UserAddressService);
  protected activeCartFacade = inject(ActiveCartFacade);
  protected checkoutStepService = inject(CheckoutStepService);
  protected activatedRoute = inject(ActivatedRoute);

  protected cart: Cart | null = null;

  iconTypes = ICON_TYPE;
  subscription = new Subscription();

  billingAddress$ = this.service.billingAddress$;
  isLoadingAddress$ = this.service.isLoadingAddress$;
  isSameAsDelivery$ = this.service.isSameAsDelivery$;

  isEditBillingAddress = false;
  isAddingBillingAddressInProgress = false;

  countries$: Observable<Country[]>;

  ngOnInit() {
    this.subscription.add(
      this.activeCartFacade.getActive().subscribe((cart) => (this.cart = cart))
    );
    this.countries$ = this.service.getCountries();
    this.userAddressService.loadAddresses();
    this.service.setDefaultBillingAddress();
    this.service.getAddresses();
    this.subscription.add(
      this.service.pickupNoDefaultAddress$.subscribe(() => {
        this.isEditBillingAddress = true;
        this.isAddingBillingAddressInProgress = true;
      })
    );
  }

  cancelAndHideForm(): void {
    this.isEditBillingAddress = false;
    if (this.isAddingBillingAddressInProgress) {
      this.service.setIsSameAsDeliveryValue(true);
      this.isAddingBillingAddressInProgress = false;
    }
  }
  back(): void {
    this.checkoutStepService.back(this.activatedRoute);
  }

  onBackToAddress(): void {
    this.subscription.add(
      this.service.paymentOptionsDisabled$.subscribe((isDisabled) =>
        isDisabled ? this.back() : this.cancelAndHideForm()
      )
    );
  }

  editCustomBillingAddress(): void {
    this.isEditBillingAddress = true;
  }

  toggleSameAsDeliveryAddress(event: Event): void {
    const checked = (<HTMLInputElement>event.target).checked;
    this.service.setIsSameAsDeliveryValue(checked);
    if (checked) {
      this.service.setDeliveryAddressAsPaymentAddress();
      this.isEditBillingAddress = false;
    } else {
      this.isAddingBillingAddressInProgress = true;
      this.isEditBillingAddress = true;
    }
  }

  getAddressData(billingAddress: Address | undefined | null): Address {
    return !!billingAddress?.id && !this.isAddingBillingAddressInProgress
      ? billingAddress
      : {};
  }

  onSubmitAddress(address: Address): void {
    this.isEditBillingAddress = false;
    this.isAddingBillingAddressInProgress = false;

    if (!address) {
      return;
    }

    this.service.setIsSameAsDeliveryValue(false);
    this.service.setBillingAddress(address).subscribe({
      next: () => {
        this.service.setPaymentOptionsDisabled(false);
      },
      error: () => {
        this.service.setPaymentOptionsDisabled(true);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
