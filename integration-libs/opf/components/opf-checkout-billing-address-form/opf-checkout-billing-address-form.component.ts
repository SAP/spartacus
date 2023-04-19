/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  CheckoutBillingAddressFacade,
  CheckoutDeliveryAddressFacade,
  CheckoutPaymentFacade,
} from '@spartacus/checkout/base/root';
import { Address, Country, UserPaymentService } from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { BehaviorSubject, combineLatest, EMPTY, Observable, of } from 'rxjs';
import { filter, map, shareReplay, switchMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-opf-checkout-billing-address-form',
  templateUrl: './opf-checkout-billing-address-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpfCheckoutBillingAddressFormComponent implements OnInit {
  iconTypes = ICON_TYPE;

  deliveryAddress$: Observable<Address | undefined>;
  countries$: Observable<Country[]>;

  protected readonly sameAsDeliveryAddressSub = new BehaviorSubject(true);
  protected readonly userCustomBillingAddressSub = new BehaviorSubject<
    Address | undefined
  >(undefined);
  protected readonly editBillingAddressSub = new BehaviorSubject(false);
  protected readonly isLoadingAddressSub = new BehaviorSubject(false);
  protected billingAddressId: string | undefined;

  sameAsDeliveryAddress$ = this.sameAsDeliveryAddressSub.asObservable();
  userCustomBillingAddress$ = this.userCustomBillingAddressSub.asObservable();
  editBillingAddress$ = this.editBillingAddressSub.asObservable();
  isLoadingAddress$ = this.isLoadingAddressSub.asObservable();

  constructor(
    protected checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade,
    protected checkoutBillingAddressFacade: CheckoutBillingAddressFacade,
    protected userPaymentService: UserPaymentService,
    protected checkoutPaymentService: CheckoutPaymentFacade,
    protected cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getCountries();
    this.getAddresses();
  }

  toggleSameAsDeliveryAddress(): void {
    this.sameAsDeliveryAddress$
      .pipe(take(1))
      .subscribe((isSameAsDeliveryAddress) => {
        this.sameAsDeliveryAddressSub.next(!isSameAsDeliveryAddress);

        if (isSameAsDeliveryAddress) {
          this.userCustomBillingAddressSub.next(undefined);
        } else if (
          !isSameAsDeliveryAddress &&
          !!this.userCustomBillingAddressSub.value
        ) {
          this.userCustomBillingAddressSub.next(undefined);
          this.putDeliveryAddressAsPaymentAddress();
        } else {
          this.editBillingAddressSub.next(true);
        }
      });
  }

  onSubmitAddress(address: Address): void {
    this.sameAsDeliveryAddress$
      .pipe(
        filter((isSameAsDeliveryAddress: boolean) => !isSameAsDeliveryAddress),
        switchMap(() => this.setBillingAddress(this.getAddressWithId(address))),
        take(1)
      )
      .subscribe((billingAddress: Address | undefined) => {
        this.userCustomBillingAddressSub.next(billingAddress);
        this.editBillingAddressSub.next(false);
      });
  }

  cancelAndHideForm() {
    this.editBillingAddress$.pipe(take(1)).subscribe((isEditBillingAddress) => {
      if (isEditBillingAddress) {
        this.editBillingAddressSub.next(false);
      } else {
        this.toggleSameAsDeliveryAddress();
      }
    });
  }

  editCustomBillingAddress() {
    this.editBillingAddressSub.next(true);
  }

  protected getCountries(): void {
    this.countries$ = this.userPaymentService.getAllBillingCountries().pipe(
      tap((countries) => {
        if (Object.keys(countries).length === 0) {
          this.userPaymentService.loadBillingCountries();
        }
      }),
      // we want to share data with the address form and prevent loading data twice
      shareReplay(1)
    );
  }

  protected putDeliveryAddressAsPaymentAddress(): void {
    this.deliveryAddress$
      .pipe(
        switchMap((address: Address | undefined) =>
          !!address
            ? this.setBillingAddress(this.getAddressWithId(address))
            : EMPTY
        ),
        take(1)
      )
      .subscribe();
  }

  protected setBillingAddress(
    address: Address
  ): Observable<Address | undefined> {
    return this.checkoutBillingAddressFacade.setBillingAddress(address).pipe(
      switchMap(() => this.checkoutBillingAddressFacade.getBillingAddress()),
      tap((address: Address | undefined) => {
        if (!!address && !!address.id) {
          this.billingAddressId = address.id;
        }
      })
    );
  }

  protected getAddressWithId(address: Address): Address {
    return { ...address, id: this.billingAddressId };
  }

  protected getAddresses(): void {
    this.isLoadingAddressSub.next(true);

    combineLatest([
      this.getDeliveryAddress(),
      this.getPaymentAddress(),
    ]).subscribe(
      ([deliveryAddress, paymentAddress]: [
        Address | undefined,
        Address | undefined
      ]) => {
        this.deliveryAddress$ = of(deliveryAddress);

        if (!paymentAddress && !!deliveryAddress) {
          this.setBillingAddress(deliveryAddress);
        }

        if (
          !!paymentAddress &&
          !!deliveryAddress &&
          paymentAddress.id !== deliveryAddress.id
        ) {
          this.billingAddressId = paymentAddress.id;
          this.userCustomBillingAddressSub.next(paymentAddress);
          this.sameAsDeliveryAddressSub.next(false);
        }

        this.isLoadingAddressSub.next(false);
        this.cd.markForCheck();
      }
    );
  }

  protected getDeliveryAddress(): Observable<Address | undefined> {
    return this.checkoutDeliveryAddressFacade.getDeliveryAddressState().pipe(
      filter((state) => !state.loading),
      map((state) => state.data)
    );
  }

  protected getPaymentAddress(): Observable<Address | undefined> {
    return this.checkoutBillingAddressFacade.getBillingAddress().pipe(take(1));
  }
}
