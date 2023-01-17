/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CartOutlets } from '@spartacus/cart/base/root';
import { CmsComponentData, ICON_TYPE } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartDeliveryPointsService } from '../../services/cart-delivery-points.service';
@Component({
  selector: 'cx-pick-up-in-store-items-details',
  templateUrl: './pickup-items-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PickUpItemsDetailsComponent {
  showEdit$: Observable<boolean> = this.component?.data$.pipe(
    map((data) => data.showEdit || false)
  );

  showDeliveryOptions$: Observable<boolean> = this.component?.data$.pipe(
    map((data) => data.showDeliveryOptions || false)
  );

  itemsDetails$ = this.deliveryPointsService.getPOS();

  readonly CartOutlets = CartOutlets;
  readonly ICON_TYPE = ICON_TYPE;

  constructor(
    protected deliveryPointsService: CartDeliveryPointsService,
    protected component: CmsComponentData<any>
  ) {
    console.log('constructed');
  }
}
