import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { SavedCartService } from '@spartacus/cart/saved-cart/core';
import { Cart, RoutingService, TranslationService } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
<<<<<<< HEAD
import { map } from 'rxjs/operators';
import { SavedCartService } from '../../core/services/saved-cart.service';
=======
>>>>>>> 56202968af8f37a6e87647c31aa237d486df9832

@Component({
  selector: 'cx-saved-cart-list',
  templateUrl: './saved-cart-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SavedCartListComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

  savedCarts$: Observable<Cart[]> = this.savedCartService.getList().pipe(
    map((lists) =>
      lists.sort((a: Cart, b: Cart) => {
        let date1: number = a.saveTime
          ? new Date(a.saveTime).getTime()
          : new Date().getTime();
        let date2: number = b.saveTime
          ? new Date(b.saveTime).getTime()
          : new Date().getTime();
        return date2 - date1;
      })
    )
  );
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
