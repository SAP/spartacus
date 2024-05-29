/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit, inject } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { CheckoutDeliveryAddressFacade } from '@spartacus/checkout/base/root';
import {
  Address,
  AddressValidation,
  Country,
  GlobalMessageService,
  GlobalMessageType,
  Region,
  TranslationService,
  UserAddressService,
  UserPaymentService,
} from '@spartacus/core';
import {
  Card,
  LAUNCH_CALLER,
  LaunchDialogService,
  getAddressNumbers,
} from '@spartacus/storefront';
import {
  BehaviorSubject,
  EMPTY,
  Observable,
  combineLatest,
  filter,
  map,
  switchMap,
  tap,
} from 'rxjs';
import { CheckoutBillingAddressFormService } from './checkout-billing-address-form.service';

@Component({
  selector: 'cx-checkout-billing-address-form',
  templateUrl: './checkout-billing-address-form.component.html',
})
export class CheckoutBillingAddressFormComponent implements OnInit {
  showSameAsDeliveryAddressCheckbox$: Observable<boolean>;
  sameAsDeliveryAddress = true;
  deliveryAddress$: Observable<Address | undefined>;
  countries$: Observable<Country[]>;
  regions$: Observable<Region[]>;
  selectedCountry$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  protected checkoutDeliveryAddressFacade = inject(
    CheckoutDeliveryAddressFacade
  );
  protected userPaymentService = inject(UserPaymentService);
  protected globalMessageService = inject(GlobalMessageService);
  protected userAddressService = inject(UserAddressService);
  protected launchDialogService = inject(LaunchDialogService);
  protected translationService = inject(TranslationService);
  protected billingAddressFormService = inject(
    CheckoutBillingAddressFormService
  );
  ngOnInit(): void {
    this.countries$ = this.userPaymentService.getAllBillingCountries().pipe(
      tap((countries) => {
        // If the store is empty fetch countries. This is also used when changing language.
        if (Object.keys(countries).length === 0) {
          this.userPaymentService.loadBillingCountries();
        }
      })
    );
    this.deliveryAddress$ = this.checkoutDeliveryAddressFacade
      .getDeliveryAddressState()
      .pipe(
        filter((state) => !state.loading),
        map((state) => {
          this.billingAddressFormService.setDeliveryAddressAsBillingAddress(
            state.data
          );
          return state.data;
        })
      );
    this.showSameAsDeliveryAddressCheckbox$ = combineLatest([
      this.countries$,
      this.deliveryAddress$,
    ]).pipe(
      map(([countries, address]) => {
        return (
          (address?.country &&
            !!countries.filter(
              (country: Country): boolean =>
                country.isocode === address.country?.isocode
            ).length) ??
          false
        );
      }),
      tap((shouldShowCheckbox) => {
        this.sameAsDeliveryAddress = shouldShowCheckbox;
      })
    );
    this.regions$ = this.selectedCountry$.pipe(
      switchMap((country) => this.userAddressService.getRegions(country)),
      tap((regions) => {
        const regionControl = this.billingAddressForm.get(
          'region.isocodeShort'
        );
        if (regions.length > 0) {
          regionControl?.enable();
        } else {
          regionControl?.disable();
        }
      })
    );
  }
  billingAddressForm: UntypedFormGroup =
    this.billingAddressFormService.getBillingAddressForm();

  toggleSameAsDeliveryAddress(): void {
    this.sameAsDeliveryAddress = !this.sameAsDeliveryAddress;
    if (this.sameAsDeliveryAddress) {
      this.deliveryAddress$.subscribe((address) => {
        this.billingAddressFormService.setDeliveryAddressAsBillingAddress(
          address
        );
      });
    } else {
      this.billingAddressFormService.setDeliveryAddressAsBillingAddress(
        undefined
      );
    }
  }
  /**
   *TODO: This method is not used, but should be. It triggers suggested addresses modal under the hood.
   *
   * See ticket CXSPA-1276
   */
  verifyAddress(): void {
    if (!this.sameAsDeliveryAddress) {
      this.userAddressService
        .verifyAddress(this.billingAddressForm.value)
        .subscribe((result) => {
          this.handleAddressVerificationResults(result);
        });
    }
  }
  protected handleAddressVerificationResults(results: AddressValidation) {
    if (results.decision === 'ACCEPT') {
      //continue
    } else if (results.decision === 'REJECT') {
      this.globalMessageService.add(
        { key: 'addressForm.invalidAddress' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    } else if (results.decision === 'REVIEW') {
      this.openSuggestedAddress(results);
    }
  }

  countrySelected(country: Country): void {
    this.billingAddressForm.get('country.isocode')?.setValue(country.isocode);
    this.selectedCountry$.next(country.isocode as string);
  }
  //TODO: Add elementRef to trigger button when verifyAddress is used.
  openSuggestedAddress(results: AddressValidation): void {
    this.launchDialogService.openDialogAndSubscribe(
      LAUNCH_CALLER.SUGGESTED_ADDRESSES,
      undefined,
      {
        enteredAddress: this.billingAddressForm.value,
        suggestedAddresses: results.suggestedAddresses,
      }
    );
    //TODO: Add logic that handle dialog's actions. Scope of CXSPA-1276
  }
  getAddressCardContent(address: Address): Observable<Card> {
    return this.translationService
      ? combineLatest([
          this.translationService.translate('addressCard.phoneNumber'),
          this.translationService.translate('addressCard.mobileNumber'),
        ]).pipe(
          map(([textPhone, textMobile]) => {
            let region = '';
            if (address.region && address.region.isocode) {
              region = address.region.isocode + ', ';
            }
            const numbers = getAddressNumbers(address, textPhone, textMobile);

            return {
              textBold: address.firstName + ' ' + address.lastName,
              text: [
                address.line1,
                address.line2,
                address.town + ', ' + region + address.country?.isocode,
                address.postalCode,
                numbers,
              ],
            } as Card;
          })
        )
      : EMPTY;
  }
}
