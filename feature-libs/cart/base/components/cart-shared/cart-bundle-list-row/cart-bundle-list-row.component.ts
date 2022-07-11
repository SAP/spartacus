import { Component, Input } from '@angular/core';
import { CartItemContext, EntryGroup } from '@spartacus/cart/base/root';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { CartItemContextSource } from '../cart-item/model/cart-item-context-source.model';

@Component({
  selector: '[cx-cart-bundle-list-row], cx-cart-bundle-list-row',
  templateUrl: './cart-bundle-list-row.component.html',
  providers: [
    CartItemContextSource,
    { provide: CartItemContext, useExisting: CartItemContextSource },
  ],
})
export class CartBundleListRowComponent extends CartItemComponent {
  @Input() bundle: EntryGroup;

  // @TODO: Add removing logic
  removeBundle() {}
}
