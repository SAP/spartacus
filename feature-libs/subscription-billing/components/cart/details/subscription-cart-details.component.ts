/* eslint-disable linebreak-style */
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CartDetailsComponent, CartSharedModule, CartValidationWarningsModule } from '@spartacus/cart/base/components';
import { I18nModule } from '@spartacus/core';
import { PromotionsModule } from '@spartacus/storefront';

@Component({
  selector: 'cx-subscription-cart-details',
  imports: [CommonModule, I18nModule, CartValidationWarningsModule, PromotionsModule, CartSharedModule],
  standalone: true,
  templateUrl: './subscription-cart-details.component.html'
})
export class SubscriptionCartDetailsComponent extends CartDetailsComponent {

}
