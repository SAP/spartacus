import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SavedCartService } from '@spartacus/cart/saved-cart/core';
import {
  Cart,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  UserIdService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { SavedCartDetailService } from '../saved-cart-detail.service';

@Component({
  selector: 'cx-saved-cart-detail-items',
  templateUrl: './saved-cart-detail-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SavedCartDetailItemsComponent {
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
      if (cart?.entries?.length <= 0) {
        this.routingService.go({ cxRoute: 'savedCarts' });
        this.globalMessageService.add(
          {
            key: 'savedCartDialog.deleteCartSuccess',
          },
          GlobalMessageType.MSG_TYPE_CONFIRMATION
        );
        this.savedCartService.deleteSavedCart(cart.code);
      }
    })
  );

  constructor(
    protected savedCartDetailService: SavedCartDetailService,
    protected savedCartService: SavedCartService,
    protected userIdService: UserIdService,
    protected globalMessageService: GlobalMessageService,
    protected routingService: RoutingService
  ) {}
}
