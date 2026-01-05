/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, computed, Input, Signal } from '@angular/core';
import { Product } from '@spartacus/core';
import {
  PerUnitUsageCharge,
  UsageChargeType,
  VolumeUsageCharge,
  TierUsageChargeEntry,
} from '@spartacus/subscription-billing/root';

@Component({
  selector: 'cx-subscription-product-usage-charge',
  standalone: false,
  templateUrl: './subscription-product-usage-charge.component.html',
})
export class SubscriptionProductUsageChargeComponent {
  @Input() product!: Signal<Product | undefined | null>;

  blockUsageCharges: Signal<PerUnitUsageCharge[]> = computed(() => {
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

  isUsageChargePresent(): boolean {
    return Boolean(
      this.product()?.sapPricePlan?.perUnitUsageCharges ??
        this.product()?.sapPricePlan?.volumeUsageCharges
    );
  }
}
