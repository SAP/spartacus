/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, Optional } from '@angular/core';
import { Product } from '@spartacus/core';
import {
  CurrentProductService,
  ProductListItemContext,
} from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  CommonConfigurator,
  ReadOnlyPostfix,
} from '../../core/model/common-configurator.model';
import { ConfiguratorProductScope } from '../../core/model/configurator-product-scope';

@Component({
  selector: 'cx-configure-product',
  templateUrl: './configure-product.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigureProductComponent {
  nonConfigurable: Product = { configurable: false };
  product$: Observable<Product> = (this.productListItemContext
    ? this.productListItemContext.product$
    : this.currentProductService
    ? this.currentProductService.getProduct(
        ConfiguratorProductScope.CONFIGURATOR
      )
    : of(null)
  ).pipe(
    //needed because also currentProductService might return null
    map((product) => (product ? product : this.nonConfigurable))
  );

  ownerTypeProduct: CommonConfigurator.OwnerType =
    CommonConfigurator.OwnerType.PRODUCT;

  /**
   * Retrieves a translation key depending on the condition.
   *
   * @param configuratorType - configurator type
   * @returns - If the configurator type contains a postfix readOnly then 'configurator.header.toconfigView' translation key will be returned,
   * otherwise 'configurator.header.toconfig' will be returned.
   */
  getTranslationKey(configuratorType?: string): string {
    return !!configuratorType &&
      configuratorType.trim().endsWith(ReadOnlyPostfix)
      ? 'configurator.header.toconfigView'
      : 'configurator.header.toconfig';
  }

  constructor(
    @Optional() protected productListItemContext: ProductListItemContext, // when on PLP
    @Optional() protected currentProductService: CurrentProductService // when on PDP
  ) {}
}
