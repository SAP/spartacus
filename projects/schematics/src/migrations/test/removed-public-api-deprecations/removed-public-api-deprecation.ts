import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import {
  ACTIVE_CART_SERVICE,
  ANONYMOUS_USERID_CONST,
  AUTH_SERVICE,
  AUTO_FOCUS_DIRECTIVE,
  AUTO_FOCUS_DIRECTIVE_MODULE,
  BILLING_ADDRESS_FORM_COMPONENT,
  BILLING_ADDRESS_FORM_MODULE,
  CARTS_STATE,
  CART_COMBINED_EFFECTS,
  CART_DATA_CONST,
  CART_DATA_SERVICE,
  CART_EFFECTS,
  CART_ENTRY_EFFECTS,
  CART_FEATURE_CONST,
  CART_SELECTORS,
  CART_SERVICE,
  CART_STATE,
  CART_VOUCHER_EFFECTS,
  CLEAR_CART_STATE,
  CLEAR_MULTI_CART_STATE,
  CONTEXT_SERVICE_PROVIDERS,
  ENTITY_LOADER_REDUCER,
  ENTITY_LOADER_STATE,
  ENTITY_PROCESSES_LOADER_REDUCER,
  ENTITY_PROCESSES_LOADER_STATE,
  ENTITY_REDUCER,
  ENTITY_STATE,
  FORM_UTILS,
  GET_MULTI_CART_REDUCERS,
  GET_REDUCERS,
  GET_STATE_SLICE,
  GET_STRUCTURED_DATA_FACTORY,
  INITIAL_ENTITY_STATE,
  INITIAL_LOADER_STATE,
  INITIAL_PROCESSES_STATE,
  INITITIALIZE_CONTEXT,
  INIT_SITE_CONTEXT_ROUTES_HANDLER,
  LOADER_REDUCER,
  LOADER_STATE,
  META_REDUCERS,
  MULTI_CART_META_REDUCERS,
  MULTI_CART_REDUCER_PROVIDER,
  MULTI_CART_REDUCER_TOKEN,
  OF_LOADER_FAIL,
  OF_LOADER_LOAD,
  OF_LOADER_SUCCESS,
  ONLY_NUMBER_DIRECTIVE,
  ONLY_NUMBER_DIRECTIVE_MODULE,
  PROCESSES_LOADER_REDUCER,
  PROCESSES_LOADER_STATE,
  PWA_CONFIGURATION_FACTORY,
  PWA_FACTORY,
  REDUCER_PROVIDER,
  REDUCER_TOKEN,
  SITE_CONTEXT_PARAMS_PROVIDERS,
  SKIP_LINK_FACTORY,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
  STATE_ENTITY_ACTIONS,
  STATE_ENTITY_LOADER_ACTIONS,
  STATE_ENTITY_LOADER_SELECTORS,
  STATE_ENTITY_PROCESSESS_LOADER_ACTIONS,
  STATE_ENTITY_PROCESSESS_LOADER_SELECTORS,
  STATE_ENTITY_SELECTORS,
  STATE_LOADER_ACTIONS,
  STATE_LOADER_SELECTORS,
  STATE_PROCESSES_LOADER_ACTIONS,
  STATE_PROCESSES_LOADER_SELECTORS,
  STATE_WITH_CART,
  URL_MATCHER_FACTORY_SERVICE,
  URL_MATCHER_SERVICE,
  WISHLIST_EFFECTS,
} from '../../../shared/constants';
import { DeprecatedNode } from '../../../shared/utils/file-utils';
import { removedPublicApiDeprecation } from '../../mechanism/removed-public-api-deprecations/removed-public-api-deprecation';

export const REMOVED_PUBLIC_API_DATA: DeprecatedNode[] = [
  // projects/core/src/cart/store/effects/cart.effect.ts
  {
    node: CART_EFFECTS,
    importPath: SPARTACUS_CORE,
  },
  // projects/core/src/cart/store/effects/wishlist.effect.ts
  {
    node: WISHLIST_EFFECTS,
    importPath: SPARTACUS_CORE,
  },
  // projects/core/src/cart/store/effects/cart-voucher.effect.ts
  {
    node: CART_VOUCHER_EFFECTS,
    importPath: SPARTACUS_CORE,
  },
  // projects/core/src/cart/store/effects/cart-entry.effect.ts
  {
    node: CART_ENTRY_EFFECTS,
    importPath: SPARTACUS_CORE,
  },
  // projects/core/src/cart/store/effects/index.ts
  {
    node: CART_COMBINED_EFFECTS,
    importPath: SPARTACUS_CORE,
  },
  // projects/core/src/cart/store/reducers/index.ts
  {
    node: GET_REDUCERS,
    importPath: SPARTACUS_CORE,
  },
  // projects/core/src/cart/store/reducers/index.ts
  {
    node: REDUCER_TOKEN,
    importPath: SPARTACUS_CORE,
  },
  // projects/core/src/cart/store/reducers/index.ts
  {
    node: REDUCER_PROVIDER,
    importPath: SPARTACUS_CORE,
  },
  // projects/core/src/cart/store/reducers/index.ts
  {
    node: CLEAR_CART_STATE,
    importPath: SPARTACUS_CORE,
  },
  // projects/core/src/cart/store/reducers/index.ts
  {
    node: META_REDUCERS,
    importPath: SPARTACUS_CORE,
  },
  // projects/core/src/cart/store/reducers/index.ts
  {
    node: CLEAR_MULTI_CART_STATE,
    importPath: SPARTACUS_CORE,
  },
  // projects/core/src/cart/store/reducers/index.ts
  {
    node: MULTI_CART_META_REDUCERS,
    importPath: SPARTACUS_CORE,
  },
  // projects/core/src/cart/store/reducers/index.ts
  {
    node: MULTI_CART_REDUCER_TOKEN,
    importPath: SPARTACUS_CORE,
  },
  // projects/core/src/cart/store/reducers/index.ts
  {
    node: GET_MULTI_CART_REDUCERS,
    importPath: SPARTACUS_CORE,
  },
  // projects/core/src/cart/store/reducers/index.ts
  {
    node: MULTI_CART_REDUCER_PROVIDER,
    importPath: SPARTACUS_CORE,
  },
  // projects/core/src/site-context/providers/site-context-params-providers.ts
  {
    node: SITE_CONTEXT_PARAMS_PROVIDERS,
    importPath: SPARTACUS_CORE,
  },
  // projects/core/src/site-context/providers/site-context-params-providers.ts
  {
    node: INIT_SITE_CONTEXT_ROUTES_HANDLER,
    importPath: SPARTACUS_CORE,
  },
  // projects/core/src/site-context/providers/index.ts
  {
    node: INITITIALIZE_CONTEXT,
    importPath: SPARTACUS_CORE,
  },
  // projects/core/src/site-context/providers/context-service-providers.ts
  {
    node: CONTEXT_SERVICE_PROVIDERS,
    importPath: SPARTACUS_CORE,
  },
  // projects/core/src/occ/index.ts
  {
    node: ANONYMOUS_USERID_CONST,
    importPath: SPARTACUS_CORE,
    comment: `'${ANONYMOUS_USERID_CONST}' is no longer part of the public API. Instead use 'OCC_USER_ID_ANONYMOUS'.`,
  },
  // projects/core/src/cart/store/selectors/index.ts
  {
    node: CART_SELECTORS,
    importPath: SPARTACUS_CORE,
    comment: `'${CART_SELECTORS}' are no longer part of the public API. Instead use 'ActiveCartService', 'MultiCartState' and 'MultiCartSelectors'.`,
  },
  // projects/core/src/cart/facade/cart.service.ts
  {
    node: CART_SERVICE,
    importPath: SPARTACUS_CORE,
    comment: `'${CART_SERVICE}' is no longer part of the public API. Instead use '${ACTIVE_CART_SERVICE}'.`,
  },
  // projects/core/src/cart/facade/cart-data.service.ts
  {
    node: CART_DATA_SERVICE,
    importPath: SPARTACUS_CORE,
    comment: `'${CART_DATA_SERVICE}' is no longer part of the public API. Instead use methods from '${ACTIVE_CART_SERVICE}' and '${AUTH_SERVICE}.'`,
  },
  // projects/storefrontlib/src/cms-structure/pwa/index.ts
  {
    node: PWA_CONFIGURATION_FACTORY,
    importPath: SPARTACUS_STOREFRONTLIB,
  },
  // projects/storefrontlib/src/cms-structure/pwa/index.ts
  {
    node: PWA_FACTORY,
    importPath: SPARTACUS_STOREFRONTLIB,
  },
  // projects/storefrontlib/src/cms-structure/seo/structured-data/index.ts
  {
    node: GET_STRUCTURED_DATA_FACTORY,
    importPath: SPARTACUS_STOREFRONTLIB,
  },
  // projects/storefrontlib/src/layout/a11y/skip-link/index.ts
  {
    node: SKIP_LINK_FACTORY,
    importPath: SPARTACUS_STOREFRONTLIB,
  },
  // projects/core/src/cart/store/cart-state.ts
  {
    node: CART_DATA_CONST,
    importPath: SPARTACUS_CORE,
    comment: `'${CART_DATA_CONST}' along with rest of the 'cart' state was removed. Instead use new 'cart' state.`,
  },
  // projects/core/src/cart/store/cart-state.ts
  {
    node: STATE_WITH_CART,
    importPath: SPARTACUS_CORE,
    comment: `'${STATE_WITH_CART}' along with rest of the 'cart' state was removed. Instead use new 'cart' state.`,
  },
  // projects/core/src/cart/store/cart-state.ts
  {
    node: CARTS_STATE,
    importPath: SPARTACUS_CORE,
    comment: `'${CARTS_STATE}' along with rest of the 'cart' state was removed. Instead use new 'cart' state.`,
  },
  // projects/core/src/cart/store/cart-state.ts
  {
    node: CART_FEATURE_CONST,
    importPath: SPARTACUS_CORE,
    comment: `'${CART_FEATURE_CONST}' along with rest of the 'cart' state was removed. Instead use new 'cart' state.`,
  },
  // projects/core/src/cart/store/cart-state.ts
  {
    node: CART_STATE,
    importPath: SPARTACUS_CORE,
    comment: `'${CART_STATE}' along with rest of the 'cart' state was removed. Instead use new 'cart' state.`,
  },
  // projects/core/src/routing/services/url-matcher-factory.service.ts
  {
    node: URL_MATCHER_FACTORY_SERVICE,
    importPath: SPARTACUS_CORE,
    comment: `'${URL_MATCHER_FACTORY_SERVICE}' was renamed to '${URL_MATCHER_SERVICE}' and its methods were renamed. For more details, see the migration docs.`,
  },
  // projects/storefrontlib/src/shared/utils/forms/form-utils.ts
  {
    node: FORM_UTILS,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${FORM_UTILS}' was removed. Its functionalities were moved to 'FormErrorsComponent'.`,
  },
  // projects/storefrontlib/src/cms-components/checkout/components/payment-method/billing-address-form/billing-address-form.component.ts
  {
    node: BILLING_ADDRESS_FORM_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${BILLING_ADDRESS_FORM_COMPONENT}' was removed. The form and the whole logic was moved to 'PaymentFormComponent'.`,
  },
  // projects/storefrontlib/src/cms-components/checkout/components/payment-method/billing-address-form/billing-address-form.module.ts
  {
    node: BILLING_ADDRESS_FORM_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${BILLING_ADDRESS_FORM_MODULE}' was removed. The form module and the whole logic was moved to 'PaymentFormModule'.`,
  },
  // projects/core/src/state/utils/loader/loader-state.ts
  {
    node: LOADER_STATE,
    importPath: SPARTACUS_CORE,
    comment: `'${LOADER_STATE}' was moved under 'StateUtils' namespace. New reference: 'StateUtils.${LOADER_STATE}'`,
  },
  // projects/core/src/state/utils/processes-loader/processes-loader-state.ts
  {
    node: PROCESSES_LOADER_STATE,
    importPath: SPARTACUS_CORE,
    comment: `'${PROCESSES_LOADER_STATE}' was moved under 'StateUtils' namespace. New reference: 'StateUtils.${PROCESSES_LOADER_STATE}'`,
  },
  // projects/core/src/state/utils/entity/entity-state.ts
  {
    node: ENTITY_STATE,
    importPath: SPARTACUS_CORE,
    comment: `'${ENTITY_STATE}' was moved under 'StateUtils' namespace. New reference: 'StateUtils.${ENTITY_STATE}'`,
  },
  // projects/core/src/state/utils/entity-loader/entity-loader-state.ts
  {
    node: ENTITY_LOADER_STATE,
    importPath: SPARTACUS_CORE,
    comment: `'${ENTITY_LOADER_STATE}' was moved under 'StateUtils' namespace. New reference: 'StateUtils.${ENTITY_LOADER_STATE}'`,
  },
  // projects/core/src/state/utils/entity-processes-loader/entity-processes-loader-state.ts
  {
    node: ENTITY_PROCESSES_LOADER_STATE,
    importPath: SPARTACUS_CORE,
    comment: `'${ENTITY_PROCESSES_LOADER_STATE}' was moved under 'StateUtils' namespace. New reference: 'StateUtils.${ENTITY_PROCESSES_LOADER_STATE}'`,
  },
  // projects/core/src/state/utils/loader/loader.action.ts
  {
    node: STATE_LOADER_ACTIONS,
    importPath: SPARTACUS_CORE,
    comment: `Actions from namespace '${STATE_LOADER_ACTIONS}' were moved to new namespace 'StateUtils'`,
  },
  // projects/core/src/state/utils/processes-loader/processes-loader.action.ts
  {
    node: STATE_PROCESSES_LOADER_ACTIONS,
    importPath: SPARTACUS_CORE,
    comment: `Actions from namespace '${STATE_PROCESSES_LOADER_ACTIONS}' were moved to new namespace 'StateUtils'`,
  },
  // projects/core/src/state/utils/entity/entity.action.ts
  {
    node: STATE_ENTITY_ACTIONS,
    importPath: SPARTACUS_CORE,
    comment: `Actions from namespace '${STATE_ENTITY_ACTIONS}' were moved to new namespace 'StateUtils'`,
  },
  // projects/core/src/state/utils/entity-loader/entity-loader.action.ts
  {
    node: STATE_ENTITY_LOADER_ACTIONS,
    importPath: SPARTACUS_CORE,
    comment: `Actions from namespace '${STATE_ENTITY_LOADER_ACTIONS}' were moved to new namespace 'StateUtils'`,
  },
  // projects/core/src/state/utils/entity-processes-loader/entity-processes-loader.action.ts
  {
    node: STATE_ENTITY_PROCESSESS_LOADER_ACTIONS,
    importPath: SPARTACUS_CORE,
    comment: `Actions from namespace '${STATE_ENTITY_PROCESSESS_LOADER_ACTIONS}' were moved to new namespace 'StateUtils'`,
  },
  // projects/core/src/state/utils/loader/loader.selectors.ts
  {
    node: STATE_LOADER_SELECTORS,
    importPath: SPARTACUS_CORE,
    comment: `Selectors from namespace '${STATE_LOADER_SELECTORS}' were moved to new namespace 'StateUtils'`,
  },
  // projects/core/src/state/utils/processes-loader/processes-loader.selectors.ts
  {
    node: STATE_PROCESSES_LOADER_SELECTORS,
    importPath: SPARTACUS_CORE,
    comment: `Selectors from namespace '${STATE_PROCESSES_LOADER_SELECTORS}' were moved to new namespace 'StateUtils'`,
  },
  // projects/core/src/state/utils/entity/entity.selectors.ts
  {
    node: STATE_ENTITY_SELECTORS,
    importPath: SPARTACUS_CORE,
    comment: `Selectors from namespace '${STATE_ENTITY_SELECTORS}' were moved to new namespace 'StateUtils'`,
  },
  // projects/core/src/state/utils/entity-loader/entity-loader.selectors.ts
  {
    node: STATE_ENTITY_LOADER_SELECTORS,
    importPath: SPARTACUS_CORE,
    comment: `Selectors from namespace '${STATE_ENTITY_LOADER_SELECTORS}' were moved to new namespace 'StateUtils'`,
  },
  // projects/core/src/state/utils/entity-processes-loader/entity-processes-loader.selectors.ts
  {
    node: STATE_ENTITY_PROCESSESS_LOADER_SELECTORS,
    importPath: SPARTACUS_CORE,
    comment: `Selectors from namespace '${STATE_ENTITY_PROCESSESS_LOADER_SELECTORS}' were moved to new namespace 'StateUtils'`,
  },
  // projects/core/src/state/utils/loader/loader.reducer.ts
  {
    node: LOADER_REDUCER,
    importPath: SPARTACUS_CORE,
    comment: `'${LOADER_REDUCER}' was moved under 'StateUtils' namespace. New reference: 'StateUtils.${LOADER_REDUCER}'`,
  },
  // projects/core/src/state/utils/processes-loader/processes-loader.reducer.ts
  {
    node: PROCESSES_LOADER_REDUCER,
    importPath: SPARTACUS_CORE,
    comment: `'${PROCESSES_LOADER_REDUCER}' was moved under 'StateUtils' namespace. New reference: 'StateUtils.${PROCESSES_LOADER_REDUCER}'`,
  },
  // projects/core/src/state/utils/entity/entity.reducer.ts
  {
    node: ENTITY_REDUCER,
    importPath: SPARTACUS_CORE,
    comment: `'${ENTITY_REDUCER}' was moved under 'StateUtils' namespace. New reference: 'StateUtils.${ENTITY_REDUCER}'`,
  },
  // projects/core/src/state/utils/entity-loader/entity-loader.reducer.ts
  {
    node: ENTITY_LOADER_REDUCER,
    importPath: SPARTACUS_CORE,
    comment: `'${ENTITY_LOADER_REDUCER}' was moved under 'StateUtils' namespace. New reference: 'StateUtils.${ENTITY_LOADER_REDUCER}'`,
  },
  // projects/core/src/state/utils/entity-processes-loader/entity-processes-loader.reducer.ts
  {
    node: ENTITY_PROCESSES_LOADER_REDUCER,
    importPath: SPARTACUS_CORE,
    comment: `'${ENTITY_PROCESSES_LOADER_REDUCER}' was moved under 'StateUtils' namespace. New reference: 'StateUtils.${ENTITY_PROCESSES_LOADER_REDUCER}'`,
  },
  // projects/core/src/state/utils/loader/loader.reducer.ts
  {
    node: INITIAL_LOADER_STATE,
    importPath: SPARTACUS_CORE,
    comment: `'${INITIAL_LOADER_STATE}' was moved under 'StateUtils' namespace. New reference: 'StateUtils.${INITIAL_LOADER_STATE}'`,
  },
  // projects/core/src/state/utils/processes-loader/processes-loader.reducer.ts
  {
    node: INITIAL_PROCESSES_STATE,
    importPath: SPARTACUS_CORE,
    comment: `'${INITIAL_PROCESSES_STATE}' was moved under 'StateUtils' namespace. New reference: 'StateUtils.${INITIAL_PROCESSES_STATE}'`,
  },
  // projects/core/src/state/utils/entity/entity.reducer.ts
  {
    node: INITIAL_ENTITY_STATE,
    importPath: SPARTACUS_CORE,
    comment: `'${INITIAL_ENTITY_STATE}' was moved under 'StateUtils' namespace. New reference: 'StateUtils.${INITIAL_ENTITY_STATE}'`,
  },
  // projects/core/src/state/utils/get-state-slice.ts
  {
    node: GET_STATE_SLICE,
    importPath: SPARTACUS_CORE,
    comment: `'${GET_STATE_SLICE}' was moved under 'StateUtils' namespace. New reference: 'StateUtils.${GET_STATE_SLICE}'`,
  },
  // projects/core/src/state/utils/loader/loader.helpers.ts
  {
    node: OF_LOADER_LOAD,
    importPath: SPARTACUS_CORE,
    comment: `'${OF_LOADER_LOAD}' was removed.`,
  },
  // projects/core/src/state/utils/loader/loader.helpers.ts
  {
    node: OF_LOADER_SUCCESS,
    importPath: SPARTACUS_CORE,
    comment: `'${OF_LOADER_SUCCESS}' was removed.`,
  },
  // projects/core/src/state/utils/loader/loader.helpers.ts
  {
    node: OF_LOADER_FAIL,
    importPath: SPARTACUS_CORE,
    comment: `'${OF_LOADER_FAIL}' was removed.`,
  },
  //projects/storefrontlib/src/shared/directives/auto-focus/auto-focus.directive.ts
  {
    node: AUTO_FOCUS_DIRECTIVE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${AUTO_FOCUS_DIRECTIVE}' was removed.`,
  },
  //projects/storefrontlib/src/shared/directives/auto-focus/auto-focus.directive.module.ts
  {
    node: AUTO_FOCUS_DIRECTIVE_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${AUTO_FOCUS_DIRECTIVE_MODULE}' was removed.`,
  },
  // projects/storefrontlib/src/shared/directives/only-number/only-number.directive.ts
  {
    node: ONLY_NUMBER_DIRECTIVE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${ONLY_NUMBER_DIRECTIVE}' was removed.`,
  },
  // projects/storefrontlib/src/shared/directives/only-number/only-number.directive.module.ts
  {
    node: ONLY_NUMBER_DIRECTIVE_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${ONLY_NUMBER_DIRECTIVE_MODULE}' was removed.`,
  },
];

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return removedPublicApiDeprecation(tree, context, REMOVED_PUBLIC_API_DATA);
  };
}
