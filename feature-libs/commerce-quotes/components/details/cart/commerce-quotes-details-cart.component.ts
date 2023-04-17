import { Component } from '@angular/core';
import { CartOutlets } from '@spartacus/cart/base/root';
import { CommerceQuotesFacade } from '@spartacus/commerce-quotes/root';

@Component({
  selector: 'cx-commerce-quotes-details-cart',
  templateUrl: './commerce-quotes-details-cart.component.html',
})
export class CommerceQuotesDetailsCartComponent {
  quoteDetails$ = this.commerceQuotesService.getQuoteDetails();
  readonly cartOutlets = CartOutlets;

  constructor(protected commerceQuotesService: CommerceQuotesFacade) {}
}
