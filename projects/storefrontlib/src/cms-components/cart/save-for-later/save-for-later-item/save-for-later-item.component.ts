import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PromotionResult } from '@spartacus/core';
import { Item } from 'projects/storefrontlib/src/cms-components/cart/cart-shared';

@Component({
  selector: 'cx-save-for-later-item',
  templateUrl: './save-for-later-item.component.html',
})
export class SaveForLaterItemComponent implements OnInit {
  @Input()
  item: Item;
  @Input()
  saveForLaterLoading = false;
  @Input()
  potentialProductPromotions: PromotionResult[];
  @Input()
  compact = false;

  @Output()
  remove = new EventEmitter<any>();
  @Output()
  moveToCart = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  isProductOutOfStock(product: any) {
    return (
      product &&
      product.stock &&
      product.stock.stockLevelStatus === 'outOfStock'
    );
  }

  removeItem() {
    this.remove.emit(this.item);
  }

  moveItemToCart() {
    this.moveToCart.emit(this.item);
  }
}
