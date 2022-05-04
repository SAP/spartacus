import {
  ADD_TO_CART_MODULE,
  ADD_TO_WISHLIST_MODULE,
  ADMINISTRATION_MODULE,
  ADMINISTRATION_ROOT_MODULE,
  ASM_MODULE,
  ASM_ROOT_MODULE,
  BULK_PRICING_MODULE,
  BULK_PRICING_ROOT_MODULE,
  CART_BASE_MODULE,
  CART_BASE_ROOT_MODULE,
  CART_IMPORT_EXPORT_MODULE,
  CART_IMPORT_EXPORT_ROOT_MODULE,
  CART_WISHLIST_MODULE,
  CART_WISHLIST_ROOT_MODULE,
  CDC_MODULE,
  CDC_ROOT_MODULE,
  CDS_MODULE,
  CHECKOUT_B2B_MODULE,
  CHECKOUT_B2B_ROOT_MODULE,
  CHECKOUT_BASE_MODULE,
  CHECKOUT_BASE_ROOT_MODULE,
  CHECKOUT_SCHEDULED_REPLENISHMENT_MODULE,
  CHECKOUT_SCHEDULED_REPLENISHMENT_ROOT_MODULE,
  CLI_ASM_FEATURE,
  CLI_CART_BASE_FEATURE,
  CLI_CART_IMPORT_EXPORT_FEATURE,
  CLI_CART_QUICK_ORDER_FEATURE,
  CLI_CART_SAVED_CART_FEATURE,
  CLI_CART_WISHLIST_FEATURE,
  CLI_CDC_FEATURE,
  CLI_CDS_FEATURE,
  CLI_CHECKOUT_B2B_FEATURE,
  CLI_CHECKOUT_BASE_FEATURE,
  CLI_CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE,
  CLI_DIGITAL_PAYMENTS_FEATURE,
  CLI_EPD_VISUALIZATION_FEATURE,
  CLI_S4OM_FEATURE,
  CLI_ORDER_FEATURE,
  CLI_ORGANIZATION_ADMINISTRATION_FEATURE,
  CLI_ORGANIZATION_ORDER_APPROVAL_FEATURE,
  CLI_PRODUCT_BULK_PRICING_FEATURE,
  CLI_PRODUCT_CONFIGURATOR_CPQ_FEATURE,
  CLI_PRODUCT_CONFIGURATOR_TEXTFIELD_FEATURE,
  CLI_PRODUCT_CONFIGURATOR_VC_FEATURE,
  CLI_PRODUCT_IMAGE_ZOOM_FEATURE,
  CLI_PRODUCT_VARIANTS_FEATURE,
  CLI_QUALTRICS_FEATURE,
  CLI_SMARTEDIT_FEATURE,
  CLI_STOREFINDER_FEATURE,
  CLI_TRACKING_PERSONALIZATION_FEATURE,
  CLI_TRACKING_TMS_AEP_FEATURE,
  CLI_TRACKING_TMS_GTM_FEATURE,
  CLI_USER_ACCOUNT_FEATURE,
  CLI_USER_PROFILE_FEATURE,
  DIGITAL_PAYMENTS_MODULE,
  EPD_VISUALIZATION_MODULE,
  EPD_VISUALIZATION_ROOT_MODULE,
  IMAGE_ZOOM_MODULE,
  IMAGE_ZOOM_ROOT_MODULE,
  MINI_CART_MODULE,
  ORDER_APPROVAL_MODULE,
  ORDER_APPROVAL_ROOT_MODULE,
  ORDER_MODULE,
  ORDER_ROOT_MODULE,
  PERSONALIZATION_MODULE,
  PERSONALIZATION_ROOT_MODULE,
  PRODUCT_CONFIGURATOR_RULEBASED_CPQ_MODULE,
  PRODUCT_CONFIGURATOR_RULEBASED_CPQ_ROOT_MODULE,
  PRODUCT_CONFIGURATOR_RULEBASED_MODULE,
  PRODUCT_CONFIGURATOR_RULEBASED_ROOT_MODULE,
  PRODUCT_CONFIGURATOR_TEXTFIELD_MODULE,
  PRODUCT_CONFIGURATOR_TEXTFIELD_ROOT_MODULE,
  QUALTRICS_MODULE,
  QUALTRICS_ROOT_MODULE,
  QUICK_ORDER_MODULE,
  QUICK_ORDER_ROOT_MODULE,
  S4OM_MODULE,
  SAVED_CART_MODULE,
  SAVED_CART_ROOT_MODULE,
  SMARTEDIT_MODULE,
  SMARTEDIT_ROOT_MODULE,
  SPARTACUS_ASM,
  SPARTACUS_CART,
  SPARTACUS_CDC,
  SPARTACUS_CDS,
  SPARTACUS_CHECKOUT,
  SPARTACUS_DIGITAL_PAYMENTS,
  SPARTACUS_EPD_VISUALIZATION,
  SPARTACUS_ORDER,
  SPARTACUS_ORGANIZATION,
  SPARTACUS_PRODUCT,
  SPARTACUS_PRODUCT_CONFIGURATOR,
  SPARTACUS_QUALTRICS,
  SPARTACUS_S4OM,
  SPARTACUS_SMARTEDIT,
  SPARTACUS_STOREFINDER,
  SPARTACUS_TRACKING,
  SPARTACUS_USER,
  STOREFINDER_MODULE,
  STOREFINDER_ROOT_MODULE,
  TMS_AEP_MODULE,
  TMS_BASE_MODULE,
  TMS_GTM_MODULE,
  USER_ACCOUNT_MODULE,
  USER_ACCOUNT_ROOT_MODULE,
  USER_PROFILE_MODULE,
  USER_PROFILE_ROOT_MODULE,
  VARIANTS_MODULE,
  VARIANTS_ROOT_MODULE,
} from './libs-constants';

/**
 * Maps sub-features to their parent feature.
 * E.g. User feature contains sub-features: Account, Profile.
 */
export const packageSubFeaturesMapping: Record<string, string[]> = {
  /** Feature modules lib start */
  [SPARTACUS_ASM]: [CLI_ASM_FEATURE],
  [SPARTACUS_CART]: [
    CLI_CART_BASE_FEATURE,
    CLI_CART_WISHLIST_FEATURE,
    CLI_CART_IMPORT_EXPORT_FEATURE,
    CLI_CART_QUICK_ORDER_FEATURE,
    CLI_CART_SAVED_CART_FEATURE,
  ],
  [SPARTACUS_CHECKOUT]: [
    CLI_CHECKOUT_BASE_FEATURE,
    CLI_CHECKOUT_B2B_FEATURE,
    CLI_CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE,
  ],
  [SPARTACUS_ORDER]: [CLI_ORDER_FEATURE],
  [SPARTACUS_ORGANIZATION]: [
    CLI_ORGANIZATION_ADMINISTRATION_FEATURE,
    CLI_ORGANIZATION_ORDER_APPROVAL_FEATURE,
  ],
  [SPARTACUS_PRODUCT]: [
    CLI_PRODUCT_BULK_PRICING_FEATURE,
    CLI_PRODUCT_VARIANTS_FEATURE,
    CLI_PRODUCT_IMAGE_ZOOM_FEATURE,
  ],
  [SPARTACUS_PRODUCT_CONFIGURATOR]: [
    CLI_PRODUCT_CONFIGURATOR_VC_FEATURE,
    CLI_PRODUCT_CONFIGURATOR_TEXTFIELD_FEATURE,
    CLI_PRODUCT_CONFIGURATOR_CPQ_FEATURE,
  ],
  [SPARTACUS_QUALTRICS]: [CLI_QUALTRICS_FEATURE],
  [SPARTACUS_SMARTEDIT]: [CLI_SMARTEDIT_FEATURE],
  [SPARTACUS_STOREFINDER]: [CLI_STOREFINDER_FEATURE],
  [SPARTACUS_TRACKING]: [
    CLI_TRACKING_PERSONALIZATION_FEATURE,
    CLI_TRACKING_TMS_GTM_FEATURE,
    CLI_TRACKING_TMS_AEP_FEATURE,
  ],
  [SPARTACUS_USER]: [CLI_USER_ACCOUNT_FEATURE, CLI_USER_PROFILE_FEATURE],
  /** Feature modules lib end */

  /** Integration libs start */
  [SPARTACUS_CDC]: [CLI_CDC_FEATURE],
  [SPARTACUS_CDS]: [CLI_CDS_FEATURE],
  [SPARTACUS_DIGITAL_PAYMENTS]: [CLI_DIGITAL_PAYMENTS_FEATURE],
  [SPARTACUS_EPD_VISUALIZATION]: [CLI_EPD_VISUALIZATION_FEATURE],
  [SPARTACUS_S4OM]: [CLI_S4OM_FEATURE],
  /** Integration libs end */
};

/**
 * Maps the sub-feature's configurations to its parent feature.
 * E.g. User's sub-features contains name configurations for
 * Account and Profile: USER_ACCOUNT_MODULE, USER_ACCOUNT_ROOT_MODULE,
 * USER_PROFILE_MODULE, USER_PROFILE_ROOT_MODULE,
 */
export const packageFeatureConfigMapping: Record<string, string[]> = {
  /** Feature modules lib start */
  [SPARTACUS_ASM]: [ASM_MODULE, ASM_ROOT_MODULE],
  [SPARTACUS_CART]: [
    CART_BASE_MODULE,
    MINI_CART_MODULE,
    ADD_TO_CART_MODULE,
    CART_BASE_ROOT_MODULE,
    CART_WISHLIST_MODULE,
    ADD_TO_WISHLIST_MODULE,
    CART_WISHLIST_ROOT_MODULE,
    SAVED_CART_MODULE,
    SAVED_CART_ROOT_MODULE,
    QUICK_ORDER_MODULE,
    QUICK_ORDER_ROOT_MODULE,
    CART_IMPORT_EXPORT_MODULE,
    CART_IMPORT_EXPORT_ROOT_MODULE,
  ],
  [SPARTACUS_CHECKOUT]: [
    CHECKOUT_BASE_MODULE,
    CHECKOUT_BASE_ROOT_MODULE,
    CHECKOUT_B2B_MODULE,
    CHECKOUT_B2B_ROOT_MODULE,
    CHECKOUT_SCHEDULED_REPLENISHMENT_MODULE,
    CHECKOUT_SCHEDULED_REPLENISHMENT_ROOT_MODULE,
  ],
  [SPARTACUS_ORDER]: [ORDER_MODULE, ORDER_ROOT_MODULE],
  [SPARTACUS_ORGANIZATION]: [
    ADMINISTRATION_MODULE,
    ADMINISTRATION_ROOT_MODULE,
    ORDER_APPROVAL_MODULE,
    ORDER_APPROVAL_ROOT_MODULE,
  ],
  [SPARTACUS_PRODUCT]: [
    BULK_PRICING_MODULE,
    BULK_PRICING_ROOT_MODULE,
    VARIANTS_MODULE,
    VARIANTS_ROOT_MODULE,
    IMAGE_ZOOM_MODULE,
    IMAGE_ZOOM_ROOT_MODULE,
  ],
  [SPARTACUS_PRODUCT_CONFIGURATOR]: [
    PRODUCT_CONFIGURATOR_TEXTFIELD_MODULE,
    PRODUCT_CONFIGURATOR_TEXTFIELD_ROOT_MODULE,
    PRODUCT_CONFIGURATOR_RULEBASED_MODULE,
    PRODUCT_CONFIGURATOR_RULEBASED_ROOT_MODULE,
    PRODUCT_CONFIGURATOR_RULEBASED_CPQ_MODULE,
    PRODUCT_CONFIGURATOR_RULEBASED_CPQ_ROOT_MODULE,
  ],
  [SPARTACUS_QUALTRICS]: [QUALTRICS_MODULE, QUALTRICS_ROOT_MODULE],
  [SPARTACUS_SMARTEDIT]: [SMARTEDIT_MODULE, SMARTEDIT_ROOT_MODULE],
  [SPARTACUS_STOREFINDER]: [STOREFINDER_MODULE, STOREFINDER_ROOT_MODULE],
  [SPARTACUS_TRACKING]: [
    TMS_BASE_MODULE,
    TMS_GTM_MODULE,
    TMS_AEP_MODULE,
    PERSONALIZATION_MODULE,
    PERSONALIZATION_ROOT_MODULE,
  ],
  [SPARTACUS_USER]: [
    USER_ACCOUNT_MODULE,
    USER_ACCOUNT_ROOT_MODULE,
    USER_PROFILE_MODULE,
    USER_PROFILE_ROOT_MODULE,
  ],
  /** Feature libs end */

  /** Integration libs start */
  [SPARTACUS_CDC]: [CDC_MODULE, CDC_ROOT_MODULE],
  [SPARTACUS_CDS]: [CDS_MODULE],
  [SPARTACUS_DIGITAL_PAYMENTS]: [DIGITAL_PAYMENTS_MODULE],
  [SPARTACUS_EPD_VISUALIZATION]: [
    EPD_VISUALIZATION_MODULE,
    EPD_VISUALIZATION_ROOT_MODULE,
  ],
  [SPARTACUS_S4OM]: [S4OM_MODULE],
  /** Integration libs end */
};
