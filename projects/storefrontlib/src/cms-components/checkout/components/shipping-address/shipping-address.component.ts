import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ActiveCartService,
  Address,
  B2BAddress,
  CheckoutCostCenterService,
  CheckoutDeliveryService,
  PaymentTypeService,
  TranslationService,
  UserAddressService,
  UserCostCenterService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
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
  addressFormOpened = false;
  forceLoader = false; // this helps with smoother steps transition
  selectedAddress: Address;
  doneAutoSelect = false;
  isAccountPayment = false;

  constructor(
    protected userAddressService: UserAddressService,
    protected checkoutDeliveryService: CheckoutDeliveryService,
    protected activatedRoute: ActivatedRoute,
    protected translation: TranslationService,
    protected activeCartService: ActiveCartService,
    protected checkoutStepService: CheckoutStepService,
    protected paymentTypeService?: PaymentTypeService,
    protected userCostCenterService?: UserCostCenterService,
    protected checkoutCostCenterService?: CheckoutCostCenterService
  ) {}

  get isGuestCheckout(): boolean {
    return this.activeCartService.isGuestCart();
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
        this.selectDefaultAddress(addresses, selected)
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
    if (this.isAccountPayment) {
      let costCenterId: string;
      this.checkoutCostCenterService
        .getCostCenter()
        .pipe(take(1))
        .subscribe((selected) => (costCenterId = selected));
      return this.userCostCenterService
        .getCostCenterAddresses(costCenterId)
        .pipe(
          tap((addresses) => {
            if (addresses.length === 1) {
              this.selectAddress(addresses[0]);
            }
          })
        );
    } else {
      return this.userAddressService.getAddresses();
    }
  }

  selectDefaultAddress(addresses: Address[], selected: Address) {
    if (
      !this.doneAutoSelect &&
      addresses &&
      addresses.length &&
      (!selected || Object.keys(selected).length === 0)
    ) {
      selected = addresses.find((address) => address.defaultAddress);
      if (selected) {
        this.selectAddress(selected);
      }
      this.doneAutoSelect = true;
    }
  }

  ngOnInit(): void {
    if (this.paymentTypeService) {
      this.paymentTypeService
        .isAccountPayment()
        .pipe(take(1))
        .subscribe((isAccount) => (this.isAccountPayment = isAccount));
    }

    if (!this.isGuestCheckout && !this.isAccountPayment) {
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
