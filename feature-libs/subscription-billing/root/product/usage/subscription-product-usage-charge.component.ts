/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, computed, input, Signal } from '@angular/core';
import { Product } from '@spartacus/core';
import {
  PerUnitUsageCharge,
  VolumeUsageCharge,
  TierUsageChargeEntry,
  UsageChargeType,
} from '../../public_api';

@Component({
  selector: 'cx-subscription-product-usage-charge',
  standalone: false,
  templateUrl: './subscription-product-usage-charge.component.html',
})
export class SubscriptionProductUsageChargeComponent {
  product: Signal<Product | undefined> = input<Product>();

  perUnitUsageCharges: Signal<PerUnitUsageCharge[]> = computed(() => {
    return (
      this.product()?.sapPricePlan?.perUnitUsageCharges?.filter(
        (item) => item.usageChargeType === UsageChargeType.BLOCK
      ) ?? []
    );
  });

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

  percentageUsageCharges: Signal<PerUnitUsageCharge[]> = computed(() => {
    return (
      this.product()?.sapPricePlan?.perUnitUsageCharges?.filter(
        (item) => item.usageChargeType === UsageChargeType.PERCENTAGE
      ) ?? []
    );
  });

  tierUsageCharges: Signal<PerUnitUsageCharge[]> = computed(() => {
    return (
      this.product()?.sapPricePlan?.perUnitUsageCharges?.filter(
        (item) => item.usageChargeType === UsageChargeType.TIER
      ) ?? []
    );
  });

  volumeUsageCharges: Signal<VolumeUsageCharge[]> = computed(
    () => this.product()?.sapPricePlan?.volumeUsageCharges ?? []
  );

  getLastTierValue(tierUsageChargeEntries: TierUsageChargeEntry[]): number {
    return (
      tierUsageChargeEntries[tierUsageChargeEntries.length - 1].tierEnd ?? 0
    );
  }
}
