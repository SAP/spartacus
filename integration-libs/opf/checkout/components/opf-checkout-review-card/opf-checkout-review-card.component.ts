/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import {
  Card,
  CardModule,
  ICON_TYPE,
  IconModule,
} from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { OpfCheckoutReviewCardEditConfig } from './opf-checkout-review-card.model';

@Component({
  selector: 'cx-opf-checkout-review-card',
  standalone: true,
  templateUrl: './opf-checkout-review-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    CardModule,
    RouterLink,
    IconModule,
    AsyncPipe,
    I18nModule,
    UrlModule,
  ],
})
export class OpfCheckoutReviewCardComponent {
  @Input() cardContent$: Observable<Card | null | undefined>;
  @Input() editConfig: OpfCheckoutReviewCardEditConfig;

  iconTypes = ICON_TYPE;
}
