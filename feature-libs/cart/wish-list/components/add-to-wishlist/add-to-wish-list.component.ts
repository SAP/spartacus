/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { OrderEntry } from '@spartacus/cart/base/root';
import { WishListFacade } from '@spartacus/cart/wish-list/root';
import { AuthService, Product, isNotNullable } from '@spartacus/core';
import { CurrentProductService, ICON_TYPE } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';
import { NgIf, AsyncPipe } from '@angular/common';
import { FeatureDirective } from '../../../../../projects/core/src/features-config/directives/feature.directive';
import { AtMessageDirective } from '../../../../../projects/storefrontlib/shared/components/assistive-technology-message/assistive-technology-message.directive';
import { IconComponent } from '../../../../../projects/storefrontlib/cms-components/misc/icon/icon.component';
import { BtnLikeLinkDirective } from '../../../../../projects/storefrontlib/layout/a11y/btn-like-link/btn-like-link.directive';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../../../../projects/core/src/i18n/translate.pipe';
import { UrlPipe } from '../../../../../projects/core/src/routing/configurable-routes/url-translation/url.pipe';
import { MockTranslatePipe } from '../../../../../projects/core/src/i18n/testing/mock-translate.pipe';

@Component({
    selector: 'cx-add-to-wishlist',
    templateUrl: './add-to-wish-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NgIf,
        FeatureDirective,
        AtMessageDirective,
        IconComponent,
        BtnLikeLinkDirective,
        RouterLink,
        AsyncPipe,
        TranslatePipe,
        UrlPipe,
        MockTranslatePipe,
    ],
})
export class AddToWishListComponent {
  product$: Observable<Product> = this.currentProductService.getProduct().pipe(
    filter(isNotNullable),
    tap((product) => this.setStockInfo(product))
  );

  wishListEntries$: Observable<OrderEntry[]>;
  loading$: Observable<boolean>;

  @ViewChild('addToWishlistButton') addToWishlistButton: ElementRef;
  @ViewChild('removeFromWishlistButton') removeFromWishlistButton: ElementRef;

  userLoggedIn$: Observable<boolean> = this.authService.isUserLoggedIn().pipe(
    tap((isLogin) => {
      if (isLogin) {
        this.wishListEntries$ = this.getWishListEntries();
        this.loading$ = this.wishListFacade.getWishListLoading();
      }
    })
  );

  hasStock = false;
  iconTypes = ICON_TYPE;

  constructor(
    protected wishListFacade: WishListFacade,
    protected currentProductService: CurrentProductService,
    protected authService: AuthService
  ) {}

  add(product: Product): void {
    if (product.code) {
      this.wishListFacade.addEntry(product.code);
      this.restoreFocus();
    }
  }

  remove(entry: OrderEntry): void {
    this.wishListFacade.removeEntry(entry);
    this.restoreFocus();
  }

  getProductInWishList(
    product: Product,
    entries: OrderEntry[]
  ): OrderEntry | undefined {
    const item = entries.find((entry) => entry.product?.code === product.code);
    return item;
  }

  protected setStockInfo(product: Product): void {
    this.hasStock = Boolean(
      product.stock && product.stock.stockLevelStatus !== 'outOfStock'
    );
  }

  protected getWishListEntries(): Observable<OrderEntry[]> {
    return this.wishListFacade.getWishList().pipe(
      filter((wishlist) => Boolean(wishlist)),
      map((wishList) => wishList.entries ?? [])
    );
  }

  /**
   * When disabling the button, the focus gets lost unexpecedly.
   * This method makes sure that it is restored after.
   */
  protected restoreFocus(): void {
    this.loading$
      .pipe(
        filter((isLoading) => !isLoading),
        take(1)
      )
      .subscribe(() => {
        this.removeFromWishlistButton?.nativeElement.focus() ||
          this.addToWishlistButton?.nativeElement.focus();
      });
  }
}
