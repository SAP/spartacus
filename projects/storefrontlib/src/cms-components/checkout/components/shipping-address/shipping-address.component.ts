import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
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
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Card } from '../../../../shared/components/card/card.component';
import { CheckoutConfigService } from '../../checkout-config.service';
import { CheckoutStepType } from '../../model/checkout-step.model';

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
  checkoutStepUrlPrevious: string;

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

    this.cartService.loadDetails();
    this.userAddressService.loadAddresses();

    this.setAddressSub = this.checkoutDeliveryService
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
      this.checkoutDeliveryService.createAndSetAddress(address);
      this.goTo = CheckoutStepType.DELIVERY_MODE;
      return;
    }
    if (
      this.setAddress &&
      this.selectedAddress &&
      this.setAddress.id === this.selectedAddress.id
    ) {
      this.goNext();
    } else {
      this.goTo = CheckoutStepType.DELIVERY_MODE;
      this.checkoutDeliveryService.setDeliveryAddress(address);
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
