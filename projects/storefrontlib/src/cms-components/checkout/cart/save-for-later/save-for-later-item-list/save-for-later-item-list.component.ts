import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../../cart-shared';
import {
  SaveForLaterService,
  CartService,
  PromotionResult,
} from '@spartacus/core';

@Component({
  selector: 'cx-save-for-later-item-list',
  templateUrl: './save-for-later-item-list.component.html',
})
export class SaveForLaterItemListComponent implements OnInit {
  @Input()
  items: Item[] = [];
  @Input()
  saveForLaterLoading = false;
  @Input()
  potentialProductPromotions: PromotionResult[] = [];

  constructor(
    private cartService: CartService,
    private saveForLaterService: SaveForLaterService
  ) {}

  ngOnInit() {}

  moveItemToCart(item: Item): void {
    this.cartService.addEntry(item.product.code, item.quantity);
    this.removeEntry(item);
  }

  removeEntry(item: Item): void {
    this.saveForLaterService.removeEntry(item);
  }

  getPotentialProductPromotionsForItem(item: Item): PromotionResult[] {
    const entryPromotions: PromotionResult[] = [];
    if (
      this.potentialProductPromotions &&
      this.potentialProductPromotions.length > 0
    ) {
      for (const promotion of this.potentialProductPromotions) {
        if (
          promotion.description &&
          promotion.consumedEntries &&
          promotion.consumedEntries.length > 0
        ) {
          for (const consumedEntry of promotion.consumedEntries) {
            if (this.isConsumedByEntry(consumedEntry, item)) {
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
