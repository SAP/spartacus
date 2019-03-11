import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  RoutingService,
  Order,
  AuthService,
  UserService, Address, PaymentDetails, DeliveryMode, Consignment, OrderEntry
} from '@spartacus/core';

import { Observable, Subscription, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Card } from '../../../../ui/components/card/card.component';

@Component({
  selector: 'cx-order-details-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private routingService: RoutingService
  ) {}

  order$: Observable<Order>;
  subscription: Subscription;


  ngOnInit() {
    const userId$: Observable<string> = this.authService
      .getUserToken()
      .pipe(map(userData => userData.userId));

    const orderCode$: Observable<
      string
      > = this.routingService
      .getRouterState()
      .pipe(map(routingData => routingData.state.params.orderCode));

    this.subscription = combineLatest(userId$, orderCode$).subscribe(
      ([userId, orderCode]) => {
        if (userId && orderCode) {
          this.userService.loadOrderDetails(userId, orderCode);
        }
      }
    );

    this.order$ = this.userService.getOrderDetails();
  }

  getAddressCardContent(address: Address): Card {
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

  getBillingAddressCardContent(billingAddress: Address): Card {
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

  getPaymentCardContent(payment: PaymentDetails): Card {
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

  getShippingMethodCardContent(shipping: DeliveryMode): Card {
    return {
      title: 'Shipping Method',
      textBold: shipping.name,
      text: [shipping.description]
    };
  }

  getConsignmentProducts(consignment: Consignment): OrderEntry[] {
    const products: OrderEntry[] = [];
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
