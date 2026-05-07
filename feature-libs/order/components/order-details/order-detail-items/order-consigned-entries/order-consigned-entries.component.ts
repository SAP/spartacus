/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgClass, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { AbstractOrderContextDirective } from '@spartacus/cart/base/components';
import { AddToCartComponent } from '@spartacus/cart/base/components/add-to-cart';
import {
  AbstractOrderType,
  CartOutlets,
  PromotionLocation,
} from '@spartacus/cart/base/root';
import {
  CxDatePipe,
  FeatureConfigService,
  FeatureDirective,
  TranslationService,
} from '@spartacus/core';
import { OrderConsignmentService } from '@spartacus/order/core';
import { Consignment, Order, OrderOutlets } from '@spartacus/order/root';
import { OutletDirective, HierarchyModule } from '@spartacus/storefront';
import { map } from 'rxjs';
import { ConsignmentTrackingComponent } from '../consignment-tracking/consignment-tracking.component';

@Component({
  selector: 'cx-order-consigned-entries',
  templateUrl: './order-consigned-entries.component.html',
  imports: [
    NgFor,
    NgClass,
    OutletDirective,
    NgIf,
    FeatureDirective,
    ConsignmentTrackingComponent,
    AbstractOrderContextDirective,
    AddToCartComponent,
    AsyncPipe,
    TitleCasePipe,
    CxDatePipe,
    HierarchyModule,
  ],
})
export class OrderConsignedEntriesComponent implements OnInit{
  private featureConfig = inject(FeatureConfigService);

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
  constructor(
    protected orderConsignmentService: OrderConsignmentService,
  ) {}

  ngOnInit() {
    if (this.featureConfig.isEnabled('enableBundles')) {
      this.consignments =
        this.orderConsignmentService.assignEntryGroupsToConsignments(this.order, this.consignments);
    }
  }
}
