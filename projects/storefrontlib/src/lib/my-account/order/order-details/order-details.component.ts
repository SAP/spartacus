import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as fromUserStore from '../../../user/store';
import * as fromAuthStore from './../../../auth/store';
import { OccOrderService } from './../../../occ/order/order.service';
import { Card } from '../../../ui/components/card/card.component';

// NOTE: this a work in progress component. The code here is not ready for production.
//
// This block of codes need to be re-considered. First, we can get 'orderCode' from routing store.
// Second, We don't call occ service from component. Occ Service should be called from store effect; and we read order details from store.

@Component({
  selector: 'y-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OrderDetailsComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  constructor(
    private service: OccOrderService,
    private usersStore: Store<fromUserStore.UserState>,
    private route: ActivatedRoute
  ) {}

  order$: Observable<any>;

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      if (params['orderCode']) {
        this.subscription = this.usersStore
          .select(fromAuthStore.getUserToken)
          .pipe(
            tap(userData => {
              this.order$ = this.service.getOrder(
                userData.userId,
                params['orderCode'],
                'FULL'
              );
            })
          )
          .subscribe();
        return;
      }
    });
  }

  getAddressCardContent(address): Card {
    let region = '';
    if (address.region && address.region.isocode) {
      region = address.region.isocode + ', ';
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
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
