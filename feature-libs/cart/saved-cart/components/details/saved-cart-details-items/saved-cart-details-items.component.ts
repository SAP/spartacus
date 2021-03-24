import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  DeleteSavedCartSuccessEvent,
  SavedCartService,
} from '@spartacus/cart/saved-cart/core';
import {
  Cart,
  EventService,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  UserIdService,
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

  userId$ = this.userIdService.getUserId();

  cartLoaded$: Observable<boolean> = this.savedCartDetailsService
    .getSavedCartId()
    .pipe(switchMap((cartId) => this.savedCartService.isStable(cartId)));

  savedCart$: Observable<
    Cart | undefined
  > = this.savedCartDetailsService.getCartDetails().pipe(
    tap((cart) => {
      if (cart?.entries?.length <= 0) {
        this.savedCartService.deleteSavedCart(cart.code);
      }
    })
  );

  constructor(
    protected savedCartDetailsService: SavedCartDetailsService,
    protected savedCartService: SavedCartService,
    protected eventSercvice: EventService,
    protected userIdService: UserIdService,
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
