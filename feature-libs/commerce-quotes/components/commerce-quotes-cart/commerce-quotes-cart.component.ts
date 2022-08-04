import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommerceQuotesFacade } from '@spartacus/commerce-quotes/root';

@Component({
  selector: 'cx-commerce-quotes-cart',
  templateUrl: './commerce-quotes-cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommerceQuotesCartComponent {
  quoteDetails$ = this.commerceQuotesService.getQuoteDetails();

  constructor(protected commerceQuotesService: CommerceQuotesFacade) {}
}
