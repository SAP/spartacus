/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Optional,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  CheckoutDeliveryAddressFacade,
  CheckoutDeliveryModesFacade,
} from '@spartacus/checkout/base/root';
import {
  Address,
  getLastValueSync,
  GlobalMessageService,
  GlobalMessageType,
  TranslationService,
  UserAddressService,
} from '@spartacus/core';
import { Card, getAddressNumbers } from '@spartacus/storefront';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import { CheckoutStepService } from '../services/checkout-step.service';
import { CheckoutConfigService } from '../services';

export interface CardWithAddress {
  card: Card;
  address: Address;
}

@Component({
  selector: 'cx-delivery-address',
  templateUrl: './checkout-delivery-address.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutDeliveryAddressComponent implements OnInit {
  protected busy$ = new BehaviorSubject<boolean>(false);

  cards$: Observable<CardWithAddress[]>;
  isUpdating$: Observable<boolean>;

  addressFormOpened = false;
  doneAutoSelect = false;

  selectedAddress?: Address;

  get isGuestCheckout(): boolean {
    return !!getLastValueSync(this.activeCartFacade.isGuestCart());
  }

  get backBtnText(): string {
    return this.checkoutStepService.getBackBntText(this.activatedRoute);
  }

  get selectedAddress$(): Observable<Address | undefined> {
    return this.checkoutDeliveryAddressFacade.getDeliveryAddressState().pipe(
      filter((state) => !state.loading),
      map((state) => state.data),
      distinctUntilChanged((prev, curr) => prev?.id === curr?.id)
    );
  }

  // TODO(CXSPA-): make checkoutConfigService a required dependency
  constructor(
    userAddressService: UserAddressService,
    checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade,
    activatedRoute: ActivatedRoute,
    translationService: TranslationService,
    activeCartFacade: ActiveCartFacade,
    checkoutStepService: CheckoutStepService,
    checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade,
    globalMessageService: GlobalMessageService,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    checkoutConfigService: CheckoutConfigService
  );
  /**
   * @deprecated since 6.2
   */
  constructor(
    userAddressService: UserAddressService,
    checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade,
    activatedRoute: ActivatedRoute,
    translationService: TranslationService,
    activeCartFacade: ActiveCartFacade,
    checkoutStepService: CheckoutStepService,
    checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade,
    globalMessageService: GlobalMessageService
  );
  constructor(
    protected userAddressService: UserAddressService,
    protected checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade,
    protected activatedRoute: ActivatedRoute,
    protected translationService: TranslationService,
    protected activeCartFacade: ActiveCartFacade,
    protected checkoutStepService: CheckoutStepService,
    protected checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade,
    protected globalMessageService: GlobalMessageService,
    @Optional() protected checkoutConfigService?: CheckoutConfigService
  ) {}

  ngOnInit(): void {
    this.loadAddresses();

    this.cards$ = this.createCards();
    this.isUpdating$ = this.createIsUpdating();
  }

  getCardContent(
    address: Address,
    selected: any,
    textDefaultDeliveryAddress: string,
    textShipToThisAddress: string,
    textSelected: string,
    textPhone: string,
    textMobile: string
  ): Card {
    let region = '';
    if (address.region && address.region.isocode) {
      region = address.region.isocode + ', ';
    }

    /**
     * TODO: (#CXSPA-53) Remove feature config check in 6.0
     */
    const numbers = getAddressNumbers(address, textPhone, textMobile);

    return {
      role: 'region',
      title: address.defaultAddress ? textDefaultDeliveryAddress : '',
      textBold: address.firstName + ' ' + address.lastName,
      text: [
        address.line1,
        address.line2,
        address.town + ', ' + region + address.country?.isocode,
        address.postalCode,
        numbers,
      ],
      actions: [{ name: textShipToThisAddress, event: 'send' }],
      header: selected && selected.id === address.id ? textSelected : '',
      label: address.defaultAddress
        ? 'addressBook.defaultDeliveryAddress'
        : 'addressBook.additionalDeliveryAddress',
    } as Card;
  }

  selectAddress(address: Address): void {
    if (address?.id === getLastValueSync(this.selectedAddress$)?.id) {
      return;
    }

    this.globalMessageService.add(
      {
        key: 'checkoutAddress.deliveryAddressSelected',
      },
      GlobalMessageType.MSG_TYPE_INFO
    );

    this.setAddress(address);
  }

  addAddress(address: Address | undefined): void {
    if (
      !address &&
      this.shouldUseAddressSavedInCart() &&
      this.selectedAddress
    ) {
      this.next();
    }

    if (!address) {
      return;
    }

    this.busy$.next(true);
    this.doneAutoSelect = true;

    this.checkoutDeliveryAddressFacade
      .createAndSetAddress(address)
      .pipe(
        switchMap(() =>
          this.checkoutDeliveryModesFacade.clearCheckoutDeliveryMode()
        )
      )
      .subscribe({
        complete: () => {
          // we don't call onSuccess here, because it can cause a spinner flickering
          this.next();
        },
        error: () => {
          this.onError();
          this.doneAutoSelect = false;
        },
      });
  }

  showNewAddressForm(): void {
    this.addressFormOpened = true;
  }

  hideNewAddressForm(goPrevious: boolean = false): void {
    this.addressFormOpened = false;
    if (goPrevious) {
      this.back();
    }
  }

  next(): void {
    this.checkoutStepService.next(this.activatedRoute);
  }

  back(): void {
    this.checkoutStepService.back(this.activatedRoute);
  }

  protected loadAddresses(): void {
    if (!this.isGuestCheckout) {
      this.userAddressService.loadAddresses();
    }
  }

  protected createCards(): Observable<CardWithAddress[]> {
    const addresses$ = combineLatest([
      this.getSupportedAddresses(),
      this.selectedAddress$,
    ]);
    const translations$ = combineLatest([
      this.translationService.translate(
        'checkoutAddress.defaultDeliveryAddress'
      ),
      this.translationService.translate('checkoutAddress.shipToThisAddress'),
      this.translationService.translate('addressCard.selected'),
      this.translationService.translate('addressCard.phoneNumber'),
      this.translationService.translate('addressCard.mobileNumber'),
    ]);

    return combineLatest([addresses$, translations$]).pipe(
      tap(([[addresses, selected]]) =>
        this.selectDefaultAddress(addresses, selected)
      ),
      map(
        ([
          [addresses, selected],
          [textDefault, textShipTo, textSelected, textPhone, textMobile],
        ]) =>
          addresses?.map((address) => ({
            address,
            card: this.getCardContent(
              address,
              selected,
              textDefault,
              textShipTo,
              textSelected,
              textPhone,
              textMobile
            ),
          }))
      )
    );
  }

  protected selectDefaultAddress(
    addresses: Address[],
    selected: Address | undefined
  ): void {
    if (
      !this.doneAutoSelect &&
      addresses?.length &&
      (!selected || Object.keys(selected).length === 0)
    ) {
      selected = addresses.find((address) => address.defaultAddress);
      if (selected) {
        this.setAddress(selected);
      }
      this.doneAutoSelect = true;
    } else if (selected && this.shouldUseAddressSavedInCart()) {
      this.selectedAddress = selected;
    }
  }

  protected getSupportedAddresses(): Observable<Address[]> {
    return this.userAddressService.getAddresses();
  }

  protected createIsUpdating(): Observable<boolean> {
    return combineLatest([
      this.busy$,
      this.userAddressService.getAddressesLoading(),
      this.getAddressLoading(),
    ]).pipe(
      map(
        ([busy, userAddressLoading, deliveryAddressLoading]) =>
          busy || userAddressLoading || deliveryAddressLoading
      ),
      distinctUntilChanged()
    );
  }

  protected getAddressLoading(): Observable<boolean> {
    return this.checkoutDeliveryAddressFacade.getDeliveryAddressState().pipe(
      map((state) => state.loading),
      distinctUntilChanged()
    );
  }

  protected setAddress(address: Address): void {
    this.busy$.next(true);
    this.checkoutDeliveryAddressFacade
      .setDeliveryAddress(address)
      .pipe(
        switchMap(() =>
          this.checkoutDeliveryModesFacade.clearCheckoutDeliveryMode()
        )
      )
      .subscribe({
        complete: () => {
          this.onSuccess();
        },
        error: () => {
          this.onError();
        },
      });
  }

  protected onSuccess(): void {
    this.busy$.next(false);
  }

  protected onError(): void {
    this.busy$.next(false);
  }

  protected shouldUseAddressSavedInCart(): boolean {
    return !!this.checkoutConfigService?.shouldUseAddressSavedInCart();
  }
}
