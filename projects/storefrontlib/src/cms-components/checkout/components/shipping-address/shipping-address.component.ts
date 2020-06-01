import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ActiveCartService,
  Address,
  B2BAddress,
  CheckoutDeliveryService,
  TranslationService,
  UserAddressService,
  PaymentTypeService,
  UserCostCenterService,
  CheckoutCostCenterService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';
import { Card } from '../../../../shared/components/card/card.component';
import { CheckoutStepService } from '../../services/checkout-step.service';

export interface CardWithAddress {
  card: Card;
  address: Address;
}

@Component({
  selector: 'cx-shipping-address',
  templateUrl: './shipping-address.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShippingAddressComponent implements OnInit {
  paymentType = '';
  addressFormOpened = false;
  forceLoader = false; // this helps with smoother steps transition
  selectedAddress: Address;

  constructor(
    protected userAddressService: UserAddressService,
    protected checkoutDeliveryService: CheckoutDeliveryService,
    protected activatedRoute: ActivatedRoute,
    protected translation: TranslationService,
    protected activeCartService: ActiveCartService,
    protected checkoutStepService: CheckoutStepService,
    protected paymentTypeService: PaymentTypeService,
    protected userCostCenterService: UserCostCenterService,
    protected checkoutCostCenterService: CheckoutCostCenterService
  ) {}

  get isGuestCheckout(): boolean {
    return this.activeCartService.isGuestCart();
  }

  get isAccount(): boolean {
    return this.paymentType === this.paymentTypeService.ACCOUNT_PAYMENT;
  }

  get backBtnText(): string {
    return this.checkoutStepService.getBackBntText(this.activatedRoute);
  }

  get isLoading$(): Observable<boolean> {
    return this.userAddressService.getAddressesLoading();
  }

  get selectedAddress$(): Observable<Address> {
    return this.checkoutDeliveryService.getDeliveryAddress().pipe(
      tap((address) => {
        if (
          address &&
          (this.selectedAddress === undefined ||
            this.selectedAddress.id !== address.id)
        ) {
          this.selectedAddress = address;
          if (this.forceLoader) {
            this.next();
          }
        }
      })
    );
  }

  get cards$(): Observable<CardWithAddress[]> {
    return combineLatest([
      this.getSupportedAddresses(),
      this.selectedAddress$,
      this.translation.translate('checkoutAddress.defaultShippingAddress'),
      this.translation.translate('checkoutAddress.shipToThisAddress'),
      this.translation.translate('addressCard.selected'),
    ]).pipe(
      tap(([addresses, selected]) =>
        this.setDefaultAddress(this.isAccount, addresses, selected)
      ),
      map(([addresses, selected, textDefault, textShipTo, textSelected]) =>
        (<any>addresses).map((address) => ({
          address,
          card: this.getCardContent(
            address,
            selected,
            textDefault,
            textShipTo,
            textSelected
          ),
        }))
      )
    );
  }

  getSupportedAddresses(): Observable<Address[] | B2BAddress[]> {
    if (this.isAccount) {
      let costCenterId: string;
      this.checkoutCostCenterService
        .getCostCenter()
        .pipe(take(1))
        .subscribe((selected) => (costCenterId = selected));
      return this.userCostCenterService.getCostCenterAddresses(costCenterId);
    } else {
      return this.userAddressService.getAddresses();
    }
  }

  setDefaultAddress(
    isAccount: boolean,
    addresses: Address[] | B2BAddress[],
    selected: Address
  ) {
    if (
      addresses &&
      addresses.length &&
      (!selected || Object.keys(selected).length === 0)
    ) {
      if (isAccount) {
        if (addresses.length === 1) {
          selected = addresses[0];
          this.selectAddress(selected);
        }
      } else {
        selected = addresses.find((address) => address.defaultAddress);
        this.selectAddress(selected);
      }
    }
  }

  ngOnInit(): void {
    this.paymentTypeService
      .getSelectedPaymentType()
      .pipe(take(1))
      .subscribe((selected) => (this.paymentType = selected));

    if (!this.isGuestCheckout && !this.isAccount) {
      this.userAddressService.loadAddresses();
    }
  }

  getCardContent(
    address: Address,
    selected: any,
    textDefaultShippingAddress: string,
    textShipToThisAddress: string,
    textSelected: string
  ): Card {
    let region = '';
    if (address.region && address.region.isocode) {
      region = address.region.isocode + ', ';
    }

    return {
      title: address.defaultAddress ? textDefaultShippingAddress : '',
      textBold: address.firstName + ' ' + address.lastName,
      text: [
        address.line1,
        address.line2,
        address.town + ', ' + region + address.country.isocode,
        address.postalCode,
        address.phone,
      ],
      actions: [{ name: textShipToThisAddress, event: 'send' }],
      header: selected && selected.id === address.id ? textSelected : '',
    };
  }

  selectAddress(address: Address): void {
    this.checkoutDeliveryService.setDeliveryAddress(address);
  }

  addAddress(address: Address): void {
    this.forceLoader = true;
    this.checkoutDeliveryService.createAndSetAddress(address);
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
}
