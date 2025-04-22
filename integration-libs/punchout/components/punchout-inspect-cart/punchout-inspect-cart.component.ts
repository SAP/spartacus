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
import { ActiveCartFacade, Cart, OrderEntry } from '@spartacus/cart/base/root';
import { AuthService, useFeatureStyles } from '@spartacus/core';
import { combineLatest, filter, map, Observable } from 'rxjs';

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

  protected activeCartService = inject(ActiveCartFacade);
  protected authService = inject(AuthService);

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
      this.authService.isUserLoggedIn(),
    ]).pipe(map(([cartLoaded, loggedIn]) => loggedIn && cartLoaded));
  }
}
