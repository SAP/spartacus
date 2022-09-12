/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/***** Scopes start *****/
export const SPARTACUS_SCOPE = `@commerce-storefront-toolset/`;

export const SPARTACUS_SCHEMATICS = `@commerce-storefront-toolset/schematics`;

export const SPARTACUS_CORE = `@commerce-storefront-toolset/core`;
export const SPARTACUS_STOREFRONTLIB = `@commerce-storefront-toolset/storefront`;
export const SPARTACUS_ASSETS = `@commerce-storefront-toolset/assets`;
export const SPARTACUS_STYLES = `@commerce-storefront-toolset/styles`;

export const SPARTACUS_SETUP = `@commerce-storefront-toolset/setup`;
export const SPARTACUS_SETUP_SSR = `@commerce-storefront-toolset/setup/ssr`;

export const CORE_SPARTACUS_SCOPES: string[] = [
  SPARTACUS_CORE,
  SPARTACUS_ASSETS,
  SPARTACUS_SCHEMATICS,
  SPARTACUS_STOREFRONTLIB,
  SPARTACUS_STYLES,
  SPARTACUS_SETUP,
];
export const FEATURES_LIBS_SKIP_SCOPES = [SPARTACUS_SCOPE];

export const SPARTACUS_ASM = `@commerce-storefront-toolset/asm`;
export const SPARTACUS_ASM_ROOT = `@commerce-storefront-toolset/asm/root`;
export const SPARTACUS_ASM_ASSETS = `@commerce-storefront-toolset/asm/assets`;

export const SPARTACUS_CART = `@commerce-storefront-toolset/cart`;
export const SPARTACUS_CART_BASE = `@commerce-storefront-toolset/cart/base`;
export const SPARTACUS_CART_BASE_ROOT = `@commerce-storefront-toolset/cart/base/root`;
export const SPARTACUS_CART_BASE_ASSETS = `@commerce-storefront-toolset/cart/base/assets`;
export const MINI_CART_ENTRY_POINT = `@commerce-storefront-toolset/cart/base/components/mini-cart`;
export const ADD_TO_CART_ENTRY_POINT = `@commerce-storefront-toolset/cart/base/components/add-to-cart`;
export const SPARTACUS_CART_IMPORT_EXPORT = `@commerce-storefront-toolset/cart/import-export`;
export const SPARTACUS_CART_IMPORT_EXPORT_ROOT = `@commerce-storefront-toolset/cart/import-export/root`;
export const SPARTACUS_CART_IMPORT_EXPORT_ASSETS = `@commerce-storefront-toolset/cart/import-export/assets`;
export const SPARTACUS_QUICK_ORDER = `@commerce-storefront-toolset/cart/quick-order`;
export const SPARTACUS_CART_QUICK_ORDER_CORE = `@commerce-storefront-toolset/cart/quick-order/core`;
export const SPARTACUS_CART_QUICK_ORDER_ROOT = `@commerce-storefront-toolset/cart/quick-order/root`;
export const SPARTACUS_CART_QUICK_ORDER_COMPONENTS = `@commerce-storefront-toolset/cart/quick-order/components`;
export const SPARTACUS_QUICK_ORDER_ROOT = `@commerce-storefront-toolset/cart/quick-order/root`;
export const SPARTACUS_QUICK_ORDER_ASSETS = `@commerce-storefront-toolset/cart/quick-order/assets`;
export const SPARTACUS_CART_SAVED_CART_COMPONENTS = `@commerce-storefront-toolset/cart/saved-cart/components`;
export const SPARTACUS_CART_SAVED_CART_CORE = `@commerce-storefront-toolset/cart/saved-cart/core`;
export const SPARTACUS_CART_SAVED_CART_ROOT = `@commerce-storefront-toolset/cart/saved-cart/root`;
export const SPARTACUS_SAVED_CART = `@commerce-storefront-toolset/cart/saved-cart`;
export const SPARTACUS_SAVED_CART_ROOT = `@commerce-storefront-toolset/cart/saved-cart/root`;
export const SPARTACUS_SAVED_CART_ASSETS = `@commerce-storefront-toolset/cart/saved-cart/assets`;
export const SPARTACUS_CART_WISHLIST = `@commerce-storefront-toolset/cart/wish-list`;
export const SPARTACUS_CART_WISHLIST_ROOT = `@commerce-storefront-toolset/cart/wish-list/root`;
export const SPARTACUS_CART_WISHLIST_ASSETS = `@commerce-storefront-toolset/cart/wish-list/assets`;
export const ADD_TO_WISHLIST_ENTRY_POINT = `@commerce-storefront-toolset/cart/wish-list/components/add-to-wishlist`;

export const SPARTACUS_CHECKOUT = `@commerce-storefront-toolset/checkout`;
export const SPARTACUS_CHECKOUT_BASE = `@commerce-storefront-toolset/checkout/base`;
export const SPARTACUS_CHECKOUT_BASE_ASSETS = `@commerce-storefront-toolset/checkout/base/assets`;
export const SPARTACUS_CHECKOUT_BASE_OCC = `@commerce-storefront-toolset/checkout/base/occ`;
export const SPARTACUS_CHECKOUT_BASE_CORE = `@commerce-storefront-toolset/checkout/base/core`;
export const SPARTACUS_CHECKOUT_BASE_ROOT = `@commerce-storefront-toolset/checkout/base/root`;
export const SPARTACUS_CHECKOUT_BASE_COMPONENTS = `@commerce-storefront-toolset/checkout/base/components`;
export const SPARTACUS_CHECKOUT_B2B = `@commerce-storefront-toolset/checkout/b2b`;
export const SPARTACUS_CHECKOUT_B2B_ASSETS = `@commerce-storefront-toolset/checkout/b2b/assets`;
export const SPARTACUS_CHECKOUT_B2B_OCC = `@commerce-storefront-toolset/checkout/b2b/occ`;
export const SPARTACUS_CHECKOUT_B2B_CORE = `@commerce-storefront-toolset/checkout/b2b/core`;
export const SPARTACUS_CHECKOUT_B2B_ROOT = `@commerce-storefront-toolset/checkout/b2b/root`;
export const SPARTACUS_CHECKOUT_B2B_COMPONENTS = `@commerce-storefront-toolset/checkout/b2b/components`;
export const SPARTACUS_CHECKOUT_SCHEDULED_REPLENISHMENT = `@commerce-storefront-toolset/checkout/scheduled-replenishment`;
export const SPARTACUS_CHECKOUT_SCHEDULED_REPLENISHMENT_ASSETS = `@commerce-storefront-toolset/checkout/scheduled-replenishment/assets`;
export const SPARTACUS_CHECKOUT_SCHEDULED_REPLENISHMENT_OCC = `@commerce-storefront-toolset/checkout/scheduled-replenishment/occ`;
export const SPARTACUS_CHECKOUT_SCHEDULED_REPLENISHMENT_CORE = `@commerce-storefront-toolset/checkout/scheduled-replenishment/core`;
export const SPARTACUS_CHECKOUT_SCHEDULED_REPLENISHMENT_ROOT = `@commerce-storefront-toolset/checkout/scheduled-replenishment/root`;
export const SPARTACUS_CHECKOUT_SCHEDULED_REPLENISHMENT_COMPONENTS = `@commerce-storefront-toolset/checkout/scheduled-replenishment/components`;

export const SPARTACUS_CHECKOUT_OLD_OCC = `@commerce-storefront-toolset/checkout/occ`;
export const SPARTACUS_CHECKOUT_OLD_CORE = `@commerce-storefront-toolset/checkout/core`;
export const SPARTACUS_CHECKOUT_OLD_ROOT = `@commerce-storefront-toolset/checkout/root`;
export const SPARTACUS_CHECKOUT_OLD_COMPONENTS = `@commerce-storefront-toolset/checkout/components`;

export const SPARTACUS_ORDER = `@commerce-storefront-toolset/order`;
export const SPARTACUS_ORDER_ROOT = `@commerce-storefront-toolset/order/root`;
export const SPARTACUS_ORDER_ASSETS = `@commerce-storefront-toolset/order/assets`;

export const SPARTACUS_ORGANIZATION = `@commerce-storefront-toolset/organization`;
export const SPARTACUS_ADMINISTRATION = `@commerce-storefront-toolset/organization/administration`;
export const SPARTACUS_ORGANIZATION_ADMINISTRATION_ROOT = `@commerce-storefront-toolset/organization/administration/root`;
export const SPARTACUS_ORGANIZATION_ADMINISTRATION_CORE = `@commerce-storefront-toolset/organization/administration/core`;
export const SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS = `@commerce-storefront-toolset/organization/administration/components`;
export const SPARTACUS_ORGANIZATION_ADMINISTRATION_ASSETS = `@commerce-storefront-toolset/organization/administration/assets`;
export const SPARTACUS_ORGANIZATION_ORDER_APPROVAL = `@commerce-storefront-toolset/organization/order-approval`;
export const SPARTACUS_ORGANIZATION_ORDER_APPROVAL_ROOT = `@commerce-storefront-toolset/organization/order-approval/root`;
export const SPARTACUS_ORGANIZATION_ORDER_APPROVAL_ASSETS = `@commerce-storefront-toolset/organization/order-approval/assets`;

export const SPARTACUS_PRODUCT = `@commerce-storefront-toolset/product`;
export const SPARTACUS_PRODUCT_VARIANTS_COMPONENTS = `@commerce-storefront-toolset/product/variants/components`;
export const SPARTACUS_PRODUCT_VARIANTS_ROOT = `@commerce-storefront-toolset/product/variants/root`;
export const SPARTACUS_BULK_PRICING = `@commerce-storefront-toolset/product/bulk-pricing`;
export const SPARTACUS_BULK_PRICING_ROOT = `@commerce-storefront-toolset/product/bulk-pricing/root`;
export const SPARTACUS_BULK_PRICING_ASSETS = `@commerce-storefront-toolset/product/bulk-pricing/assets`;
export const SPARTACUS_IMAGE_ZOOM = `@commerce-storefront-toolset/product/image-zoom`;
export const SPARTACUS_IMAGE_ZOOM_ROOT = `@commerce-storefront-toolset/product/image-zoom/root`;
export const SPARTACUS_IMAGE_ZOOM_ASSETS = `@commerce-storefront-toolset/product/image-zoom/assets`;
export const SPARTACUS_VARIANTS = `@commerce-storefront-toolset/product/variants`;
export const SPARTACUS_VARIANTS_ROOT = `@commerce-storefront-toolset/product/variants/root`;
export const SPARTACUS_VARIANTS_ASSETS = `@commerce-storefront-toolset/product/variants/assets`;

export const SPARTACUS_PRODUCT_CONFIGURATOR = `@commerce-storefront-toolset/product-configurator`;
export const SPARTACUS_PRODUCT_CONFIGURATOR_COMMON = `@commerce-storefront-toolset/product-configurator/common`;
export const SPARTACUS_PRODUCT_CONFIGURATOR_ASSETS = `@commerce-storefront-toolset/product-configurator/common/assets`;
export const SPARTACUS_PRODUCT_CONFIGURATOR_TEXTFIELD = `@commerce-storefront-toolset/product-configurator/textfield`;
export const SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED = `@commerce-storefront-toolset/product-configurator/rulebased`;
export const SPARTACUS_PRODUCT_CONFIGURATOR_TEXTFIELD_ROOT = `@commerce-storefront-toolset/product-configurator/textfield/root`;
export const SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED_ROOT = `@commerce-storefront-toolset/product-configurator/rulebased/root`;
export const SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED_CPQ = `@commerce-storefront-toolset/product-configurator/rulebased/cpq`;

export const SPARTACUS_QUALTRICS = `@commerce-storefront-toolset/qualtrics`;
export const SPARTACUS_QUALTRICS_COMPONENTS = `@commerce-storefront-toolset/qualtrics/components`;
export const SPARTACUS_QUALTRICS_ROOT = `@commerce-storefront-toolset/qualtrics/root`;

export const SPARTACUS_SMARTEDIT = `@commerce-storefront-toolset/smartedit`;
export const SPARTACUS_SMARTEDIT_ROOT = `@commerce-storefront-toolset/smartedit/root`;

export const SPARTACUS_STOREFINDER = `@commerce-storefront-toolset/storefinder`;
export const SPARTACUS_STOREFINDER_ROOT = `@commerce-storefront-toolset/storefinder/root`;
export const SPARTACUS_STOREFINDER_ASSETS = `@commerce-storefront-toolset/storefinder/assets`;

export const SPARTACUS_TRACKING = `@commerce-storefront-toolset/tracking`;
export const SPARTACUS_TMS_CORE = `@commerce-storefront-toolset/tracking/tms/core`;
export const SPARTACUS_TMS_GTM = `@commerce-storefront-toolset/tracking/tms/gtm`;
export const SPARTACUS_TMS_AEP = `@commerce-storefront-toolset/tracking/tms/aep`;
export const SPARTACUS_PERSONALIZATION = `@commerce-storefront-toolset/tracking/personalization`;
export const SPARTACUS_PERSONALIZATION_ROOT = `@commerce-storefront-toolset/tracking/personalization/root`;

export const SPARTACUS_USER = `@commerce-storefront-toolset/user`;
export const SPARTACUS_USER_ACCOUNT = `@commerce-storefront-toolset/user/account`;
export const SPARTACUS_USER_ACCOUNT_ASSETS = `@commerce-storefront-toolset/user/account/assets`;
export const SPARTACUS_USER_ACCOUNT_OCC = `@commerce-storefront-toolset/user/account/occ`;
export const SPARTACUS_USER_ACCOUNT_CORE = `@commerce-storefront-toolset/user/account/core`;
export const SPARTACUS_USER_ACCOUNT_ROOT = `@commerce-storefront-toolset/user/account/root`;
export const SPARTACUS_USER_ACCOUNT_COMPONENTS = `@commerce-storefront-toolset/user/account/components`;
export const SPARTACUS_USER_PROFILE = `@commerce-storefront-toolset/user/profile`;
export const SPARTACUS_USER_PROFILE_OCC = `@commerce-storefront-toolset/user/profile/occ`;
export const SPARTACUS_USER_PROFILE_CORE = `@commerce-storefront-toolset/user/profile/core`;
export const SPARTACUS_USER_PROFILE_COMPONENTS = `@commerce-storefront-toolset/user/profile/components`;
export const SPARTACUS_USER_PROFILE_ASSETS = `@commerce-storefront-toolset/user/profile/assets`;
export const SPARTACUS_USER_PROFILE_ROOT = `@commerce-storefront-toolset/user/profile/root`;

export const SPARTACUS_CDS = `@commerce-storefront-toolset/cds`;

export const SPARTACUS_CDC = `@commerce-storefront-toolset/cdc`;
export const SPARTACUS_CDC_ROOT = `@commerce-storefront-toolset/cdc/root`;

export const SPARTACUS_DIGITAL_PAYMENTS = `@commerce-storefront-toolset/digital-payments`;
export const SPARTACUS_DIGITAL_PAYMENTS_ASSETS = `@commerce-storefront-toolset/digital-payments/assets`;

export const SPARTACUS_EPD_VISUALIZATION = `@commerce-storefront-toolset/epd-visualization`;
export const SPARTACUS_EPD_VISUALIZATION_ROOT = `@commerce-storefront-toolset/epd-visualization/root`;
export const SPARTACUS_EPD_VISUALIZATION_ASSETS = `@commerce-storefront-toolset/epd-visualization/assets`;

/***** Scopes end *****/

/***** File structure start *****/
export const SPARTACUS_ROUTING_MODULE = 'app-routing';
export const SPARTACUS_MODULE = 'spartacus';
export const SPARTACUS_FEATURES_MODULE = 'spartacus-features';
export const SPARTACUS_FEATURES_NG_MODULE = 'SpartacusFeaturesModule';
export const SPARTACUS_CONFIGURATION_MODULE = 'spartacus-configuration';
/***** File structure end *****/

/***** Feature name start *****/
export const ASM_FEATURE_NAME = 'ASM';

export const CART_BASE_FEATURE_NAME = 'Cart';
export const CART_IMPORT_EXPORT_FEATURE_NAME = 'Import-Export';
export const CART_QUICK_ORDER_FEATURE_NAME = 'Quick-Order';
export const CART_WISHLIST_FEATURE_NAME = 'WishList';
export const CART_SAVED_CART_FEATURE_NAME = 'Saved-Cart';

export const CHECKOUT_BASE_FEATURE_NAME = 'Checkout';
export const CHECKOUT_B2B_FEATURE_NAME = 'Checkout-B2B';
export const CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE_NAME =
  'Checkout-Scheduled-Replenishment';

export const ORDER_FEATURE_NAME = 'Order';

export const ORGANIZATION_ADMINISTRATION_FEATURE_NAME = 'Administration';
export const ORGANIZATION_ORDER_APPROVAL_FEATURE_NAME = 'Order-Approval';

export const PRODUCT_BULK_PRICING_FEATURE_NAME = 'Bulk-Pricing';
export const PRODUCT_IMAGE_ZOOM_FEATURE_NAME = 'Image-Zoom';
export const PRODUCT_VARIANTS_FEATURE_NAME = 'Product-Variants';

export const PRODUCT_CONFIGURATOR_TEXTFIELD_FEATURE_NAME =
  'Textfield-Configurator';
export const PRODUCT_CONFIGURATOR_VC_FEATURE_NAME = 'VC-Configurator';
export const PRODUCT_CONFIGURATOR_CPQ_FEATURE_NAME = 'CPQ-Configurator';

export const QUALTRICS_FEATURE_NAME = 'Qualtrics';

export const SMARTEDIT_FEATURE_NAME = 'SmartEdit';

export const STOREFINDER_FEATURE_NAME = 'Store-Finder';

export const TRACKING_PERSONALIZATION_FEATURE_NAME = 'Personalization';
export const TRACKING_TMS_GTM_FEATURE_NAME = 'TMS-GTM';
export const TRACKING_TMS_AEP_FEATURE_NAME = 'TMS-AEPL';

export const USER_ACCOUNT_FEATURE_NAME = 'User-Account';
export const USER_PROFILE_FEATURE_NAME = 'User-Profile';

export const CDC_FEATURE_NAME = 'CDC';

export const CDS_FEATURE_NAME = 'CDS';

export const DIGITAL_PAYMENTS_FEATURE_NAME = 'Digital-Payments';

export const EPD_VISUALIZATION_FEATURE_NAME = 'EPD-Visualization';
/***** Feature name end *****/
