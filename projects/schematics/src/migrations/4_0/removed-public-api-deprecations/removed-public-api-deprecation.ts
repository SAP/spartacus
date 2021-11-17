import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import {
  ANONYMOUS_CONSENT_LAUNCH_DIALOG_SERVICE,
  ASM_MODULE,
  B2B_STOREFRONT_MODULE,
  B2C_LAYOUT_CONFIG,
  B2C_STOREFRONT_MODULE,
  CART_PAGE_META_RESOLVER,
  CLOSE_ACCOUNT_MODAL_COMPONENT,
  CLOSE_ACCOUNT_MODULE,
  CMS_FEATURES_SERVICE,
  CMS_LIB_MODULE,
  CONFIGURATOR_MESSAGE_CONFIG,
  CONTENT_PAGE_META_RESOLVER,
  DEFAULT_LOCAL_STORAGE_KEY,
  DEFAULT_SESSION_STORAGE_KEY,
  DEFAULT_STATE_CONFIG,
  EMAIL_ACTIONS,
  EVENTS_MODULE,
  EXTERNAL_JS_FILE_LOADER,
  FEATURE_MODULES_SERVICE,
  FORGOTTEN_PASSWORD_TRANSLATION_CHUNK,
  FORGOT_PASSWORD_COMPONENT,
  FORGOT_PASSWORD_EMAIL_ACTION,
  FORGOT_PASSWORD_MODULE,
  LOGIN_COMPONENT,
  LOGIN_FORM_COMPONENT,
  LOGIN_FORM_MODULE,
  LOGIN_FORM_TRANSLATION_CHUNK,
  LOGIN_MODULE,
  LOGIN_REGISTER_MODULE,
  MAIN_MODULE,
  MESSAGE_CONFIG,
  MINI_LOGIN_TRANSLATION_CHUNK,
  OCC_CONFIG_LOADER_MODULE,
  OCC_CONFIG_LOADER_SERVICE,
  OCC_ENDPOINTS,
  OCC_LOADED_CONFIG,
  OCC_LOADED_CONFIG_CONVERTER,
  OCC_MODULE,
  OCC_SITES_CONFIG_LOADER,
  OCC_USER_ACCOUNT_ADAPTER,
  OCC_USER_ADAPTER,
  OCC_USER_PROFILE_ADAPTER,
  PAGE_EVENT_BUILDER,
  PAGE_EVENT_MODULE,
  PERSONALIZATION_MODULE,
  PRODUCT_VARIANTS_MODULE,
  PRODUCT_VARIANT_COMPONENT,
  PRODUCT_VARIANT_GUARD,
  PRODUCT_VARIANT_STYLE_ICONS_COMPONENT,
  PRODUCT_VARIANT_STYLE_ICONS_MODULE,
  REGISTER_COMPONENT,
  REGISTER_COMPONENT_MODULE,
  REGISTER_TRANSLATION_CHUNK,
  REPLENISHMENT_ORDER_CANCELLATION_LAUNCH_DIALOG_SERVICE,
  RESET_PASSWORD_ACTION,
  RESET_PASSWORD_COMPONENT,
  RESET_PASSWORD_FORM_COMPONENT,
  RESET_PASSWORD_MODULE,
  ROUTE_BACK_ACTION,
  ROUTE_FORWARD_ACTION,
  ROUTE_GO_ACTION,
  ROUTE_GO_BY_URL_ACTION,
  ROUTING_ACTIONS,
  ROUTING_SERVICE,
  SAVED_CART_FORM_LAUNCH_DIALOG_SERVICE,
  SMART_EDIT_MODULE,
  SORT_CODE,
  SPARTACUS_CART_SAVED_CART_COMPONENTS,
  SPARTACUS_CORE,
  SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
  SPARTACUS_PRODUCT_VARIANTS_COMPONENTS,
  SPARTACUS_SETUP,
  SPARTACUS_STOREFINDER,
  SPARTACUS_STOREFRONTLIB,
  SPARTACUS_USER,
  SPARTACUS_USER_ACCOUNT,
  SPARTACUS_USER_ACCOUNT_COMPONENTS,
  SPARTACUS_USER_ACCOUNT_CORE,
  SPARTACUS_USER_ACCOUNT_OCC,
  SPARTACUS_USER_PROFILE,
  SPARTACUS_USER_PROFILE_COMPONENTS,
  SPARTACUS_USER_PROFILE_CORE,
  SPARTACUS_USER_PROFILE_OCC,
  STOREFRONT_CONFIG,
  STOREFRONT_FOUNDATION_MODULE,
  STOREFRONT_MODULE,
  STORE_DATA_SERVICE,
  TABLE_HEADER,
  TITLES_ENDPOINT,
  TITLE_NORMALIZER,
  TRANSLATION_CHUNKS_CONFIG,
  UPDATE_EMAIL_COMPONENT,
  UPDATE_EMAIL_FORM_COMPONENT,
  UPDATE_EMAIL_FORM_TRANSLATION_CHUNK,
  UPDATE_EMAIL_MODULE,
  UPDATE_PASSWORD_ACTION,
  UPDATE_PASSWORD_COMPONENT,
  UPDATE_PASSWORD_FORM_COMPONENT,
  UPDATE_PASSWORD_MODULE,
  UPDATE_PROFILE_COMPONENT,
  UPDATE_PROFILE_MODULE,
  USER_ACCOUNT_ADAPTER,
  USER_ACCOUNT_CONNECTOR,
  USER_ACCOUNT_MODULE,
  USER_ACCOUNT_NORMALIZER,
  USER_ACCOUNT_SERIALIZER,
  USER_ACTIONS,
  USER_ADAPTER,
  USER_CLOSE_ACCOUNT_ENDPOINT,
  USER_COMPONENT_MODULE,
  USER_CONNECTOR,
  USER_DETAILS_ACTION,
  USER_DETAILS_STATE_INTERFACE,
  USER_ENDPOINT,
  USER_FORGOT_PASSWORD_ENDPOINT,
  USER_MODULE,
  USER_NORMALIZER,
  USER_PROFILE_ADAPTER,
  USER_PROFILE_CONNECTOR,
  USER_PROFILE_FACADE_TRANSITIONAL_TOKEN,
  USER_PROFILE_MODULE,
  USER_PROFILE_NORMALIZER,
  USER_PROFILE_SERIALIZER,
  USER_REGISTER_ENDPOINT,
  USER_REGISTER_FACADE_TRANSITIONAL_TOKEN,
  USER_RESET_PASSWORD_ENDPOINT,
  USER_SERIALIZER,
  USER_SERVICE,
  USER_SIGN_UP_INTERFACE,
  USER_SIGN_UP_SERIALIZER,
  USER_STATE_INTERFACE,
  USER_UPDATE_LOGIN_ID_ENDPOINT,
  USER_UPDATE_PASSWORD_ENDPOINT,
  USER_UPDATE_PROFILE_ENDPOINT,
  VARIANT_COLOR_SELECTOR_COMPONENT,
  VARIANT_COLOR_SELECTOR_MODULE,
  VARIANT_SIZE_SELECTOR_COMPONENT,
  VARIANT_SIZE_SELECTOR_MODULE,
  VARIANT_STYLE_SELECTOR_COMPONENT,
  VARIANT_STYLE_SELECTOR_MODULE,
  VIEW_CONFIG_MODULE,
} from '../../../shared/constants';
import { DeprecatedNode } from '../../../shared/utils/file-utils';
import { removedPublicApiDeprecation } from '../../mechanism/removed-public-api-deprecations/removed-public-api-deprecation';

export const REMOVED_PUBLIC_API_DATA: DeprecatedNode[] = [
  //projects/core/src/occ/config-loader/occ-config-loader.module.ts
  {
    node: OCC_CONFIG_LOADER_MODULE,
    importPath: SPARTACUS_CORE,
    comment: `'${OCC_CONFIG_LOADER_MODULE} has been removed and is no longer part of the public API. Please use 'SiteContextConfigInitializer' and 'I18nConfigInitializer' instead`,
  },
  //projects/core/src/occ/config-loader/occ-config-loader.service.ts
  {
    node: OCC_CONFIG_LOADER_SERVICE,
    importPath: SPARTACUS_CORE,
    comment: `'${OCC_CONFIG_LOADER_SERVICE} has been removed and is no longer part of the public API. Please use 'SiteContextConfigInitializer' and 'I18nConfigInitializer' instead`,
  },
  //projects/core/src/occ/config-loader/occ-loaded-config-converter.ts
  {
    node: OCC_LOADED_CONFIG_CONVERTER,
    importPath: SPARTACUS_CORE,
    comment: `'${OCC_LOADED_CONFIG_CONVERTER} has been removed and is no longer part of the public API.  Please use 'SiteContextConfigInitializer' and 'I18nConfigInitializer' instead`,
  },
  //projects/core/src/occ/config-loader/occ-loaded-config.ts
  {
    node: OCC_LOADED_CONFIG,
    importPath: SPARTACUS_CORE,
    comment: `'${OCC_LOADED_CONFIG} has been removed and is no longer part of the public API. Please use 'SiteContextConfigInitializer' and 'I18nConfigInitializer' instead`,
  },
  //projects/core/src/occ/config-loader/occ-sites-config-loader.ts
  {
    node: OCC_SITES_CONFIG_LOADER,
    importPath: SPARTACUS_CORE,
    comment: `'${OCC_SITES_CONFIG_LOADER} has been removed and is no longer part of the public API. Please use 'SiteContextConfigInitializer' and 'I18nConfigInitializer' instead`,
  },
  {
    node: B2C_STOREFRONT_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `${B2C_STOREFRONT_MODULE} was removed. Check "Migrating to new, reference app structure" section in the migration docs on how to replace it.`,
  },
  {
    node: B2B_STOREFRONT_MODULE,
    importPath: SPARTACUS_SETUP,
    comment: `${B2B_STOREFRONT_MODULE} was removed. Check "Migrating to new, reference app structure" section in the migration docs on how to replace it.`,
  },
  {
    node: STOREFRONT_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `${STOREFRONT_MODULE} was removed. Check "Migrating to new, reference app structure" section in the migration docs on how to replace it.`,
  },
  {
    node: CMS_LIB_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `${CMS_LIB_MODULE} was removed. Check "Migrating to new, reference app structure" section in the migration docs on how to replace it.`,
  },
  {
    node: MAIN_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `${MAIN_MODULE} was removed. Check "Migrating to new, reference app structure" section in the migration docs on how to replace it.`,
  },
  {
    node: STOREFRONT_FOUNDATION_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `${STOREFRONT_FOUNDATION_MODULE} was removed. Check "Migrating to new, reference app structure" section in the migration docs on how to replace it.`,
  },
  {
    node: VIEW_CONFIG_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `${VIEW_CONFIG_MODULE} was removed as it was only providing empty config, which is not needed.`,
  },
  {
    node: OCC_MODULE,
    importPath: SPARTACUS_CORE,
    comment: `${OCC_MODULE} was removed. Check "Migrating to new, reference app structure" section in the migration docs on how to replace it.`,
  },
  {
    node: EVENTS_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `${EVENTS_MODULE} was removed. Check "Migrating to new, reference app structure" section in the migration docs on how to replace it.`,
  },
  // projects/core/src/asm/asm.module.ts
  {
    node: ASM_MODULE,
    importPath: SPARTACUS_CORE,
    comment: `'${ASM_MODULE}' was moved to @spartacus/asm/core. To benefit from lazy loading it by default, consider removing the module import and running the command 'ng add @spartacus/asm'.`,
  },
  {
    node: SAVED_CART_FORM_LAUNCH_DIALOG_SERVICE,
    importPath: SPARTACUS_CART_SAVED_CART_COMPONENTS,
    comment: `'${SAVED_CART_FORM_LAUNCH_DIALOG_SERVICE}' has been removed.' 'openDialog' method has been moved to 'LaunchDialogService'.`,
  },
  {
    node: ANONYMOUS_CONSENT_LAUNCH_DIALOG_SERVICE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${ANONYMOUS_CONSENT_LAUNCH_DIALOG_SERVICE}' has been removed.' 'openDialog' method has been moved to 'LaunchDialogService'.`,
  },
  {
    node: REPLENISHMENT_ORDER_CANCELLATION_LAUNCH_DIALOG_SERVICE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${REPLENISHMENT_ORDER_CANCELLATION_LAUNCH_DIALOG_SERVICE}' has been removed.' 'openDialog' method has been moved to 'LaunchDialogService'.`,
  },
  // projects/core/src/smart-edit/smart-edit.module.ts
  {
    node: SMART_EDIT_MODULE,
    importPath: SPARTACUS_CORE,
    comment: `'${SMART_EDIT_MODULE}' was removed. Use @spartacus/smartedit instead. To benefit from lazy loading it by default, consider removing the module import and running the command 'ng add @spartacus/smartedit'.`,
  },
  // projects/core/src/personalization/personalization.module.ts
  {
    node: PERSONALIZATION_MODULE,
    importPath: SPARTACUS_CORE,
    comment: `'${PERSONALIZATION_MODULE}' was removed. Use @spartacus/tracking/personalization instead. To benefit from lazy loading it by default, consider removing the module import and running the command 'ng add @spartacus/tracking --features=Personalization'.`,
  },
  // projects/storefrontlib/cms-components/product/product-variants/product-variants.module.ts
  {
    node: PRODUCT_VARIANTS_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${PRODUCT_VARIANTS_MODULE}' was removed from @spartacus/storefront. Use @spartacus/product/variants feature-library instead. To benefit from lazy loading it by default, consider removing the module import and running the command 'ng add @spartacus/product --features=Product-Variants'.`,
  },
  // projects/storefrontlib/cms-components/product/product-variants/product-variants.component.ts
  {
    node: PRODUCT_VARIANT_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${PRODUCT_VARIANT_COMPONENT}' was removed from @spartacus/storefront. Use ProductVariantsContainerComponent from @spartacus/product/variants/components as a replacement.`,
  },
  // projects/storefrontlib/cms-components/product/product-variants/variant-color-selector/variant-color-selector.component.ts
  {
    node: VARIANT_COLOR_SELECTOR_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${VARIANT_COLOR_SELECTOR_COMPONENT}' was removed from @spartacus/storefront. Use ProductVariantColorSelectorComponent from @spartacus/product/variants/components as a replacement.`,
  },
  // projects/storefrontlib/cms-components/product/product-variants/variant-color-selector/variant-color-selector.module.ts
  {
    node: VARIANT_COLOR_SELECTOR_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${VARIANT_COLOR_SELECTOR_MODULE}' was removed from @spartacus/storefront. Use ProductVariantColorSelectorModule from @spartacus/product/variants/components as a replacement.`,
  },
  // projects/storefrontlib/cms-components/product/product-variants/variant-size-selector/variant-size-selector.component.ts
  {
    node: VARIANT_SIZE_SELECTOR_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${VARIANT_SIZE_SELECTOR_COMPONENT}' was removed from @spartacus/storefront. Use ProductVariantSizeSelectorComponent from @spartacus/product/variants/components as a replacement.`,
  },
  // projects/storefrontlib/cms-components/product/product-variants/variant-size-selector/variant-size-selector.module.ts
  {
    node: VARIANT_SIZE_SELECTOR_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${VARIANT_SIZE_SELECTOR_MODULE}' was removed from @spartacus/storefront. Use ProductVariantSizeSelectorModule from @spartacus/product/variants/components as a replacement.`,
  },
  // projects/storefrontlib/cms-components/product/product-variants/variant-style-selector/variant-style-selector.component.ts
  {
    node: VARIANT_STYLE_SELECTOR_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${VARIANT_STYLE_SELECTOR_COMPONENT}' was removed from @spartacus/storefront. Use ProductVariantStyleSelectorComponent from @spartacus/product/variants/components as a replacement.`,
  },
  // projects/storefrontlib/cms-components/product/product-variants/variant-style-selector/variant-style-selector.module.ts
  {
    node: VARIANT_STYLE_SELECTOR_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${VARIANT_STYLE_SELECTOR_MODULE}' was removed from @spartacus/storefront. Use ProductVariantStyleSelectorModule from @spartacus/product/variants/components as a replacement.`,
  },
  // projects/storefrontlib/cms-components/product/product-variants/guards/product-variant.guard.ts
  {
    node: PRODUCT_VARIANT_GUARD,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${PRODUCT_VARIANT_GUARD}' was removed from @spartacus/storefront. Use ProductVariantsGuard from @spartacus/product/variants/components instead. Additionally method: findVariant was renamed to findPurchasableProductCode.`,
  },
  {
    node: PRODUCT_VARIANT_STYLE_ICONS_MODULE,
    importPath: SPARTACUS_PRODUCT_VARIANTS_COMPONENTS,
    comment: `'${PRODUCT_VARIANT_STYLE_ICONS_MODULE}' was removed from ${SPARTACUS_PRODUCT_VARIANTS_COMPONENTS}. Use @spartacus/product/variants/root instead.`,
  },
  {
    node: PRODUCT_VARIANT_STYLE_ICONS_COMPONENT,
    importPath: SPARTACUS_PRODUCT_VARIANTS_COMPONENTS,
    comment: `'${PRODUCT_VARIANT_STYLE_ICONS_COMPONENT}' was removed from ${SPARTACUS_PRODUCT_VARIANTS_COMPONENTS}. Use @spartacus/product/variants/root instead.`,
  },
  {
    node: DEFAULT_STATE_CONFIG,
    importPath: SPARTACUS_CORE,
    comment: `'${DEFAULT_STATE_CONFIG}' was removed with the whole storage sync mechanism. For syncing your data to and from browser storage use StatePersistenceService.`,
  },
  {
    node: DEFAULT_LOCAL_STORAGE_KEY,
    importPath: SPARTACUS_CORE,
    comment: `'${DEFAULT_LOCAL_STORAGE_KEY}' was removed with the whole storage sync mechanism. For syncing your data to and from browser storage use StatePersistenceService.`,
  },
  {
    node: DEFAULT_SESSION_STORAGE_KEY,
    importPath: SPARTACUS_CORE,
    comment: `'${DEFAULT_SESSION_STORAGE_KEY}' was removed with the whole storage sync mechanism. For syncing your data to and from browser storage use StatePersistenceService.`,
  },
  {
    node: CART_PAGE_META_RESOLVER,
    importPath: SPARTACUS_CORE,
    comment: `'${CART_PAGE_META_RESOLVER}' was removed since all data is now data driven by CMS page data and is resolved by the ${CONTENT_PAGE_META_RESOLVER}`,
  },
  {
    node: FEATURE_MODULES_SERVICE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${FEATURE_MODULES_SERVICE}' was removed. Use '${CMS_FEATURES_SERVICE}' instead.`,
  },
  // projects/assets/src/translations/translation-chunks-config.ts
  {
    node: TRANSLATION_CHUNKS_CONFIG,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${TRANSLATION_CHUNKS_CONFIG}' - Following translation chunks '${MINI_LOGIN_TRANSLATION_CHUNK}', '${UPDATE_EMAIL_FORM_TRANSLATION_CHUNK}', '${FORGOTTEN_PASSWORD_TRANSLATION_CHUNK}', '${LOGIN_FORM_TRANSLATION_CHUNK}', '${REGISTER_TRANSLATION_CHUNK}' were moved to ${SPARTACUS_USER}.`,
  },
  // projects/storefrontlib/cms-components/cms-lib.module.ts
  {
    node: CMS_LIB_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${CMS_LIB_MODULE}' - Following module imports '${CLOSE_ACCOUNT_MODULE}', '${FORGOT_PASSWORD_MODULE}', '${RESET_PASSWORD_MODULE}', '${UPDATE_EMAIL_MODULE}', '${UPDATE_PASSWORD_MODULE}', '${UPDATE_PROFILE_MODULE}', '${USER_COMPONENT_MODULE}' were removed. Those modules are now part of ${SPARTACUS_USER}.`,
  },
  // projects/storefrontlib/cms-components/user/user.module.ts
  {
    node: USER_COMPONENT_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${USER_COMPONENT_MODULE}' - Following module imports '${LOGIN_MODULE}', '${LOGIN_FORM_MODULE}', '${LOGIN_REGISTER_MODULE}', '${REGISTER_COMPONENT_MODULE}' were removed. Those modules are now part of ${SPARTACUS_USER}.`,
  },
  // projects/storefrontlib/cms-components/myaccount/close-account/components/close-account-modal/close-account-modal.component.ts
  {
    node: CLOSE_ACCOUNT_MODAL_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${CLOSE_ACCOUNT_MODAL_COMPONENT}' was moved to ${SPARTACUS_USER_PROFILE_COMPONENTS}. Also there were small changes in component's logic. For more details please look into 4.0 migration documentation.`,
  },
  // projects/storefrontlib/cms-components/myaccount/forgot-password/forgot-password.component.ts
  {
    node: FORGOT_PASSWORD_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${FORGOT_PASSWORD_COMPONENT}' was moved to ${SPARTACUS_USER_PROFILE_COMPONENTS}. Logic for this component was changed and introduced in new 'ForgotPasswordService'. For more details please look into 4.0 migration documentation.`,
  },
  // projects/storefrontlib/cms-components/user/login/login.component.ts
  {
    node: LOGIN_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${LOGIN_COMPONENT}' was moved to '${SPARTACUS_USER_ACCOUNT_COMPONENTS}'. Logic for this component was changed. For more details please look into 4.0 migration documentation.`,
  },
  // projects/storefrontlib/cms-components/user/login-form/login-form.component.ts
  {
    node: LOGIN_FORM_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${LOGIN_FORM_COMPONENT}' was moved to '${SPARTACUS_USER_ACCOUNT_COMPONENTS}'. Logic for this component was changed. For more details please look into 4.0 migration documentation.`,
  },
  // projects/storefrontlib/cms-components/user/register/register.component.ts
  {
    node: REGISTER_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${REGISTER_COMPONENT}' was moved to '${SPARTACUS_USER_PROFILE_COMPONENTS}'. Logic for this component was changed. For more details please look into 4.0 migration documentation.`,
  },
  // projects/storefrontlib/cms-components/myaccount/reset-password/reset-password-form.component.ts
  {
    node: RESET_PASSWORD_FORM_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${RESET_PASSWORD_FORM_COMPONENT}' was renamed to '${RESET_PASSWORD_COMPONENT}' and now it can be used from ${SPARTACUS_USER_PROFILE_COMPONENTS}. Also logic for this component was changed. For more details please look into 4.0 migration documentation.`,
  },
  // projects/storefrontlib/cms-components/myaccount/update-email/update-email.component.ts
  {
    node: UPDATE_EMAIL_FORM_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${UPDATE_EMAIL_FORM_COMPONENT}' was removed. For replacement use '${UPDATE_EMAIL_COMPONENT}' from ${SPARTACUS_USER_PROFILE_COMPONENTS}.`,
  },
  // projects/storefrontlib/cms-components/myaccount/update-email/update-email-form/update-email-form.component.ts
  {
    node: UPDATE_EMAIL_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${UPDATE_EMAIL_COMPONENT}' was moved to ${SPARTACUS_USER_PROFILE_COMPONENTS}. Logic for this component was changed. For more details please look into 4.0 migration documentation.`,
  },
  // projects/storefrontlib/cms-components/myaccount/update-password/components/update-password-form/update-password-form.component.ts
  {
    node: UPDATE_PASSWORD_FORM_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${UPDATE_PASSWORD_FORM_COMPONENT}' was removed. For replacement use '${UPDATE_PASSWORD_COMPONENT}' from ${SPARTACUS_USER_PROFILE_COMPONENTS}.`,
  },
  // projects/storefrontlib/cms-components/myaccount/update-password/components/update-password/update-password.component.ts
  {
    node: UPDATE_PASSWORD_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${UPDATE_PASSWORD_COMPONENT}' was moved to ${SPARTACUS_USER_PROFILE_COMPONENTS}. Logic for this component was changed. For more details please look into 4.0 migration documentation.`,
  },
  // projects/storefrontlib/cms-components/myaccount/update-profile/update-profile.component.ts
  {
    node: UPDATE_PROFILE_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${UPDATE_PROFILE_COMPONENT}' was moved to ${SPARTACUS_USER_PROFILE_COMPONENTS}. Logic for this component was changed. For more details please look into 4.0 migration documentation.`,
  },
  // projects/core/src/routing/store/actions/router.action.ts
  {
    node: ROUTING_ACTIONS,
    importPath: SPARTACUS_CORE,
    comment: `The following ngrx '${ROUTING_ACTIONS}' have been removed: '${ROUTE_GO_ACTION}', '${ROUTE_GO_BY_URL_ACTION}', '${ROUTE_BACK_ACTION}' and '${ROUTE_FORWARD_ACTION}'. Please use instead the methods of the ${ROUTING_SERVICE}, respectively: 'go()', 'goByUrl()', 'back()' and 'forward()'.`,
  },
  {
    node: PAGE_EVENT_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${PAGE_EVENT_MODULE}' was removed, please use 'NavigationEventModule' from '${SPARTACUS_STOREFRONTLIB}' instead.`,
  },
  {
    node: PAGE_EVENT_BUILDER,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${PAGE_EVENT_BUILDER}' was removed, please use 'NavigationEventBuilder' from '${SPARTACUS_STOREFRONTLIB}' instead.`,
  },
  // projects/storefrontlib/storefront-config.ts
  {
    node: STOREFRONT_CONFIG,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${STOREFRONT_CONFIG}' type purpose is now covered by 'Config' interface. Replace usage of 'StorefrontConfig' with 'Config'.`,
  },
  // feature-libs/storefinder/core/facade/store-data.service.ts
  {
    node: STORE_DATA_SERVICE,
    importPath: SPARTACUS_STOREFINDER,
    comment: `'${STORE_DATA_SERVICE}' was removed, please use 'StoreFinderService' from '${SPARTACUS_STOREFINDER} instead.`,
  },
  // projects/core/src/occ/adapters/user/occ-user.adapter.ts
  {
    node: OCC_USER_ADAPTER,
    importPath: SPARTACUS_CORE,
    comment: `'${OCC_USER_ADAPTER}' was removed, please use '${OCC_USER_ACCOUNT_ADAPTER}' from '${SPARTACUS_USER_ACCOUNT_OCC}' and '${OCC_USER_PROFILE_ADAPTER}' from '${SPARTACUS_USER_PROFILE_OCC}'. Also there was method name change, for more details please look into 4.0 migration documentation.`,
  },
  // projects/core/src/occ/occ-models/occ-endpoints.model.ts
  {
    node: OCC_ENDPOINTS,
    importPath: SPARTACUS_CORE,
    comment: `'${OCC_ENDPOINTS} - Following endpoints '${TITLES_ENDPOINT}', '${USER_ENDPOINT}', '${USER_REGISTER_ENDPOINT}', '${USER_FORGOT_PASSWORD_ENDPOINT}', '${USER_RESET_PASSWORD_ENDPOINT}', '${USER_UPDATE_LOGIN_ID_ENDPOINT}', '${USER_UPDATE_PASSWORD_ENDPOINT}' , '${USER_UPDATE_PROFILE_ENDPOINT}' , '${USER_CLOSE_ACCOUNT_ENDPOINT}' were removed. For replacement please use following endpoints from '${SPARTACUS_USER_ACCOUNT}' and '${SPARTACUS_USER_PROFILE}'.`,
  },
  // projects/core/src/user/connectors/user/converters.ts
  {
    node: TITLE_NORMALIZER,
    importPath: SPARTACUS_CORE,
    comment: `'${TITLE_NORMALIZER}' was moved to '${SPARTACUS_USER_PROFILE}'.`,
  },
  // projects/core/src/user/connectors/user/converters.ts
  {
    node: USER_SIGN_UP_SERIALIZER,
    importPath: SPARTACUS_CORE,
    comment: `'${USER_SIGN_UP_SERIALIZER}' was moved to '${SPARTACUS_USER_PROFILE}'.`,
  },
  // projects/core/src/user/connectors/user/converters.ts
  {
    node: USER_SERIALIZER,
    importPath: SPARTACUS_CORE,
    comment: `'${USER_SERIALIZER}' was removed. For replacement please use '${USER_ACCOUNT_SERIALIZER}' from '${SPARTACUS_USER_ACCOUNT}' and '${USER_PROFILE_SERIALIZER}' from '${SPARTACUS_USER_PROFILE}'.`,
  },
  // projects/core/src/user/connectors/user/converters.ts
  {
    node: USER_NORMALIZER,
    importPath: SPARTACUS_CORE,
    comment: `'${USER_NORMALIZER}' was removed. For replacement please use '${USER_ACCOUNT_NORMALIZER}' from '${SPARTACUS_USER_ACCOUNT}' and '${USER_PROFILE_NORMALIZER}' from '${SPARTACUS_USER_PROFILE}'.`,
  },
  // projects/core/src/user/connectors/user/user.adapter.ts
  {
    node: USER_ADAPTER,
    importPath: SPARTACUS_CORE,
    comment: `'${USER_ADAPTER}' was removed, please use '${USER_ACCOUNT_ADAPTER}' from '${SPARTACUS_USER_ACCOUNT_CORE}' and '${USER_PROFILE_ADAPTER}' from '${SPARTACUS_USER_PROFILE_CORE}'. Also there was method name change, for more details please look into 4.0 migration documentation.`,
  },
  // projects/core/src/user/connectors/user/user.connector.ts
  {
    node: USER_CONNECTOR,
    importPath: SPARTACUS_CORE,
    comment: `'${USER_CONNECTOR}' was removed, please use '${USER_ACCOUNT_CONNECTOR}' from '${SPARTACUS_USER_ACCOUNT_CORE}' and '${USER_PROFILE_CONNECTOR}' from '${SPARTACUS_USER_PROFILE_CORE}'. Also there was slighly change in method logic, for more details please look into 4.0 migration documentation.`,
  },
  // projects/core/src/user/facade/user.service.ts
  {
    node: USER_SERVICE,
    importPath: SPARTACUS_CORE,
    comment: `Many methods from '${USER_SERVICE}' were removed, for more details please look into 4.0 migration documentation.`,
  },
  // projects/core/src/model/misc.model.ts
  {
    node: USER_SIGN_UP_INTERFACE,
    importPath: SPARTACUS_CORE,
    comment: `'${USER_SIGN_UP_INTERFACE}' was removed, for replacement please use '${USER_SIGN_UP_INTERFACE}' from '${SPARTACUS_USER_PROFILE}'.`,
  },
  // projects/core/src/user/store/actions/index.ts
  {
    node: USER_ACTIONS,
    importPath: SPARTACUS_CORE,
    comment: `${USER_ACTIONS} - Following actions '${FORGOT_PASSWORD_EMAIL_ACTION}', '${RESET_PASSWORD_ACTION}', '${EMAIL_ACTIONS}', '${UPDATE_PASSWORD_ACTION}', '${USER_DETAILS_ACTION}' were removed. Logic was moved to '${SPARTACUS_USER}'.`,
  },
  // projects/core/src/user/store/user-state.ts
  {
    node: USER_DETAILS_STATE_INTERFACE,
    importPath: SPARTACUS_CORE,
    comment: `'${USER_DETAILS_STATE_INTERFACE}' was removed.`,
  },
  // projects/core/src/user/store/user-state.ts
  {
    node: USER_STATE_INTERFACE,
    importPath: SPARTACUS_CORE,
    comment: `Properties 'account' 'titles', and 'resetPassword' were removed from '${USER_DETAILS_STATE_INTERFACE}' interface.`,
  },
  // projects/core/src/user/user-transitional-tokens.ts
  {
    node: USER_PROFILE_FACADE_TRANSITIONAL_TOKEN,
    importPath: SPARTACUS_CORE,
    comment: `Abstract methods 'get', 'update', 'close' were removed from '${USER_PROFILE_FACADE_TRANSITIONAL_TOKEN}'.`,
  },
  // projects/core/src/user/user-transitional-tokens.ts
  {
    node: USER_REGISTER_FACADE_TRANSITIONAL_TOKEN,
    importPath: SPARTACUS_CORE,
    comment: `'${USER_REGISTER_FACADE_TRANSITIONAL_TOKEN}' class was removed.`,
  },
  // projects/core/src/user/user.module.ts
  {
    node: USER_MODULE,
    importPath: SPARTACUS_CORE,
    comment: `'${USER_MODULE}' was removed. Main modules currently are '${USER_ACCOUNT_MODULE}' in '${SPARTACUS_USER_ACCOUNT}' and '${USER_PROFILE_MODULE}' in '${SPARTACUS_USER_PROFILE}'. To benefit from lazy loading it by default, consider removing the module import and running the command 'ng add @spartacus/user'.`,
  },
  // projects/storefrontlib/shared/components/table/table.model.ts
  {
    node: TABLE_HEADER,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${SORT_CODE}' was removed from interface 'TableHeader'`,
  },
  // feature-libs/product-configurator/rulebased/components/config/message-config.ts
  {
    node: MESSAGE_CONFIG,
    importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
    comment: `'${MESSAGE_CONFIG}' was removed. For replacement use '${CONFIGURATOR_MESSAGE_CONFIG}' from ${SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED}.`,
  },
  // projects/core/src/util/external-js-file-loader/external-js-file-loader.service.ts
  {
    node: EXTERNAL_JS_FILE_LOADER,
    importPath: SPARTACUS_CORE,
    comment: `'${EXTERNAL_JS_FILE_LOADER}' was removed, please use 'ScriptLoader' from '${SPARTACUS_CORE} instead.`,
  },
  // projects/storefrontlib/recipes/config/layout-config.ts#b2cLayoutConfig
  {
    node: B2C_LAYOUT_CONFIG,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${B2C_LAYOUT_CONFIG}' was removed from '${SPARTACUS_STOREFRONTLIB}', please use corresponding feature-lib specific layout.`,
  },
];

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return removedPublicApiDeprecation(tree, context, REMOVED_PUBLIC_API_DATA);
  };
}
