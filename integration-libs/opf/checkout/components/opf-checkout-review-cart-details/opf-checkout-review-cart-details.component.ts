import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Cart } from '@spartacus/cart/base/root';
import { PromotionLocation } from '@spartacus/cart/base/root';
import { CartOutlets } from '@spartacus/cart/base/root';

@Component({
  selector: 'cx-opf-checkout-review-cart-details',
  templateUrl: './opf-checkout-review-cart-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class OpfCheckoutReviewCartDetailsComponent {
  @Input() cart: Cart | undefined;

  @Input() entries: any[] | undefined;

  readonly promotionLocation: PromotionLocation = PromotionLocation.Checkout;

  cartOutlets = CartOutlets;
}
