import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  DeleteSavedCartSuccessEvent,
  SavedCartFacade,
} from '@spartacus/cart/saved-cart/root';
import {
  Cart,
  EventService,
  GlobalMessageService,
  GlobalMessageType,
  PromotionLocation,
  RoutingService,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { mapTo, switchMap, take, tap } from 'rxjs/operators';
import { SavedCartDetailsService } from '../saved-cart-details.service';

@Component({
  selector: 'cx-saved-cart-details-items',
  templateUrl: './saved-cart-details-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SavedCartDetailsItemsComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

  CartLocation = PromotionLocation;

  cartLoaded$: Observable<boolean> = this.savedCartDetailsService
    .getSavedCartId()
    .pipe(switchMap((cartId) => this.savedCartService.isStable(cartId)));

  savedCart$: Observable<Cart | undefined> = this.savedCartDetailsService
    .getCartDetails()
    .pipe(
      tap((cart) => {
        if ((cart?.entries ?? []).length <= 0 && !!cart?.code) {
          this.savedCartService.deleteSavedCart(cart.code);
        }
      })
    );

  constructor(
    protected savedCartDetailsService: SavedCartDetailsService,
    protected savedCartService: SavedCartFacade,
    protected eventSercvice: EventService,
    protected globalMessageService: GlobalMessageService,
    protected routingService: RoutingService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.eventSercvice
        .get(DeleteSavedCartSuccessEvent)
        .pipe(take(1), mapTo(true))
        .subscribe((success) => this.onDeleteComplete(success))
    );
  }

  onDeleteComplete(success: boolean): void {
    if (success) {
      this.routingService.go({ cxRoute: 'savedCarts' });
      this.globalMessageService.add(
        {
          key: 'savedCartDialog.deleteCartSuccess',
        },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
