/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, computed, input, Signal } from '@angular/core';
import { I18nModule, Product } from '@spartacus/core';
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
  imports: [I18nModule],
})
export class SubscriptionProductUsageChargeComponent {
  product: Signal<Product | undefined> = input<Product>();

  perUnitUsageCharges: Signal<PerUnitUsageCharge[]> = computed(
    () => this.product()?.sapPricePlan?.perUnitUsageCharges ?? []
  );

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

  percentageUsageCharges: Signal<PercentageUsageCharge[]> = computed(
    () => this.product()?.sapPricePlan?.percentageUsageCharges ?? []
  );

  tierUsageCharges: Signal<TierUsageCharge[]> = computed(
    () => this.product()?.sapPricePlan?.tierUsageCharges ?? []
  );

  volumeUsageCharges: Signal<VolumeUsageCharge[]> = computed(
    () => this.product()?.sapPricePlan?.volumeUsageCharges ?? []
  );

  getLastTierValue(tierUsageChargeEntries: TierUsageChargeEntry[]): number {
    return (
      tierUsageChargeEntries[tierUsageChargeEntries.length - 1].tierEnd ?? 0
    );
  }
}
