import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SavedCartService } from '@spartacus/cart/saved-cart/core';
import { Cart } from '@spartacus/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SavedCartDetailService } from '../saved-cart-detail.service';

@Component({
  selector: 'cx-saved-cart-detail-items',
  templateUrl: './saved-cart-detail-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SavedCartDetailItemsComponent {
  savedCart$: Observable<Cart> = this.savedCartDetailService.getCartDetails();
  cartLoaded$: Observable<
    boolean
  > = this.savedCartDetailService
    .getSavedCartId()
    .pipe(switchMap((cartId) => this.savedCartService.isStable(cartId)));

  constructor(
    protected savedCartDetailService: SavedCartDetailService,
    protected savedCartService: SavedCartService
  ) {}
}
