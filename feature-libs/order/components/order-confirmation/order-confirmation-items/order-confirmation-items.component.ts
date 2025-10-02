/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import {
  AbstractOrderType,
  CartOutlets,
  PromotionLocation,
} from '@spartacus/cart/base/root';
import { Order, OrderFacade } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { NgIf, AsyncPipe } from '@angular/common';
import { PromotionsComponent } from '../../../../../projects/storefrontlib/cms-components/misc/promotions/promotions.component';
import { AbstractOrderContextDirective } from '../../../../cart/base/components/abstract-order-context/abstract-order-context.directive';
import { OutletDirective } from '../../../../../projects/storefrontlib/cms-structure/outlet/outlet.directive';
import { TranslatePipe } from '../../../../../projects/core/src/i18n/translate.pipe';
import { MockTranslatePipe } from '../../../../../projects/core/src/i18n/testing/mock-translate.pipe';

@Component({
    selector: 'cx-order-confirmation-items',
    templateUrl: './order-confirmation-items.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NgIf,
        PromotionsComponent,
        AbstractOrderContextDirective,
        OutletDirective,
        AsyncPipe,
        TranslatePipe,
        MockTranslatePipe,
    ],
})
export class OrderConfirmationItemsComponent implements OnDestroy {
  readonly cartOutlets = CartOutlets;
  readonly abstractOrderType = AbstractOrderType;
  promotionLocation: PromotionLocation = PromotionLocation.Checkout;
  order$: Observable<Order | undefined> = this.orderFacade.getOrderDetails();

  constructor(protected orderFacade: OrderFacade) {}

  ngOnDestroy() {
    this.orderFacade.clearPlacedOrder();
  }
}
