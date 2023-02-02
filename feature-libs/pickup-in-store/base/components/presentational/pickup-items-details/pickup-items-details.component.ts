/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CartOutlets } from '@spartacus/cart/base/root';
import { DeliveryPointOfService } from '@spartacus/pickup-in-store/base/root';
import { ICON_TYPE } from '@spartacus/storefront';
import { Observable } from 'rxjs';
@Component({
  selector: 'cx-pick-up-in-store-items-details',
  templateUrl: './pickup-items-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PickUpItemsDetailsComponent {
  @Input() showEdit = false;
  @Input() showDeliveryOptions = false;
  @Input() itemsDetails: Observable<Array<DeliveryPointOfService>>;

  readonly CartOutlets = CartOutlets;
  readonly ICON_TYPE = ICON_TYPE;
}
