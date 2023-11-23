/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { OpfGooglePayService } from './google-pay.service';

@Component({
  selector: 'cx-opf-google-pay',
  templateUrl: './google-pay.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpfGooglePayComponent implements OnInit {
  protected opfGooglePayService = inject(OpfGooglePayService);

  @ViewChild('googlePayButtonContainer') googlePayButtonContainer: ElementRef;

  ngOnInit(): void {
    this.opfGooglePayService.loadProviderResources().then(() => {
      this.opfGooglePayService.initClient();
      this.opfGooglePayService.renderPaymentButton(
        this.googlePayButtonContainer
      );
    });
  }
}
