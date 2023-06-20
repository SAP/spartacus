/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { QuoteActionLinksService } from './quote-action-links.service';

@Component({
  selector: 'cx-quote-action-links',
  templateUrl: './quote-action-links.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteActionLinksComponent {
  constructor(protected actionLinksService: QuoteActionLinksService) {}

  goToNewCart(): void {
    this.actionLinksService.goToNewCart();
  }
}
