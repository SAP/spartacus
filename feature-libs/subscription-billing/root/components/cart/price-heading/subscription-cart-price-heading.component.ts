/* eslint-disable linebreak-style */
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { I18nModule } from '@spartacus/core';

@Component({
  selector: 'cx-subscription-cart-price-heading',
  standalone: true,
  imports: [CommonModule, I18nModule],
  templateUrl: './subscription-cart-price-heading.component.html',
})
export class SubscriptionCartPriceHeadingComponent {}
