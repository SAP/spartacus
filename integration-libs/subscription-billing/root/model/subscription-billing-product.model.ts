import '@spartacus/core';
import { Price } from '@spartacus/core';

// IMPORTANT: re-visit this whole model with ASHOK once

export interface SubscriptionTerm {
  id?: string;
  name?: string;
  renewalTerm?: TermType;
  minimumTerm?: TermType;
  billingPlan?: {
    id?: string;
    name?: string;
    billingCycleDay?: number;
    billingTime?: BillingTime;
    billingCycle?: {
      id?: string;
      name?: string;
    };
  };
}

export interface BillingTime {
  id?: string;
  name?: string;
  description?: string;
  namePastTense?: string;
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

export interface TermType {
  value?: number;
  frequency?: {
    id?: string;
    name?: string;
  };
}

export interface RecurringCharge {
  price?: Price;
}

export interface OneTimeCharge {
  price?: Price;
  name?: string;
  billingTime?: BillingTime;
}

export interface PerUnitUsageCharge {
  name?: string;
  minBlocks?: number;
  usageUnit?: UsageUnit;
  tierUsageChargeEntries?: TierUsageChargeEntry[];
  overageUsageChargeEntries?: UsageChargeEntry[];
  usageChargeType?: UsageChargeType;
  blockSize?: number;
  includedQty?: number;
  ratio?: string;
  perUnitUsageChargeEntries?: UsageChargeEntry[];
}

export interface VolumeUsageCharge {
  name?: string;
  minBlocks?: number;
  usageUnit?: UsageUnit;
  tierUsageChargeEntries?: TierUsageChargeEntry[];
  overageUsageChargeEntries?: UsageChargeEntry[];
  volumeUsageChargeEntries?: UsageChargeEntry[];
}

export interface PercentageUsageCharge {
  usageChargeType?: UsageChargeType;
  ratio?: string;
  percentageUsageChargeEntries?: UsageChargeEntry[];
  usageUnit?: UsageUnit;
}

export interface TierUsageCharge {
  usageChargeType?: UsageChargeType;
  includedQty?: number;
  usageUnit?: UsageUnit;
  tierUsageChargeEntries?: TierUsageChargeEntry[];
  overageUsageChargeEntries?: UsageChargeEntry[];
}

export interface UsageChargeEntry {
  price?: Price;
  fixedPrice?: Price;
}

export interface TierUsageChargeEntry extends UsageChargeEntry {
  tierStart?: number;
  tierEnd?: number;
}

export interface UsageUnit {
  id?: string;
  name?: string;
  namePlural?: string;
}

export interface UsageChargeType {
  id?: string;
  name?: string;
  code?: string;
}
