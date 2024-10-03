/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ReturnRequest } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { ReturnRequestService } from '../return-request.service';

@Component({
  selector: 'cx-return-request-totals',
  templateUrl: './return-request-totals.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReturnRequestTotalsComponent implements OnDestroy {
  constructor(protected returnRequestService: ReturnRequestService) {}

  returnRequest$: Observable<ReturnRequest> =
    this.returnRequestService.getReturnRequest();

  ngOnDestroy() {
    this.returnRequestService.clearReturnRequest();
  }
}
