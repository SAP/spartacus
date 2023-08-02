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
import { PromotionListEntry } from './asm-customer-promotion-listing.model';
import { ICON_TYPE } from '@spartacus/storefront';
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
  @Input() entries: Array<PromotionListEntry> | null;
  @Input() showAlert: boolean | null;
  @Input() showAlertForApplyAction: boolean | null;
  @Input() showRemoveButton: boolean;
  @Input() showApplyButton: boolean;
  @Input() isCustomerCoupon: boolean;
  @Output() apply = new EventEmitter<PromotionListEntry>();
  @Output() remove = new EventEmitter<PromotionListEntry>();
  @Output() removeAlert = new EventEmitter();
  @Output() removeAlertForApplyAction = new EventEmitter();
  @Output() refreshCustomerCouponList = new EventEmitter<{
    assignable: boolean | undefined;
    searchQuery: string | undefined;
  }>();
  globalMessageType = GlobalMessageType;
  iconTypes = ICON_TYPE;
  activeTab = 0;
}
