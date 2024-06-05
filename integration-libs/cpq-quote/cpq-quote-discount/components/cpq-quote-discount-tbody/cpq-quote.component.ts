import { Component, Optional, OnDestroy, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { CartItemContext, OrderEntry } from '@spartacus/cart/base/root';
import { CpqDiscounts } from 'integration-libs/cpq-quote/root/model';
import { EMPTY, Observable, Subscription } from 'rxjs';

// Extend the OrderEntry interface to include cpqDiscounts property
interface ExtendedOrderEntry extends OrderEntry {
  cpqDiscounts?: CpqDiscounts[];
}

@Component({
  selector: 'cx-cpq-quote',
  templateUrl: './cpq-quote.component.html',
})
export class CpqQuoteDiscountComponent implements OnInit, OnDestroy {
  quoteDiscountData: ExtendedOrderEntry | null;
  private subscription: Subscription;
  readonly orderEntry$: Observable<ExtendedOrderEntry> = // Use ExtendedOrderEntry here
    this.cartItemContext?.item$ ?? EMPTY;


  constructor(
    @Optional()
    @Inject(CartItemContext)
    protected cartItemContext: CartItemContext
  ) {}

  ngOnInit(): void {
    if (this.cartItemContext) {
      this.subscription = this.orderEntry$.subscribe((data) => {
        this.quoteDiscountData = data;
        if(this.quoteDiscountData){ this.updateFlag(true);}

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
  flag: boolean = false;

  @Output() flagChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  updateFlag(newValue: boolean) {
    if (this.flag !== newValue) { // Only emit if flag value changes
      this.flag = newValue;
      this.flagChange.emit(this.flag);
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
