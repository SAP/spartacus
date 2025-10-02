/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, inject, Input } from '@angular/core';
import {
  AbstractOrderType,
  CartOutlets,
  PromotionLocation,
} from '@spartacus/cart/base/root';
import { TranslationService } from '@spartacus/core';
import { Consignment, Order, OrderOutlets } from '@spartacus/order/root';
import { map } from 'rxjs';
import { NgFor, NgIf, AsyncPipe, TitleCasePipe } from '@angular/common';
import { OutletDirective } from '../../../../../../projects/storefrontlib/cms-structure/outlet/outlet.directive';
import { FeatureDirective } from '../../../../../../projects/core/src/features-config/directives/feature.directive';
import { ConsignmentTrackingComponent } from '../consignment-tracking/consignment-tracking.component';
import { AbstractOrderContextDirective } from '../../../../../cart/base/components/abstract-order-context/abstract-order-context.directive';
import { AddToCartComponent } from '../../../../../cart/base/components/add-to-cart/add-to-cart.component';
import { CxDatePipe } from '../../../../../../projects/core/src/i18n/date.pipe';
import { MockDatePipe } from '../../../../../../projects/core/src/i18n/testing/mock-date.pipe';

@Component({
    selector: 'cx-order-consigned-entries',
    templateUrl: './order-consigned-entries.component.html',
    imports: [
        NgFor,
        OutletDirective,
        NgIf,
        FeatureDirective,
        ConsignmentTrackingComponent,
        AbstractOrderContextDirective,
        AddToCartComponent,
        AsyncPipe,
        TitleCasePipe,
        CxDatePipe,
        MockDatePipe,
    ],
})
export class OrderConsignedEntriesComponent {
  @Input() consignments: Consignment[];
  @Input() order: Order;
  @Input() enableAddToCart: boolean | undefined;
  @Input() buyItAgainTranslation: string;
  protected translationService = inject(TranslationService);

  promotionLocation: PromotionLocation = PromotionLocation.Order;

  readonly OrderOutlets = OrderOutlets;
  readonly CartOutlets = CartOutlets;
  readonly abstractOrderType = AbstractOrderType;

  getStatusText(status: string) {
    return this.translationService
      .translate('orderDetails.deliveryStatus_' + status)
      .pipe(
        map((value) => {
          if (value.includes('orderDetails.deliveryStatus_')) {
            //in case translation key is missing
            return status;
          } else {
            return value;
          }
        })
      );
  }
}
