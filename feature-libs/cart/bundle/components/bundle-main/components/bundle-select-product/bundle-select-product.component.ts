/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, Optional } from '@angular/core';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { Product, RoutingService } from '@spartacus/core';
import { ConfiguratorProductScope } from '@spartacus/product-configurator/common';
import {
  CurrentProductService,
  ProductListItemContext,
} from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-bundle-select-product',
  templateUrl: './bundle-select-product.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BundleSelectProductComponent {
  product$: Observable<Product> = (this.productListItemContext
    ? this.productListItemContext.product$
    : this.currentProductService
    ? this.currentProductService.getProduct(
        ConfiguratorProductScope.CONFIGURATOR
      )
    : of(null)
  ).pipe(
    //needed because also currentProductService might return null
    map((product) => (product ? product : {}))
  );

  constructor(
    protected activeCartService: ActiveCartFacade,
    protected routingService: RoutingService,
    @Optional() protected productListItemContext: ProductListItemContext,
    @Optional() protected currentProductService: CurrentProductService
  ) {}

  //TODO: update bundle when the product selected
  select(product: Product) {
    console.log('Select ' + product.code);
    this.routingService.go({ cxRoute: 'cart' });
    // this.activeCartService.updateEntryGroup();
  }
}
