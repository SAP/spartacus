import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import {
  ANONYMOUS_CONSENT_LAUNCH_DIALOG_SERVICE,
  ASM_ADAPTER,
  ASM_AUTH_HTTP_HEADER_SERVICE,
  ASM_AUTH_SERVICE,
  ASM_AUTH_STORAGE_SERVICE,
  ASM_CONFIG,
  ASM_CONNECTOR,
  ASM_FEATURE,
  ASM_MODULE,
  ASM_SERVICE,
  ASM_STATE,
  ASM_STATE_PERSISTENCE_SERVICE,
  ASM_UI,
  ASM_UI_ACTION,
  ASM_UI_UPDATE,
  ASM_UI_UPDATE_CLASS,
  CS_AGENT_AUTH_SERVICE,
  CUSTOMER_ACTION,
  CUSTOMER_SEARCH,
  CUSTOMER_SEARCH_CLASS,
  CUSTOMER_SEARCH_DATA,
  CUSTOMER_SEARCH_FAIL,
  CUSTOMER_SEARCH_FAIL_CLASS,
  CUSTOMER_SEARCH_OPTIONS,
  CUSTOMER_SEARCH_PAGE,
  CUSTOMER_SEARCH_PAGE_NORMALIZER,
  CUSTOMER_SEARCH_RESET,
  CUSTOMER_SEARCH_RESET_CLASS,
  CUSTOMER_SEARCH_SUCCESS,
  CUSTOMER_SEARCH_SUCCESS_CLASS,
  DEFAULT_LOCAL_STORAGE_KEY,
  DEFAULT_SESSION_STORAGE_KEY,
  DEFAULT_STATE_CONFIG,
  GET_ASM_STATE,
  GET_ASM_UI,
  GET_CUSTOMER_SEARCH_RESULTS,
  GET_CUSTOMER_SEARCH_RESULTS_LOADER_STATE,
  GET_CUSTOMER_SEARCH_RESULTS_LOADING,
  LOGOUT_CUSTOMER_SUPPORT_AGENT,
  LOGOUT_CUSTOMER_SUPPORT_AGENT_CLASS,
  PERSONALIZATION_ACTION,
  PERSONALIZATION_CONFIG,
  PERSONALIZATION_CONTEXT,
  PERSONALIZATION_CONTEXT_SERVICE,
  PERSONALIZATION_MODULE,
  PRODUCT_VARIANTS_MODULE,
  PRODUCT_VARIANT_COMPONENT,
  PRODUCT_VARIANT_GUARD,
  PRODUCT_VARIANT_STYLE_ICONS_COMPONENT,
  PRODUCT_VARIANT_STYLE_ICONS_MODULE,
  REPLENISHMENT_ORDER_CANCELLATION_LAUNCH_DIALOG_SERVICE,
  SAVED_CART_FORM_LAUNCH_DIALOG_SERVICE,
  SPARTACUS_CART_SAVED_CART_COMPONENTS,
  SPARTACUS_CORE,
  SPARTACUS_PRODUCT_VARIANTS_COMPONENTS,
  SPARTACUS_STOREFRONTLIB,
  STATE_WITH_ASM,
  SYNCED_ASM_STATE,
  TOKEN_TARGET,
  VARIANT_COLOR_SELECTOR_COMPONENT,
  VARIANT_COLOR_SELECTOR_MODULE,
  VARIANT_SIZE_SELECTOR_COMPONENT,
  VARIANT_SIZE_SELECTOR_MODULE,
  VARIANT_STYLE_ICONS_COMPONENT,
  VARIANT_STYLE_ICONS_MODULE,
  VARIANT_STYLE_SELECTOR_COMPONENT,
  VARIANT_STYLE_SELECTOR_MODULE,
} from '../../../shared/constants';
import { DeprecatedNode } from '../../../shared/utils/file-utils';
import { removedPublicApiDeprecation } from '../../mechanism/removed-public-api-deprecations/removed-public-api-deprecation';

export const REMOVED_PUBLIC_API_DATA: DeprecatedNode[] = [
  // projects/storefrontlib/src/cms-components/asm/asm.module.ts
  {
    node: ASM_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${ASM_MODULE}' was moved to @spartacus/asm/components.`,
  },
  // projects/core/src/asm/asm.module.ts
  {
    node: ASM_MODULE,
    importPath: SPARTACUS_CORE,
    comment: `'${ASM_MODULE}' was moved to @spartacus/asm/core.`,
  },
  // projects/core/src/asm/config/asm-config.ts
  {
    node: ASM_CONFIG,
    importPath: SPARTACUS_CORE,
    comment: `'${ASM_CONFIG}' was moved to @spartacus/asm/core.`,
  },
  // projects/core/src/asm/connectors/asm.adapter.ts
  {
    node: ASM_ADAPTER,
    importPath: SPARTACUS_CORE,
    comment: `'${ASM_ADAPTER}' was moved to @spartacus/asm/core.`,
  },
  // projects/core/src/asm/connectors/asm.connector.ts
  {
    node: ASM_CONNECTOR,
    importPath: SPARTACUS_CORE,
    comment: `'${ASM_CONNECTOR}' was moved to @spartacus/asm/core.`,
  },
  // projects/core/src/asm/connectors/converters.ts
  {
    node: CUSTOMER_SEARCH_PAGE_NORMALIZER,
    importPath: SPARTACUS_CORE,
    comment: `'${CUSTOMER_SEARCH_PAGE_NORMALIZER}' was moved to @spartacus/asm/core.`,
  },
  // projects/core/src/asm/facade/asm.service.ts
  {
    node: ASM_SERVICE,
    importPath: SPARTACUS_CORE,
    comment: `'${ASM_SERVICE}' was moved to @spartacus/asm/core.`,
  },
  // projects/core/src/asm/facade/csagent-auth.service.ts
  {
    node: CS_AGENT_AUTH_SERVICE,
    importPath: SPARTACUS_CORE,
    comment: `'${CS_AGENT_AUTH_SERVICE}' was moved to @spartacus/asm/root.`,
  },
  // projects/core/src/asm/models/asm.models.ts
  {
    node: CUSTOMER_SEARCH_PAGE,
    importPath: SPARTACUS_CORE,
    comment: `'${CUSTOMER_SEARCH_PAGE}' was moved to @spartacus/asm/core.`,
  },
  // projects/core/src/asm/models/asm.models.ts
  {
    node: CUSTOMER_SEARCH_OPTIONS,
    importPath: SPARTACUS_CORE,
    comment: `'${CUSTOMER_SEARCH_OPTIONS}' was moved to @spartacus/asm/core.`,
  },
  // projects/core/src/asm/models/asm.models.ts
  {
    node: ASM_UI,
    importPath: SPARTACUS_CORE,
    comment: `'${ASM_UI}' was moved to @spartacus/asm/core.`,
  },
  // projects/core/src/asm/services/asm-auth-http-header.service.ts
  {
    node: ASM_AUTH_HTTP_HEADER_SERVICE,
    importPath: SPARTACUS_CORE,
    comment: `'${ASM_AUTH_HTTP_HEADER_SERVICE}' was moved to @spartacus/asm/root.`,
  },
  // projects/core/src/asm/services/asm-auth.service.ts
  {
    node: TOKEN_TARGET,
    importPath: SPARTACUS_CORE,
    comment: `'${TOKEN_TARGET}' was moved to @spartacus/asm/root.`,
  },
  // projects/core/src/asm/services/asm-auth.service.ts
  {
    node: ASM_AUTH_SERVICE,
    importPath: SPARTACUS_CORE,
    comment: `'${ASM_AUTH_SERVICE}' was moved to @spartacus/asm/root.`,
  },
  // feature-libs/asm/root/services/asm-auth-storage.service.ts
  {
    node: ASM_AUTH_STORAGE_SERVICE,
    importPath: SPARTACUS_CORE,
    comment: `'${ASM_AUTH_STORAGE_SERVICE}' was moved to @spartacus/asm/root.`,
  },
  // projects/core/src/asm/services/asm-state-persistence.service.ts
  {
    node: SYNCED_ASM_STATE,
    importPath: SPARTACUS_CORE,
    comment: `'${SYNCED_ASM_STATE}' was moved to @spartacus/asm/core.`,
  },
  // projects/core/src/asm/services/asm-state-persistence.service.ts
  {
    node: ASM_STATE_PERSISTENCE_SERVICE,
    importPath: SPARTACUS_CORE,
    comment: `'${ASM_STATE_PERSISTENCE_SERVICE}' was moved to @spartacus/asm/core.`,
  },
  // projects/core/src/asm/store/actions/asm-ui.action.ts
  {
    node: ASM_UI_UPDATE,
    importPath: SPARTACUS_CORE,
    comment: `'${ASM_UI_UPDATE}' was moved to @spartacus/asm/core.`,
  },
  // projects/core/src/asm/store/actions/asm-ui.action.ts
  {
    node: ASM_UI_UPDATE_CLASS,
    importPath: SPARTACUS_CORE,
    comment: `'${ASM_UI_UPDATE_CLASS}' was moved to @spartacus/asm/core.`,
  },
  // projects/core/src/asm/store/actions/asm-ui.action.ts
  {
    node: ASM_UI_ACTION,
    importPath: SPARTACUS_CORE,
    comment: `'${ASM_UI_ACTION}' was moved to @spartacus/asm/core.`,
  },
  // projects/core/src/asm/store/actions/customer.action.ts
  {
    node: CUSTOMER_SEARCH,
    importPath: SPARTACUS_CORE,
    comment: `'${CUSTOMER_SEARCH}' was moved to @spartacus/asm/core.`,
  },
  // projects/core/src/asm/store/actions/customer.action.ts
  {
    node: CUSTOMER_SEARCH_CLASS,
    importPath: SPARTACUS_CORE,
    comment: `'${CUSTOMER_SEARCH_CLASS}' was moved to @spartacus/asm/core.`,
  },
  // projects/core/src/asm/store/actions/customer.action.ts
  {
    node: CUSTOMER_SEARCH_FAIL,
    importPath: SPARTACUS_CORE,
    comment: `'${CUSTOMER_SEARCH_FAIL}' was moved to @spartacus/asm/core.`,
  },
  // projects/core/src/asm/store/actions/customer.action.ts
  {
    node: CUSTOMER_SEARCH_FAIL_CLASS,
    importPath: SPARTACUS_CORE,
    comment: `'${CUSTOMER_SEARCH_FAIL_CLASS}' was moved to @spartacus/asm/core.`,
  },
  // projects/core/src/asm/store/actions/customer.action.ts
  {
    node: CUSTOMER_SEARCH_SUCCESS,
    importPath: SPARTACUS_CORE,
    comment: `'${CUSTOMER_SEARCH_SUCCESS}' was moved to @spartacus/asm/core.`,
  },
  // projects/core/src/asm/store/actions/customer.action.ts
  {
    node: CUSTOMER_SEARCH_SUCCESS_CLASS,
    importPath: SPARTACUS_CORE,
    comment: `'${CUSTOMER_SEARCH_SUCCESS_CLASS}' was moved to @spartacus/asm/core.`,
  },
  // projects/core/src/asm/store/actions/customer.action.ts
  {
    node: CUSTOMER_SEARCH_RESET,
    importPath: SPARTACUS_CORE,
    comment: `'${CUSTOMER_SEARCH_RESET}' was moved to @spartacus/asm/core.`,
  },
  // projects/core/src/asm/store/actions/customer.action.ts
  {
    node: CUSTOMER_SEARCH_RESET_CLASS,
    importPath: SPARTACUS_CORE,
    comment: `'${CUSTOMER_SEARCH_RESET_CLASS}' was moved to @spartacus/asm/core.`,
  },
  // projects/core/src/asm/store/actions/customer.action.ts
  {
    node: CUSTOMER_ACTION,
    importPath: SPARTACUS_CORE,
    comment: `'${CUSTOMER_ACTION}' was moved to @spartacus/asm/core.`,
  },
  // projects/core/src/asm/store/actions/logout-agent.action.ts
  {
    node: LOGOUT_CUSTOMER_SUPPORT_AGENT,
    importPath: SPARTACUS_CORE,
    comment: `'${LOGOUT_CUSTOMER_SUPPORT_AGENT}' was moved to @spartacus/asm/core.`,
  },
  // projects/core/src/asm/store/actions/logout-agent.action.ts
  {
    node: LOGOUT_CUSTOMER_SUPPORT_AGENT_CLASS,
    importPath: SPARTACUS_CORE,
    comment: `'${LOGOUT_CUSTOMER_SUPPORT_AGENT_CLASS}' was moved to @spartacus/asm/core.`,
  },
  // projects/core/src/asm/store/asm-state.ts
  {
    node: ASM_FEATURE,
    importPath: SPARTACUS_CORE,
    comment: `'${ASM_FEATURE}' was moved to @spartacus/asm/core.`,
  },
  // projects/core/src/asm/store/asm-state.ts
  {
    node: CUSTOMER_SEARCH_DATA,
    importPath: SPARTACUS_CORE,
    comment: `'${CUSTOMER_SEARCH_DATA}' was moved to @spartacus/asm/core.`,
  },
  // projects/core/src/asm/store/asm-state.ts
  {
    node: STATE_WITH_ASM,
    importPath: SPARTACUS_CORE,
    comment: `'${STATE_WITH_ASM}' was moved to @spartacus/asm/core.`,
  },
  // projects/core/src/asm/store/asm-state.ts
  {
    node: ASM_STATE,
    importPath: SPARTACUS_CORE,
    comment: `'${ASM_STATE}' was moved to @spartacus/asm/core.`,
  },

  // projects/core/src/asm/store/selectors/asm-ui.selectors.ts
  {
    node: GET_ASM_UI,
    importPath: SPARTACUS_CORE,
    comment: `'${GET_ASM_UI}' was moved to @spartacus/asm/core.`,
  },
  // projects/core/src/asm/store/selectors/asm-ui.selectors.ts
  {
    node: GET_CUSTOMER_SEARCH_RESULTS_LOADER_STATE,
    importPath: SPARTACUS_CORE,
    comment: `'${GET_CUSTOMER_SEARCH_RESULTS_LOADER_STATE}' was moved to @spartacus/asm/core.`,
  },
  // projects/core/src/asm/store/selectors/asm-ui.selectors.ts
  {
    node: GET_CUSTOMER_SEARCH_RESULTS,
    importPath: SPARTACUS_CORE,
    comment: `'${GET_CUSTOMER_SEARCH_RESULTS}' was moved to @spartacus/asm/core.`,
  },
  // projects/core/src/asm/store/selectors/asm-ui.selectors.ts
  {
    node: GET_CUSTOMER_SEARCH_RESULTS_LOADING,
    importPath: SPARTACUS_CORE,
    comment: `'${GET_CUSTOMER_SEARCH_RESULTS_LOADING}' was moved to @spartacus/asm/core.`,
  },
  // projects/core/src/asm/store/selectors/asm-ui.selectors.ts
  {
    node: GET_CUSTOMER_SEARCH_RESULTS_LOADING,
    importPath: SPARTACUS_CORE,
    comment: `'${GET_CUSTOMER_SEARCH_RESULTS_LOADING}' was moved to @spartacus/asm/core.`,
  },
  // projects/core/src/asm/store/selectors/feature.selector.ts
  {
    node: GET_ASM_STATE,
    importPath: SPARTACUS_CORE,
    comment: `'${GET_ASM_STATE}' was moved to @spartacus/asm/core.`,
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
  // projects/core/src/personalization/personalization.module.ts
  {
    node: PERSONALIZATION_MODULE,
    importPath: SPARTACUS_CORE,
    comment: `${PERSONALIZATION_MODULE} was removed. Use @spartacus/tracking/personalization instead.`,
  },
  // projects/core/src/personalization/config/personalization-config.ts
  {
    node: PERSONALIZATION_CONFIG,
    importPath: SPARTACUS_CORE,
    comment: `${PERSONALIZATION_CONFIG} was moved to @spartacus/tracking/personalization/root.`,
  },
  // projects/core/src/personalization/services/personalization-context.service.ts
  {
    node: PERSONALIZATION_CONTEXT_SERVICE,
    importPath: SPARTACUS_CORE,
    comment: `${PERSONALIZATION_CONTEXT_SERVICE} was moved to @spartacus/tracking/personalization/core.`,
  },
  // projects/core/src/personalization/model/personalization-context.model.ts
  {
    node: PERSONALIZATION_ACTION,
    importPath: SPARTACUS_CORE,
    comment: `${PERSONALIZATION_ACTION} was moved to @spartacus/tracking/personalization/core.`,
  },
  // projects/core/src/personalization/model/personalization-context.model.ts
  {
    node: PERSONALIZATION_CONTEXT,
    importPath: SPARTACUS_CORE,
    comment: `${PERSONALIZATION_CONTEXT} was moved to @spartacus/tracking/personalization/core.`,
  },
  // projects/storefrontlib/src/cms-components/product/product-variants/product-variants.module.ts
  {
    node: PRODUCT_VARIANTS_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${PRODUCT_VARIANTS_MODULE}' was removed from @spartacus/storefront. Use @spartacus/product/variants feature-library instead.`,
  },
  // projects/storefrontlib/src/cms-components/product/product-variants/product-variants.component.ts
  {
    node: PRODUCT_VARIANT_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${PRODUCT_VARIANT_COMPONENT}' was removed from @spartacus/storefront. Use ProductVariantsContainerComponent from @spartacus/product/variants/components as a replacement.`,
  },
  // projects/storefrontlib/src/cms-components/product/product-variants/variant-color-selector/variant-color-selector.component.ts
  {
    node: VARIANT_COLOR_SELECTOR_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${VARIANT_COLOR_SELECTOR_COMPONENT}' was removed from @spartacus/storefront. Use ProductVariantColorSelectorComponent from @spartacus/product/variants/components as a replacement.`,
  },
  // projects/storefrontlib/src/cms-components/product/product-variants/variant-color-selector/variant-color-selector.module.ts
  {
    node: VARIANT_COLOR_SELECTOR_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${VARIANT_COLOR_SELECTOR_MODULE}' was removed from @spartacus/storefront. Use ProductVariantColorSelectorModule from @spartacus/product/variants/components as a replacement.`,
  },
  // projects/storefrontlib/src/cms-components/product/product-variants/variant-size-selector/variant-size-selector.component.ts
  {
    node: VARIANT_SIZE_SELECTOR_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${VARIANT_SIZE_SELECTOR_COMPONENT}' was removed from @spartacus/storefront. Use ProductVariantSizeSelectorComponent from @spartacus/product/variants/components as a replacement.`,
  },
  // projects/storefrontlib/src/cms-components/product/product-variants/variant-size-selector/variant-size-selector.module.ts
  {
    node: VARIANT_SIZE_SELECTOR_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${VARIANT_SIZE_SELECTOR_MODULE}' was removed from @spartacus/storefront. Use ProductVariantSizeSelectorModule from @spartacus/product/variants/components as a replacement.`,
  },
  // projects/storefrontlib/src/cms-components/product/product-variants/variant-style-selector/variant-style-selector.component.ts
  {
    node: VARIANT_STYLE_SELECTOR_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${VARIANT_STYLE_SELECTOR_COMPONENT}' was removed from @spartacus/storefront. Use ProductVariantStyleSelectorComponent from @spartacus/product/variants/components as a replacement.`,
  },
  // projects/storefrontlib/src/cms-components/product/product-variants/variant-style-selector/variant-style-selector.module.ts
  {
    node: VARIANT_STYLE_SELECTOR_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${VARIANT_STYLE_SELECTOR_MODULE}' was removed from @spartacus/storefront. Use ProductVariantStyleSelectorModule from @spartacus/product/variants/components as a replacement.`,
  },
  // projects/storefrontlib/src/cms-components/product/product-variants/variant-style-icons/variant-style-icons.component.ts
  {
    node: VARIANT_STYLE_ICONS_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${VARIANT_STYLE_ICONS_COMPONENT}' was removed from @spartacus/storefront. Use ProductVariantStyleIconsComponent from @spartacus/product/variants/root as a replacement.`,
  },
  // projects/storefrontlib/src/cms-components/product/product-variants/variant-style-icons/variant-style-icons.module.ts
  {
    node: VARIANT_STYLE_ICONS_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${VARIANT_STYLE_ICONS_MODULE}' was removed from @spartacus/storefront. Use ProductVariantStyleIconsModule from @spartacus/product/variants/root as a replacement.`,
  },
  // projects/storefrontlib/src/cms-components/product/product-variants/guards/product-variant.guard.ts
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
];

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return removedPublicApiDeprecation(tree, context, REMOVED_PUBLIC_API_DATA);
  };
}
