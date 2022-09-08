import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  CartItemComponentOptions,
  CartOutlets,
  OrderEntry,
  PromotionLocation,
} from '@spartacus/cart/base/root';
import { ICON_TYPE } from '@spartacus/storefront';
import { CartItemContextSource } from './model/cart-item-context-source.model';

@Component({
  selector: 'cx-cart-item',
  templateUrl: './cart-item.component.html',
})
export class CartItemComponent {
  @Input() compact = false;
  @Input() item: OrderEntry;
  @Input() readonly = false;
  @Input() quantityControl: FormControl;

  @Input() promotionLocation: PromotionLocation = PromotionLocation.ActiveCart;

  // TODO: evaluate whether this is generic enough
  @Input() options: CartItemComponentOptions = {
    isSaveForLater: false,
    optionalBtn: null,
  };

  iconTypes = ICON_TYPE;
  readonly CartOutlets = CartOutlets;

  constructor(protected cartItemContextSource: CartItemContextSource) {}

  isProductOutOfStock(product: any): boolean {
    // TODO Move stocklevelstatuses across the app to an enum
    return (
      product &&
      product.stock &&
      product.stock.stockLevelStatus === 'outOfStock'
    );
  }

  removeItem() {
    this.quantityControl.setValue(0);
    this.quantityControl.markAsDirty();
  }
}
