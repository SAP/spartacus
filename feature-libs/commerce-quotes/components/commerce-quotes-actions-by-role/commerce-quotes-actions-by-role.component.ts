import { Component } from '@angular/core';
import {
  CommerceQuotesFacade,
  QuoteAction,
  QuoteState,
} from '@spartacus/commerce-quotes/root';
import { ConfigurationService } from '@spartacus/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-commerce-quotes-actions-by-role',
  templateUrl: './commerce-quotes-actions-by-role.component.html',
})
export class CommerceQuotesActionsByRoleComponent {
  quoteDetailsState$ = this.commerceQuotesService.getQuoteDetails().pipe(
    map((detailsState) => {
      const { data } = detailsState;
      if (data) {
        const { allowedActions, state } = data;
        if (!allowedActions || !state) {
          return detailsState;
        }
        return {
          ...detailsState,
          data: {
            ...data,
            allowedActions: this.getOrderedList(state, allowedActions),
          },
        };
      }
    })
  );

  primaryActions: QuoteAction[] =
    this.configService.config.commerceQuotes?.primaryActions || [];

  QuoteAction = QuoteAction;

  constructor(
    protected commerceQuotesService: CommerceQuotesFacade,
    protected configService: ConfigurationService
  ) {}

  performAction(quoteCode: string, action: QuoteAction) {
    this.commerceQuotesService.performQuoteAction(quoteCode, action);
  }

  requote(quoteId: string) {
    this.commerceQuotesService.requote(quoteId);
  }

  protected getOrderedList(state: QuoteState, list: QuoteAction[]) {
    const order =
      this.configService.config.commerceQuotes?.actionsOrderByState?.[state];
    return !order
      ? list
      : list
          .filter((item) => order.includes(item))
          .sort((a, b) => order.indexOf(a) - order.indexOf(b));
  }
}
