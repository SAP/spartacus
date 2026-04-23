/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
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
  imports: [NgIf, AsyncPipe],
})
export class OpfGooglePayComponent implements OnInit {
  protected opfGooglePayService = inject(OpfGooglePayService);
  protected changeDetectionRef = inject(ChangeDetectorRef);

  @Input() activeConfiguration:
    | OpfActiveConfiguration
    | OpfActiveConfiguration[];

  @ViewChild('googlePayButtonContainer') googlePayButtonContainer: ElementRef;

  isReadyToPayState$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  get activeConfigurations(): OpfActiveConfiguration[] {
    const value = this.activeConfiguration;
    return Array.isArray(value) ? value : value ? [value] : [];
  }
  ngOnInit(): void {
    this.opfGooglePayService.loadResources().then(() => {
      this.opfGooglePayService.initClient(this.activeConfigurations);
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
