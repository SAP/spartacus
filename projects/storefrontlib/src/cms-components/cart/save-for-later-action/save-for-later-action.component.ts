import { Component, OnInit } from '@angular/core';
import {
  ActiveCartService,
  AuthService,
  OrderEntry,
  RoutingService,
  SelectiveCartService,
} from '@spartacus/core';
import { combineLatest, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CartItemContext } from '../cart-shared/cart-item/model/cart-item-context.model';

@Component({
  selector: 'cx-save-for-later-action',
  templateUrl: './save-for-later-action.component.html',
})
export class SaveForLaterActionComponent implements OnInit {
  cartLoaded$: Observable<boolean>;
  loggedIn = false;
  selectiveCartEnabled: boolean;

  constructor(
    protected activeCartService: ActiveCartService,
    protected selectiveCartService: SelectiveCartService,
    protected authService: AuthService,
    protected routingService: RoutingService,
    protected cartItemContext?: CartItemContext
  ) {}

  ngOnInit() {
    this.selectiveCartEnabled = this.selectiveCartService.isEnabled();

    this.cartLoaded$ = combineLatest([
      this.activeCartService.isStable(),
      this.selectiveCartEnabled
        ? this.selectiveCartService.isStable()
        : of(false),
      this.authService.isUserLoggedIn(),
    ]).pipe(
      tap(([, , loggedIn]) => (this.loggedIn = loggedIn)),
      map(([cartLoaded, sflLoaded, loggedIn]) =>
        loggedIn && this.selectiveCartEnabled
          ? cartLoaded && sflLoaded
          : cartLoaded
      )
    );
  }

  saveForLater(item: OrderEntry) {
    if (this.loggedIn) {
      if(item?.product?.code && item?.quantity){
        this.activeCartService.removeEntry(item);
        this.selectiveCartService.addEntry(item.product.code, item.quantity);
      }
    } else {
      this.routingService.go({ cxRoute: 'login' });
    }
  }
}
