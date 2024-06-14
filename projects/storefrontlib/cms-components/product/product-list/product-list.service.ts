import { inject, Injectable } from '@angular/core';
import { FeatureConfigService } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class ProductListService {
  protected featureConfig = inject(FeatureConfigService);
  private shouldHideAddToCartForUnpurchasableProducts =
    this.featureConfig.isEnabled('shouldHideAddToCartForUnpurchasableProducts');

  constructor() {}

  shouldHideAddToCartButton(product: any): boolean {
    return (
      this.shouldHideAddToCartForUnpurchasableProducts &&
      (!product.price || product.purchasable === false)
    );
  }
}
