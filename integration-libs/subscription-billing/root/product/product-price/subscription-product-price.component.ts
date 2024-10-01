import { Component, inject } from '@angular/core';
import { Product, ProductScope } from '@spartacus/core';
import { Observable } from 'rxjs';
import { SubscriptionProductService } from '../services/subscription-product.service';
import { CurrentProductService } from '@spartacus/storefront';

@Component({
  selector: 'cx-subscription-product-price',
  templateUrl: './subscription-product-price.component.html',
})
export class SubscriptionProductPriceComponent {
  protected productService = inject(SubscriptionProductService);
  protected currentProductService = inject(CurrentProductService);
  protected product$: Observable<Product | null> =
    this.currentProductService.getProduct([ProductScope.SUBSCRIPTION]);

  isCurrentProductSubscription(product: Product): boolean {
    return this.productService.isSubscription(product);
  }
}
