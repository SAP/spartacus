/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { QuoteCoreConfig } from '@spartacus/quote/core';
import {
  FocusConfig,
  ICON_TYPE,
  LaunchDialogService,
} from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'cx-quote-confirm-request-dialog',
  templateUrl: './quote-confirm-request-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteConfirmRequestDialogComponent implements OnInit {
  iconTypes = ICON_TYPE;

  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: 'button',
    focusOnEscape: true,
  };

  quoteCode$: Observable<string>;

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected config: QuoteCoreConfig
  ) {}

  ngOnInit(): void {
    this.quoteCode$ = this.launchDialogService.data$.pipe(
      filter((data) => !!data),
      map((data) => data.quoteCode)
    );
  }

  dismissModal(reason?: any): void {
    this.launchDialogService.closeDialog(reason);
  }
}
