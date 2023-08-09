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
import {
  Quote,
  QuoteActionType,
  QuoteFacade,
  QuoteState,
} from '@spartacus/quote/root';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import {
  ConfirmActionDialogConfig,
  ConfirmationContext,
  confirmActionDialogConfigs,
  defaultConfirmActionDialogConfig,
} from '../quote-confirm-action-dialog/quote-confirm-action-dialog.model';
import { ResponsiblePersonPrefix } from '../quote-list/quote-list.component';

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
    if (!this.isConfirmationDialogRequired(action, quote.state)) {
      this.quoteFacade.performQuoteAction(quote.code, action);
      return;
    }

    const context = this.prepareConfirmationContext(action, quote);
    this.launchConfirmationDialog(context);
    this.handleConfirmationDialogClose(action, context);
  }

  protected launchConfirmationDialog(context: ConfirmationContext) {
    this.launchDialogService
      .openDialog(
        LAUNCH_CALLER.ACTION_CONFIRMATION,
        this.element,
        this.viewContainerRef,
        { confirmationContext: context }
      )
      ?.pipe(take(1))
      .subscribe();
  }

  protected handleConfirmationDialogClose(
    action: QuoteActionType,
    context: ConfirmationContext
  ) {
    this.subscription.add(
      this.launchDialogService.dialogClose
        .pipe(
          filter((reason) => reason === 'yes'),
          tap(() => this.quoteFacade.performQuoteAction(context.quote.code, action)),
          filter(() => !!context.successMessage),
          tap(() =>
            this.globalMessageService.add(
              { key: context.successMessage },
              GlobalMessageType.MSG_TYPE_CONFIRMATION
            )
          )
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

  protected isConfirmationDialogRequired(
    action: QuoteActionType,
    state: QuoteState
  ): boolean {
    const stateAndAction = `${state.toLocaleLowerCase()}.${action.toLowerCase()}`;
    const roleAndAction = `${this.statusToRole(state)}.${action.toLowerCase()}`;
    return (
      confirmActionDialogConfigs.has(stateAndAction) ||
      confirmActionDialogConfigs.has(roleAndAction)
    );
  }

  protected prepareConfirmationContext(
    action: QuoteActionType,
    quote: Quote
  ): ConfirmationContext {
    const dialogConfig = this.getDialogConfig(action, quote.state);
    const confirmationContext: ConfirmationContext = {
      quote: quote,
      title: dialogConfig.i18nKey + '.title',
      confirmNote: dialogConfig.i18nKey + '.confirmNote',
    };
    if (dialogConfig.showWarningNote) {
      confirmationContext.warningNote = dialogConfig.i18nKey + '.warningNote';
    }
    if (dialogConfig.showExpirationDate) {
      confirmationContext.validity = 'quote.confirmActionDialog.validity';
    }
    if (dialogConfig.showSuccessMessage) {
      confirmationContext.successMessage =
        dialogConfig.i18nKey + '.successMessage';
    }
    return confirmationContext;
  }

  protected getDialogConfig(
    action: QuoteActionType,
    state: QuoteState
  ): ConfirmActionDialogConfig {
    let dialogConfigKey = `${state.toLocaleLowerCase()}.${action.toLowerCase()}`;
    if (!confirmActionDialogConfigs.has(dialogConfigKey)) {
      dialogConfigKey = `${this.statusToRole(state)}.${action.toLowerCase()}`;
    }

    return {
      ...defaultConfirmActionDialogConfig,
      i18nKey: 'quote.confirmActionDialog.' + dialogConfigKey,
      ...confirmActionDialogConfigs.get(dialogConfigKey),
    };
  }

  protected statusToRole(state: QuoteState) {
    let role = state.toLowerCase();
    Object.values(ResponsiblePersonPrefix).forEach((prefix) => {
      if (state.startsWith(prefix)) {
        role = prefix.slice(0, -1).toLowerCase();
      }
    });
    return role;
  }
}
