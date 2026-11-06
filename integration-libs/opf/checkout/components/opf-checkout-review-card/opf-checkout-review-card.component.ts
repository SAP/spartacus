/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe, UrlPipe } from '@spartacus/core';
import {
  Card,
  CardComponent,
  ICON_TYPE,
  IconComponent,
} from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { OpfCheckoutReviewCardEditConfig } from './opf-checkout-review-card.model';

@Component({
  selector: 'cx-opf-checkout-review-card',
  templateUrl: './opf-checkout-review-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    CardComponent,
    RouterLink,
    IconComponent,
    AsyncPipe,
    TranslatePipe,
    UrlPipe,
  ],
})
export class OpfCheckoutReviewCardComponent {
  @Input() cardContent$: Observable<Card | null | undefined>;
  @Input() editConfig: OpfCheckoutReviewCardEditConfig;

  iconTypes = ICON_TYPE;
}
