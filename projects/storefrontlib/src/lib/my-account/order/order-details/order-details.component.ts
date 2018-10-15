import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, merge } from 'rxjs';
import { tap, map } from 'rxjs/operators';
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
  loaded: Boolean;

  private userId: string;
  private orderCode: string;

  ngOnInit() {
    this.subscription = merge(
      this.store.select(fromAuthStore.getUserToken).pipe(
        map(userData => {
          this.userId = userData.userId;
        })
      ),
      this.routingStore.select(fromRoutingStore.getRouterState).pipe(
        map(routingData => {
          this.orderCode = routingData.state.params.orderCode;
        })
      )
    ).subscribe();

    this.loaded = false;
    this.order$ = this.store.select(fromUserStore.getOrderDetails).pipe(
      tap(() => {
        if (!this.loaded && this.userId) {
          this.store.dispatch(
            new fromUserStore.LoadOrderDetails({
              userId: this.userId,
              orderCode: this.orderCode
            })
          );
          this.loaded = true;
        }
      })
    );
  }

  getAddressCardContent(address): Card {
    let region = '';
    if (address.country && address.country.isocode) {
      region = `${address.country.isocode}, `;
    }

    return {
      title: 'Ship to',
      textBold: `${address.firstName} ${address.lastName}`,
      text: [
        address.line1,
        address.line2,
        `${address.town}, ${region} ${address.country.isocode}`,
        address.postalCode,
        address.phone
      ]
    };
  }

  getShippingContent(shipping): Card {
    return {
      title: 'Shipping',
      textBold: shipping.name,
      text: [shipping.description]
    };
  }

  getShippingMethodContent(shipping): Card {
    return {
      title: 'Shipping Method',
      text: [shipping.name]
    };
  }

  getPaymentContent(payment): Card {
    return {
      title: 'Payment',
      textBold: payment.accountHolderName,
      text: [
        payment.cardNumber,
        `Expires: ${payment.expiryMonth} / ${payment.expiryYear}`
      ]
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
