import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Output,
  Input,
  EventEmitter
} from '@angular/core';

import {
  RoutingService,
  Address,
  CartDataService,
  UserService
} from '@spartacus/core';

import { Observable } from 'rxjs';
import { tap, filter } from 'rxjs/operators';

import { Card } from '../../../../ui/components/card/card.component';

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

  @Input()
  selectedAddress: Address;
  @Output()
  addAddress = new EventEmitter<any>();

  constructor(
    protected userService: UserService,
    protected cartData: CartDataService,
    protected routingService: RoutingService
  ) {}

  ngOnInit() {
    this.isLoading$ = this.userService.getAddressesStateLoading();
    this.userService.loadAddresses(this.cartData.userId);

    this.existingAddresses$ = this.userService.getAddresses().pipe(
      tap(addresses => {
        if (this.cards.length === 0 && addresses) {
          addresses.forEach(address => {
            const card = this.getCardContent(address);
            if (
              this.selectedAddress &&
              this.selectedAddress.id === address.id
            ) {
              card.header = 'SELECTED';
            }
          });
        }
      }),
      filter(Boolean)
    );
  }

  getCardContent(address: Address): Card {
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
      actions: [{ name: 'Ship to this address', event: 'send' }]
    };

    this.cards.push(card);

    return card;
  }

  addressSelected(address: Address, index: number): void {
    this.selectedAddress = address;

    for (let i = 0; this.cards[i]; i++) {
      const card = this.cards[i];
      if (i === index) {
        card.header = 'SELECTED';
      } else {
        card.header = '';
      }
    }
  }

  next(): void {
    this.addAddress.emit({ address: this.selectedAddress, newAddress: false });
  }

  addNewAddress(address: Address): void {
    this.addAddress.emit({ address: address, newAddress: true });
  }

  showNewAddressForm(): void {
    this.newAddressFormManuallyOpened = true;
  }

  hideNewAddressForm(): void {
    this.newAddressFormManuallyOpened = false;
  }

  back(): void {
    this.routingService.go({ route: ['cart'] });
  }
}
