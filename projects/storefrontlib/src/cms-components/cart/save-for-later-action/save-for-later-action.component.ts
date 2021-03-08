import { Component, OnInit } from '@angular/core';
import {
  ActiveCartService,
  AuthService,
  OrderEntry,
  RoutingService,
  SelectiveCartService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { CartItemContext } from '../cart-shared/cart-item/model/cart-item-context.model';

@Component({
  selector: 'cx-save-for-later-action',
  templateUrl: './save-for-later-action.component.html',
})
export class SaveForLaterActionComponent implements OnInit {
  loggedIn = false;
  selectiveCartEnabled: boolean;

  constructor(
    protected activeCartService: ActiveCartService,
    protected selectiveCartService: SelectiveCartService,
    protected authService: AuthService,
    protected routingService: RoutingService,
    public cartItemContext?: CartItemContext
  ) {}

  ngOnInit() {
    this.selectiveCartEnabled = this.selectiveCartService.isEnabled();

    this.authService
      .isUserLoggedIn()
      .pipe(take(1))
      .subscribe((loggedIn) => (this.loggedIn = loggedIn));
  }

  saveForLater(item$: Observable<OrderEntry>) {
    if (this.loggedIn) {
      item$.pipe(take(1)).subscribe((item) => {
        if (item?.product?.code && item?.quantity) {
          this.activeCartService.removeEntry(item);
          this.selectiveCartService.addEntry(item.product.code, item.quantity);
        }
      });
    } else {
      this.routingService.go({ cxRoute: 'login' });
    }
  }
}
