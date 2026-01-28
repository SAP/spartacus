/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Price, ProductScope } from '@spartacus/core';

export enum UsageChargeType {
  BLOCK = 'block_usage_charge',
  PERCENTAGE = 'percentage_usage_charge',
  TIER = 'each_respective_tier',
}

export interface RenewalTerm {
  period?: number;
  endAt?: string;
}

export interface SubscriptionTerm {
  renewalTerm?: TermType;
  minimumTerm?: TermType;
  billingPlan?: {
    billingTime?: BillingTime;
  };
}

export interface BillingTime {
  name?: string;
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
  oneTimeCharges?: OneTimeCharge[];
  recurringCharges?: RecurringCharge[];
  perUnitUsageCharges?: PerUnitUsageCharge[];
  volumeUsageCharges?: VolumeUsageCharge[];
}

export interface OneTimeCharge {
  price?: Price;
  name?: string;
  billingTime?: BillingTime;
}

export interface RecurringCharge {
  price?: Price;
}

export interface UsageCharge {
  usageUnit?: UsageUnit;
  minBlocks?: number;
  blockSize?: number;
  tierUsageChargeEntries?: TierUsageChargeEntry[];
  overageUsageChargeEntries?: OverageUsageChargeEntry[];
}

export interface PerUnitUsageCharge extends UsageCharge {
  includedQty?: number;
  ratio?: string;
  usageChargeType?: string;
  perUnitUsageChargeEntries?: PerUnitUsageChargeEntry[];
}

export interface VolumeUsageCharge extends UsageCharge {}

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

export interface PerUnitUsageChargeEntry extends UsageChargeEntry {}

export interface UsageUnit {
  name?: string;
  namePlural?: string;
}

declare module '@spartacus/core' {
  interface Product {
    sapSubscriptionTerm?: SubscriptionTerm;
    sapPricePlan?: PricePlan;
  }
}

declare module '@spartacus/core' {
  enum ProductScope {
    SUBSCRIPTION = 'subscription',
  }
}
(ProductScope as any)['SUBSCRIPTION'] = 'subscription';
