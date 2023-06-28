/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { QuoteConfig } from '@spartacus/quote/core';
import {
  QuoteAction,
  OccQuote,
  Quote,
  QuoteActionType,
  QuoteState,
} from '@spartacus/quote/root';
import { Converter } from '@spartacus/core';

@Injectable({ providedIn: 'root' })
export class OccQuoteActionNormalizer implements Converter<OccQuote, Quote> {
  constructor(private quoteConfig: QuoteConfig) {}

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
      this.quoteConfig.quote?.actions?.primaryActions || [];

    return { type, isPrimary: primaryActions.includes(type) };
  }

  protected getOrderedActions(state: QuoteState, list: QuoteActionType[]) {
    const order = this.quoteConfig.quote?.actions?.actionsOrderByState?.[state];

    return !order
      ? list
      : list
          .filter((item) => order.includes(item))
          .sort((a, b) => order.indexOf(a) - order.indexOf(b));
  }
}
