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
import {
  GlobalMessageService,
  GlobalMessageType,
  Config,
} from '@spartacus/core';
import { QuoteFacade, QuoteActionType } from '@spartacus/quote/root';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-quote-actions-by-role',
  templateUrl: './quote-actions-by-role.component.html',
})
export class QuoteActionsByRoleComponent implements OnInit, OnDestroy {
  quoteDetailsState$ = this.quoteFacade
    .getQuoteDetails()
    .pipe(filter((state) => !state.loading));

  @ViewChild('element') element: ElementRef;

  QuoteActionType = QuoteActionType;

  protected subscription = new Subscription();

  constructor(
    protected quoteFacade: QuoteFacade,
    protected launchDialogService: LaunchDialogService,
    protected viewContainerRef: ViewContainerRef,
    protected globalMessageService: GlobalMessageService,
    protected config: Config
  ) {}

  ngOnInit(): void {
    //submit button present and threshold not reached: Display message
    this.quoteDetailsState$
      .pipe(
        map((state) => state.data),
        take(1)
      )
      .subscribe((quote) => {
        const total = quote?.totalPrice;
        const mustDisableAction = quote?.allowedActions?.find((action) =>
          this.mustDisableAction(action.type, total?.value)
        );
        if (mustDisableAction) {
          this.globalMessageService.add(
            {
              key: 'quote.requestDialog.form.minRequestInitiationNote',
              params: {
                minValue: this.config.quote?.tresholds?.requestInitiation,
              },
            },
            GlobalMessageType.MSG_TYPE_WARNING
          );
        }
      });
  }

  mustDisableAction(type: string, totalPrice?: number): boolean {
    return (
      type === QuoteActionType.SUBMIT && !this.isThresholdReached(totalPrice)
    );
  }

  protected isThresholdReached(totalPrice?: number): boolean {
    const requestThreshold =
      this.config.quote?.tresholds?.requestInitiation || 0;
    return (totalPrice || 0) >= requestThreshold;
  }

  onClick(quoteActionType: QuoteActionType, code: string) {
    if (quoteActionType === QuoteActionType.REQUOTE) {
      this.requote(code);
      return;
    }
    this.performAction(code, quoteActionType);
  }
  performAction(quoteCode: string, action: QuoteActionType) {
    if (action !== QuoteActionType.SUBMIT) {
      this.quoteFacade.performQuoteAction(quoteCode, action);
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
          tap(() => this.quoteFacade.performQuoteAction(quoteCode, action))
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
}
