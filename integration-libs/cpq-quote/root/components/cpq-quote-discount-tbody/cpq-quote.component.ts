// import { Component } from '@angular/core';

// @Component({
//   selector: 'cx-cpq-quote',
//   templateUrl: './cpq-quote.component.html',
// })
// export class CpqQuoteDiscountComponent {
//   constructor() {}
// }
import { Component, Optional, OnDestroy, OnInit } from '@angular/core';
import { CartItemContext, OrderEntry } from '@spartacus/cart/base/root';
import { EMPTY, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'cx-cpq-quote',
  templateUrl: './cpq-quote.component.html',
}
)
export class CpqQuoteDiscountComponent implements OnInit, OnDestroy {
  quoteDiscountData: OrderEntry;
  private subscription: Subscription;
  constructor(
    @Optional() protected cartItemContext: CartItemContext,
  ) {}

  ngOnInit(): void {
    console.log("cpq quote ngOnInit");
    if (this.cartItemContext) {
      this.subscription = this.orderEntry$.subscribe(data => {
        this.quoteDiscountData = data;
        console.log('Order Entry Data:', this.quoteDiscountData);
      });
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe from the observable to prevent memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  readonly orderEntry$: Observable<OrderEntry> =
    this.cartItemContext?.item$ ?? EMPTY;
}
