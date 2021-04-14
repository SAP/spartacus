import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActiveCartService, Cart } from '@spartacus/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { QuickOrderStatePersistenceService } from '../../core/services/quick-order-state-persistance.service';
import { QuickOrderService } from '../../core/services/quick-order.service';

@Component({
  selector: 'cx-quick-order-container',
  templateUrl: './quick-order-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickOrderComponent implements OnInit {
  cartId$: Observable<string> = this.activeCartService.getActiveCartId();

  constructor(
    protected activeCartService: ActiveCartService,
    protected quickOrderService: QuickOrderService,
    protected quickOrderStatePersistenceService: QuickOrderStatePersistenceService
  ) {}

  ngOnInit(): void {
    this.quickOrderStatePersistenceService.initSync();
  }

  clear(): void {
    this.quickOrderService.clearList();
  }

  addToCart(): void {
    this.activeCartService
      .getActiveCartId()
      .pipe(
        switchMap((cartId) => {
          if (cartId) {
            return this.quickOrderService.addToCart(cartId);
          } else {
            return this.quickOrderService
              .createCart()
              .pipe(
                switchMap((cart: Cart) =>
                  this.quickOrderService.addToCart(cart?.code as string)
                )
              );
          }
        })
      )
      .subscribe(() => {
        this.quickOrderService.clearList();
      });
  }
}
