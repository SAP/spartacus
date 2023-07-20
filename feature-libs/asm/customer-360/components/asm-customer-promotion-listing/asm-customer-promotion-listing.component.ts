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
import { ActiveCartFacade, Cart, CartVoucherFacade, MultiCartFacade } from '@spartacus/cart/base/root';
import { PromotionListEntry } from './asm-customer-promotion-listing.model';
import { Customer360Config } from '../../root/config';
import { Observable, Subscription } from 'rxjs';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cx-asm-customer-promotion-listing',
  templateUrl: './asm-customer-promotion-listing.component.html',
})
export class AsmCustomerPromotionListingComponent implements OnInit {
  @Input() headerText: string;
  @Input() emptyStateText: string;
  @Input() entries: Array<PromotionListEntry>;
  @Input() showAlert: boolean;
  @Output() apply = new EventEmitter<PromotionListEntry>();
  @Output() remove = new EventEmitter<PromotionListEntry>();
  cart = Observable<Cart>;
  globalMessageType = GlobalMessageType;
  protected subscription = new Subscription();

  constructor(
    protected customer360Config: Customer360Config,
    protected cartVoucherService: CartVoucherFacade,
    protected userIdService: UserIdService,
    protected multiCartFacade: MultiCartFacade,
    protected activeCartFacade: ActiveCartFacade,
  ) {}

  ngOnInit(): void {
  }
}
