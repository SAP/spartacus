/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  GlobalMessageType,
} from '@spartacus/core';
import {
  ActiveCartFacade,
  CartVoucherFacade,
} from '@spartacus/cart/base/root';
import { PromotionListEntry } from './asm-customer-promotion-listing.model';
import { Customer360Config } from '../../root/config';
import { Subscription } from 'rxjs';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cx-asm-customer-promotion-listing',
  templateUrl: './asm-customer-promotion-listing.component.html',
})
export class AsmCustomerPromotionListingComponent implements OnInit{
// export class AsmCustomerPromotionListingComponent implements OnChanges, AfterViewChecked {
  @Input() headerText: string;
  @Input() emptyStateText: string;
  @Input() entries: Array<PromotionListEntry>;
  @Input() showAlert: boolean;
  activeCartId = '';
  globalMessageType = GlobalMessageType;
  protected subscription = new Subscription();

  constructor(
    protected customer360Config: Customer360Config,
    protected cartVoucherService: CartVoucherFacade,
    protected activeCartFacade: ActiveCartFacade,
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.activeCartFacade.getActiveCartId().subscribe((response) => {
        this.activeCartId = response ?? '';
      })
    );
  }

  // applyCouponToCustomer(code: string){
  //   this.cartVoucherService.addVoucher(code,this.activeCartId);
  // }

  // removeCouponToCustomer(code: string){
  //   this.cartVoucherService.removeVoucher(code,this.activeCartId);
  // }
}
