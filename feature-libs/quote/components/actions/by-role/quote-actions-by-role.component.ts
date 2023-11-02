/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';
import {
  Quote,
  QuoteAction,
  QuoteActionType,
  QuoteFacade,
  QuoteRoleType,
  QuoteState,
} from '@spartacus/quote/root';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import {
  ConfirmActionDialogConfig,
  QuoteUIConfig,
} from '../../config/quote-ui.config';
import { ConfirmationContext } from '../confirm-dialog/quote-actions-confirm-dialog.model';

@Component({
  selector: 'cx-quote-actions-by-role',
  templateUrl: './quote-actions-by-role.component.html',
})
export class QuoteActionsByRoleComponent implements OnInit, OnDestroy {
  protected quoteFacade = inject(QuoteFacade);
  protected launchDialogService = inject(LaunchDialogService);
  protected viewContainerRef = inject(ViewContainerRef);
  protected globalMessageService = inject(GlobalMessageService);
  protected quoteUIConfig = inject(QuoteUIConfig);
  protected activeCartFacade = inject(ActiveCartFacade);

  quoteDetails$: Observable<Quote> = this.quoteFacade.getQuoteDetails();
  cartDetails$: Observable<Cart> = this.activeCartFacade.getActive();

  @ViewChild('element') element: ElementRef;
  QuoteActionType = QuoteActionType;
  protected subscription = new Subscription();

  ngOnInit(): void {
    //submit button present and threshold not reached: Display message
    this.quoteDetails$.pipe(take(1)).subscribe((quote) => {
      const mustDisableAction = quote.allowedActions.find((action) =>
        this.mustDisableAction(action.type, quote)
      );
      if (mustDisableAction) {
        this.globalMessageService.add(
          {
            key: 'quote.commons.minRequestInitiationNote',
            params: {
              minValue: quote.threshold,
            },
          },
          GlobalMessageType.MSG_TYPE_WARNING
        );
      }
    });
  }

  /**
   * Checks whether the given action must be disabled on the UI based on the details of the quote.
   * For example the SUBMIT action is disabled when the quote threshold is not exceeded.
   *
   * @param type type of the quote action
   * @param quote quote
   * @returns true, only of the action shall be disabled
   */
  mustDisableAction(type: string, quote: Quote): boolean {
    return type === QuoteActionType.SUBMIT && !this.isThresholdReached(quote);
  }

  protected isThresholdReached(quote: Quote): boolean {
    const requestThreshold = quote.threshold || 0;
    return (quote.totalPrice.value || 0) >= requestThreshold;
  }

  /**
   * Generic click handler for quote action buttons.
   *
   * @param action the action to be triggered
   * @param quote quote
   * @param cart cart
   */
  onClick(action: QuoteActionType, quote: Quote, cart: Cart) {
    const cartIsEmpty = (cart.entries?.length ?? 0) === 0;
    if (!this.isConfirmationDialogRequired(action, quote.state, cartIsEmpty)) {
      this.performAction(action, quote);
      return;
    }
    const context = this.prepareConfirmationContext(action, quote);
    this.launchConfirmationDialog(context);
    this.handleConfirmationDialogClose(action, context);
  }

  protected performAction(action: QuoteActionType, quote: Quote) {
    if (action === QuoteActionType.REQUOTE) {
      this.requote(quote.code);
    } else {
      this.quoteFacade.performQuoteAction(quote, action);
    }
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
    this.subscription.unsubscribe();
    this.subscription = new Subscription();
    this.subscription.add(
      this.launchDialogService.dialogClose
        .pipe(
          filter((reason) => reason === 'yes'),
          tap(() => this.performAction(action, context.quote)),
          filter(() => !!context.successMessage),
          tap(() =>
            this.globalMessageService.add(
              { key: context.successMessage },
              this.getMessageType(action)
            )
          )
        )
        .subscribe()
    );
  }

  protected getMessageType(action: QuoteActionType): GlobalMessageType {
    return action === QuoteActionType.CANCEL ||
      action === QuoteActionType.REJECT
      ? GlobalMessageType.MSG_TYPE_INFO
      : GlobalMessageType.MSG_TYPE_CONFIRMATION;
  }

  protected requote(quoteId: string) {
    this.quoteFacade.requote(quoteId);
  }

  /**
   * returns the style class to be used for the button, so wether its a primary, secondary or tertiary button.
   *
   * @param allowedActions currently displayed actions
   * @param action action associated with this button
   * @returns 'btn-primary' | 'btn-secondary' | 'btn-tertiary'
   */
  getButtonStyle(allowedActions: QuoteAction[], action: QuoteAction): string {
    if (action.isPrimary) {
      return 'btn-primary';
    }
    if (allowedActions.length <= 2) {
      return 'btn-secondary';
    }
    return action.type === QuoteActionType.CANCEL
      ? 'btn-tertiary'
      : 'btn-secondary';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  protected isConfirmationDialogRequired(
    action: QuoteActionType,
    state: QuoteState,
    cartIsEmpty: boolean
  ): boolean {
    const mappingConfig = this.quoteUIConfig.quote?.confirmActionDialogMapping;
    const dialogConfig =
      mappingConfig?.[state]?.[action] ??
      mappingConfig?.[this.stateToRoleTypeForDialogConfig(state)]?.[action] ??
      mappingConfig?.[QuoteRoleType.ALL]?.[action];
    return (
      !!dialogConfig &&
      (!cartIsEmpty || !dialogConfig.showOnlyWhenCartIsNotEmpty)
    );
  }

  protected prepareConfirmationContext(
    action: QuoteActionType,
    quote: Quote
  ): ConfirmationContext {
    const dialogConfig = this.getConfirmDialogConfig(action, quote.state);
    const confirmationContext: ConfirmationContext = {
      quote: quote,
      title: dialogConfig.i18nKeyPrefix + '.title',
      confirmNote: dialogConfig.i18nKeyPrefix + '.confirmNote',
      a11y: {
        close: dialogConfig.i18nKeyPrefix + '.a11y.close',
      },
    };
    if (dialogConfig.showWarningNote) {
      confirmationContext.warningNote =
        dialogConfig.i18nKeyPrefix + '.warningNote';
    }
    if (dialogConfig.showExpirationDate) {
      confirmationContext.validity = 'quote.actions.confirmDialog.validity';
    }
    if (dialogConfig.showSuccessMessage) {
      confirmationContext.successMessage =
        dialogConfig.i18nKeyPrefix + '.successMessage';
    }
    return confirmationContext;
  }

  protected getConfirmDialogConfig(
    action: QuoteActionType,
    state: QuoteState
  ): ConfirmActionDialogConfig {
    const mappingConfig = this.quoteUIConfig.quote?.confirmActionDialogMapping;

    const config =
      mappingConfig?.[state]?.[action] ??
      mappingConfig?.[this.stateToRoleTypeForDialogConfig(state)]?.[action] ??
      mappingConfig?.[QuoteRoleType.ALL]?.[action];
    if (!config) {
      throw new Error(
        `Dialog Config expected for quote in state ${state} and action ${action}, but none found in config ${mappingConfig}`
      );
    }

    return config;
  }

  protected stateToRoleTypeForDialogConfig(state: QuoteState): QuoteRoleType {
    let foundRole: QuoteRoleType = QuoteRoleType.ALL;
    Object.values(QuoteRoleType).forEach((role) => {
      if (state.startsWith(role + '_')) {
        foundRole = role;
      }
    });
    return foundRole;
  }
}
