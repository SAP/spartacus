/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Card, ICON_TYPE } from '@spartacus/storefront';
import { OpfCheckoutReviewCardEditConfig } from './opf-checkout-review-card.model';

@Component({
  selector: 'cx-opf-checkout-review-card',
  templateUrl: './opf-checkout-review-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class OpfCheckoutReviewCardComponent {
  @Input() cardContent$: Observable<Card | null | undefined>;
  @Input() editConfig: OpfCheckoutReviewCardEditConfig;

  iconTypes = ICON_TYPE;
}
