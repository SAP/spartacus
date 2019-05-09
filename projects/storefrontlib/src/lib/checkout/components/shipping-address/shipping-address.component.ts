import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import {
  Address,
  CartDataService,
  CartService,
  CheckoutService,
  RoutingService,
  UserService,
} from '@spartacus/core';
import { CheckoutStepType } from '../../model/checkout-step.model';
import { CheckoutConfigService } from '../../checkout-config.service';
import { Card } from '../../../../shared/components/card/card.component';

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
  cards: Card[] = [];
  isLoading$: Observable<boolean>;
  selectedAddress: Address;
  goTo: CheckoutStepType;
  setAddress: Address;
  setAddressSub: Subscription;
  selectedAddressSub: Subscription;
  selectedAddress$: BehaviorSubject<Address> = new BehaviorSubject<Address>(
    null
  );
  cards$: Observable<CardWithAddress[]>;
  checkoutStepUrlNext: string;
  checkoutStepUrlPrevious: 'cart';

  constructor(
    protected userService: UserService,
    protected cartData: CartDataService,
    protected cartService: CartService,
    protected routingService: RoutingService,
    protected checkoutService: CheckoutService,
    private checkoutConfigService: CheckoutConfigService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.goTo = null;
    this.checkoutStepUrlNext = this.checkoutConfigService.getNextCheckoutStepUrl(
      this.activatedRoute
    );

    this.isLoading$ = this.userService.getAddressesLoading();
    this.existingAddresses$ = this.userService.getAddresses();
    this.cards$ = combineLatest(
      this.existingAddresses$,
      this.selectedAddress$.asObservable()
    ).pipe(
      map(([addresses, selected]) => {
        return addresses.map(address => {
          const card = this.getCardContent(address, selected);
          return {
            address,
            card,
          };
        });
      })
    );

    this.cartService.loadDetails();
    this.userService.loadAddresses(this.cartData.userId);

    this.setAddressSub = this.checkoutService
      .getDeliveryAddress()
      .subscribe(address => {
        this.setAddress = address;
        this.selectedAddress$.next(address);
        if (this.goTo) {
          this.goNext();
          this.goTo = null;
        }
      });
    this.selectedAddressSub = this.selectedAddress$.subscribe(address => {
      this.selectedAddress = address;
    });
  }

  getCardContent(address: Address, selected: any): Card {
    let region = '';
    if (address.region && address.region.isocode) {
      region = address.region.isocode + ', ';
    }
    const card: Card = {
      title: address.defaultAddress ? 'Default Shipping Address' : '',
      textBold: address.firstName + ' ' + address.lastName,
      text: [
        address.line1,
        address.line2,
        address.town + ', ' + region + address.country.isocode,
        address.postalCode,
        address.phone,
      ],
      actions: [{ name: 'Ship to this address', event: 'send' }],
      header: selected && selected.id === address.id ? 'SELECTED' : '',
    };

    this.cards.push(card);

    return card;
  }

  addressSelected(address: Address): void {
    this.selectedAddress$.next(address);
  }

  next(): void {
    this.addAddress({ address: this.selectedAddress, newAddress: false });
  }

  addAddress({
    newAddress,
    address,
  }: {
    newAddress: boolean;
    address: Address;
  }): void {
    if (newAddress) {
      this.checkoutService.createAndSetAddress(address);
      this.goTo = CheckoutStepType.deliveryMode;
      return;
    }
    if (
      this.setAddress &&
      this.selectedAddress &&
      this.setAddress.id === this.selectedAddress.id
    ) {
      this.goNext();
    } else {
      this.goTo = CheckoutStepType.deliveryMode;
      this.checkoutService.setDeliveryAddress(address);
    }
  }

  addNewAddress(address: Address): void {
    this.addAddress({ address, newAddress: true });
  }

  showNewAddressForm(): void {
    this.newAddressFormManuallyOpened = true;
  }

  hideNewAddressForm(goBack: boolean = false): void {
    this.newAddressFormManuallyOpened = false;
    if (goBack) {
      this.back();
    }
  }

  goNext(): void {
    this.routingService.go(this.checkoutStepUrlNext);
  }

  back(): void {
    this.routingService.go(this.checkoutStepUrlPrevious);
  }

  ngOnDestroy(): void {
    if (this.setAddressSub) {
      this.setAddressSub.unsubscribe();
    }
    if (this.selectedAddressSub) {
      this.selectedAddressSub.unsubscribe();
    }
  }
}
