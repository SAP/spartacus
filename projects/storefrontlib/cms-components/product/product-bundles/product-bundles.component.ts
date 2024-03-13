/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Product, ProductScope, EventService, bundleTemplate } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CurrentProductService } from '../current-product.service';
import { ActiveCartFacade, CartUiEventAddToCart } from '@spartacus/cart/base/root';
// import { LaunchDialogService } from '@spartacus/storefront';
import { map, take } from 'rxjs/operators';
// import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-product-bundles',
  templateUrl: './product-bundles.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductBundlesComponent {

  // @ViewChild('bindToCart') bindToCartElemRef: ElementRef<HTMLButtonElement>;

  product$: Observable<Product | null> = this.currentProductService.getProduct(ProductScope.BUNDLES);

  bundleTemplates$: Observable<Observable<bundleTemplate>[] | undefined> = this.product$.pipe(
    map((p) => p?.bundleTemplates?.map((b) => of(b)))
  );

  // bundleTemplates$: Observable<Observable<bundleTemplate>[] | undefined> = this.product$.pipe(
  //   map((p) => {
  //     if(p?.bundleTemplates){
  //       var templates = p?.bundleTemplates;
  //       const template = {id: 'test',  name: "test", rootBundleTemplateName: "test"}
  //       templates = templates.concat(template);
  //       templates = templates.concat(template);
  //       templates = templates.concat(template);
  //       templates = templates.concat(template);
  //       templates = templates.concat(template);
  //       templates = templates.concat(template);
  //       templates = templates.concat(template);
  //       templates = templates.concat(template);
  //     return templates.map((b) => of(b));
  //     }
  //     return p?.bundleTemplates?.map((b) => of(b));
  //   })
  // );

  constructor(
    protected currentProductService: CurrentProductService,
    protected activeCartService: ActiveCartFacade,
    protected eventService: EventService,
    // protected launchDialogService: LaunchDialogService,
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

  addBundleToCart(productCode: string, bundleTemplateId: string) {
    const quantity = 1;
    if (!productCode || !bundleTemplateId) {
      return;
    }

    // this.launchDialogService?.openDialogAndSubscribe(
    //   'PRODUCT_DETAILS_DIALOG',
    //   this.bindToCartElemRef
    // );

    this.activeCartService
    .getEntries()
    .pipe(take(1))
    .subscribe((cartEntries) => {
      this.activeCartService.startBundle(
        productCode,
        quantity,
        bundleTemplateId
      );

      this.eventService.dispatch(
        this.createCartUiEventAddToCart(
          productCode,
          quantity,
          cartEntries.length,
          undefined
        )
      );
    });
  }
}
