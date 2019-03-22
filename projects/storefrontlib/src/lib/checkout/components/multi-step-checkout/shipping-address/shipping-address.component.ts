import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import {
  RoutingService,
  Address,
  CartDataService,
  UserService,
  CheckoutService,
  CartService
} from '@spartacus/core';
import { Card } from '../../../../ui/components/card/card.component';

export interface CardWithAddress {
  card: Card;
  address: Address;
}

@Component({
  selector: 'cx-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShippingAddressComponent implements OnInit {
  existingAddresses$: Observable<Address[]>;
  newAddressFormManuallyOpened = false;
  cards: Card[] = [];
  isLoading$: Observable<boolean>;
  selectedAddress: Address;
  goTo: number;
  setAddress: Address;
  setAddress$: Observable<Address>;
  selectedAddress$: BehaviorSubject<Address> = new BehaviorSubject<Address>(
    null
  );
  cards$: Observable<CardWithAddress[]>;

  // @Input()
  // selectedAddress: Address;
  // @Output()
  // addAddress = new EventEmitter<any>();
  @Output()
  goToStep = new EventEmitter<any>();

  constructor(
    protected userService: UserService,
    protected cartData: CartDataService,
    protected cartService: CartService,
    protected routingService: RoutingService,
    protected checkoutService: CheckoutService
  ) {}

  ngOnInit() {
    this.goTo = null;
    this.cartService.loadDetails();
    this.isLoading$ = this.userService.getAddressesLoading();
    this.userService.loadAddresses(this.cartData.userId);
    this.setAddress$ = this.checkoutService.getDeliveryAddress().pipe(
      tap(address => {
        console.log(address);
        this.setAddress = address;
        this.selectedAddress = address;
        this.selectedAddress$.next(address);
        if (this.goTo) {
          this.goToStep.emit(this.goTo);
        }
      })
    );
    this.selectedAddress$.subscribe(address => {
      console.log(address);
      this.selectedAddress = address;
    });

    this.existingAddresses$ = this.userService.getAddresses();
    // .pipe(
    //   tap(addresses => {
    //     if (this.cards.length === 0 && addresses) {
    //       addresses.forEach(address => {
    //         const card = this.getCardContent(address);
    //         if (
    //           this.selectedAddress &&
    //           this.selectedAddress.id === address.id
    //         ) {
    //           card.header = 'SELECTED';
    //         }
    //       });
    //     }
    //   }),
    //   filter(Boolean)
    // );

    this.cards$ = combineLatest(
      this.existingAddresses$,
      this.selectedAddress$.asObservable()
    ).pipe(
      map(([addresses, selected]) => {
        return addresses.map(address => {
          const card = this.getCardContent(address, selected);
          return {
            address: address,
            card: card
          };
        });
      })
    );
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
        address.phone
      ],
      actions: [{ name: 'Ship to this address', event: 'send' }],
      header: selected && selected.id === address.id ? 'SELECTED' : ''
    };

    this.cards.push(card);

    return card;
  }

  addressSelected(address: Address): void {
    this.selectedAddress$.next(address);

    // for (let i = 0; this.cards[i]; i++) {
    //   const card = this.cards[i];
    //   if (i === index) {
    //     card.header = 'SELECTED';
    //   } else {
    //     card.header = '';
    //   }
    // }
  }

  next(): void {
    this.addAddress({ address: this.selectedAddress, newAddress: false });
  }

  addAddress({
    newAddress,
    address
  }: {
    newAddress: boolean;
    address: Address;
  }): void {
    if (newAddress) {
      this.checkoutService.createAndSetAddress(address);
      return;
    }
    // if the selected address is the same as the cart's one
    if (this.setAddress && address.id === this.setAddress.id) {
      // this.goToStep.emit(2);
      this.goTo = 2;
      return;
    }
    this.checkoutService.setDeliveryAddress(address);
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

  back(): void {
    this.routingService.go({ route: ['cart'] });
  }
}
