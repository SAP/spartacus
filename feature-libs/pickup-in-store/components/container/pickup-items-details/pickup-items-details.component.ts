/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { CmsPickupItemDetails, FeatureConfigService } from '@spartacus/core';
import { DeliveryPointOfService } from '@spartacus/pickup-in-store/root';
import {
  CmsComponentData,
  HierarchyComponentService,
  ICON_TYPE,
} from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { DeliveryPointsService } from '../../services/delivery-points.service';
import {
  CartOutlets,
  OrderEntry,
  OrderEntryGroup,
} from '@spartacus/cart/base/root';

@Component({
  selector: 'cx-pick-up-in-store-items-details',
  templateUrl: './pickup-items-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PickUpItemsDetailsComponent implements OnInit {
  private featureConfig = inject(FeatureConfigService);
  readonly cartOutlets = CartOutlets;

  @Input() showEdit: boolean;
  @Input() itemsDetails: Observable<Array<DeliveryPointOfService>>;
  readonly ICON_TYPE = ICON_TYPE;

  protected context: string;

  constructor(
    protected component: CmsComponentData<CmsPickupItemDetails>,
    protected deliveryPointsService: DeliveryPointsService,
    protected hierarchyService: HierarchyComponentService
  ) {}
  ngOnInit() {
    if (this.featureConfig.isEnabled('enableBundles')) {
      // The user has enabled feature toggle "enableBundles"
      // which makes the cart use the new entry groups feature to provide bundle support.

      this.component.data$
        .pipe(
          tap((data: CmsPickupItemDetails) => {
            this.showEdit = data.showEdit;
            this.context = data.context;
            this.itemsDetails =
              data.context === 'order'
                ? this.deliveryPointsService.getDeliveryPointsOfServiceFromOrder()
                : this.deliveryPointsService.getDeliveryPointsOfServiceFromCartWithEntryGroups();
          }),
          take(1)
        )
        .subscribe();
    } else {
      this.component.data$
        .pipe(
          tap((data: CmsPickupItemDetails) => {
            this.showEdit = data.showEdit;
            this.context = data.context;
            this.itemsDetails =
              data.context === 'order'
                ? this.deliveryPointsService.getDeliveryPointsOfServiceFromOrder()
                : this.deliveryPointsService.getDeliveryPointsOfServiceFromCart();
          }),
          take(1)
        )
        .subscribe();
    }
  }

  getEntriesFromGroups(
    entryGroups: OrderEntryGroup[]
  ): Observable<OrderEntry[]> {
    return this.hierarchyService.getEntriesFromGroups(of(entryGroups));
  }
}
