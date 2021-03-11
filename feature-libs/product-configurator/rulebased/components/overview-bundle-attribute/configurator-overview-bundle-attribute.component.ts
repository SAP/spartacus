import { Component, Input, OnInit } from '@angular/core';
import { ImageGroup, Product, ProductService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorPriceComponentOptions } from '../price/configurator-price.component';

interface ProductExtended extends Product {
  noLink?: boolean;
}

@Component({
  selector: 'cx-configurator-cpq-overview-attribute',
  templateUrl: './configurator-overview-bundle-attribute.component.html',
})
export class ConfiguratorOverviewBundleAttributeComponent implements OnInit {
  product$: Observable<ProductExtended>;

  @Input() attributeOverview: Configurator.AttributeOverview;

  constructor(protected productService: ProductService) {}

  ngOnInit() {
    const noCommerceProduct: ProductExtended = { images: {}, noLink: true };
    if (this.attributeOverview?.productCode) {
      this.product$ = this.productService
        .get(this.attributeOverview?.productCode)
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
   * @param {Product} product
   * @returns {(ImageGroup | ImageGroup[])} - primary image
   */
  getProductPrimaryImage(product: Product): ImageGroup | ImageGroup[] {
    return product?.images?.PRIMARY;
  }

  /**
   * Extract corresponding price formula parameters
   *
   * @return {ConfiguratorPriceComponentOptions} - New price formula
   */
  extractPriceFormulaParameters(): ConfiguratorPriceComponentOptions {
    return {
      quantity: this.attributeOverview?.quantity,
      price: this.attributeOverview?.valuePrice,
      priceTotal: this.attributeOverview?.valuePriceTotal,
      isLightedUp: true,
    };
  }

  /**
   * Verifies whether the quantity should be displayed.
   *
   * @return {boolean} - 'true' if the quantity should be displayed, otherwise 'false'
   */
  displayQuantity(): boolean {
    return (
      this.attributeOverview?.quantity && this.attributeOverview?.quantity > 0
    );
  }

  /**
   * Verifies whether the item price should be displayed.
   *
   * @return {boolean} - 'true' if the item price price should be displayed, otherwise 'false'
   */
  displayPrice(): boolean {
    return (
      this.attributeOverview?.valuePrice &&
      this.attributeOverview?.valuePrice?.value > 0
    );
  }
}
