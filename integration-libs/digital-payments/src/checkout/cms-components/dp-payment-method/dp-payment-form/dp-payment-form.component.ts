/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DpLocalStorageService } from '../../../facade/dp-local-storage.service';
import {
  GlobalMessageService,
  GlobalMessageType,
  WindowRef,
} from '@spartacus/core';
import { DpCheckoutPaymentService } from '../../../facade';
import { Component, OnInit, Output, EventEmitter, inject } from '@angular/core';

@Component({
  selector: 'cx-dp-payment-form',
  templateUrl: './dp-payment-form.component.html',
  standalone: false,
})
export class DpPaymentFormComponent implements OnInit {
  private dpPaymentService = inject(DpCheckoutPaymentService);
  private dpStorageService = inject(DpLocalStorageService);
  private globalMsgService = inject(GlobalMessageService);
  private winRef = inject(WindowRef);

  @Output()
  closeForm = new EventEmitter<any>();

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
