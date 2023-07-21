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
  OnInit,
  Output,
} from '@angular/core';
import { GlobalMessageType, UserIdService } from '@spartacus/core';
import {
  ActiveCartFacade,
  CartVoucherFacade,
  MultiCartFacade,
} from '@spartacus/cart/base/root';
// import { PromotionListEntry } from './asm-customer-promotion-listing.model';
import { Customer360Config } from '../../root/config';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cx-asm-customer-promotion-listing',
  templateUrl: './asm-customer-promotion-listing.component.html',
})
export class AsmCustomerPromotionListingComponent implements OnInit {
  @Input() headerText: string;
  @Input() emptyStateText: string;
  @Input() applyButtonText: string;
  @Input() applied: string;
  @Input() removeButtonText: string;
  @Input() entries: Array<undefined> | null;
  @Input() showAlert: boolean | null;
  @Output() apply = new EventEmitter<undefined>();
  @Output() remove = new EventEmitter<undefined>();
  @Output() removeAlertAction = new EventEmitter<undefined>();
  globalMessageType = GlobalMessageType;
  // showErrorAlert$: any;

  constructor(
    protected customer360Config: Customer360Config,
    protected cartVoucherService: CartVoucherFacade,
    protected userIdService: UserIdService,
    protected multiCartFacade: MultiCartFacade,
    protected activeCartFacade: ActiveCartFacade
  ) {}

  ngOnInit(): void {}

  // closeErrorAlert(): void {
  //   this.showErrorAlert$.next(false);
  // }
}
