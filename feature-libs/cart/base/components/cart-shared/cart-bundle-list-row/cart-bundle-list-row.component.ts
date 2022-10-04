import { Component, Input } from '@angular/core';
import {
  ActiveCartFacade,
  CartItemContext,
  EntryGroup,
} from '@spartacus/cart/base/root';
import { RoutingService } from '@spartacus/core';
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

  constructor(
    protected cartItemContextSource: CartItemContextSource,
    protected activeCartService: ActiveCartFacade,
    protected routingService: RoutingService
  ) {
    super(cartItemContextSource);
  }

  editBundle() {
    this.routingService.go('cart', {
      queryParams: { edit: this.bundle.entryGroupNumber },
    });
  }

  removeBundle() {
    this.activeCartService.deleteEntryGroup(this.bundle.entryGroupNumber);
  }
}
