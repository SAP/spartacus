import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Address,
  CartService,
  CheckoutDeliveryService,
  RoutingService,
  TranslationService,
  UserAddressService,
} from '@spartacus/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Card } from '../../../../shared/components/card/card.component';
import { CheckoutConfigService } from '../../services/checkout-config.service';
import { CheckoutStepType } from '../..';

export interface CardWithAddress {
  card: Card;
  address: Address;
}

@Component({
  selector: 'cx-shipping-address',
  templateUrl: './shipping-address.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShippingAddressComponent implements OnInit, OnDestroy {
  existingAddresses$: Observable<Address[]>;
  newAddressFormManuallyOpened = false;
  isLoading$: Observable<boolean>;
  cards$: Observable<CardWithAddress[]>;
  selectedAddress$: Observable<
    Address
  > = this.checkoutDeliveryService.getDeliveryAddress();

  /**
   * @deprecated since version 1.0.4
   * This variable will no longer be in use. Use cards$ observable instead.
   * TODO(issue:#3921) deprecated since 1.0.4
   */
  cards: Card[] = [];
  /**
   * @deprecated since version 1.0.4
   * This variable will no longer be in use. Avoid using it.
   * TODO(issue:#3921) deprecated since 1.0.4
   */
  goTo: CheckoutStepType = null;
  /**
   * @deprecated since version 1.0.4
   * This variable will no longer be in use. Use selectAddress(address: Address) instead.
   * TODO(issue:#3921) deprecated since 1.0.4
   */
  setAddress: Address;
  /**
   * @deprecated since version 1.0.4
   * This variable will no longer be in use. Avoid using it.
   * TODO(issue:#3921) deprecated since 1.0.4
   */
  setAddressSub: Subscription;
  /**
   * @deprecated since version 1.0.4
   * This variable will no longer be in use. Use selectedAddress$ observable instead.
   * TODO(issue:#3921) deprecated since 1.0.4
   */
  selectedAddressSub: Subscription;
  /**
   * @deprecated since version 1.0.4
   * This variable will no longer be in use. Use CheckoutConfigService.getNextCheckoutStepUrl(this.activatedRoute) instead.
   * TODO(issue:#3921) deprecated since 1.0.4
   */
  checkoutStepUrlNext = this.checkoutConfigService.getNextCheckoutStepUrl(
    this.activatedRoute
  );
  /**
   * @deprecated since version 1.0.4
   * This variable will no longer be in use. Use CheckoutConfigService.getPreviousCheckoutStepUrl(this.activatedRoute) instead.
   * TODO(issue:#3921) deprecated since 1.0.4
   */
  checkoutStepUrlPrevious = 'cart';

  isGuestCheckout = false;

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
    this.goTo = null;
    this.checkoutStepUrlNext = this.checkoutConfigService.getNextCheckoutStepUrl(
      this.activatedRoute
    );
    this.checkoutStepUrlPrevious = 'cart';
    this.isLoading$ = this.userAddressService.getAddressesLoading();
    this.existingAddresses$ = this.userAddressService.getAddresses();

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
            (!selected || Object.keys(selected).length === 0) &&
            !this.selectedAddress // TODO(issue:#3921) Remove this
          ) {
            const defaultAddress = addresses.find(
              address => address.defaultAddress
            );
            selected = defaultAddress;
            this.selectAddress(defaultAddress);
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

    if (!this.cartService.isGuestCart()) {
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
    this.selectedAddress = address;
    this.checkoutDeliveryService.setDeliveryAddress(address);
  }

  /**
   * @deprecated since version 1.3
   * Use addAddress(address: Address) instead.
   * TODO(issue:#3921) deprecated since 1.3
   */
  addAddress(address: { newAddress: boolean; address: Address } | any);
  addAddress(
    address: Address | { newAddress: boolean; address: Address }
  ): void {
    const tempAddress: Address = address['address']
      ? address['address']
      : address;

    // TODO(issue:#3921) deprecated since 1.3
    if (address['address'] || address['newAddress']) {
      address['newAddress']
        ? this.checkoutDeliveryService.createAndSetAddress(tempAddress)
        : this.checkoutDeliveryService.setDeliveryAddress(tempAddress);
      this.goNext();
    } else {
      // TODO(issue:#3921) Use Instead
      this.existingAddresses$.pipe(take(1)).subscribe(addresses => {
        if (addresses.includes(tempAddress)) {
          this.checkoutDeliveryService.setDeliveryAddress(tempAddress);
        } else {
          this.checkoutDeliveryService.createAndSetAddress(tempAddress);
        }
        this.goNext();
      });
    }
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

  /**
   * @deprecated since version 1.0.4
   * This variable will no longer be in use. Use selectedAddress$ observable instead.
   * TODO(issue:#3921) deprecated since 1.0.4
   */
  selectedAddress: Address;

  /**
   * @deprecated since version 1.0.4
   * This variable will no longer be in use. Use selectAddress(address: Address) instead.
   * TODO(issue:#3921) deprecated since 1.0.4
   */
  addressSelected(address: Address): void {
    this.selectAddress(address);
  }

  /**
   * @deprecated since version 1.0.4
   * This method will no longer be in use. Use goPrevious() instead.
   * TODO(issue:#3921) deprecated since 1.0.4
   */
  back(): void {
    this.goPrevious();
  }

  /**
   * @deprecated since version 1.0.4
   * This method will no longer be in use. Use goNext() instead.
   * TODO(issue:#3921) deprecated since 1.0.4
   */
  next(): void {
    this.goNext();
  }

  /**
   * @deprecated since version 1.0.4
   * This method will no longer be in use. Use addAddress(address: Address) instead.
   * TODO(issue:#3921) deprecated since 1.0.4
   */
  addNewAddress(address: Address): void {
    this.addAddress(address);
  }

  /**
   * @deprecated since version 1.0.4
   * This method will no longer be in use. Remove.
   * TODO(issue:#3921) deprecated since 1.0.4
   */
  ngOnDestroy(): void {
    if (this.setAddressSub) {
      this.setAddressSub.unsubscribe();
    }
    if (this.selectedAddressSub) {
      this.selectedAddressSub.unsubscribe();
    }
  }
}
