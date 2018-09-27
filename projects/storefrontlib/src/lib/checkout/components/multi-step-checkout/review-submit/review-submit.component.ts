import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnInit
} from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import * as fromCheckoutStore from '../../../store';
import * as fromUserStore from '../../../../user/store';
import * as fromCartStore from '../../../../cart/store';
import { CheckoutService } from '../../../services/checkout.service';
import { Address } from '../../../models/address-model';
import { Card } from '../../../../ui/components/card/card.component';

@Component({
  selector: 'y-review-submit',
  templateUrl: './review-submit.component.html',
  styleUrls: ['./review-submit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewSubmitComponent implements OnInit {
  @Input()
  deliveryAddress: Address;
  @Input()
  shippingMethod: string;
  @Input()
  paymentDetails: any;

  entries$: Observable<any>;
  cart$: Observable<any>;
  deliveryMode$: Observable<any>;
  countryName$: Observable<any>;

  constructor(
    protected store: Store<fromCheckoutStore.CheckoutState>,
    private service: CheckoutService
  ) {}

  ngOnInit() {
    this.cart$ = this.store.select(fromCartStore.getActiveCart);
    this.entries$ = this.store.select(fromCartStore.getEntries);

    this.deliveryMode$ = this.store
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
  }

  getAddressCard(countryName): Card {
    if (!countryName) {
      countryName = this.deliveryAddress.country.isocode;
    }

    let region = '';
    if (this.deliveryAddress.region && this.deliveryAddress.region.isocode) {
      region = this.deliveryAddress.region.isocode + ', ';
    }

    return {
      title: 'Ship To',
      textBold:
        this.deliveryAddress.firstName + ' ' + this.deliveryAddress.lastName,
      text: [
        this.deliveryAddress.line1,
        this.deliveryAddress.line2,
        this.deliveryAddress.town + ', ' + region + countryName,
        this.deliveryAddress.postalCode,
        this.deliveryAddress.phone
      ]
    };
  }

  getShippingMethodCard(deliveryMode): Card {
    if (deliveryMode) {
      return {
        title: 'Shipping Method',
        textBold: this.shippingMethod,
        text: [deliveryMode.description]
      };
    }
  }

  getPaymentCard(): Card {
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
