/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  GlobalMessageService,
  GlobalMessageType,
  TranslatePipe,
  WindowRef,
} from '@spartacus/core';
import { SpinnerComponent } from '@spartacus/storefront';
import { DpCheckoutPaymentService } from '../../../facade';
import { DpLocalStorageService } from '../../../facade/dp-local-storage.service';

@Component({
  selector: 'cx-dp-payment-form',
  templateUrl: './dp-payment-form.component.html',
  imports: [SpinnerComponent, TranslatePipe],
})
export class DpPaymentFormComponent implements OnInit {
  @Output()
  closeForm = new EventEmitter<any>();

  constructor(
    private dpPaymentService: DpCheckoutPaymentService,
    private dpStorageService: DpLocalStorageService,
    private globalMsgService: GlobalMessageService,
    private winRef: WindowRef
  ) {}

  ngOnInit(): void {
    this.dpPaymentService
      .getCardRegistrationDetails()
      .subscribe((dpPaymentRequest) => {
        if (dpPaymentRequest?.url) {
          this.dpStorageService.syncCardRegistrationState(dpPaymentRequest);
          this.redirect(dpPaymentRequest.url);
        } else if (dpPaymentRequest) {
          this.globalMsgService.add(
            { key: 'dpPaymentForm.error.redirect' },
            GlobalMessageType.MSG_TYPE_ERROR
          );
          this.closeForm.emit();
        }
      });
  }

  redirect(url: string) {
    const window = this.winRef.nativeWindow;

    if (window?.location) {
      window.location.href = url;
    }
  }
}
