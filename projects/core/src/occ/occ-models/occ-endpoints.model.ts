/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export const DEFAULT_SCOPE = 'default';

export interface OccEndpoint {
  default?: string;
  [scope: string]: string | undefined;
}

export interface ProductOccEndpoint extends OccEndpoint {
  list?: string;
  details?: string;
  attributes?: string;
  variants?: string;
}

export interface OccEndpoints {
  /**
   * Get product details for scope
   *
   * @member Object
   */
  product?: string | ProductOccEndpoint;
  /**
   * Get reviews for a product
   *
   * @member {string}
   */
  productReviews?: string | OccEndpoint;
  /**
   * Get a list of product references
   *
   * @member {string}
   */
  productReferences?: string | OccEndpoint;
  /**
   * Get a list of products and additional data
   *
   * @member {string}
   */
  productSearch?: string | OccEndpoint;
  /**
   * Get a list of available suggestions
   *
   * @member {string}
   */
  productSuggestions?: string | OccEndpoint;
  /**
   * Get CMS component details
   *
   * @member {string}
   */
  component?: string | OccEndpoint;
  /**
   * Get a list of CMS component details
   *
   * @member {string}
   */
  components?: string | OccEndpoint;
  /**
   * Get page data with list of cms content slots
   *
   * @member {string}
   */
  pages?: string | OccEndpoint;
  /**
   * Get page data with list of cms content slots
   *
   * @member {string}
   */
  page?: string | OccEndpoint;
  /**
   * Get a list of available languages
   *
   * @member {string}
   */
  languages?: string | OccEndpoint;
  /**
   * Get a list of available currencies
   *
   * @member {string}
   */
  currencies?: string | OccEndpoint;
  /**
   * Get a list of countries
   *
   * @member {string}
   */
  countries?: string | OccEndpoint;
  /**
   * Fetch the list of regions for the provided country
   *
   * @member {string}
   */
  regions?: string | OccEndpoint;
  /**
   * Payment details root endpoint.
   *
   * @member {string}
   */
  paymentDetailsAll?: string | OccEndpoint;
  /**
   * Endpoint for a specific payment method.
   *
   * @member {string}
   */
  paymentDetail?: string | OccEndpoint;
  /**
   * Endpoint for anonymous consent templates
   *
   * @member {string}
   */
  anonymousConsentTemplates?: string | OccEndpoint;
  /**
   * Endpoint for consent templates
   *
   * @member {string}
   */
  consentTemplates?: string | OccEndpoint;
  /**
   * Endpoint for a user's consents
   *
   * @member {string}
   */
  consents?: string | OccEndpoint;
  /**
   * Endpoint for a user's specific previously given consent.
   *
   * @member {string}
   */
  consentDetail?: string | OccEndpoint;
  /**
   * Endpoint for a user's addresses
   *
   * @member {string}
   */
  addresses?: string | OccEndpoint;
  /**
   * Endpoint for a user's specific address
   *
   * @member {string}
   */
  addressDetail?: string | OccEndpoint;
  /**
   * Endpoint for address verification
   *
   * @member {string}
   */
  addressVerification?: string | OccEndpoint;
  /**
   * Endpoint for create configuration
   *
   * @member {string}
   */
  createVariantConfiguration?: string;
  /**
   * Endpoint for create configuration for the textfield configurator
   *
   * @member {string}
   */
  createTextfieldConfiguration?: string;
  /**
   * Endpoint for add textfield configuration to cart
   *
   * @member {string}
   */
  addTextfieldConfigurationToCart?: string;
  /**
   * Endpoint for reading textfield configuration attached to the cart entry
   */
  readTextfieldConfigurationForCartEntry?: string;
  /**
   * Endpoint for updating textfield configuration attached to the cart entry
   */
  updateTextfieldConfigurationForCartEntry?: string;
  /**
   * Endpoint to read configuration
   *
   * @member {string}
   */
  readVariantConfiguration?: string;
  /**
   * Endpoint to update configuration
   *
   * @member {string}
   */
  updateVariantConfiguration?: string;
  /**
   * Endpoint to add configuration to cart
   *
   * @member {string}
   */
  addVariantConfigurationToCart?: string;
  /**
   * Endpoint for reading configuration attached to the cart entry
   */
  readVariantConfigurationForCartEntry?: string;
  /**
   * Endpoint for updating configuration attached to the cart entry
   */
  updateVariantConfigurationForCartEntry?: string;
  /**
   * Endpoint for reading configuration overview attached to the order entry
   */
  readVariantConfigurationOverviewForOrderEntry?: string;
  /**
   * Endpoint to read configuration price
   *
   * @member {string}
   */
  readVariantConfigurationPriceSummary?: string;
  /**
   * Endpoint to get configuration Overview
   *
   * @member {string}
   */
  getVariantConfigurationOverview?: string;
  /**
   * Endpoint for configurator variant search
   *
   * @member {string}
   */
  searchConfiguratorVariants?: string;
  /**
   * Endpoint for coupons
   *
   * @member {string}
   */
  customerCoupons?: string | OccEndpoint;
  /**
   * Endpoint for claiming coupon
   *
   * @member {string}
   */
  claimCoupon?: string | OccEndpoint;
  /**
   * Endpoint for coupons
   *
   * @member {string}
   */
  couponNotification?: string | OccEndpoint;
  /**
   * Endpoint for notification preference
   *
   * @member {string}
   */
  notificationPreference?: string | OccEndpoint;
  /**
   * Endpoint for product interests
   *
   * @member {string}
   */
  productInterests?: string | OccEndpoint;
  /**
   * Endpoint for getting product interests
   *
   * @member {string}
   */
  getProductInterests?: string | OccEndpoint;
  /**
   * Endpoint for getting all base sites
   *
   * @member {string}
   */
  baseSites?: string | OccEndpoint;
  /** Endpoint to returns active cost centers
   *
   * @member {string}
   */
  getActiveCostCenters?: string | OccEndpoint;
}
