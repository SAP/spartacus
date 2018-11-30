import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';

import { RoutingService } from '@spartacus/core';

import { Observable, Subscription, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../../../auth/facade/auth.service';
import { UserService } from '../../../user/facade/user.service';
import { Card } from '../../../ui/components/card/card.component';

@Component({
  selector: 'cx-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OrderDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private routingService: RoutingService
  ) {}

  order$: Observable<any>;
  subscription: Subscription;

  ngOnInit() {
    const userId$ = this.authService
      .getUserToken()
      .pipe(map(userData => userData.userId));

    const orderCode$ = this.routingService.routerState$.pipe(
      map(routingData => routingData.state.params.orderCode)
    );

    this.subscription = combineLatest(userId$, orderCode$).subscribe(
      ([userId, orderCode]) => {
        if (userId && orderCode) {
          this.userService.loadOrderDetails(userId, orderCode);
        }
      }
    );

    this.order$ = this.userService.orderDetails$;
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
    this.userService.clearOrderDetails();

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
