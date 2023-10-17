/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CxDatePipe, TranslationService } from '@spartacus/core';
import { QuoteCoreConfig } from '@spartacus/quote/core';
import {
  FocusConfig,
  ICON_TYPE,
  LaunchDialogService,
} from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { ConfirmationContext } from './quote-actions-confirm-dialog.model';

@Component({
  selector: 'cx-quote-actions-confirm-dialog',
  templateUrl: './quote-actions-confirm-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CxDatePipe],
})
export class QuoteActionsConfirmDialogComponent implements OnInit {
  protected launchDialogService = inject(LaunchDialogService);
  protected quoteCoreConfig = inject(QuoteCoreConfig);
  protected translationService = inject(TranslationService);
  protected cxDatePipe = inject(CxDatePipe);

  iconTypes = ICON_TYPE;

  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: 'button',
    focusOnEscape: true,
  };

  confirmationContext$: Observable<ConfirmationContext>;

  ngOnInit(): void {
    this.confirmationContext$ = this.launchDialogService.data$.pipe(
      filter((data) => !!data),
      map((data) => data.confirmationContext)
    );
  }

  dismissModal(reason?: any): void {
    this.launchDialogService.closeDialog(reason);
  }

  protected isNotEmpty(value?: string): boolean {
    return value && value.trim()?.length !== 0 ? true : false;
  }

  getA11yModalText(confirmationContext: ConfirmationContext): string {
    let translatedText = '';
    if (
      confirmationContext.warningNote &&
      this.isNotEmpty(confirmationContext.warningNote)
    ) {
      this.translationService
        .translate(confirmationContext.warningNote)
        .pipe(take(1))
        .subscribe((text) => (translatedText += text));
    }

    if (
      confirmationContext.validity &&
      this.isNotEmpty(confirmationContext.validity) &&
      confirmationContext.quote.expirationTime
    ) {
      this.translationService
        .translate(confirmationContext.validity)
        .pipe(take(1))
        .subscribe((text) => (translatedText += text));

      const date = new Date(confirmationContext.quote.expirationTime);
      translatedText += this.cxDatePipe.transform(date);
    }

    this.translationService
      .translate(confirmationContext.confirmNote)
      .pipe(take(1))
      .subscribe((text) => (translatedText += text));

    return translatedText;
  }
}
