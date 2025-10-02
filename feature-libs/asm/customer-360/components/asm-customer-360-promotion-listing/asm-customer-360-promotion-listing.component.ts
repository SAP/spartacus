/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
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
import { PromotionListEntry } from './asm-customer-360-promotion-listing.model';
import { NgIf, NgFor } from '@angular/common';
import { MessageComponent } from '../../../../../projects/storefrontlib/cms-components/misc/message/message.component';
import { IconComponent } from '../../../../../projects/storefrontlib/cms-components/misc/icon/icon.component';
import { TranslatePipe } from '@spartacus/core';
import { MockTranslatePipe } from '@spartacus/core';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cx-asm-customer-360-promotion-listing',
  templateUrl: './asm-customer-360-promotion-listing.component.html',
  imports: [
    NgIf,
    MessageComponent,
    NgFor,
    IconComponent,
    TranslatePipe,
    MockTranslatePipe,
  ],
})
export class AsmCustomer360PromotionListingComponent {
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
  globalMessageType = GlobalMessageType;
}
