/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input } from '@angular/core';
import { Product } from '@spartacus/core';
import {
  PercentageUsageCharge,
  PerUnitUsageCharge,
  TierUsageCharge,
  TierUsageChargeEntry,
  VolumeUsageCharge,
} from '../../model';

@Component({
  selector: 'cx-subscription-product-usage-charge',
  templateUrl: './subscription-product-usage-charge.component.html',
})
export class SubscriptionProductUsageChargeComponent {
  @Input() product: Product;

  getPerUnitUsageCharges(): PerUnitUsageCharge[] {
    return this.product?.sapPricePlan?.perUnitUsageCharges ?? [];
  }
  getIncludedQuantity(charge: PerUnitUsageCharge): string {
    if (charge.includedQty) {
      return (
        charge.includedQty +
        ' ' +
        (charge.includedQty > 1
          ? charge.usageUnit?.namePlural
          : charge.usageUnit?.name)
      );
    }
    return '';
  }
  getPercentageUsageCharges(): PercentageUsageCharge[] {
    return this.product?.sapPricePlan?.percentageUsageCharges ?? [];
  }
  getTierUsageCharges(): TierUsageCharge[] {
    return this.product?.sapPricePlan?.tierUsageCharges ?? [];
  }
  getVolumeUsageCharges(): VolumeUsageCharge[] {
    return this.product?.sapPricePlan?.volumeUsageCharges ?? [];
  }
  getLastTierValue(tierUsageChargeEntries: TierUsageChargeEntry[]): number {
    return (
      tierUsageChargeEntries[tierUsageChargeEntries.length - 1].tierEnd ?? 0
    );
  }
}
