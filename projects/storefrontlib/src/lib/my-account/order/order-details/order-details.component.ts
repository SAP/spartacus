import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromUserStore from '../../../user/store';
import * as fromAuthStore from '../../../auth/store';
import * as fromRoutingStore from '../../../routing/store';
import { Card } from '../../../ui/components/card/card.component';

@Component({
  selector: 'y-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OrderDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<fromUserStore.UserState>,
    private routingStore: Store<fromRoutingStore.State>
  ) {}

  order$: Observable<any>;
  subscription: Subscription;

  ngOnInit() {
    const userId$ = this.store.pipe(
      select(fromAuthStore.getUserToken),
      map(userData => userData.userId)
    );

    const orderCode$ = this.routingStore.pipe(
      select(fromRoutingStore.getRouterState),
      map(routingData => routingData.state.params.orderCode)
    );

    this.subscription = combineLatest(userId$, orderCode$).subscribe(
      ([userId, orderCode]) => {
        if (userId && orderCode) {
          this.store.dispatch(
            new fromUserStore.LoadOrderDetails({
              userId: userId,
              orderCode: orderCode
            })
          );
        }
      }
    );

    this.order$ = this.store.pipe(select(fromUserStore.getOrderDetails));
  }

  getAddressCardContent(address): Card {
    return {
      title: 'Ship to',
      textBold: `${address.firstName} ${address.lastName}`,
      text: [
        address.line1,
        address.line2,
        `${address.town}, ${address.country.isocode}, ${address.postalCode}`,
        address.phone
      ]
    };
  }

  getBillingAddressCardContent(billingAddress): Card {
    return {
      title: 'Bill To',
      textBold: `${billingAddress.firstName} ${billingAddress.lastName}`,
      text: [
        billingAddress.line1,
        billingAddress.line2,
        `${billingAddress.town}, ${billingAddress.country.isocode}, ${
          billingAddress.postalCode
        }`,
        billingAddress.phone
      ]
    };
  }

  getPaymentCardContent(payment): Card {
    return {
      title: 'Payment',
      textBold: payment.accountHolderName,
      text: [
        payment.cardType.name,
        payment.cardNumber,
        `Expires: ${payment.expiryMonth} / ${payment.expiryYear}`
      ]
    };
  }

  getShippingMethodCardContent(shipping): Card {
    return {
      title: 'Shipping Method',
      textBold: shipping.name,
      text: [shipping.description]
    };
  }

  getConsignmentProducts(consignment) {
    const products = [];
    consignment.entries.forEach(element => {
      products.push(element.orderEntry);
    });

    return products;
  }

  ngOnDestroy() {
    this.store.dispatch(new fromUserStore.ClearOrderDetails());

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
