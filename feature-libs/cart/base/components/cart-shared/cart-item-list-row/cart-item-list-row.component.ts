import { Component, OnDestroy } from '@angular/core';
import { CartItemContext } from '@spartacus/cart/base/root';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { CartItemContextSource } from '../cart-item/model/cart-item-context-source.model';
import { QuoteOutlet } from '@spartacus/quote/root';
import { CpqQuoteService } from '@spartacus/cpq-quote/cpq-quote-discount';
import { Subscription } from 'rxjs';

@Component({
  selector: '[cx-cart-item-list-row], cx-cart-item-list-row',
  templateUrl: './cart-item-list-row.component.html',
  providers: [
    CartItemContextSource,
    { provide: CartItemContext, useExisting: CartItemContextSource },
  ],
})
export class CartItemListRowComponent
  extends CartItemComponent
  implements OnDestroy
{
  isFlagquote = true; // Default value
  private subscription: Subscription;
  constructor(
    cartItemContextSource: CartItemContextSource,
    private cpqQuoteService: CpqQuoteService // Injecting CpqQuoteService directly here
  ) {
    super(cartItemContextSource);
    this.subscription = this.cpqQuoteService.isFlag$.subscribe((isFlag) => {
      this.isFlagquote = isFlag;
    });
  }
  readonly quoteOutlet = QuoteOutlet;
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
