import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Cart, RoutingService, TranslationService } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { SavedCartService } from '../../core/services/saved-cart.service';

@Component({
  selector: 'cx-saved-cart-list',
  templateUrl: './saved-cart-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SavedCartListComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

  savedCarts$: Observable<Cart[]> = this.savedCartService.getList();

  constructor(
    protected routing: RoutingService,
    protected translation: TranslationService,
    protected savedCartService: SavedCartService
  ) {}

  ngOnInit(): void {
    this.savedCartService.loadSavedCarts();

    this.subscription.add(
      this.savedCartService
        .getRestoreSavedCartProcessSuccess()
        .subscribe((success) => this.onSuccess(success))
    );
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

  onSuccess(success: boolean): void {
    if (success) {
      this.savedCartService.clearRestoreSavedCart();
      this.savedCartService.clearSaveCart();
    }
  }

  ngOnDestroy(): void {
    this.savedCartService.clearSavedCarts();
    this.savedCartService.clearSaveCart();
    this.subscription?.unsubscribe();
  }
}
