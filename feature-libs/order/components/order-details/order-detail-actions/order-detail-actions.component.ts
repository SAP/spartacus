/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDetailsService } from '../order-details.service';
import { NgIf, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BtnLikeLinkDirective } from '../../../../../projects/storefrontlib/layout/a11y/btn-like-link/btn-like-link.directive';
import { TranslatePipe } from '../../../../../projects/core/src/i18n/translate.pipe';
import { UrlPipe } from '../../../../../projects/core/src/routing/configurable-routes/url-translation/url.pipe';
import { MockTranslatePipe } from '../../../../../projects/core/src/i18n/testing/mock-translate.pipe';

@Component({
    selector: 'cx-order-details-actions',
    templateUrl: './order-detail-actions.component.html',
    imports: [
        NgIf,
        RouterLink,
        BtnLikeLinkDirective,
        AsyncPipe,
        TranslatePipe,
        UrlPipe,
        MockTranslatePipe,
    ],
})
export class OrderDetailActionsComponent {
  constructor(protected orderDetailsService: OrderDetailsService) {}

  order$: Observable<any> = this.orderDetailsService.getOrderDetails();
}
