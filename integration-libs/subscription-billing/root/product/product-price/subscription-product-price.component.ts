import { Component, inject } from '@angular/core';
import { Product, ProductScope } from '@spartacus/core';
import { CurrentProductService } from '@spartacus/storefront';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-subscription-product-price',
  templateUrl: './subscription-product-price.component.html',
})
export class SubscriptionProductPriceComponent {
  protected currentProductService = inject(CurrentProductService);
  protected product$: Observable<Product | null> =
    this.currentProductService.getProduct([ProductScope.SUBSCRIPTION_PRICE]);
}
