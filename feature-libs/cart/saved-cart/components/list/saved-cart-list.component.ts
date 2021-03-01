import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Cart, RoutingService, TranslationService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { SavedCartService } from '../../core/services/saved-cart.service';

@Component({
  selector: 'cx-saved-cart-list',
  templateUrl: './saved-cart-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SavedCartListComponent implements OnInit {
  savedCarts$: Observable<Cart> = this.savedCartService.getList();

  constructor(
    protected routing: RoutingService,
    protected translation: TranslationService,
    protected savedCartService: SavedCartService
  ) {}

  ngOnInit(): void {
    this.savedCartService.loadSavedCarts();
  }

  goToSavedCartDetails(cart: Cart): void {
    this.routing.go({
      cxRoute: 'savedCartsDetails',
      params: { savedCartId: cart?.code },
    });
  }

  restoreSavedCart(event: Event, cartId: string): void {
    this.savedCartService.restoreSavedCart(cartId);
    event.stopPropagation();
  }
}
