/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { OrderEntry } from '@spartacus/cart/base/root';
import { Consignment } from '@spartacus/order/root';
import { Observable, combineLatest, map, tap } from 'rxjs';
import { OrderAmendService } from '../../amend-order.service';
import { FeatureConfigService } from '@spartacus/core';

@Component({
  selector: 'cx-return-order',
  templateUrl: './return-order.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ReturnOrderComponent {
  orderCode: string;
  protected featureConfigService = inject(FeatureConfigService, {
    optional: true,
  });

  form$: Observable<UntypedFormGroup> = this.orderAmendService
    .getForm()
    .pipe(tap((form) => (this.orderCode = form.value.orderCode)));

  consignments$: Observable<Consignment[]> = this.orderAmendService
    .getOrder()
    .pipe(map((order) => order.consignments ?? []));

  entries$: Observable<OrderEntry[]> = combineLatest([
    this.orderAmendService.getEntries(),
    this.consignments$,
  ]).pipe(
    map(([entries, consignments]) => {
      // Flatten all consignment entries
      const consignmentEntries = consignments.flatMap(
        (consignment) => consignment.entries ?? []
      );
      return entries
        .map<OrderEntry | null>((entry) => {
          // Find matching consignment entry by product code
          const consignmentEntry = consignmentEntries.find(
            (ce) => ce.orderEntry?.product?.code === entry.product?.code
          );
          // If found, update the max quantity with shippedQuantity
          return consignmentEntry
            ? {
                ...entry,
                returnableQuantity:
                  consignmentEntry.shippedQuantity ??
                  (this.featureConfigService?.isEnabled(
                    'enableReturnOrderReturnableQuantityConsigmentFallback'
                  )
                    ? entry.returnableQuantity
                    : null) ??
                  0,
              }
            : null;
        })
        .filter(
          (entry): entry is OrderEntry =>
            !!entry && entry.returnableQuantity !== 0
        );
    })
  );

  constructor(protected orderAmendService: OrderAmendService) {}
}
