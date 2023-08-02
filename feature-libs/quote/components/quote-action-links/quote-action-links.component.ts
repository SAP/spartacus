/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CartUtilsService } from '@spartacus/quote/core';

@Component({
  selector: 'cx-quote-action-links',
  templateUrl: './quote-action-links.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteActionLinksComponent {
  constructor(protected cartUtilsService: CartUtilsService) {}

  goToNewCart(): void {
    this.cartUtilsService.goToNewCart();
  }
}
