import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import * as fromCartStore from '../../../store';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'y-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartDetailsComponent implements OnInit {
  cart$;
  entries$;

  constructor(
    protected store: Store<fromCartStore.CartState>,
    protected cartService: CartService
  ) {
    this.cart$ = this.store.select(fromCartStore.getActiveCart);
    this.entries$ = this.store.select(fromCartStore.getEntries);
  }

  ngOnInit() {
    this.cartService.loadCartDetails();
  }

  removeEntry(entry) {
    this.cartService.removeCartEntry(entry);
  }

  getPotentialPromotionForEntry(cart: any, entry: any): any[] {
    return this.getPromotionForEntry(cart.potentialProductPromotions, entry);
  }

  getAppliedPromotionForEntry(cart: any, entry: any): any[] {
    return this.getPromotionForEntry(cart.appliedProductPromotions, entry);
  }

  private getPromotionForEntry(promotions: any[], entry: number): any {
    const entryPromotions = [];
    if (promotions && promotions.length > 0) {
      for (const promotion of promotions) {
        if (
          promotion.description &&
          promotion.consumedEntries &&
          promotion.consumedEntries.length > 0
        ) {
          for (const consumedEntry of promotion.consumedEntries) {
            if (this.isConsumedByEntry(consumedEntry, entry)) {
              entryPromotions.push(promotion);
            }
          }
        }
      }
    }
    return entryPromotions;
  }

  private isConsumedByEntry(consumedEntry: any, entry: any): boolean {
    const consumendEntryNumber = consumedEntry.orderEntryNumber;
    if (entry.entries && entry.entries.length > 0) {
      for (const subEntry of entry.entries) {
        if (subEntry.entryNumber === consumendEntryNumber) {
          return true;
        }
      }
      return false;
    } else {
      return consumendEntryNumber === entry.entryNumber;
    }
  }
}
