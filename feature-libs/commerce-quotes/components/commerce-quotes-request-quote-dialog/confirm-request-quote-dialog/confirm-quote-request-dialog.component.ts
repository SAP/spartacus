/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CQConfig } from '@spartacus/commerce-quotes/core';
import {
  FocusConfig,
  ICON_TYPE,
  LaunchDialogService,
} from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'cx-confirm-quote-request-dialog.component',
  templateUrl: './confirm-quote-request-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmQuoteRequestDialogComponent implements OnInit {
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
    protected config: CQConfig
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
