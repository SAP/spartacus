import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  Address,
  CartDataService,
  CartService,
  CheckoutService,
  RoutingService,
  UserService,
  TranslationService,
} from '@spartacus/core';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Card } from '../../../../../shared/components/card/card.component';

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
  goTo: number;
  setAddress: Address;
  setAddressSub: Subscription;
  selectedAddressSub: Subscription;
  selectedAddress$: BehaviorSubject<Address> = new BehaviorSubject<Address>(
    null
  );
  cards$: Observable<CardWithAddress[]>;

  @Output()
  goToStep = new EventEmitter<any>();

  constructor(
    protected userService: UserService,
    protected cartData: CartDataService,
    protected cartService: CartService,
    protected routingService: RoutingService,
    protected checkoutService: CheckoutService,
    private translation: TranslationService
  ) {}

  ngOnInit() {
    this.goTo = null;
    this.cartService.loadDetails();
    this.isLoading$ = this.userService.getAddressesLoading();
    this.userService.loadAddresses(this.cartData.userId);
    this.setAddressSub = this.checkoutService
      .getDeliveryAddress()
      .subscribe(address => {
        this.setAddress = address;
        this.selectedAddress$.next(address);
        if (this.goTo) {
          this.goToStep.emit(this.goTo);
          this.goTo = null;
        }
      });
    this.selectedAddressSub = this.selectedAddress$.subscribe(address => {
      this.selectedAddress = address;
    });

    this.existingAddresses$ = this.userService.getAddresses();

    this.cards$ = combineLatest(
      this.existingAddresses$,
      this.selectedAddress$.asObservable(),
      this.translation.translate('checkoutAddress.defaultShippingAddress'),
      this.translation.translate('checkoutAddress.shipToThisAddress'),
      this.translation.translate('addressCard.selected')
    ).pipe(
      map(
        ([
          addresses,
          selected,
          textDefaultShippingAddress,
          textShipToThisAddress,
          textSelected,
        ]) => {
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
    const card: Card = {
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
      this.goTo = 2;
      return;
    }
    if (
      this.setAddress &&
      this.selectedAddress &&
      this.setAddress.id === this.selectedAddress.id
    ) {
      this.goToStep.emit(2);
    } else {
      this.goTo = 2;
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

  back(): void {
    this.routingService.go({ cxRoute: 'cart' });
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
