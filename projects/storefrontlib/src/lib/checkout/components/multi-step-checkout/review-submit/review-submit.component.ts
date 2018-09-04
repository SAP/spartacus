import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  OnInit,
  EventEmitter
} from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import * as fromCheckoutStore from '../../../store';
import * as fromUserStore from '../../../../user/store';
import * as fromCartStore from '../../../../cart/store';
import { CheckoutService } from '../../../services/checkout.service';
import { Address } from '../../../models/address-model';

@Component({
  selector: 'y-review-submit',
  templateUrl: './review-submit.component.html',
  styleUrls: ['./review-submit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewSubmitComponent implements OnInit {
  labels = {
    title: 'Review',
    cartTotal: 'Cart total (3 items): $300.00',
    orderItems: 'Order Items',
    btnBack: 'Back',
    btnPlaceOrder: 'Place Order'
  };

  @Input() deliveryAddress: Address;
  @Input() shippingMethod: string;
  @Input() paymentDetails: any;

  @Output() backStep = new EventEmitter<any>();
  @Output() placeOrder = new EventEmitter<any>();

  //deliveryMode$: Observable<any>;
  //countryName$: Observable<any>;
  //titleName$: Observable<any>;
  tAndCToggler = false;
  entries$: Observable<any>;

  constructor(
    protected store: Store<fromCheckoutStore.CheckoutState>,
    private service: CheckoutService
  ) {}

  ngOnInit() {
    this.entries$ = this.store.select(fromCartStore.getEntries);

    /*(this.deliveryMode$ = this.store
      .select(fromCheckoutStore.getSelectedDeliveryMode)
      .pipe(
        tap(selected => {
          if (selected === null) {
            this.service.loadSupportedDeliveryModes();
          }
        })
      );

    this.countryName$ = this.store
      .select(
        fromUserStore.countrySelectorFactory(
          this.deliveryAddress.country.isocode
        )
      )
      .pipe(
        tap(country => {
          if (country === null) {
            this.store.dispatch(new fromUserStore.LoadDeliveryCountries());
          }
        })
      );

    this.titleName$ = this.store
      .select(
        fromUserStore.titleSelectorFactory(this.deliveryAddress.titleCode)
      )
      .pipe(
        tap(title => {
          if (title === null) {
            this.store.dispatch(new fromUserStore.LoadTitles());
          }
        })
      );*/
  }

  toggleTAndC() {
    this.tAndCToggler = !this.tAndCToggler;
  }

  back() {
    this.backStep.emit();
  }

  submitOrder() {
    this.placeOrder.emit();
  }

  getAddressCard() {
    return {
      title: 'Ship To',
      textBold:
        this.deliveryAddress.firstName + ' ' + this.deliveryAddress.lastName,
      text: [
        this.deliveryAddress.line1,
        this.deliveryAddress.line2,
        this.deliveryAddress.town +
          ', ' +
          this.deliveryAddress.region.isocode +
          ', ' +
          this.deliveryAddress.country.isocode,
        this.deliveryAddress.postalCode,
        this.deliveryAddress.phone
      ]
    };
  }

  getShippingMethodCard() {
    return {
      title: 'Shipping Method',
      text: [this.shippingMethod]
    };
  }

  getPaymentCard() {
    return {
      title: 'Payment',
      textBold: this.paymentDetails.accountHolderName,
      text: [
        this.paymentDetails.cardNumber,
        'Expires: ' +
          this.paymentDetails.expiryMonth +
          '/' +
          this.paymentDetails.expiryYear
      ]
    };
  }
}
