/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Cart } from '@spartacus/cart/base/root';
import {
  SavedCartFacade,
  SavedCartFormType,
} from '@spartacus/cart/saved-cart/root';
import { RoutingService, useFeatureStyles } from '@spartacus/core';
import {
  LAUNCH_CALLER,
  LaunchDialogService,
  SiteContextComponentService,
  SiteContextType,
} from '@spartacus/storefront';
import { from, mergeMap, Observable, Subscription } from 'rxjs';
import { map, skip, take } from 'rxjs/operators';

@Component({
  selector: 'cx-saved-cart-list',
  templateUrl: './saved-cart-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SavedCartListComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  protected readonly siteContextService = inject(SiteContextComponentService, {
    optional: true,
  });

  @ViewChild('element') restoreButton: ElementRef;

  isLoading$: Observable<boolean>;
  savedCarts$: Observable<Cart[]> = this.savedCartService.getList().pipe(
    map((lists) =>
      lists.sort((a: Cart, b: Cart) => {
        const date1: number = a.saveTime
          ? new Date(a.saveTime).getTime()
          : new Date().getTime();
        const date2: number = b.saveTime
          ? new Date(b.saveTime).getTime()
          : new Date().getTime();
        return date2 - date1;
      })
    )
  );

  constructor(
    protected routing: RoutingService,
    protected savedCartService: SavedCartFacade,
    protected vcr: ViewContainerRef,
    protected launchDialogService: LaunchDialogService
  ) {
    useFeatureStyles('a11ySavedCartsZoom');
  }

  ngOnInit(): void {
    this.isLoading$ = this.savedCartService.getSavedCartListProcessLoading();
    this.savedCartService.loadSavedCarts();

    this.observeAndReloadSavedCartOnContextChange();
  }

  goToSavedCartDetails(cart: Cart): void {
    this.routing.go({
      cxRoute: 'savedCartsDetails',
      params: { savedCartId: cart?.code },
    });
  }

  openDialog(event: Event, cart: Cart): void {
    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.SAVED_CART,
      this.restoreButton,
      this.vcr,
      { cart, layoutOption: SavedCartFormType.RESTORE }
    );

    if (dialog) {
      this.subscription.add(dialog.pipe(take(1)).subscribe());
    }
    event.stopPropagation();
  }

  protected observeAndReloadSavedCartOnContextChange() {
    if (this.siteContextService) {
      const contexts: SiteContextType[] = Object.values(SiteContextType);
      const siteContextService = this.siteContextService;

      if (!contexts.length) {
        return;
      }

      this.subscription.add(
        from(contexts)
          .pipe(
            mergeMap((context: SiteContextType) => {
              return siteContextService.getActiveItem(context).pipe(skip(1));
            })
          )
          .subscribe(() => {
            this.savedCartService.loadSavedCarts();
          })
      );
    }
  }

  ngOnDestroy(): void {
    this.savedCartService.clearSavedCarts();
    this.savedCartService.clearSaveCart();
    this.savedCartService.clearRestoreSavedCart();
    this.subscription?.unsubscribe();
  }
}
