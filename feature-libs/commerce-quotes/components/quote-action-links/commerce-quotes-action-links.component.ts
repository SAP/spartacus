/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommerceQuotesActionLinksService } from './commerce-quotes-action-links.service';

@Component({
  selector: 'cx-commerce-quotes-action-links',
  templateUrl: './commerce-quotes-action-links.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommerceQuotesActionLinksComponent {
  constructor(protected actionLinksService: CommerceQuotesActionLinksService) {}

  goToNewCart(): void {
    this.actionLinksService.goToNewCart();
  }
}
