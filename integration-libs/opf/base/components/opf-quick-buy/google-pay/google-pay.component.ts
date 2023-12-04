/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { ActiveConfiguration } from '@spartacus/opf/base/root';
import { OpfGooglePayService } from './google-pay.service';

@Component({
  selector: 'cx-opf-google-pay',
  templateUrl: './google-pay.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpfGooglePayComponent implements OnInit {
  protected opfGooglePayService = inject(OpfGooglePayService);

  @Input() activeConfiguration: ActiveConfiguration;

  @ViewChild('googlePayButtonContainer') googlePayButtonContainer: ElementRef;

  ngOnInit(): void {
    this.opfGooglePayService.loadProviderResources().then(() => {
      this.opfGooglePayService.initClient(this.activeConfiguration);
      this.opfGooglePayService.isReadyToPay().then((response) => {
        console.log('isGooglePaySupported', response.result);
        if (response.result) {
          this.opfGooglePayService.renderPaymentButton(
            this.googlePayButtonContainer
          );
        }
      });
    });
  }
}
