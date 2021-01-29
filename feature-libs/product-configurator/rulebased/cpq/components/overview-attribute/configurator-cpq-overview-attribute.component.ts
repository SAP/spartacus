import { Component, Input, OnInit } from '@angular/core';
import { ImageGroup, Product, ProductService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { Configurator } from '../../../core/model/index';

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

  setFormula(
    quantity?: number,
    price?: Configurator.PriceDetails,
    priceTotal?: Configurator.PriceDetails
  ) {
    return {
      quantity: quantity,
      price: price,
      priceTotal: priceTotal,
      isLightedUp: true,
    };
  }
}
