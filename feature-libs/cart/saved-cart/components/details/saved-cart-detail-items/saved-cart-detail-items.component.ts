import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  SavedCartEventsService,
  SavedCartService,
} from '@spartacus/cart/saved-cart/core';
import {
  Cart,
  GlobalMessageService,
  GlobalMessageType,
  PromotionLocation,
  RoutingService,
  UserIdService,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { mapTo, switchMap, take, tap } from 'rxjs/operators';
import { SavedCartDetailService } from '../saved-cart-detail.service';

@Component({
  selector: 'cx-saved-cart-detail-items',
  templateUrl: './saved-cart-detail-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SavedCartDetailItemsComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  cartId: string | undefined;

  CartLocation = PromotionLocation;

  userId$ = this.userIdService.getUserId();

  cartLoaded$: Observable<
    boolean
  > = this.savedCartDetailService
    .getSavedCartId()
    .pipe(switchMap((cartId) => this.savedCartService.isStable(cartId)));

  savedCart$: Observable<
    Cart | undefined
  > = this.savedCartDetailService.getCartDetails().pipe(
    tap((cart) => {
      this.cartId = cart.code;

      if (cart?.entries?.length <= 0) {
        this.savedCartService.deleteSavedCart(this.cartId);
      }
    })
  );

  constructor(
    protected savedCartDetailService: SavedCartDetailService,
    protected savedCartService: SavedCartService,
    protected savedCartEventsService: SavedCartEventsService,
    protected userIdService: UserIdService,
    protected globalMessageService: GlobalMessageService,
    protected routingService: RoutingService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.savedCartEventsService
        .getDeleteSavedCartSuccessEvent()
        .pipe(take(1), mapTo(true))
        .subscribe((success) => this.onSuccess(success))
    );
  }

  onSuccess(success: boolean): void {
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
