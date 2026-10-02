/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  CxNumericPipe,
  ImageGroup,
  Product,
  ProductScope,
  ProductService,
  TranslatePipe,
  TranslationService,
} from '@spartacus/core';
import { MediaComponent } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Configurator } from '../../core/model/configurator.model';
import {
  ConfiguratorPriceComponent,
  ConfiguratorPriceComponentOptions,
} from '../price/configurator-price.component';
import { ConfiguratorStorefrontUtilsService } from '../service/configurator-storefront-utils.service';

@Component({
  selector: 'cx-configurator-cpq-overview-attribute',
  templateUrl: './configurator-overview-bundle-attribute.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    MediaComponent,
    ConfiguratorPriceComponent,
    AsyncPipe,
    TranslatePipe,
    CxNumericPipe,
  ],
})
export class ConfiguratorOverviewBundleAttributeComponent implements OnInit {
  product$: Observable<Product>;

  @Input() attributeOverview: Configurator.AttributeOverview;

  /**
   * Prefix that reflects parent groups in the overview hierarchy.
   */
  @Input() overviewIdPrefix = '';

  /**
   * Id of the group that contains the bundle attribute.
   */
  @Input() parentGroupId: string;

  /**
   * Indicates whether a configuration details section exists for this item.
   */
  @Input() hasConfigurationDetails = false;

  constructor(
    protected productService: ProductService,
    protected translation: TranslationService,
    protected configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService
  ) {}

  ngOnInit() {
    const noCommerceProduct: Product = { images: {} };
    if (this.attributeOverview.productCode) {
      this.product$ = this.productService
        .get(this.attributeOverview.productCode, ProductScope.LIST)
        .pipe(
          map((respProduct) => {
            return respProduct ? respProduct : noCommerceProduct;
          })
        );
    } else {
      this.product$ = of(noCommerceProduct);
    }
  }

  /**
   * Returns primary image from product object
   *
   * @param product - Product
   * @returns - primary image. View can handle an undefined image
   */
  getProductPrimaryImage(
    product: Product
  ): ImageGroup | ImageGroup[] | undefined {
    return product?.images?.PRIMARY;
  }

  /**
   * Extract corresponding price formula parameters
   *
   * @return - New price formula
   */
  extractPriceFormulaParameters(): ConfiguratorPriceComponentOptions {
    return {
      quantity: this.attributeOverview.quantity,
      price: this.attributeOverview.valuePrice,
      priceTotal: this.attributeOverview.valuePriceTotal,
      isLightedUp: true,
    };
  }

  /**
   * Verifies whether the quantity should be displayed.
   *
   * @return - 'true' if the quantity should be displayed, otherwise 'false'
   */
  displayQuantity(): boolean {
    const quantity = this.attributeOverview.quantity;
    return quantity !== undefined && quantity > 0;
  }

  /**
   * Verifies whether the item price should be displayed.
   *
   * @return - 'true' if the item price should be displayed, otherwise 'false'
   */
  displayPrice(): boolean {
    return (
      this.attributeOverview.valuePrice?.value !== undefined &&
      this.attributeOverview.valuePrice?.value > 0
    );
  }

  /**
   * Scrolls to the configuration details section of the container item.
   */
  viewDetails(): void {
    const detailsGroupId = `${Configurator.ContainerRowGroupIdPrefix}@${this.attributeOverview.attributeId}@${this.attributeOverview.valueId}`;
    const idPrefix = this.configuratorStorefrontUtilsService.getPrefixId(
      this.overviewIdPrefix,
      this.parentGroupId
    );

    this.configuratorStorefrontUtilsService.navigateToOverviewGroup(
      idPrefix,
      detailsGroupId
    );
  }

  getAriaLabel(): string {
    let translatedText = '';
    if (this.displayQuantity()) {
      if (
        this.attributeOverview.valuePrice?.value !== undefined &&
        this.attributeOverview.valuePrice?.value !== 0
      ) {
        this.translation
          .translate(
            'configurator.a11y.itemOfAttributeFullWithPriceAndQuantity',
            {
              item: this.attributeOverview.value,
              attribute: this.attributeOverview.attribute,
              price: this.attributeOverview.valuePriceTotal?.formattedValue,
              quantity: this.attributeOverview.quantity,
            }
          )
          .pipe(take(1))
          .subscribe((text) => (translatedText = text));
      } else {
        this.translation
          .translate('configurator.a11y.itemOfAttributeFullWithQuantity', {
            item: this.attributeOverview.value,
            attribute: this.attributeOverview.attribute,
            quantity: this.attributeOverview.quantity,
          })
          .pipe(take(1))
          .subscribe((text) => (translatedText = text));
      }
    } else {
      if (
        this.attributeOverview.valuePrice?.value !== undefined &&
        this.attributeOverview.valuePrice?.value !== 0
      ) {
        this.translation
          .translate('configurator.a11y.itemOfAttributeFullWithPrice', {
            item: this.attributeOverview.value,
            attribute: this.attributeOverview.attribute,
            price: this.attributeOverview.valuePriceTotal?.formattedValue,
          })
          .pipe(take(1))
          .subscribe((text) => (translatedText = text));
      } else {
        this.translation
          .translate('configurator.a11y.itemOfAttributeFull', {
            item: this.attributeOverview.value,
            attribute: this.attributeOverview.attribute,
          })
          .pipe(take(1))
          .subscribe((text) => (translatedText = text));
      }
    }
    return translatedText;
  }
}
