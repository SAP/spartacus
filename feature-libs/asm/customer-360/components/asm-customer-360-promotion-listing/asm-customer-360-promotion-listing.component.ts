/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  output,
  input,
} from '@angular/core';
import { GlobalMessageType, TranslatePipe } from '@spartacus/core';
import { IconComponent, MessageComponent } from '@spartacus/storefront';
import { PromotionListEntry } from './asm-customer-360-promotion-listing.model';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cx-asm-customer-360-promotion-listing',
  templateUrl: './asm-customer-360-promotion-listing.component.html',
  imports: [MessageComponent, IconComponent, TranslatePipe],
})
export class AsmCustomer360PromotionListingComponent {
  // TODO: Skipped for migration because:
  //  This input is used in a control flow expression (e.g. `@if` or `*ngIf`)
  //  and migrating would break narrowing currently.
  @Input() headerText: string;
  readonly emptyStateText = input<string>();
  readonly applyButtonText = input<string>();
  readonly applied = input<string>();
  readonly removeButtonText = input<string>();
  readonly entries = input<Array<PromotionListEntry> | null>();
  readonly showAlert = input<boolean | null>();
  readonly showAlertForApplyAction = input<boolean | null>();
  readonly showRemoveButton = input<boolean>();
  readonly showApplyButton = input<boolean>();
  readonly isCustomerCoupon = input<boolean>();
  readonly apply = output<PromotionListEntry>();
  readonly remove = output<PromotionListEntry>();
  readonly removeAlert = output();
  readonly removeAlertForApplyAction = output();
  globalMessageType = GlobalMessageType;
}
