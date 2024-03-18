/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CartConfigService } from '@spartacus/cart/base/core';
import {
  ActiveCartFacade,
  Cart,
  OrderEntry,
  OrderEntryGroup,
  PromotionLocation,
  SelectiveCartFacade,
} from '@spartacus/cart/base/root';
import { AuthService, RoutingService, UserIdService } from '@spartacus/core';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { ArrayDataSource } from '@angular/cdk/collections';
import { NestedTreeControl } from '@angular/cdk/tree';

@Component({
  selector: 'cx-cart-details',
  templateUrl: './cart-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartDetailsComponent implements OnInit {
  cart$: Observable<Cart>;
  entries$: Observable<OrderEntry[]>;
  standaloneEntries$: Observable<OrderEntry[]>;
  entryGroups$: Observable<OrderEntryGroup[]>;
  treeControl: NestedTreeControl<OrderEntryGroup>;
  treeDataSource: ArrayDataSource<OrderEntryGroup>;
  cartLoaded$: Observable<boolean>;
  loggedIn = false;
  promotionLocation: PromotionLocation = PromotionLocation.ActiveCart;
  selectiveCartEnabled: boolean;
  
  constructor(
    protected userIdService: UserIdService,
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

    this.standaloneEntries$ = this.activeCartService
      .getStandaloneEntries()
      .pipe(filter((entries) => entries.length > 0));
    
    this.entryGroups$ = this.activeCartService
      .getBundleEntryGroups()
      .pipe(filter((entryGroups) => entryGroups.length > 0)),

    this.treeControl = new NestedTreeControl<OrderEntryGroup>(group => group.entryGroups);
    this.treeDataSource = new ArrayDataSource(this.entryGroups$);
  
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

  hasChild(_: number, group: OrderEntryGroup) {
    return group.entryGroups && group.entryGroups.length > 0;
  }

  removeBundle(e: HTMLElement, item: OrderEntryGroup) {
    this.activeCartService.removeEntryGroup(item);
    e.remove();
  }

  editBundle(entryGroupNumber: number) {
    console.log(`editBundle with entryGroupNumber: ${entryGroupNumber}`);
  }
}
