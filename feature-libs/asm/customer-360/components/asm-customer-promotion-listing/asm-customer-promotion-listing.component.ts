/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { PromotionListEntry } from './asm-customer-promotion-listing.model';
import { Customer360Config } from '../../root/config';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cx-asm-customer-promotion-listing',
  templateUrl: './asm-customer-promotion-listing.component.html',
})
export class AsmCustomerPromotionListingComponent{
// export class AsmCustomerPromotionListingComponent implements OnChanges, AfterViewChecked {
  @Input() headerText: string;
  @Input() emptyStateText: string;
  @Input() entries: Array<PromotionListEntry>;
  constructor(
    protected customer360Config: Customer360Config,
  ) {}
}
