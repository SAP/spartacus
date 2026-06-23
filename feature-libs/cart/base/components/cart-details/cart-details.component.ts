/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CartConfigService } from '@spartacus/cart/base/core';
import {
  ActiveCartFacade,
  Cart,
  OrderEntry,
  PromotionLocation,
  SelectiveCartFacade,
} from '@spartacus/cart/base/root';
import {
  AuthService,
  FeatureConfigService,
  RoutingService,
  TranslatePipe,
} from '@spartacus/core';
import { PromotionsComponent, SpinnerComponent } from '@spartacus/storefront';
import { combineLatest, Observable, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  startWith,
  tap,
} from 'rxjs/operators';
import { CartItemListComponent } from '../cart-shared/cart-item-list/cart-item-list.component';
import { CartValidationWarningsComponent } from '../validation/cart-warnings/cart-validation-warnings.component';

const CART_DETAILS_UPDATING_DEBOUNCE_MS = 250;

@Component({
  selector: 'cx-cart-details',
  templateUrl: './cart-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    CartValidationWarningsComponent,
    PromotionsComponent,
    CartItemListComponent,
    SpinnerComponent,
    AsyncPipe,
    TranslatePipe,
  ],
})
export class CartDetailsComponent implements OnInit {
  cart$: Observable<Cart>;
  entries$: Observable<OrderEntry[]>;
  cartLoaded$: Observable<boolean>;
  /**
   * True while the active cart has pending writes. Drives the visible
   * "Updating cart" banner. Debounced to avoid flicker on fast networks.
   */
  updating$: Observable<boolean>;
  loggedIn = false;
  promotionLocation: PromotionLocation = PromotionLocation.ActiveCart;
  selectiveCartEnabled: boolean;

  protected featureConfigService = inject(FeatureConfigService);

  constructor(
    protected activeCartService: ActiveCartFacade,
    protected selectiveCartService: SelectiveCartFacade,
    protected authService: AuthService,
    protected routingService: RoutingService,
    protected cartConfig: CartConfigService
  ) {}

  ngOnInit() {
    this.cart$ = this.activeCartService.getActive();

    this.entries$ = this.activeCartService
      .getEntries()
      .pipe(filter((entries) => entries.length > 0));

    this.selectiveCartEnabled = this.cartConfig.isSelectiveCartEnabled();

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

    this.updating$ = this.featureConfigService.isEnabled(
      'enableCartSlowNetworkResilience'
    )
      ? this.activeCartService.isStable().pipe(
          map((stable) => !stable),
          debounceTime(CART_DETAILS_UPDATING_DEBOUNCE_MS),
          startWith(false),
          distinctUntilChanged()
        )
      : of(false);
  }

  saveForLater(item: OrderEntry) {
    if (this.loggedIn) {
      this.activeCartService.removeEntry(item);
      this.selectiveCartService.addEntry(
        item.product?.code ?? '',
        item.quantity ?? 0
      );
    } else {
      this.routingService.go({ cxRoute: 'login' });
    }
  }
}
