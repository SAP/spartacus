import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cart, RoutingService } from '@spartacus/core';
import { SavedCartService } from 'feature-libs/cart/saved-cart/core/services/saved-cart.service';
import { Observable, Subscription } from 'rxjs';
import { SavedCartDetailService } from '../saved-cart-detail.service';

@Component({
  selector: 'cx-saved-cart-detail-action',
  templateUrl: './saved-cart-detail-action.component.html',
})
export class SavedCartDetailActionComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

  savedCart$: Observable<Cart> = this.savedCartDetailService.getCartDetails();

  constructor(
    protected savedCartDetailService: SavedCartDetailService,
    protected savedCartService: SavedCartService,
    protected routingService: RoutingService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.savedCartService
        .getRestoreSavedCartProcessSuccess()
        .subscribe((success) => this.onSuccess(success))
    );
  }

  restoreSavedCart(cartId: string): void {
    this.savedCartService.restoreSavedCart(cartId);
  }

  onSuccess(success: boolean): void {
    if (success) {
      this.routingService.go({ cxRoute: 'savedCarts' });
      this.savedCartService.clearRestoreSavedCart();
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
