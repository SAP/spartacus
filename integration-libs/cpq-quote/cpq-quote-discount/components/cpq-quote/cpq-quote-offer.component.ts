import { Component, Optional, OnDestroy, OnInit, Inject } from '@angular/core';
import { CartItemContext, OrderEntry } from '@spartacus/cart/base/root';
import { CpqDiscounts } from 'integration-libs/cpq-quote/root/model';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { CpqQuoteService } from '../../cpq-qute.service';

// Extend the OrderEntry interface to include cpqDiscounts property
interface ExtendedOrderEntry extends OrderEntry {
  cpqDiscounts?: CpqDiscounts[];
}

@Component({
  selector: 'cx-cpq-quote-offer',
  templateUrl: './cpq-quote-offer.component.html',
  styleUrls: ['./cpq-quote-offer.component.scss'],
})
export class CpqQuoteOfferComponent implements OnInit, OnDestroy {
  quoteDiscountData: ExtendedOrderEntry | null;
  private subscription: Subscription;
  readonly orderEntry$: Observable<ExtendedOrderEntry> = // Use ExtendedOrderEntry here
    this.cartItemContext?.item$ ?? EMPTY;

  constructor(
    @Optional()
    @Inject(CartItemContext)
    protected cartItemContext: CartItemContext,
    private cpqQuoteService: CpqQuoteService
  ) {}

  ngOnInit(): void {
    if (this.cartItemContext) {
      this.subscription = this.orderEntry$.subscribe((data) => {
        this.quoteDiscountData = data;
        this.cpqQuoteService.setIsFlag(
          !this.quoteDiscountData?.cpqDiscounts || this.quoteDiscountData.cpqDiscounts.length === 0
        );
      });
    } else {
      this.quoteDiscountData = null;
      this.cpqQuoteService.setIsFlag(true);
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
