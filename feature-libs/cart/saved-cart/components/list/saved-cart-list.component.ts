import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  Cart,
  EntitiesModel,
  RoutingService,
  TranslationService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { SavedCartService } from '../../core/services/saved-cart.service';

@Component({
  selector: 'cx-saved-cart-list',
  templateUrl: './saved-cart-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SavedCartListComponent {
  savedCarts$: Observable<
    EntitiesModel<Cart>
  > = this.savedCartService.getList();

  constructor(
    protected routing: RoutingService,
    protected translation: TranslationService,
    protected savedCartService: SavedCartService
  ) {}

  goToSavedCartDetails(cart: Cart): void {
    console.log('cart', cart);
    this.routing.go({
      cxRoute: 'savedCartsDetails',
      params: { savedCartId: cart?.code },
    });
  }
}
