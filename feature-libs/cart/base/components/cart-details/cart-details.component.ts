/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CartConfigService } from '@spartacus/cart/base/core';
import {
  ActiveCartFacade,
  Cart,
  CartOutlets,
  OrderEntry,
  OrderEntryGroup,
  PromotionLocation,
  SelectiveCartFacade,
} from '@spartacus/cart/base/root';
import { HierarchyComponentService, HierarchyNode} from '@spartacus/storefront';
import { AuthService, FeatureConfigService, RoutingService } from '@spartacus/core';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-cart-details',
  templateUrl: './cart-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartDetailsComponent implements OnInit {
  private featureConfig = inject(FeatureConfigService);

  cart$: Observable<Cart>;
  entries$: Observable<OrderEntry[]>;
  cartLoaded$: Observable<boolean>;
  loggedIn = false;
  promotionLocation: PromotionLocation = PromotionLocation.ActiveCart;
  selectiveCartEnabled: boolean;
  bundles$: Observable<HierarchyNode[]>;
  entryGroups$: Observable<OrderEntryGroup[]>;
  readonly cartOutlets = CartOutlets;

  constructor(
    protected activeCartService: ActiveCartFacade,
    protected selectiveCartService: SelectiveCartFacade,
    protected authService: AuthService,
    protected routingService: RoutingService,
    protected cartConfig: CartConfigService,
    protected hierarchyService: HierarchyComponentService
  ) {}

  ngOnInit() {
    this.cart$ = this.activeCartService.getActive();

    if (this.featureConfig.isEnabled('isEntryGroupsEnabled')) {
      // The user has enabled feature toggle "isEntryGroupsEnabled"
      // which makes the cart use the new entry groups feature to provide bundle support.
      this.entryGroups$ = this.activeCartService.getEntryGroups();
      this.entries$ = this.hierarchyService.getEntriesFromGroups(this.entryGroups$);
      this.bundles$ = this.hierarchyService.getBundlesFromGroups(this.entryGroups$);
    } else {
    // The user has NOT enabled feature toggle "isEntryGroupsEnabled"
    // which makes the cart use the OLD entries items. So new features that use entryGroups like bundles will not be supported until the user opts-in.
        this.entries$ = this.activeCartService
          .getEntries()
          .pipe(filter((entries) => entries.length > 0));
    }

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
}
