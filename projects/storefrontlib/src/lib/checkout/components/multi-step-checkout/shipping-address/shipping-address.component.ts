import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Output,
  Input,
  EventEmitter
} from '@angular/core';

import { RoutingService } from '@spartacus/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Address } from '../../../models/address-model';
import { CartDataService } from '../../../../cart/facade/cart-data.service';
import { UserService } from '../../../../user/facade/user.service';
import { Card } from '../../../../ui/components/card/card.component';

@Component({
  selector: 'cx-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShippingAddressComponent implements OnInit {
  existingAddresses$: Observable<any>;
  newAddressFormManuallyOpened = false;
  cards = [];
  isLoading$: Observable<any>;

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
    this.isLoading$ = this.userService.addressesLoading$;

    this.existingAddresses$ = this.userService.addresses$.pipe(
      tap(addresses => {
        if (addresses.length === 0) {
          this.userService.loadAddresses(this.cartData.userId);
        } else {
          if (this.cards.length === 0) {
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
        }
      })
    );
  }

  getCardContent(address): Card {
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

  addressSelected(address, index) {
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

  next() {
    this.addAddress.emit({ address: this.selectedAddress, newAddress: false });
  }

  addNewAddress(address) {
    this.addAddress.emit({ address: address, newAddress: true });
  }

  showNewAddressForm() {
    this.newAddressFormManuallyOpened = true;
  }

  hideNewAddressForm() {
    this.newAddressFormManuallyOpened = false;
  }

  back() {
    this.routingService.goToPage(['cart']);
  }
}
