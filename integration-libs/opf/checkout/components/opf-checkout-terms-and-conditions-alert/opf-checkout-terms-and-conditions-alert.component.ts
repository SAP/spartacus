/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { OpfMetadataStoreService } from '@spartacus/opf/base/root';
import { ICON_TYPE } from '@spartacus/storefront';
import { filter, take } from 'rxjs';

@Component({
  selector: 'cx-opf-checkout-terms-and-conditions-alert',
  templateUrl: './opf-checkout-terms-and-conditions-alert.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class OpfCheckoutTermsAndConditionsAlertComponent implements OnInit {
  protected opfMetadataStoreService = inject(OpfMetadataStoreService);

  iconTypes = ICON_TYPE;

  /**
   * Defines if alert could be dismissed or not
   */
  @Input() isDismissible: boolean;

  @Input() isVisible: boolean;
  /**
   * Explicit Terms and Conditions (isExplicit true) requires user to accept T&C to see and select payments options.
   * Implicit Terms and Conditions (isExplicit false) only displays the T&C message without checkbox, payment options are always enabled.
   */
  @Input() isExplicit: boolean | undefined | null;

  close() {
    this.isVisible = false;
    this.opfMetadataStoreService.updateOpfMetadata({
      isTermsAndConditionsAlertClosed: true,
    });
  }

  ngOnInit(): void {
    this.opfMetadataStoreService
      .getOpfMetadataState()
      .pipe(
        take(1),
        filter(
          ({ isTermsAndConditionsAlertClosed }) =>
            isTermsAndConditionsAlertClosed
        )
      )
      .subscribe(() => {
        this.isVisible = false;
      });
  }
}
