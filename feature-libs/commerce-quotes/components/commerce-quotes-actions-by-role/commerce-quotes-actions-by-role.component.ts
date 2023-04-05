/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import {
  CommerceQuotesFacade,
  QuoteActionType,
} from '@spartacus/commerce-quotes/root';

@Component({
  selector: 'cx-commerce-quotes-actions-by-role',
  templateUrl: './commerce-quotes-actions-by-role.component.html',
})
export class CommerceQuotesActionsByRoleComponent {
  quoteDetailsState$ = this.commerceQuotesService.getQuoteDetails();

  QuoteActionType = QuoteActionType;

  constructor(protected commerceQuotesService: CommerceQuotesFacade) {}

  performAction(quoteCode: string, action: QuoteActionType) {
    this.commerceQuotesService.performQuoteAction(quoteCode, action);
  }

  requote(quoteId: string) {
    this.commerceQuotesService.requote(quoteId);
  }
}
