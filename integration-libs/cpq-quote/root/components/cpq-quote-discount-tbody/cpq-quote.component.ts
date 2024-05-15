import { Component, Optional, OnDestroy, OnInit, Inject } from '@angular/core';
import { CartItemContext, OrderEntry } from '@spartacus/cart/base/root';
import { EMPTY, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'cx-cpq-quote',
  templateUrl: './cpq-quote.component.html',
})
export class CpqQuoteDiscountComponent implements OnInit, OnDestroy {
  quoteDiscountData: OrderEntry;
  private subscription: Subscription;

  constructor(
    @Optional()
    @Inject(CartItemContext)
    protected cartItemContext: CartItemContext
  ) {}
  ngOnInit(): void {
    if (this.cartItemContext) {
      this.subscription = this.orderEntry$.subscribe((data) => {
        this.quoteDiscountData = data;
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
