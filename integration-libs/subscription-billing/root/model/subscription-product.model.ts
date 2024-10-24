/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Price } from '@spartacus/core';

export interface SubscriptionTerm {
  renewalTerm?: TermType;
  minimumTerm?: TermType;
  billingPlan?: {
    billingTime?: BillingTime;
  };
}

export interface BillingTime {
  id?: string;
  name?: string;
  description?: string;
  namePastTense?: string;
}

export interface TermType {
  value?: number;
  frequency?: {
    id?: string;
    name?: string;
  };
}

export interface PricePlan {
  name?: string;
  oneTimeCharges?: OneTimeCharge[];
  recurringCharges?: RecurringCharge[];
  perUnitUsageCharges?: PerUnitUsageCharge[];
  volumeUsageCharges?: VolumeUsageCharge[];
  percentageUsageCharges?: PercentageUsageCharge[];
  tierUsageCharges?: TierUsageCharge[];
}

export interface OneTimeCharge {
  price?: Price;
  name?: string;
  billingTime?: BillingTime;
}

export interface RecurringCharge {
  price?: Price;
}

export interface PerUnitUsageCharge {
  usageUnit?: UsageUnit;
  blockSize?: number;
  includedQty?: number;
  perUnitUsageChargeEntries?: UsageChargeEntry[];
}

export interface VolumeUsageCharge {
  usageUnit?: UsageUnit;
  tierUsageChargeEntries?: TierUsageChargeEntry[];
  overageUsageChargeEntries?: OverageUsageChargeEntry[];
}

export interface PercentageUsageCharge {
  ratio?: string;
  percentageUsageChargeEntries?: UsageChargeEntry[];
  usageUnit?: UsageUnit;
}

export interface TierUsageCharge {
  usageUnit?: UsageUnit;
  minBlocks?: number;
  tierUsageChargeEntries?: TierUsageChargeEntry[];
  overageUsageChargeEntries?: OverageUsageChargeEntry[];
}

export interface UsageChargeEntry {
  price?: Price;
}

export interface OverageUsageChargeEntry extends UsageChargeEntry {
  fixedPrice?: Price;
}

export interface TierUsageChargeEntry extends UsageChargeEntry {
  fixedPrice?: Price;
  tierStart?: number;
  tierEnd?: number;
}

export interface UsageUnit {
  id?: string;
  name?: string;
  namePlural?: string;
}
