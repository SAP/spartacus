import { Injectable } from '@angular/core';
import { Product } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionProductService {
  isSubscription(product: Product): boolean {
    return product.sapSubscriptionTerm && product.sapPricePlan ? true : false;
  }
}
