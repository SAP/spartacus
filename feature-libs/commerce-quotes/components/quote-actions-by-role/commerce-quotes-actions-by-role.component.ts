/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { QuoteFacade, QuoteActionType } from '@spartacus/commerce-quotes/root';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-commerce-quotes-actions-by-role',
  templateUrl: './commerce-quotes-actions-by-role.component.html',
})
export class CommerceQuotesActionsByRoleComponent implements OnDestroy {
  quoteDetailsState$ = this.commerceQuotesService.getQuoteDetails();

  @ViewChild('element') element: ElementRef;

  QuoteActionType = QuoteActionType;

  protected subscription = new Subscription();

  constructor(
    protected commerceQuotesService: QuoteFacade,
    protected launchDialogService: LaunchDialogService,
    protected viewContainerRef: ViewContainerRef
  ) {}

  onClick(quoteActionType: QuoteActionType, code: string) {
    if (quoteActionType === QuoteActionType.REQUOTE) {
      this.requote(code);
      return;
    }
    this.performAction(code, quoteActionType);
  }
  performAction(quoteCode: string, action: QuoteActionType) {
    if (action !== QuoteActionType.SUBMIT) {
      this.commerceQuotesService.performQuoteAction(quoteCode, action);
      return;
    }
    this.launchDialogService
      .openDialog(
        LAUNCH_CALLER.REQUEST_CONFIRMATION,
        this.element,
        this.viewContainerRef,
        { quoteCode }
      )
      ?.pipe(take(1))
      .subscribe();

    this.subscription.add(
      this.launchDialogService.dialogClose
        .pipe(
          filter((reason) => reason === 'yes'),
          tap(() =>
            this.commerceQuotesService.performQuoteAction(quoteCode, action)
          )
        )
        .subscribe()
    );
  }

  requote(quoteId: string) {
    this.commerceQuotesService.requote(quoteId);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
