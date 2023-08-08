/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';
import { QuoteFacade, QuoteActionType, Quote } from '@spartacus/quote/root';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';

export interface ConfirmationContext {
  quote: Quote;
  title: string;
  confirmNote: string;
  warningNote?: string;
  validity?: string;
}

@Component({
  selector: 'cx-quote-actions-by-role',
  templateUrl: './quote-actions-by-role.component.html',
})
export class QuoteActionsByRoleComponent implements OnInit, OnDestroy {
  quoteDetails$: Observable<Quote> = this.quoteFacade.getQuoteDetails();

  @ViewChild('element') element: ElementRef;

  QuoteActionType = QuoteActionType;

  protected subscription = new Subscription();

  constructor(
    protected quoteFacade: QuoteFacade,
    protected launchDialogService: LaunchDialogService,
    protected viewContainerRef: ViewContainerRef,
    protected globalMessageService: GlobalMessageService
  ) {}

  ngOnInit(): void {
    //submit button present and threshold not reached: Display message
    this.quoteDetails$.pipe(take(1)).subscribe((quote) => {
      const mustDisableAction = quote.allowedActions.find((action) =>
        this.mustDisableAction(action.type, quote)
      );
      if (mustDisableAction) {
        this.globalMessageService.add(
          {
            key: 'quote.requestDialog.form.minRequestInitiationNote',
            params: {
              minValue: quote.threshold,
            },
          },
          GlobalMessageType.MSG_TYPE_WARNING
        );
      }
    });
  }

  mustDisableAction(type: string, quote: Quote): boolean {
    return type === QuoteActionType.SUBMIT && !this.isThresholdReached(quote);
  }

  protected isThresholdReached(quote: Quote): boolean {
    const requestThreshold = quote.threshold || 0;
    return (quote.totalPrice.value || 0) >= requestThreshold;
  }

  onClick(quoteActionType: QuoteActionType, quote: Quote) {
    if (quoteActionType === QuoteActionType.REQUOTE) {
      this.requote(quote.code);
      return;
    }
    this.performAction(quoteActionType, quote);
  }
  performAction(action: QuoteActionType, quote: Quote) {
    if (!this.isConfirmationPopupRequired(action, quote.state)) {
      this.quoteFacade.performQuoteAction(quote.code, action);
      return;
    }
    this.launchDialogService
      .openDialog(
        LAUNCH_CALLER.ACTION_CONFIRMATION,
        this.element,
        this.viewContainerRef,
        { confirmationContext: this.prepareConfirmationContext(action, quote) }
      )
      ?.pipe(take(1))
      .subscribe();

    this.subscription.add(
      this.launchDialogService.dialogClose
        .pipe(
          filter((reason) => reason === 'yes'),
          tap(() => this.quoteFacade.performQuoteAction(quote.code, action))
        )
        .subscribe()
    );
  }

  requote(quoteId: string) {
    this.quoteFacade.requote(quoteId);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  isConfirmationPopupRequired(action: QuoteActionType, state: string): boolean {
    return (
      this.isSubmitAction(action) ||
      this.isEditActionForBuyerOffer(action, state)
    );
  }

  isSubmitAction(action: QuoteActionType): boolean {
    return action === QuoteActionType.SUBMIT;
  }

  isEditActionForBuyerOffer(action: QuoteActionType, state: string): boolean {
    return action === QuoteActionType.EDIT && state === 'BUYER_OFFER';
  }

  prepareConfirmationContext(
    action: QuoteActionType,
    quote: Quote
  ): ConfirmationContext {
    const confirmationContext: ConfirmationContext = {
      quote: quote,
      title: '',
      warningNote: '',
      confirmNote: '',
      validity: '',
    };
    if (this.isSubmitAction(action)) {
      confirmationContext.title = 'quote.confirmActionDialog.submit.title';
      confirmationContext.warningNote =
        'quote.confirmActionDialog.submit.warningNote';
      confirmationContext.confirmNote =
        'quote.confirmActionDialog.submit.confirmNote';
    } else if (this.isEditActionForBuyerOffer(action, quote.state)) {
      confirmationContext.title =
        'quote.confirmActionDialog.editBuyerOffer.title';
      confirmationContext.warningNote =
        'quote.confirmActionDialog.editBuyerOffer.warningNote';
      confirmationContext.confirmNote =
        'quote.confirmActionDialog.editBuyerOffer.confirmNote';
      confirmationContext.validity = 'quote.confirmActionDialog.validity';
    }
    return confirmationContext;
  }
}
