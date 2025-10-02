/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Card, ICON_TYPE } from '@spartacus/storefront';
import { OpfCheckoutReviewCardEditConfig } from './opf-checkout-review-card.model';
import { NgIf, AsyncPipe } from '@angular/common';
import { CardComponent } from '@spartacus/storefront';
import { RouterLink } from '@angular/router';
import { IconComponent } from '@spartacus/storefront';
import { TranslatePipe } from '@spartacus/core';
import { UrlPipe } from '@spartacus/core';
import { MockTranslatePipe } from '@spartacus/core';

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
    MockTranslatePipe,
  ],
})
export class OpfCheckoutReviewCardComponent {
  @Input() cardContent$: Observable<Card | null | undefined>;
  @Input() editConfig: OpfCheckoutReviewCardEditConfig;

  iconTypes = ICON_TYPE;
}
