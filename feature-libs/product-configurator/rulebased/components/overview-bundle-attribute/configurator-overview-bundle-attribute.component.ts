import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  ImageGroup,
  Product,
  ProductScope,
  ProductService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorPriceComponentOptions } from '../price/configurator-price.component';

@Component({
  selector: 'cx-configurator-cpq-overview-attribute',
  templateUrl: './configurator-overview-bundle-attribute.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorOverviewBundleAttributeComponent implements OnInit {
  product$: Observable<Product>;

  @Input() attributeOverview: Configurator.AttributeOverview;

  constructor(protected productService: ProductService) {}

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
   * @param {Product} product
   * @returns {(ImageGroup | ImageGroup[] | undefined)} - primary image. View can handle an undefined image
   */
  getProductPrimaryImage(
    product: Product
  ): ImageGroup | ImageGroup[] | undefined {
    return product?.images?.PRIMARY;
  }

  /**
   * Extract corresponding price formula parameters
   *
   * @return {ConfiguratorPriceComponentOptions} - New price formula
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
   * @return {boolean} - 'true' if the quantity should be displayed, otherwise 'false'
   */
  displayQuantity(): boolean {
    const quantity = this.attributeOverview.quantity;
    return quantity !== undefined && quantity > 0;
  }

  /**
   * Verifies whether the item price should be displayed.
   *
   * @return {boolean} - 'true' if the item price price should be displayed, otherwise 'false'
   */
  displayPrice(): boolean {
    return (
      this.attributeOverview.valuePrice?.value !== undefined &&
      this.attributeOverview.valuePrice?.value > 0
    );
  }
}
