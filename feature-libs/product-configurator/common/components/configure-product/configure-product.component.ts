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
   * Retrieves a translation key for aria-label depending on the condition.
   *
   * @param configuratorType - configurator type
   * @returns - If the configurator type contains a read-only postfix then 'configurator.a11y.showDetailsProduct' translation key will be returned,
   * otherwise 'configurator.a11y.configureProduct'.
   */
  getAriaLabelTranslationKey(configuratorType?: string): string {
    return this.isConfiguratorTypeReadOnly(configuratorType)
      ? 'configurator.a11y.showDetailsProduct'
      : 'configurator.a11y.configureProduct';
  }

  /**
   * Retrieves a translation key depending on the condition.
   *
   * @param configuratorType - configurator type
   * @returns - If the configurator type contains a read-only postfix then 'configurator.header.toConfigReadOnly' translation key will be returned,
   * otherwise 'configurator.header.toconfig'.
   */
  getTranslationKey(configuratorType?: string): string {
    return this.isConfiguratorTypeReadOnly(configuratorType)
      ? 'configurator.header.toConfigReadOnly'
      : 'configurator.header.toconfig';
  }

  /**
   * Verifies whether restart dialog should be displayed or not.
   *
   * @param configuratorType
   * @returns - If the configurator type contains a read-only postfix then false will be returned, otherwise true.
   */
  isDisplayRestartDialog(configuratorType?: string): string {
    return this.isConfiguratorTypeReadOnly(configuratorType) ? 'false' : 'true';
  }

  protected isConfiguratorTypeReadOnly(configuratorType?: string): boolean {
    return (
      !!configuratorType && configuratorType.trim().endsWith(ReadOnlyPostfix)
    );
  }

  constructor(
    @Optional() protected productListItemContext: ProductListItemContext, // when on PLP
    @Optional() protected currentProductService: CurrentProductService // when on PDP
  ) {}
}
