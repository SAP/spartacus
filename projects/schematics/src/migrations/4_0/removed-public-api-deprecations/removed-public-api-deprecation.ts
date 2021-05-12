import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import {
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
  GET_ASM_STATE,
  GET_ASM_UI,
  GET_CUSTOMER_SEARCH_RESULTS,
  GET_CUSTOMER_SEARCH_RESULTS_LOADER_STATE,
  GET_CUSTOMER_SEARCH_RESULTS_LOADING,
  LOGOUT_CUSTOMER_SUPPORT_AGENT,
  LOGOUT_CUSTOMER_SUPPORT_AGENT_CLASS,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
  STATE_WITH_ASM,
  SYNCED_ASM_STATE,
  TOKEN_TARGET,
} from '../../../shared/constants';
import { DeprecatedNode } from '../../../shared/utils/file-utils';
import { removedPublicApiDeprecation } from '../../mechanism/removed-public-api-deprecations/removed-public-api-deprecation';

export const REMOVED_PUBLIC_API_DATA: DeprecatedNode[] = [
  // uncomment product variants deprecation on 4.0 migration works (#11391)
  // // projects/storefrontlib/src/cms-components/product/product-variants/product-variants.component.ts
  // {
  //   node: PRODUCT_VARIANT_COMPONENT,
  //   importPath: SPARTACUS_STOREFRONTLIB,
  //   comment: `'${PRODUCT_VARIANT_COMPONENT}' was moved to @spartacus/product/variants.`,
  // },
  // // projects/storefrontlib/src/cms-components/product/product-variants/variant-color-selector/variant-color-selector.component.ts
  // {
  //   node: VARIANT_COLOR_SELECTOR_COMPONENT,
  //   importPath: SPARTACUS_STOREFRONTLIB,
  //   comment: `'${VARIANT_COLOR_SELECTOR_COMPONENT}' was moved to @spartacus/product/variants.`,
  // },
  // // projects/storefrontlib/src/cms-components/product/product-variants/variant-size-selector/variant-size-selector.component.ts
  // {
  //   node: VARIANT_SIZE_SELECTOR_COMPONENT,
  //   importPath: SPARTACUS_STOREFRONTLIB,
  //   comment: `'${VARIANT_SIZE_SELECTOR_COMPONENT}' was moved to @spartacus/product/variants.`,
  // },
  // // projects/storefrontlib/src/cms-components/product/product-variants/variant-style-icons/variant-style-icons.component.ts
  // {
  //   node: VARIANT_STYLE_ICONS_COMPONENT,
  //   importPath: SPARTACUS_STOREFRONTLIB,
  //   comment: `'${VARIANT_STYLE_ICONS_COMPONENT}' was moved to @spartacus/product/variants.`,
  // },
  // // projects/storefrontlib/src/cms-components/product/product-variants/variant-style-selector/variant-style-selector.component.ts
  // {
  //   node: VARIANT_STYLE_SELECTOR_COMPONENT,
  //   importPath: SPARTACUS_STOREFRONTLIB,
  //   comment: `'${VARIANT_STYLE_SELECTOR_COMPONENT}' was moved to @spartacus/product/variants.`,
  // },
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
];

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return removedPublicApiDeprecation(tree, context, REMOVED_PUBLIC_API_DATA);
  };
}
