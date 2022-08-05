import { Injectable } from '@angular/core';
import { CQConfig } from '@spartacus/commerce-quotes/core';
import {
  QuoteAction,
  OccQuote,
  Quote,
  QuoteActionType,
  QuoteState,
} from '@spartacus/commerce-quotes/root';
import { Converter } from '@spartacus/core';

@Injectable({ providedIn: 'root' })
export class OccQuoteActionNormalizer implements Converter<OccQuote, Quote> {
  constructor(private commerceQuotesConfig: CQConfig) {}

  convert(source: OccQuote, target?: Quote): Quote {
    if (!target) {
      target = { ...(source as any) } as Quote;
    }

    if (source.allowedActions && source.state) {
      target.allowedActions = this.getOrderedActions(
        source.state,
        source.allowedActions
      ).map((action) => this.getActionCategory(action));
    }

    return target;
  }

  protected getActionCategory(type: QuoteActionType): QuoteAction {
    const primaryActions: QuoteActionType[] =
      this.commerceQuotesConfig.commerceQuotes?.actions?.primaryActions || [];

    return { type, isPrimary: primaryActions.includes(type) };
  }

  protected getOrderedActions(state: QuoteState, list: QuoteActionType[]) {
    const order =
      this.commerceQuotesConfig.commerceQuotes?.actions?.actionsOrderByState?.[
        state
      ];

    return !order
      ? list
      : list
          .filter((item) => order.includes(item))
          .sort((a, b) => order.indexOf(a) - order.indexOf(b));
  }
}
