import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Address,
  CartService,
  CheckoutDeliveryService,
  RoutingService,
  TranslationService,
  UserAddressService,
} from '@spartacus/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Card } from '../../../../shared/components/card/card.component';
import { CheckoutConfigService } from '../../checkout-config.service';

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
  existingAddresses$: Observable<Address[]>;
  newAddressFormManuallyOpened = false;
  isLoading$: Observable<boolean>;
  selectedAddress: Address;
  selectedAddress$: BehaviorSubject<Address> = new BehaviorSubject<Address>(
    null
  );
  cards$: Observable<CardWithAddress[]>;

  constructor(
    protected userAddressService: UserAddressService,
    protected cartService: CartService,
    protected routingService: RoutingService,
    protected checkoutDeliveryService: CheckoutDeliveryService,
    private checkoutConfigService: CheckoutConfigService,
    private activatedRoute: ActivatedRoute,
    private translation: TranslationService
  ) {}

  ngOnInit() {
    this.isLoading$ = this.userAddressService.getAddressesLoading();
    this.existingAddresses$ = this.userAddressService.getAddresses();
    this.cards$ = combineLatest([
      this.existingAddresses$,
      this.selectedAddress$.asObservable(),
      this.translation.translate('checkoutAddress.defaultShippingAddress'),
      this.translation.translate('checkoutAddress.shipToThisAddress'),
      this.translation.translate('addressCard.selected'),
    ]).pipe(
      map(
        ([
          addresses,
          selected,
          textDefaultShippingAddress,
          textShipToThisAddress,
          textSelected,
        ]) => {
          // Select default address if none selected
          if (selected && Object.keys(selected).length > 0) {
            this.selectedAddress = selected;
          } else {
            const defaultAddress = addresses.find(
              address => address.defaultAddress
            );
            selected = defaultAddress;
            this.selectedAddress = defaultAddress;
          }

          return addresses.map(address => {
            const card = this.getCardContent(
              address,
              selected,
              textDefaultShippingAddress,
              textShipToThisAddress,
              textSelected
            );
            return {
              address,
              card,
            };
          });
        }
      )
    );

    this.userAddressService.loadAddresses();
  }

  private getDefaultAddress(addresses: Address[]): Address {
    return addresses.find(address => address.defaultAddress);
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
    this.selectedAddress = address;
    this.selectedAddress$.next(address);
  }

  addAddress(address: Address): void {
    this.selectedAddress = address;
    this.checkoutDeliveryService.createAndSetAddress(address);
    this.goNext();
  }

  showNewAddressForm(): void {
    this.newAddressFormManuallyOpened = true;
  }

  hideNewAddressForm(goPrevious: boolean = false): void {
    this.newAddressFormManuallyOpened = false;
    if (goPrevious) {
      this.goPrevious();
    }
  }

  goNext(): void {
    this.routingService.go(
      this.checkoutConfigService.getNextCheckoutStepUrl(this.activatedRoute)
    );
  }

  goPrevious(): void {
    this.routingService.go(
      this.checkoutConfigService.getPreviousCheckoutStepUrl(this.activatedRoute)
    );
  }
}
