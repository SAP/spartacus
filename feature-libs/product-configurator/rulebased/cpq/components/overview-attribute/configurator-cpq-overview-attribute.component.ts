import { Component, Input, OnInit } from '@angular/core';
import { ImageGroup, Product, ProductService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { Configurator } from '../../../core/model/index';
import { ConfiguratorPriceComponentOptions } from '../../../components/price/configurator-price.component';

@Component({
  selector: 'cx-configurator-cpq-overview-attribute',
  templateUrl: './configurator-cpq-overview-attribute.component.html',
})
export class ConfiguratorCPQOverviewAttributeComponent implements OnInit {
  product$: Observable<Product>;

  @Input() attributeOverview: Configurator.AttributeOverview;

  constructor(protected productService: ProductService) {}

  ngOnInit() {
    this.product$ = this.productService.get(
      this.attributeOverview?.productCode
    );
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
