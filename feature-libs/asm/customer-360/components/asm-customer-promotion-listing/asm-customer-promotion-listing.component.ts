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
  // export class AsmCustomerPromotionListingComponent implements OnChanges, AfterViewChecked {
  @Input() headerText: string;
  @Input() emptyStateText: string;
  @Input() entries: Array<PromotionListEntry>;
  @Input() showAlert: boolean;
  activeCartId: string| undefined;
  userId = '';
  createcart: string| undefined;
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

    this.userIdService.getUserId().subscribe((user)=>{
      this.userId= user ?? '';
    });
    this.activeCartFacade.requireLoadedCart(false).subscribe((newCreatedCart)=>{
      this.activeCartId = newCreatedCart?.code;
    });
  }
  applyCouponToCustomer(code: string) {
    this.cartVoucherService.addVoucher(code, this.activeCartId);
  }

  removeCouponToCustomer(code: string){
    this.cartVoucherService.removeVoucher(code, this.activeCartId);
  }
}
