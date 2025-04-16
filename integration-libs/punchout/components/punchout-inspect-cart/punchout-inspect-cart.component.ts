/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CartConfigService } from '@spartacus/cart/base/core';
import {
  ActiveCartFacade,
  Cart,
  OrderEntry,
  PromotionLocation,
  SelectiveCartFacade,
} from '@spartacus/cart/base/root';
import { AuthService, RoutingService, useFeatureStyles } from '@spartacus/core';
import { combineLatest, filter, map, Observable, of, tap } from 'rxjs';

@Component({
  selector: 'cx-punchout-inspect-cart',
  templateUrl: './punchout-inspect-cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class PunchoutInspectCartComponent implements OnInit {
  cart$: Observable<Cart>;
  entries$: Observable<OrderEntry[]>;
  cartLoaded$: Observable<boolean>;
  loggedIn = false;
  promotionLocation: PromotionLocation = PromotionLocation.ActiveCart;
  selectiveCartEnabled: boolean;

  protected activeCartService = inject(ActiveCartFacade);
  protected selectiveCartService = inject(SelectiveCartFacade);
  protected authService = inject(AuthService);
  protected routingService = inject(RoutingService);
  protected cartConfig = inject(CartConfigService);

  constructor() {
    useFeatureStyles('a11yQTY2Quantity');
  }
  ngOnInit() {
    this.cart$ = this.activeCartService.getActive();

    this.entries$ = this.activeCartService
      .getEntries()
      .pipe(filter((entries) => entries.length > 0));

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
}
