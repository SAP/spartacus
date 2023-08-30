/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { QuoteCoreConfig } from '@spartacus/quote/core';
import { Converter } from '@spartacus/core';
import {
  OccQuote,
  Quote,
  QuoteAction,
  QuoteActionType,
  QuoteState,
  QuoteCartService,
} from '@spartacus/quote/root';
import { combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class OccQuoteActionNormalizer implements Converter<OccQuote, Quote> {
  constructor(
    protected quoteConfig: QuoteCoreConfig,
    protected quoteCartService: QuoteCartService
  ) {}

  convert(source: OccQuote, target?: Quote): Quote {
    if (!target) {
      target = { ...source, allowedActions: [], isEditable: false };
    }

    if (source.allowedActions && source.state) {
      target.allowedActions = this.getOrderedActions(
        source.state,
        source.allowedActions,
        source.code
      ).map((action) => this.getActionCategory(action));
    }
    const switchToEditModeRequired = target.allowedActions?.find(
      (quoteAction) => quoteAction.type === QuoteActionType.EDIT
    );

    target.isEditable =
      !!source.allowedActions?.includes(QuoteActionType.EDIT) &&
      !switchToEditModeRequired;

    //TODO CONFIG_INTEGRATION have this code in a dedicated entry normalizer
    //TODO CONFIG_INTEGRATION introduce constant for quote in model (no enum)
    target.entries?.forEach((entry) => (entry.quoteCode = source.code));

    return target;
  }

  protected getActionCategory(type: QuoteActionType): QuoteAction {
    const primaryActions: QuoteActionType[] =
      this.quoteConfig.quote?.actions?.primaryActions || [];

    return { type, isPrimary: primaryActions.includes(type) };
  }

  protected getOrderedActions(
    state: QuoteState,
    list: QuoteActionType[],
    quoteId: string
  ) {
    const order = this.quoteConfig.quote?.actions?.actionsOrderByState?.[state];
    if (order) {
      //deep copy order list
      const clonedActionList = structuredClone(order);
      combineLatest([
        this.quoteCartService.isQuoteCartActive(),
        this.quoteCartService.getQuoteId(),
      ])
        .pipe(take(1))
        .subscribe(([isQuoteCartActive, cartQuoteId]) => {
          if (isQuoteCartActive && cartQuoteId === quoteId) {
            const editIndex = clonedActionList.indexOf(QuoteActionType.EDIT);
            if (editIndex > -1) {
              clonedActionList.splice(editIndex, 1);
            }
          }
        });
      return list
        .filter((item) => clonedActionList.includes(item))
        .sort(
          (a, b) => clonedActionList.indexOf(a) - clonedActionList.indexOf(b)
        );
    } else {
      return list;
    }
  }
}
