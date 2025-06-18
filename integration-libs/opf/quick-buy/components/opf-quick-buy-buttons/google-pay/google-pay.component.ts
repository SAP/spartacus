/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { OpfActiveConfiguration } from '@spartacus/opf/base/root';
import { BehaviorSubject } from 'rxjs';
import { OpfGooglePayService } from './google-pay.service';

@Component({
  selector: 'cx-opf-google-pay',
  templateUrl: './google-pay.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class OpfGooglePayComponent implements OnInit {
  protected opfGooglePayService = inject(OpfGooglePayService);
  protected changeDetectionRef = inject(ChangeDetectorRef);

  @Input() activeConfiguration: OpfActiveConfiguration;

  @ViewChild('googlePayButtonContainer') googlePayButtonContainer: ElementRef;

  isReadyToPayState$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  ngOnInit(): void {
    this.opfGooglePayService.loadResources().then(() => {
      this.opfGooglePayService.initClient(this.activeConfiguration);
      this.opfGooglePayService.isReadyToPay().then((response: any) => {
        this.isReadyToPayState$.next(!!response?.result);
        this.changeDetectionRef.detectChanges();
        if (response.result && this.googlePayButtonContainer) {
          this.opfGooglePayService.renderPaymentButton(
            this.googlePayButtonContainer
          );
        }
      });
    });
  }
}
