/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/***** Scopes start *****/
export const SPARTACUS_SCOPE = `@spartacus/`;

export const SPARTACUS_SCHEMATICS = `@spartacus/schematics`;

export const SPARTACUS_CORE = `@spartacus/core`;
export const SPARTACUS_STOREFRONTLIB = `@spartacus/storefront`;
export const SPARTACUS_ASSETS = `@spartacus/assets`;
export const SPARTACUS_STYLES = `@spartacus/styles`;

export const SPARTACUS_SETUP = `@spartacus/setup`;
export const SPARTACUS_SETUP_SSR = `@spartacus/setup/ssr`;

export const CORE_SPARTACUS_SCOPES: string[] = [
  SPARTACUS_CORE,
  SPARTACUS_ASSETS,
  SPARTACUS_SCHEMATICS,
  SPARTACUS_STOREFRONTLIB,
  SPARTACUS_STYLES,
  SPARTACUS_SETUP,
];
export const FEATURES_LIBS_SKIP_SCOPES = [SPARTACUS_SCOPE];

export const SPARTACUS_ASM = `@spartacus/asm`;
export const SPARTACUS_ASM_ROOT = `@spartacus/asm/root`;
export const SPARTACUS_ASM_ASSETS = `@spartacus/asm/assets`;

export const SPARTACUS_ASM_CUSTOMER_360 = `@spartacus/asm/customer-360`;
export const SPARTACUS_ASM_CUSTOMER_360_ROOT = `@spartacus/asm/customer-360/root`;
export const SPARTACUS_ASM_CUSTOMER_360_ASSETS = `@spartacus/asm/customer-360/assets`;

export const SPARTACUS_PICKUP_IN_STORE = '@spartacus/pickup-in-store';
export const SPARTACUS_PICKUP_IN_STORE_ASSETS = `@spartacus/pickup-in-store/assets`;
export const SPARTACUS_PICKUP_IN_STORE_ROOT = `@spartacus/pickup-in-store/root`;

export const SPARTACUS_CART = `@spartacus/cart`;
export const SPARTACUS_CART_BASE = `@spartacus/cart/base`;
export const SPARTACUS_CART_BASE_COMPONENTS = `@spartacus/cart/base/components`;
export const SPARTACUS_CART_BASE_ROOT = `@spartacus/cart/base/root`;
export const SPARTACUS_CART_BASE_ASSETS = `@spartacus/cart/base/assets`;
export const MINI_CART_ENTRY_POINT = `@spartacus/cart/base/components/mini-cart`;
export const ADD_TO_CART_ENTRY_POINT = `@spartacus/cart/base/components/add-to-cart`;
export const SPARTACUS_CART_IMPORT_EXPORT = `@spartacus/cart/import-export`;
export const SPARTACUS_CART_IMPORT_EXPORT_ROOT = `@spartacus/cart/import-export/root`;
export const SPARTACUS_CART_IMPORT_EXPORT_ASSETS = `@spartacus/cart/import-export/assets`;
export const SPARTACUS_QUICK_ORDER = `@spartacus/cart/quick-order`;
export const SPARTACUS_CART_QUICK_ORDER_CORE = `@spartacus/cart/quick-order/core`;
export const SPARTACUS_CART_QUICK_ORDER_ROOT = `@spartacus/cart/quick-order/root`;
export const SPARTACUS_CART_QUICK_ORDER_COMPONENTS = `@spartacus/cart/quick-order/components`;
export const SPARTACUS_QUICK_ORDER_ROOT = `@spartacus/cart/quick-order/root`;
export const SPARTACUS_QUICK_ORDER_ASSETS = `@spartacus/cart/quick-order/assets`;
export const SPARTACUS_CART_SAVED_CART_COMPONENTS = `@spartacus/cart/saved-cart/components`;
export const SPARTACUS_CART_SAVED_CART_CORE = `@spartacus/cart/saved-cart/core`;
export const SPARTACUS_CART_SAVED_CART_ROOT = `@spartacus/cart/saved-cart/root`;
export const SPARTACUS_SAVED_CART = `@spartacus/cart/saved-cart`;
export const SPARTACUS_SAVED_CART_ROOT = `@spartacus/cart/saved-cart/root`;
export const SPARTACUS_SAVED_CART_ASSETS = `@spartacus/cart/saved-cart/assets`;
export const SPARTACUS_CART_WISHLIST = `@spartacus/cart/wish-list`;
export const SPARTACUS_CART_WISHLIST_ROOT = `@spartacus/cart/wish-list/root`;
export const SPARTACUS_CART_WISHLIST_ASSETS = `@spartacus/cart/wish-list/assets`;
export const ADD_TO_WISHLIST_ENTRY_POINT = `@spartacus/cart/wish-list/components/add-to-wishlist`;

export const SPARTACUS_CHECKOUT = `@spartacus/checkout`;
export const SPARTACUS_CHECKOUT_BASE = `@spartacus/checkout/base`;
export const SPARTACUS_CHECKOUT_BASE_ASSETS = `@spartacus/checkout/base/assets`;
export const SPARTACUS_CHECKOUT_BASE_OCC = `@spartacus/checkout/base/occ`;
export const SPARTACUS_CHECKOUT_BASE_CORE = `@spartacus/checkout/base/core`;
export const SPARTACUS_CHECKOUT_BASE_ROOT = `@spartacus/checkout/base/root`;
export const SPARTACUS_CHECKOUT_BASE_COMPONENTS = `@spartacus/checkout/base/components`;
export const SPARTACUS_CHECKOUT_B2B = `@spartacus/checkout/b2b`;
export const SPARTACUS_CHECKOUT_B2B_ASSETS = `@spartacus/checkout/b2b/assets`;
export const SPARTACUS_CHECKOUT_B2B_OCC = `@spartacus/checkout/b2b/occ`;
export const SPARTACUS_CHECKOUT_B2B_CORE = `@spartacus/checkout/b2b/core`;
export const SPARTACUS_CHECKOUT_B2B_ROOT = `@spartacus/checkout/b2b/root`;
export const SPARTACUS_CHECKOUT_B2B_COMPONENTS = `@spartacus/checkout/b2b/components`;
export const SPARTACUS_CHECKOUT_SCHEDULED_REPLENISHMENT = `@spartacus/checkout/scheduled-replenishment`;
export const SPARTACUS_CHECKOUT_SCHEDULED_REPLENISHMENT_ASSETS = `@spartacus/checkout/scheduled-replenishment/assets`;
export const SPARTACUS_CHECKOUT_SCHEDULED_REPLENISHMENT_OCC = `@spartacus/checkout/scheduled-replenishment/occ`;
export const SPARTACUS_CHECKOUT_SCHEDULED_REPLENISHMENT_CORE = `@spartacus/checkout/scheduled-replenishment/core`;
export const SPARTACUS_CHECKOUT_SCHEDULED_REPLENISHMENT_ROOT = `@spartacus/checkout/scheduled-replenishment/root`;
export const SPARTACUS_CHECKOUT_SCHEDULED_REPLENISHMENT_COMPONENTS = `@spartacus/checkout/scheduled-replenishment/components`;

export const SPARTACUS_CHECKOUT_OLD_OCC = `@spartacus/checkout/occ`;
export const SPARTACUS_CHECKOUT_OLD_CORE = `@spartacus/checkout/core`;
export const SPARTACUS_CHECKOUT_OLD_ROOT = `@spartacus/checkout/root`;
export const SPARTACUS_CHECKOUT_OLD_COMPONENTS = `@spartacus/checkout/components`;

export const SPARTACUS_ORDER = `@spartacus/order`;
export const SPARTACUS_ORDER_ROOT = `@spartacus/order/root`;
export const SPARTACUS_ORDER_ASSETS = `@spartacus/order/assets`;
export const SPARTACUS_ORDER_COMPONENTS = `@spartacus/order/components`;

export const SPARTACUS_ORGANIZATION = `@spartacus/organization`;
export const SPARTACUS_ADMINISTRATION = `@spartacus/organization/administration`;
export const SPARTACUS_ORGANIZATION_ADMINISTRATION_ROOT = `@spartacus/organization/administration/root`;
export const SPARTACUS_ORGANIZATION_ADMINISTRATION_CORE = `@spartacus/organization/administration/core`;
export const SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS = `@spartacus/organization/administration/components`;
export const SPARTACUS_ORGANIZATION_ADMINISTRATION_ASSETS = `@spartacus/organization/administration/assets`;
export const SPARTACUS_ORGANIZATION_ORDER_APPROVAL = `@spartacus/organization/order-approval`;
export const SPARTACUS_ORGANIZATION_ORDER_APPROVAL_ROOT = `@spartacus/organization/order-approval/root`;
export const SPARTACUS_ORGANIZATION_ORDER_APPROVAL_ASSETS = `@spartacus/organization/order-approval/assets`;
export const SPARTACUS_ORGANIZATION_USER_REGISTRATION = `@spartacus/organization/user-registration`;
export const SPARTACUS_ORGANIZATION_USER_REGISTRATION_ROOT = `@spartacus/organization/user-registration/root`;
export const SPARTACUS_ORGANIZATION_USER_REGISTRATION_ASSETS = `@spartacus/organization/user-registration/assets`;
export const SPARTACUS_ORGANIZATION_UNIT_ORDER = `@spartacus/organization/unit-order`;
export const SPARTACUS_ORGANIZATION_UNIT_ORDER_ROOT = `@spartacus/organization/unit-order/root`;
export const SPARTACUS_ORGANIZATION_UNIT_ORDER_ASSETS = `@spartacus/organization/unit-order/assets`;

export const SPARTACUS_ORGANIZATION_ACCOUNT_SUMMARY = `@spartacus/organization/account-summary`;
export const SPARTACUS_ORGANIZATION_ACCOUNT_SUMMARY_ROOT = `@spartacus/organization/account-summary/root`;
export const SPARTACUS_ORGANIZATION_ACCOUNT_SUMMARY_CORE = `@spartacus/organization/account-summary/core`;
export const SPARTACUS_ORGANIZATION_ACCOUNT_SUMMARY_COMPONENTS = `@spartacus/organization/account-summary/components`;
export const SPARTACUS_ORGANIZATION_ACCOUNT_SUMMARY_ASSETS = `@spartacus/organization/account-summary/assets`;
export const SPARTACUS_ORGANIZATION_ACCOUNT_SUMMARY_OCC = `@spartacus/organization/account-summary/occ`;

export const SPARTACUS_PRODUCT = `@spartacus/product`;
export const SPARTACUS_PRODUCT_VARIANTS_COMPONENTS = `@spartacus/product/variants/components`;
export const SPARTACUS_PRODUCT_VARIANTS_ROOT = `@spartacus/product/variants/root`;
export const SPARTACUS_BULK_PRICING = `@spartacus/product/bulk-pricing`;
export const SPARTACUS_BULK_PRICING_ROOT = `@spartacus/product/bulk-pricing/root`;
export const SPARTACUS_BULK_PRICING_ASSETS = `@spartacus/product/bulk-pricing/assets`;
export const SPARTACUS_IMAGE_ZOOM = `@spartacus/product/image-zoom`;
export const SPARTACUS_IMAGE_ZOOM_ROOT = `@spartacus/product/image-zoom/root`;
export const SPARTACUS_IMAGE_ZOOM_ASSETS = `@spartacus/product/image-zoom/assets`;
export const SPARTACUS_VARIANTS = `@spartacus/product/variants`;
export const SPARTACUS_VARIANTS_ROOT = `@spartacus/product/variants/root`;
export const SPARTACUS_VARIANTS_ASSETS = `@spartacus/product/variants/assets`;
export const SPARTACUS_FUTURE_STOCK = `@spartacus/product/future-stock`;
export const SPARTACUS_FUTURE_STOCK_ROOT = `@spartacus/product/future-stock/root`;
export const SPARTACUS_FUTURE_STOCK_ASSETS = `@spartacus/product/future-stock/assets`;

export const SPARTACUS_PDF_INVOICES = `@spartacus/pdf-invoices`;
export const SPARTACUS_PDF_INVOICES_ROOT = `@spartacus/pdf-invoices/root`;
export const SPARTACUS_PDF_INVOICES_ASSETS = `@spartacus/pdf-invoices/assets`;

export const SPARTACUS_PRODUCT_CONFIGURATOR = `@spartacus/product-configurator`;
export const SPARTACUS_PRODUCT_CONFIGURATOR_COMMON = `@spartacus/product-configurator/common`;
export const SPARTACUS_PRODUCT_CONFIGURATOR_ASSETS = `@spartacus/product-configurator/common/assets`;
export const SPARTACUS_PRODUCT_CONFIGURATOR_TEXTFIELD = `@spartacus/product-configurator/textfield`;
export const SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED = `@spartacus/product-configurator/rulebased`;
export const SPARTACUS_PRODUCT_CONFIGURATOR_TEXTFIELD_ROOT = `@spartacus/product-configurator/textfield/root`;
export const SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED_ROOT = `@spartacus/product-configurator/rulebased/root`;
export const SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED_CPQ = `@spartacus/product-configurator/rulebased/cpq`;

export const SPARTACUS_QUALTRICS = `@spartacus/qualtrics`;
export const SPARTACUS_QUALTRICS_COMPONENTS = `@spartacus/qualtrics/components`;
export const SPARTACUS_QUALTRICS_ROOT = `@spartacus/qualtrics/root`;

export const SPARTACUS_REQUESTED_DELIVERY_DATE = `@spartacus/requested-delivery-date`;
export const SPARTACUS_REQUESTED_DELIVERY_DATE_ROOT = `@spartacus/requested-delivery-date/root`;
export const SPARTACUS_REQUESTED_DELIVERY_DATE_ASSETS = `@spartacus/requested-delivery-date/assets`;

export const SPARTACUS_SMARTEDIT = `@spartacus/smartedit`;
export const SPARTACUS_SMARTEDIT_ROOT = `@spartacus/smartedit/root`;

export const SPARTACUS_STOREFINDER = `@spartacus/storefinder`;
export const SPARTACUS_STOREFINDER_ROOT = `@spartacus/storefinder/root`;
export const SPARTACUS_STOREFINDER_ASSETS = `@spartacus/storefinder/assets`;

export const SPARTACUS_TRACKING = `@spartacus/tracking`;
export const SPARTACUS_TMS_CORE = `@spartacus/tracking/tms/core`;
export const SPARTACUS_TMS_GTM = `@spartacus/tracking/tms/gtm`;
export const SPARTACUS_TMS_AEP = `@spartacus/tracking/tms/aep`;
export const SPARTACUS_PERSONALIZATION = `@spartacus/tracking/personalization`;
export const SPARTACUS_PERSONALIZATION_ROOT = `@spartacus/tracking/personalization/root`;

export const SPARTACUS_USER = `@spartacus/user`;
export const SPARTACUS_USER_ACCOUNT = `@spartacus/user/account`;
export const SPARTACUS_USER_ACCOUNT_ASSETS = `@spartacus/user/account/assets`;
export const SPARTACUS_USER_ACCOUNT_OCC = `@spartacus/user/account/occ`;
export const SPARTACUS_USER_ACCOUNT_CORE = `@spartacus/user/account/core`;
export const SPARTACUS_USER_ACCOUNT_ROOT = `@spartacus/user/account/root`;
export const SPARTACUS_USER_ACCOUNT_COMPONENTS = `@spartacus/user/account/components`;
export const SPARTACUS_USER_PROFILE = `@spartacus/user/profile`;
export const SPARTACUS_USER_PROFILE_OCC = `@spartacus/user/profile/occ`;
export const SPARTACUS_USER_PROFILE_CORE = `@spartacus/user/profile/core`;
export const SPARTACUS_USER_PROFILE_COMPONENTS = `@spartacus/user/profile/components`;
export const SPARTACUS_USER_PROFILE_ASSETS = `@spartacus/user/profile/assets`;
export const SPARTACUS_USER_PROFILE_ROOT = `@spartacus/user/profile/root`;

export const SPARTACUS_CDS = `@spartacus/cds`;

export const SPARTACUS_CDC = `@spartacus/cdc`;
export const SPARTACUS_CDC_ROOT = `@spartacus/cdc/root`;
export const SPARTACUS_CDC_ASSETS = `@spartacus/cdc/assets`;
export const SPARTACUS_CDC_USER_ACCOUNT = `@spartacus/cdc/user-account`;
export const SPARTACUS_CDC_USER_PROFILE = `@spartacus/cdc/user-profile`;
export const SPARTACUS_CDC_ORGANIZATION_ADMINISTRATION = `@spartacus/cdc/organization/administration`;
export const SPARTACUS_CDC_ORGANIZATION_REGISTRATION = `@spartacus/cdc/organization/user-registration`;

export const SPARTACUS_DIGITAL_PAYMENTS = `@spartacus/digital-payments`;
export const SPARTACUS_DIGITAL_PAYMENTS_ASSETS = `@spartacus/digital-payments/assets`;

export const SPARTACUS_EPD_VISUALIZATION = `@spartacus/epd-visualization`;
export const SPARTACUS_EPD_VISUALIZATION_ROOT = `@spartacus/epd-visualization/root`;
export const SPARTACUS_EPD_VISUALIZATION_ASSETS = `@spartacus/epd-visualization/assets`;

export const SPARTACUS_S4OM = '@spartacus/s4om';
export const SPARTACUS_S4OM_ROOT = `@spartacus/s4om/root`;
export const SPARTACUS_S4OM_ASSETS = `@spartacus/s4om/assets`;

export const SPARTACUS_SEGMENT_REFS = '@spartacus/segment-refs';
export const SPARTACUS_SEGMENT_REFS_ROOT = `@spartacus/segment-refs/root`;

export const SPARTACUS_CUSTOMER_TICKETING_ROOT = `@spartacus/customer-ticketing/root`;
export const SPARTACUS_CUSTOMER_TICKETING_ASSETS = `@spartacus/customer-ticketing/assets`;
export const SPARTACUS_CUSTOMER_TICKETING = '@spartacus/customer-ticketing';
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
export const ASM_CUSTOMER_360_FEATURE_NAME = 'ASM-Customer-360';

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

export const ORGANIZATION_USER_REGISTRATION_FEATURE_NAME =
  'Organization-User-Registration';

export const ORGANIZATION_UNIT_ORDER_FEATURE_NAME = 'Unit-Order';

export const ORGANIZATION_ACCOUNT_SUMMARY_FEATURE_NAME = 'Account-Summary';

export const PRODUCT_BULK_PRICING_FEATURE_NAME = 'Bulk-Pricing';
export const PRODUCT_IMAGE_ZOOM_FEATURE_NAME = 'Image-Zoom';
export const PRODUCT_VARIANTS_FEATURE_NAME = 'Product-Variants';
export const PRODUCT_FUTURE_STOCK_FEATURE_NAME = 'Future-Stock';

export const PRODUCT_CONFIGURATOR_TEXTFIELD_FEATURE_NAME =
  'Textfield-Configurator';
export const PRODUCT_CONFIGURATOR_VC_FEATURE_NAME = 'VC-Configurator';
export const PRODUCT_CONFIGURATOR_CPQ_FEATURE_NAME = 'CPQ-Configurator';

export const QUALTRICS_FEATURE_NAME = 'Qualtrics';

export const REQUESTED_DELIVERY_DATE_FEATURE_NAME = 'Requested-Delivery-Date';

export const SMARTEDIT_FEATURE_NAME = 'SmartEdit';

export const STOREFINDER_FEATURE_NAME = 'Store-Finder';

export const TRACKING_PERSONALIZATION_FEATURE_NAME = 'Personalization';
export const TRACKING_TMS_GTM_FEATURE_NAME = 'TMS-GTM';
export const TRACKING_TMS_AEP_FEATURE_NAME = 'TMS-AEPL';

export const PDF_INVOICES_FEATURE_NAME = 'PDF-Invoices';

export const USER_ACCOUNT_FEATURE_NAME = 'User-Account';
export const USER_PROFILE_FEATURE_NAME = 'User-Profile';

export const CDC_FEATURE_NAME = 'CDC';
export const CDC_B2B_FEATURE_NAME = 'CDC-B2B';

export const CDS_FEATURE_NAME = 'CDS';

export const DIGITAL_PAYMENTS_FEATURE_NAME = 'Digital-Payments';

export const EPD_VISUALIZATION_FEATURE_NAME = 'EPD-Visualization';

export const S4OM_FEATURE_NAME = 'S4HANA-Order-Management';

export const SEGMENT_REFS_FEATURE_NAME = 'Segment-Refs';

export const CUSTOMER_TICKETING_FEATURE_NAME = 'Customer-Ticketing';
/***** Feature name end *****/

/***** Feature name start *****/
export const PICKUP_IN_STORE_FEATURE_NAME = 'Pickup-In-Store';
export const PICKUP_IN_STORE_FEATURE = 'Pickup-In-Store';
export const PICKUP_IN_STORE_MODULE = 'PickupInStoreModule';
export const PICKUP_IN_STORE_ROOT_MODULE = 'PickupInStoreRootModule';
/***** Feature name end *****/
