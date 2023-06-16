/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuoteConfig } from '@spartacus/commerce-quotes/core';
import {
  QuoteFacade,
  QuoteActionType,
  QuoteMetadata,
} from '@spartacus/commerce-quotes/root';
import { RoutingService } from '@spartacus/core';
import {
  FocusConfig,
  ICON_TYPE,
  LaunchDialogService,
} from '@spartacus/storefront';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'cx-quote-request-quote-dialog',
  templateUrl: './quote-request-quote-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteRequestQuoteDialogComponent {
  iconTypes = ICON_TYPE;
  requestInProgress$ = new BehaviorSubject<boolean>(false);
  minRequestInitiationValue =
    this.config.commerceQuotes?.tresholds?.requestInitiation;

  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: 'button',
    focusOnEscape: true,
  };

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', []),
    comment: new FormControl('', [Validators.required]),
  });

  constructor(
    protected commerceQuotesFacade: QuoteFacade,
    protected routingService: RoutingService,
    protected config: QuoteConfig,
    protected launchDialogService: LaunchDialogService
  ) {}

  dismissModal(reason?: any): void {
    this.launchDialogService.closeDialog(reason);
  }

  onSubmit(goToDetails?: boolean): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    const quoteCreationPayload: QuoteMetadata = {
      name: this.form.controls.name.value,
    };

    if (this.form.controls.description.value.length) {
      quoteCreationPayload.description = this.form.controls.description.value;
    }
    this.requestInProgress$.next(true);
    this.commerceQuotesFacade
      .createQuote(quoteCreationPayload, {
        text: this.form.controls.comment.value,
      })
      .pipe(
        tap((quote) => {
          if (goToDetails) {
            this.routingService.go({
              cxRoute: 'quoteDetails',
              params: { quoteId: quote.code },
            });
          } else {
            this.commerceQuotesFacade.performQuoteAction(
              quote.code,
              QuoteActionType.SUBMIT
            );
          }
          this.dismissModal('success');
        })
      )
      .subscribe();
  }
}
