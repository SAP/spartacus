import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ActiveCartService,
  Address,
  CheckoutDeliveryService,
  RoutingService,
  TranslationService,
  UserAddressService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { map, take, filter } from 'rxjs/operators';
import { Card } from '../../../../shared/components/card/card.component';
import { CheckoutConfigService } from '../../services/checkout-config.service';

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
  cards$: Observable<CardWithAddress[]>;
  selectedAddress$: Observable<Address>;
  forceLoader = false; // this helps with smoother steps transition
  isGuestCheckout = false;

  constructor(
    protected userAddressService: UserAddressService,
    protected routingService: RoutingService,
    protected checkoutDeliveryService: CheckoutDeliveryService,
    protected checkoutConfigService: CheckoutConfigService,
    protected activatedRoute: ActivatedRoute,
    protected translation: TranslationService,
    protected activeCartService: ActiveCartService
  ) {}

  ngOnInit() {
    this.isLoading$ = this.userAddressService.getAddressesLoading();
    this.existingAddresses$ = this.userAddressService.getAddresses();
    this.selectedAddress$ = this.checkoutDeliveryService.getDeliveryAddress();

    this.cards$ = combineLatest([
      this.existingAddresses$,
      this.selectedAddress$,
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
          if (
            addresses.length &&
            (!selected || Object.keys(selected).length === 0)
          ) {
            const defaultAddress = addresses.find(
              (address) => address.defaultAddress
            );
            selected = defaultAddress;
            this.selectAddress(defaultAddress);
          }
          return addresses.map((address) => {
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

    if (!this.activeCartService.isGuestCart()) {
      this.userAddressService.loadAddresses();
    } else {
      this.isGuestCheckout = true;
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
    this.selectedAddress$
      .pipe(
        filter((selected) => !!selected?.shippingAddress),
        take(1)
      )
      .subscribe(() => this.goNext());

    this.forceLoader = true;

    this.existingAddresses$.pipe(take(1)).subscribe((addresses) => {
      addresses.includes(address)
        ? this.selectAddress(address)
        : this.checkoutDeliveryService.createAndSetAddress(address);
    });
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
      this.checkoutConfigService.getPreviousCheckoutStepUrl(
        this.activatedRoute
      ) || 'cart'
    );
  }
}
