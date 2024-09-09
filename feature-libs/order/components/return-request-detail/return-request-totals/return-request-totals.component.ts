/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ReturnRequest } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { ReturnRequestService } from '../return-request.service';
import { I18nModule } from '@spartacus/core';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
    selector: 'cx-return-request-totals',
    templateUrl: './return-request-totals.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NgIf,
        AsyncPipe,
        I18nModule,
    ],
})
export class ReturnRequestTotalsComponent implements OnDestroy {
  constructor(protected returnRequestService: ReturnRequestService) {}

  returnRequest$: Observable<ReturnRequest> =
    this.returnRequestService.getReturnRequest();

  ngOnDestroy() {
    this.returnRequestService.clearReturnRequest();
  }
}
