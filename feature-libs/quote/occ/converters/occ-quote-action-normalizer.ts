/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Converter } from '@spartacus/core';
import { QuoteConfig } from '@spartacus/quote/core';
import {
  OccQuote,
  Quote,
  QuoteAction,
  QuoteActionType,
  QuoteState,
} from '@spartacus/quote/root';

@Injectable({ providedIn: 'root' })
export class OccQuoteActionNormalizer implements Converter<OccQuote, Quote> {
  constructor(private quoteConfig: QuoteConfig) {}

  convert(source: OccQuote, target?: Quote): Quote {
    if (!target) {
      target = { ...source, allowedActions: [], isEditable: false };
    }

    if (source.state) {
      target.allowedActions = this.getOrderedActions(
        source.state,
        source.allowedActions
      ).map((action) => this.getActionCategory(action));
    }
    const switchToEditModeRequired = target.allowedActions?.find(
      (quoteAction) => quoteAction.type === QuoteActionType.EDIT
    );

    target.isEditable =
      source.allowedActions.includes(QuoteActionType.EDIT) &&
      !switchToEditModeRequired;
    return target;
  }

  protected getActionCategory(type: QuoteActionType): QuoteAction {
    const primaryActions: QuoteActionType[] =
      this.quoteConfig.quote?.actions?.primaryActions || [];

    return { type, isPrimary: primaryActions.includes(type) };
  }

  protected getOrderedActions(state: QuoteState, list: QuoteActionType[]) {
    const order = this.quoteConfig.quote?.actions?.actionsOrderByState?.[state];

    return order
      ? list
          .filter((item) => order.includes(item))
          .sort((a, b) => order.indexOf(a) - order.indexOf(b))
      : list;
  }
}
