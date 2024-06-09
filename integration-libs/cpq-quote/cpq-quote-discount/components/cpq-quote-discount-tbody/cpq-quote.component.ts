import { Component, Optional, OnDestroy, OnInit, Inject} from '@angular/core';
import { CartItemContext, OrderEntry } from '@spartacus/cart/base/root';
import { CpqDiscounts } from 'integration-libs/cpq-quote/root/model';
import { EMPTY, Observable, Subscription } from 'rxjs';
// import { CpqQuoteService } from '../../cpq-qute.service';

// Extend the OrderEntry interface to include cpqDiscounts property
interface ExtendedOrderEntry extends OrderEntry {
  cpqDiscounts?: CpqDiscounts[];
}

@Component({
  selector: 'cx-cpq-quote',
  templateUrl: './cpq-quote.component.html',
  styleUrls: ['./cpq-quote.component.scss'],
})
export class CpqQuoteDiscountComponent implements OnInit, OnDestroy {
  quoteDiscountData: ExtendedOrderEntry | null;
  private subscription: Subscription;
  readonly orderEntry$: Observable<ExtendedOrderEntry> = // Use ExtendedOrderEntry here
    this.cartItemContext?.item$ ?? EMPTY;


  constructor(
    @Optional()
    @Inject(CartItemContext)
    protected cartItemContext: CartItemContext,
    // private cpqQuoteService: CpqQuoteService
  ) {}

  ngOnInit(): void {
    if (this.cartItemContext) {
      this.subscription = this.orderEntry$.subscribe((data) => {
        this.quoteDiscountData = data;
        // const hasDiscounts = this.quoteDiscountData?.cpqDiscounts && this.quoteDiscountData.cpqDiscounts.length > 0;
        // this.cpqQuoteService.setIsFlag(!hasDiscounts);

      });
    } else {
      this.quoteDiscountData = null;
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  getDiscountedPrice(basePrice: number | undefined, discountPercentage: number | undefined): number | undefined {
    if (basePrice !== undefined && discountPercentage !== undefined) {
      const discountAmount = (basePrice * discountPercentage) / 100;
      return basePrice - discountAmount;
    }
    return undefined;
  }
}
