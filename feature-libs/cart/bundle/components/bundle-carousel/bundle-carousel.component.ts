/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BundleProductScope, BundleTemplate, CartBundleService } from '@spartacus/cart/bundle/core';
// import { ActivatedRoute, Router } from '@angular/router';
import { EventService, Product } from '@spartacus/core';
// import { Product } from '@spartacus/core';
import { ActiveCartFacade, CartUiEventAddToCart } from '@spartacus/cart/base/root';
import { CurrentProductService } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
// import { map } from 'rxjs/operators';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'cx-bundle-carousel',
  templateUrl: './bundle-carousel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BundleCarouselComponent {

  // @ViewChild('bindToCart') bindToCartElemRef: ElementRef<HTMLButtonElement>;

  product$: Observable<Product | null> = this.currentProductService.getProduct(BundleProductScope.TEMPLATES);

  bundleTemplates$: Observable<Observable<BundleTemplate>[] | undefined> = this.product$.pipe(
    map((p) => p?.bundleTemplates?.map((b) => of(b)))
  );

  constructor(
    protected currentProductService: CurrentProductService,
    protected cartBundleService: CartBundleService,
    protected activeCartService: ActiveCartFacade,
    protected eventService: EventService,
    // protected launchDialogService: LaunchDialogService,
    // protected router: Router,
    // protected activatedRoute: ActivatedRoute
  ) {}

  protected createCartUiEventAddToCart(
    productCode: string,
    quantity: number,
    numberOfEntriesBeforeAdd: number,
    storeName?: string
  ) {
    const newEvent = new CartUiEventAddToCart();
    newEvent.productCode = productCode;
    newEvent.quantity = quantity;
    newEvent.numberOfEntriesBeforeAdd = numberOfEntriesBeforeAdd;
    newEvent.pickupStoreName = storeName;
    return newEvent;
  }

  // select() {
  //   console.log("select product");
  // }

  addBundleToCart(productCode: string, templateId: string) {
    if (!productCode || !templateId) {
      return;
    }

    this.activeCartService
    .getEntries()
    .pipe(take(1))
    .subscribe((cartEntries) => {
      this.cartBundleService.startBundle({
        productCode: productCode,
        templateId: templateId,
        quantity: 1,
      });

      this.eventService.dispatch(
        this.createCartUiEventAddToCart(
          productCode,
          1,
          cartEntries.length,
          undefined
        )
      );
    });
  }
}
