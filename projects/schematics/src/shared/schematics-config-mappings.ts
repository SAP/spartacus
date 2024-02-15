/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { SchematicsException } from '@angular-devkit/schematics';
import {
  ASM_SCHEMATICS_CONFIG,
  ASM_CUSTOMER_360_SCHEMATICS_CONFIG,
} from './lib-configs/asm-schematics-config';
import {
  CART_BASE_SCHEMATICS_CONFIG,
  CART_IMPORT_EXPORT_SCHEMATICS_CONFIG,
  CART_QUICK_ORDER_SCHEMATICS_CONFIG,
  CART_SAVED_CART_SCHEMATICS_CONFIG,
  CART_WISHLIST_SCHEMATICS_CONFIG,
} from './lib-configs/cart-schematics-config';
import {
  CHECKOUT_B2B_SCHEMATICS_CONFIG,
  CHECKOUT_BASE_SCHEMATICS_CONFIG,
  CHECKOUT_SCHEDULED_REPLENISHMENT_SCHEMATICS_CONFIG,
} from './lib-configs/checkout-schematics-config';
import { CUSTOMER_TICKETING_SCHEMATICS_CONFIG } from './lib-configs/customer-ticketing-schematics-config';
import {
  CDC_B2B_SCHEMATICS_CONFIG,
  CDC_SCHEMATICS_CONFIG,
} from './lib-configs/integration-libs/cdc-schematics-config';
import { CDS_SCHEMATICS_CONFIG } from './lib-configs/integration-libs/cds-schematics-config';
import { DIGITAL_PAYMENTS_SCHEMATICS_CONFIG } from './lib-configs/integration-libs/digital-payments-schematics-config';
import { EPD_SCHEMATICS_CONFIG } from './lib-configs/integration-libs/epd-schematics-config';
import { S4OM_SCHEMATICS_CONFIG } from './lib-configs/integration-libs/s4om-schematics-config';
import { SEGMENT_REFS_SCHEMATICS_CONFIG } from './lib-configs/integration-libs/segment-refs-schematics-config';
import { ORDER_SCHEMATICS_CONFIG } from './lib-configs/order-schematics-config';
import {
  ORGANIZATION_ACCOUNT_SUMMARY_SCHEMATICS_CONFIG,
  ORGANIZATION_ADMINISTRATION_SCHEMATICS_CONFIG,
  ORGANIZATION_ORDER_APPROVAL_SCHEMATICS_CONFIG,
  ORGANIZATION_UNIT_ORDER_SCHEMATICS_CONFIG,
  ORGANIZATION_USER_REGISTRATION_SCHEMATICS_CONFIG,
} from './lib-configs/organization-schematics-config';
import { PDF_INVOICES_SCHEMATICS_CONFIG } from './lib-configs/pdf-invoices-schematics-config';
import { PICKUP_IN_STORE_SCHEMATICS_CONFIG } from './lib-configs/pickup-in-store-schematics-config';
import {
  PRODUCT_CONFIGURATOR_CPQ_SCHEMATICS_CONFIG,
  PRODUCT_CONFIGURATOR_RULEBASED_SCHEMATICS_CONFIG,
  PRODUCT_CONFIGURATOR_TEXTFIELD_SCHEMATICS_CONFIG,
} from './lib-configs/product-configurator-schematics-config';
import {
  PRODUCT_BULK_PRICING_SCHEMATICS_CONFIG,
  PRODUCT_FUTURE_STOCK_SCHEMATICS_CONFIG,
  PRODUCT_IMAGE_ZOOM_SCHEMATICS_CONFIG,
  PRODUCT_VARIANTS_SCHEMATICS_CONFIG,
} from './lib-configs/product-schematics-config';
import { QUALTRICS_SCHEMATICS_CONFIG } from './lib-configs/qualtrics-schematics-config';
import { REQUESTED_DELIVERY_DATE_SCHEMATICS_CONFIG } from './lib-configs/requested-delivery-date-schematics-config';
import { SMARTEDIT_SCHEMATICS_CONFIG } from './lib-configs/smartedit-schematics-config';
import { STOREFINDER_SCHEMATICS_CONFIG } from './lib-configs/storefinder-schematics-config';
import {
  TRACKING_AEP_SCHEMATICS_CONFIG,
  TRACKING_GTM_SCHEMATICS_CONFIG,
  TRACKING_PERSONALIZATION_SCHEMATICS_CONFIG,
} from './lib-configs/tracking-schematics-config';
import {
  USER_ACCOUNT_SCHEMATICS_CONFIG,
  USER_PROFILE_SCHEMATICS_CONFIG,
} from './lib-configs/user-schematics-config';
import { Module, SchematicConfig } from './utils/lib-utils';
import { CDP_SCHEMATICS_CONFIG } from './lib-configs';

/**
 * A list of all schematics feature configurations.
 * _Must_ be updated when adding a new schematics
 * library or a feature.
 */
export const SCHEMATICS_CONFIGS: SchematicConfig[] = [
  // feature libraries start
  ASM_SCHEMATICS_CONFIG,
  ASM_CUSTOMER_360_SCHEMATICS_CONFIG,

  CART_BASE_SCHEMATICS_CONFIG,
  CART_IMPORT_EXPORT_SCHEMATICS_CONFIG,
  CART_QUICK_ORDER_SCHEMATICS_CONFIG,
  CART_WISHLIST_SCHEMATICS_CONFIG,
  CART_SAVED_CART_SCHEMATICS_CONFIG,

  CHECKOUT_BASE_SCHEMATICS_CONFIG,
  CHECKOUT_B2B_SCHEMATICS_CONFIG,
  CHECKOUT_SCHEDULED_REPLENISHMENT_SCHEMATICS_CONFIG,

  ORDER_SCHEMATICS_CONFIG,

  ORGANIZATION_ADMINISTRATION_SCHEMATICS_CONFIG,
  ORGANIZATION_ORDER_APPROVAL_SCHEMATICS_CONFIG,
  ORGANIZATION_USER_REGISTRATION_SCHEMATICS_CONFIG,
  ORGANIZATION_UNIT_ORDER_SCHEMATICS_CONFIG,
  ORGANIZATION_ACCOUNT_SUMMARY_SCHEMATICS_CONFIG,

  PICKUP_IN_STORE_SCHEMATICS_CONFIG,
  PRODUCT_CONFIGURATOR_TEXTFIELD_SCHEMATICS_CONFIG,
  PRODUCT_CONFIGURATOR_RULEBASED_SCHEMATICS_CONFIG,
  PRODUCT_CONFIGURATOR_CPQ_SCHEMATICS_CONFIG,

  PRODUCT_BULK_PRICING_SCHEMATICS_CONFIG,
  PRODUCT_IMAGE_ZOOM_SCHEMATICS_CONFIG,
  PRODUCT_VARIANTS_SCHEMATICS_CONFIG,
  PRODUCT_FUTURE_STOCK_SCHEMATICS_CONFIG,

  PDF_INVOICES_SCHEMATICS_CONFIG,

  QUALTRICS_SCHEMATICS_CONFIG,

  REQUESTED_DELIVERY_DATE_SCHEMATICS_CONFIG,

  SMARTEDIT_SCHEMATICS_CONFIG,

  STOREFINDER_SCHEMATICS_CONFIG,

  TRACKING_PERSONALIZATION_SCHEMATICS_CONFIG,
  TRACKING_GTM_SCHEMATICS_CONFIG,
  TRACKING_AEP_SCHEMATICS_CONFIG,

  USER_ACCOUNT_SCHEMATICS_CONFIG,
  USER_PROFILE_SCHEMATICS_CONFIG,

  CUSTOMER_TICKETING_SCHEMATICS_CONFIG,

  // integration libraries start
  CDC_SCHEMATICS_CONFIG,
  CDC_B2B_SCHEMATICS_CONFIG,

  CDP_SCHEMATICS_CONFIG,

  CDS_SCHEMATICS_CONFIG,

  DIGITAL_PAYMENTS_SCHEMATICS_CONFIG,

  EPD_SCHEMATICS_CONFIG,

  S4OM_SCHEMATICS_CONFIG,

  SEGMENT_REFS_SCHEMATICS_CONFIG,
];

/**
 * Maps sub-features to their parent feature.
 */
export const {
  /**
   * Mapping of features to Spartacus library.
   *
   * E.g.:
   *
   * {
   * ...,
   *  '@spartacus/checkout': ['Checkout', 'Checkout-B2B', 'Checkout-Scheduled-Replenishment'],
   * ...
   * }
   */
  libraryFeatureMapping,
  /**
   * Mapping of feature-modules to the Spartacus library.
   *
   * E.g.:
   *
   * {
   * ...,
   * 'Checkout': ['CheckoutModule'],
   * 'Checkout-B2B': ['CheckoutB2BModule'],
   * 'Checkout-Scheduled-Replenishment': ['CheckoutScheduledReplenishmentModule'],
   * ...
   * }
   */
  featureFeatureModuleMapping,
  /**
   * Mapping of root feature-modules to the Spartacus library.
   *
   * E.g.:
   *
   * {
   * ...,
   * 'Checkout': ['CheckoutRootModule'],
   * 'Checkout-B2B': ['CheckoutB2BRootModule'],
   * 'Checkout-Scheduled-Replenishment': ['CheckoutScheduledReplenishmentRootModule'],
   * ...
   * }
   */
  featureRootModuleMapping,
  /**
   * Mapping of schematics configurations to the Spartacus features.
   *
   * E.g.:
   *
   * {
   * ...,
   * 'Checkout': [CHECKOUT_BASE_SCHEMATICS_CONFIG],
   * 'Checkout-B2B': [CHECKOUT_B2B_SCHEMATICS_CONFIG],
   * ...
   * }
   */
  featureSchematicConfigMapping,
} = generateMappings();

/**
 * Generates mappings.
 */
export function generateMappings(): {
  libraryFeatureMapping: Map<string, string[]>;
  featureFeatureModuleMapping: Map<string, string[]>;
  featureRootModuleMapping: Map<string, string[]>;
  featureSchematicConfigMapping: Map<string, SchematicConfig>;
} {
  const featureMapping: Map<string, string[]> = new Map();
  const featureModuleMapping: Map<string, string[]> = new Map();
  const rootModuleMapping: Map<string, string[]> = new Map();
  const configMapping: Map<string, SchematicConfig> = new Map();

  for (const featureConfig of SCHEMATICS_CONFIGS) {
    populateFeatureMapping(featureMapping, featureConfig);
    populateFeatureModuleMapping(featureModuleMapping, featureConfig);
    populateRootModulesMapping(rootModuleMapping, featureConfig);
    populateConfigMapping(configMapping, featureConfig);
  }

  return {
    libraryFeatureMapping: featureMapping,
    featureFeatureModuleMapping: featureModuleMapping,
    featureRootModuleMapping: rootModuleMapping,
    featureSchematicConfigMapping: configMapping,
  };
}

function populateFeatureMapping(
  mapping: Map<string, string[]>,
  featureConfig: SchematicConfig
): void {
  const feature = featureConfig.library.mainScope;
  const featureName = featureConfig.library.featureName;

  const existingMapping = mapping.get(feature) ?? [];
  // avoid adding duplicates
  if (existingMapping.includes(featureName)) {
    return;
  }

  mapping.set(feature, [...existingMapping, featureName]);
}

function populateFeatureModuleMapping(
  mapping: Map<string, string[]>,
  featureConfig: SchematicConfig
): void {
  const feature = featureConfig.library.featureName;

  const existingMapping = mapping.get(feature) ?? [];
  const featureModules = ([] as Module[])
    .concat(featureConfig.featureModule)
    .map((fm) => fm.name);

  // avoid adding duplicates
  if (existingMapping.some((existing) => featureModules.includes(existing))) {
    return;
  }

  mapping.set(feature, [...existingMapping, ...featureModules]);
}

function populateRootModulesMapping(
  mapping: Map<string, string[]>,
  featureConfig: SchematicConfig
): void {
  const feature = featureConfig.library.featureName;

  const existingMapping = mapping.get(feature) ?? [];
  const rooModules = ([] as Module[])
    .concat(featureConfig.rootModule ?? [])
    .map((rm) => rm.name);

  // avoid adding duplicates
  if (existingMapping.some((existing) => rooModules.includes(existing))) {
    return;
  }

  mapping.set(feature, [...existingMapping, ...rooModules]);
}

function populateConfigMapping(
  mapping: Map<string, SchematicConfig>,
  featureConfig: SchematicConfig
): void {
  mapping.set(featureConfig.library.featureName, featureConfig);
}

/**
 * Based on the given value,
 * it returns the key of the given object.
 */
export function getKeyByMappingValue(
  mapping: Map<string, string[]>,
  value: string
): string | undefined {
  try {
    return getKeyByMappingValueOrThrow(mapping, value);
  } catch (e) {
    if (e instanceof SchematicsException) {
      return undefined;
    }
  }
  return undefined;
}

/**
 * Based on the given value,
 * it returns the key of the given object.
 */
export function getKeyByMappingValueOrThrow(
  mapping: Map<string, string[]>,
  value: string
): string {
  for (const key of Array.from(mapping.keys())) {
    if ((mapping.get(key) ?? []).includes(value)) {
      return key;
    }
  }

  throw new SchematicsException(`Value ${value} not found in the given map.`);
}

/**
 * Returns the schematics config
 * for the given feature.
 */
export function getSchematicsConfigByFeatureOrThrow(
  feature: string
): SchematicConfig {
  const featureConfig = featureSchematicConfigMapping.get(feature);
  if (!featureConfig) {
    throw new SchematicsException(
      `Config not found for the given feature '${feature}'`
    );
  }

  return featureConfig;
}
