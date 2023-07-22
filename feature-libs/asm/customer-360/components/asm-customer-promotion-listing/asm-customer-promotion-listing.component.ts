/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { GlobalMessageType } from '@spartacus/core';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cx-asm-customer-promotion-listing',
  templateUrl: './asm-customer-promotion-listing.component.html',
})
export class AsmCustomerPromotionListingComponent {
  @Input() headerText: string;
  @Input() emptyStateText: string;
  @Input() applyButtonText: string;
  @Input() applied: string;
  @Input() removeButtonText: string;
  @Input() entries: Array<undefined> | null;
  @Input() showAlert: boolean | null;
  @Input() isCoupon: boolean;
  @Output() apply = new EventEmitter<undefined>();
  @Output() remove = new EventEmitter<undefined>();
  @Output() removeAlertAction = new EventEmitter<undefined>();
  globalMessageType = GlobalMessageType;
}
