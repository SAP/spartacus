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
import { QuoteCoreConfig } from '@spartacus/quote/core';
import {
  FocusConfig,
  ICON_TYPE,
  LaunchDialogService,
} from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ConfirmationContext } from './quote-actions-confirm-dialog.model';

@Component({
  selector: 'cx-quote-actions-confirm-dialog',
  templateUrl: './quote-actions-confirm-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteActionsConfirmDialogComponent implements OnInit {
  protected launchDialogService = inject(LaunchDialogService);
  protected quoteCoreConfig = inject(QuoteCoreConfig);

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
}
