/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ReturnRequest } from '@spartacus/order/root';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ReturnRequestService } from '../return-request.service';
import { NgIf, AsyncPipe } from '@angular/common';
import { TranslatePipe } from '@spartacus/core';
import { MockTranslatePipe } from '@spartacus/core';

@Component({
  selector: 'cx-return-request-overview',
  templateUrl: './return-request-overview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, AsyncPipe, TranslatePipe, MockTranslatePipe],
})
export class ReturnRequestOverviewComponent implements OnInit, OnDestroy {
  constructor(protected returnRequestService: ReturnRequestService) {}

  rma: string;
  subscription: Subscription;

  returnRequest$: Observable<ReturnRequest> = this.returnRequestService
    .getReturnRequest()
    .pipe(tap((returnRequest) => (this.rma = returnRequest.rma ?? '')));

  isCancelling$ = this.returnRequestService.isCancelling$;

  ngOnInit(): void {
    this.subscription = this.returnRequestService.isCancelSuccess$.subscribe(
      (success) => {
        if (success) {
          this.returnRequestService.cancelSuccess(this.rma);
        }
      }
    );
  }

  cancelReturn(returnRequestCode: string): void {
    this.returnRequestService.cancelReturnRequest(returnRequestCode);
  }

  back(): void {
    this.returnRequestService.backToList();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
