import { Rule, Tree } from '@angular-devkit/schematics';
import {
  ASM_ADAPTER,
  ASM_AUTH_HTTP_HEADER_SERVICE,
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
  BUDGET_ROUTING_CONFIG,
  CHECKOUT_CONFIG_SERVICE,
  CHECKOUT_DELIVERY_FACADE,
  CHECKOUT_DELIVERY_SERVICE,
  CHECKOUT_DETAILS_SERVICE,
  CHECKOUT_PAYMENT_FACADE,
  CHECKOUT_PAYMENT_SERVICE,
  CLEAR_CHECKOUT_FACADE,
  CLEAR_CHECKOUT_SERVICE,
  CLOSE_ACCOUNT_COMPONENT,
  CLOSE_ACCOUNT_MODULE,
  COST_CENTER_ROUTING_CONFIG,
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
  DEFAULT_BUDGET_ROUTING_CONFIG,
  DEFAULT_COST_CENTER_ROUTING_CONFIG,
  DEFAULT_PERMISSION_ROUTING_CONFIG,
  DEFAULT_UNITS_ROUTING_CONFIG,
  DEFAULT_USER_GROUP_ROUTING_CONFIG,
  DEFAULT_USER_ROUTING_CONFIG,
  EXPRESS_CHECKOUT_SERVICE,
  FORGOT_PASSWORD_MODULE,
  GET_ASM_STATE,
  GET_ASM_UI,
  GET_CUSTOMER_SEARCH_RESULTS,
  GET_CUSTOMER_SEARCH_RESULTS_LOADER_STATE,
  GET_CUSTOMER_SEARCH_RESULTS_LOADING,
  LOGIN_FORM_MODULE,
  LOGIN_MODULE,
  LOGIN_REGISTER_COMPONENT,
  LOGIN_REGISTER_MODULE,
  LOGOUT_CUSTOMER_SUPPORT_AGENT,
  LOGOUT_CUSTOMER_SUPPORT_AGENT_CLASS,
  PERMISSION_ROUTING_CONFIG,
  PERSONALIZATION_ACTION,
  PERSONALIZATION_CONFIG,
  PERSONALIZATION_CONTEXT,
  PERSONALIZATION_CONTEXT_SERVICE,
  QUALTRICS_COMPONENT,
  QUALTRICS_CONFIG,
  QUALTRICS_EVENT_NAME,
  QUALTRICS_LOADER_SERVICE,
  QUALTRICS_MODULE,
  REGISTER_COMPONENT_MODULE,
  RESET_PASSWORD_MODULE,
  SMART_EDIT_SERVICE,
  SPARTACUS_ASM,
  SPARTACUS_CHECKOUT_COMPONENTS,
  SPARTACUS_CHECKOUT_ROOT,
  SPARTACUS_CORE,
  SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS,
  SPARTACUS_ORGANIZATION_ADMINISTRATION_ROOT,
  SPARTACUS_PRODUCT,
  SPARTACUS_QUALTRICS,
  SPARTACUS_SMARTEDIT,
  SPARTACUS_STOREFRONTLIB,
  SPARTACUS_TRACKING,
  SPARTACUS_USER_ACCOUNT_COMPONENTS,
  SPARTACUS_USER_PROFILE_COMPONENTS,
  STATE_WITH_ASM,
  SYNCED_ASM_STATE,
  TOKEN_TARGET,
  UNITS_ROUTING_CONFIG,
  UPDATE_EMAIL_MODULE,
  UPDATE_PASSWORD_MODULE,
  UPDATE_PROFILE_MODULE,
  USER_GROUP_ROUTING_CONFIG,
  USER_ROUTING_CONFIG,
  VARIANT_STYLE_ICONS_COMPONENT,
  VARIANT_STYLE_ICONS_MODULE,
} from '../../../shared/constants';
import { RenamedSymbol } from '../../../shared/utils/file-utils';
import { migrateRenamedSymbols } from '../../mechanism/rename-symbol/rename-symbol';

export const RENAMED_SYMBOLS_DATA: RenamedSymbol[] = [
  // feature-libs/organization/administration/root/config/default-budget-routing.config.ts
  {
    previousNode: BUDGET_ROUTING_CONFIG,
    previousImportPath: SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS,
    newNode: DEFAULT_BUDGET_ROUTING_CONFIG,
    newImportPath: SPARTACUS_ORGANIZATION_ADMINISTRATION_ROOT,
  },
  // feature-libs/organization/administration/root/config/default-cost-center-routing.config.ts
  {
    previousNode: COST_CENTER_ROUTING_CONFIG,
    previousImportPath: SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS,
    newNode: DEFAULT_COST_CENTER_ROUTING_CONFIG,
    newImportPath: SPARTACUS_ORGANIZATION_ADMINISTRATION_ROOT,
  },
  // feature-libs/organization/administration/root/config/default-permission-routing.config.ts
  {
    previousNode: PERMISSION_ROUTING_CONFIG,
    previousImportPath: SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS,
    newNode: DEFAULT_PERMISSION_ROUTING_CONFIG,
    newImportPath: SPARTACUS_ORGANIZATION_ADMINISTRATION_ROOT,
  },
  // feature-libs/organization/administration/root/config/default-units-routing.config.ts
  {
    previousNode: UNITS_ROUTING_CONFIG,
    previousImportPath: SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS,
    newNode: DEFAULT_UNITS_ROUTING_CONFIG,
    newImportPath: SPARTACUS_ORGANIZATION_ADMINISTRATION_ROOT,
  },
  // feature-libs/organization/administration/root/config/default-user-group-routing.config.ts
  {
    previousNode: USER_GROUP_ROUTING_CONFIG,
    previousImportPath: SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS,
    newNode: DEFAULT_USER_GROUP_ROUTING_CONFIG,
    newImportPath: SPARTACUS_ORGANIZATION_ADMINISTRATION_ROOT,
  },
  // feature-libs/organization/administration/root/config/default-user-routing.config.ts
  {
    previousNode: USER_ROUTING_CONFIG,
    previousImportPath: SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS,
    newNode: DEFAULT_USER_ROUTING_CONFIG,
    newImportPath: SPARTACUS_ORGANIZATION_ADMINISTRATION_ROOT,
  },
  // projects/storefrontlib/src/cms-components/product/config/default-view-config.ts
  {
    previousNode: 'defaultScrollConfig',
    previousImportPath: '@spartacus/storefront',
    newNode: 'defaultViewConfig',
  },
  {
    previousNode: EXPRESS_CHECKOUT_SERVICE,
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_CHECKOUT_COMPONENTS,
  },
  // feature-libs/checkout/root/facade/checkout-delivery.facade.ts
  {
    previousNode: CHECKOUT_DELIVERY_SERVICE,
    previousImportPath: SPARTACUS_CORE,
    newNode: CHECKOUT_DELIVERY_FACADE,
    newImportPath: SPARTACUS_CHECKOUT_ROOT,
  },
  // feature-libs/checkout/root/facade/checkout-payment.facade.ts
  {
    previousNode: CHECKOUT_PAYMENT_SERVICE,
    previousImportPath: SPARTACUS_CORE,
    newNode: CHECKOUT_PAYMENT_FACADE,
    newImportPath: SPARTACUS_CHECKOUT_ROOT,
  },
  // feature-libs/checkout/components/services/checkout-details.service.ts
  {
    previousNode: CHECKOUT_DETAILS_SERVICE,
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_CHECKOUT_COMPONENTS,
  },
  // feature-libs/checkout/components/services/checkout-config.service.ts
  {
    previousNode: CHECKOUT_CONFIG_SERVICE,
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_CHECKOUT_COMPONENTS,
  },
  // feature-libs/checkout/root/facade/clear-checkout.facade.ts
  {
    previousNode: CLEAR_CHECKOUT_SERVICE,
    previousImportPath: SPARTACUS_CORE,
    newNode: CLEAR_CHECKOUT_FACADE,
    newImportPath: SPARTACUS_CHECKOUT_ROOT,
  },
  // projects/storefrontlib/src/cms-components/misc/qualtrics/qualtrics-loader.service.ts
  {
    previousNode: QUALTRICS_LOADER_SERVICE,
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: `${SPARTACUS_QUALTRICS}/components`,
  },
  // projects/storefrontlib/src/cms-components/misc/qualtrics/config/qualtrics-config.ts
  {
    previousNode: QUALTRICS_CONFIG,
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: `${SPARTACUS_QUALTRICS}/components`,
  },
  // projects/storefrontlib/src/cms-components/misc/qualtrics/qualtrics-loader.service.ts
  {
    previousNode: QUALTRICS_EVENT_NAME,
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: `${SPARTACUS_QUALTRICS}/components`,
  },
  // projects/storefrontlib/src/cms-components/misc/qualtrics/qualtrics.component.ts
  {
    previousNode: QUALTRICS_COMPONENT,
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: `${SPARTACUS_QUALTRICS}/components`,
  },
  // projects/storefrontlib/src/cms-components/misc/qualtrics/qualtrics.module.ts
  {
    previousNode: QUALTRICS_MODULE,
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newNode: 'QualtricsComponentsModule',
    newImportPath: `${SPARTACUS_QUALTRICS}/components`,
  },
  // projects/storefrontlib/src/cms-components/asm/asm.module.ts
  {
    previousNode: ASM_MODULE,
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newNode: 'AsmComponentsModule',
    newImportPath: `${SPARTACUS_ASM}/components`,
  },
  // projects/core/src/asm/config/asm-config.ts
  {
    previousNode: ASM_CONFIG,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/connectors/asm.adapter.ts
  {
    previousNode: ASM_ADAPTER,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/connectors/asm.connector.ts
  {
    previousNode: ASM_CONNECTOR,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/connectors/converters.ts
  {
    previousNode: CUSTOMER_SEARCH_PAGE_NORMALIZER,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/facade/asm.service.ts
  {
    previousNode: ASM_SERVICE,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/facade/csagent-auth.service.ts
  {
    previousNode: CS_AGENT_AUTH_SERVICE,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/root`,
  },
  // projects/core/src/asm/models/asm.models.ts
  {
    previousNode: CUSTOMER_SEARCH_PAGE,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/models/asm.models.ts
  {
    previousNode: CUSTOMER_SEARCH_OPTIONS,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/models/asm.models.ts
  {
    previousNode: ASM_UI,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/services/asm-auth-http-header.service.ts
  {
    previousNode: ASM_AUTH_HTTP_HEADER_SERVICE,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/root`,
  },
  // projects/core/src/asm/services/asm-auth.service.ts
  {
    previousNode: TOKEN_TARGET,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/root`,
  },
  // projects/core/src/asm/services/asm-auth-storage.service.ts
  {
    previousNode: ASM_AUTH_STORAGE_SERVICE,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/root`,
  },
  // projects/core/src/asm/services/asm-state-persistence.service.ts
  {
    previousNode: SYNCED_ASM_STATE,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/services/asm-state-persistence.service.ts
  {
    previousNode: ASM_STATE_PERSISTENCE_SERVICE,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/store/actions/asm-ui.action.ts
  {
    previousNode: ASM_UI_UPDATE,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/store/actions/asm-ui.action.ts
  {
    previousNode: ASM_UI_UPDATE_CLASS,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/store/actions/asm-ui.action.ts
  {
    previousNode: ASM_UI_ACTION,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/store/actions/customer.action.ts
  {
    previousNode: CUSTOMER_SEARCH,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/store/actions/customer.action.ts
  {
    previousNode: CUSTOMER_SEARCH_CLASS,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/store/actions/customer.action.ts
  {
    previousNode: CUSTOMER_SEARCH_FAIL,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/store/actions/customer.action.ts
  {
    previousNode: CUSTOMER_SEARCH_FAIL_CLASS,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/store/actions/customer.action.ts
  {
    previousNode: CUSTOMER_SEARCH_SUCCESS,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/store/actions/customer.action.ts
  {
    previousNode: CUSTOMER_SEARCH_SUCCESS_CLASS,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/store/actions/customer.action.ts
  {
    previousNode: CUSTOMER_SEARCH_RESET,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/store/actions/customer.action.ts
  {
    previousNode: CUSTOMER_SEARCH_RESET_CLASS,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/store/actions/customer.action.ts
  {
    previousNode: CUSTOMER_ACTION,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/store/actions/logout-agent.action.ts
  {
    previousNode: LOGOUT_CUSTOMER_SUPPORT_AGENT,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/store/actions/logout-agent.action.ts
  {
    previousNode: LOGOUT_CUSTOMER_SUPPORT_AGENT_CLASS,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/store/asm-state.ts
  {
    previousNode: ASM_FEATURE,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/store/asm-state.ts
  {
    previousNode: CUSTOMER_SEARCH_DATA,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/store/asm-state.ts
  {
    previousNode: STATE_WITH_ASM,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/store/asm-state.ts
  {
    previousNode: ASM_STATE,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/store/selectors/asm-ui.selectors.ts
  {
    previousNode: GET_ASM_UI,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/store/selectors/asm-ui.selectors.ts
  {
    previousNode: GET_CUSTOMER_SEARCH_RESULTS_LOADER_STATE,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/store/selectors/asm-ui.selectors.ts
  {
    previousNode: GET_CUSTOMER_SEARCH_RESULTS,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/store/selectors/asm-ui.selectors.ts
  {
    previousNode: GET_CUSTOMER_SEARCH_RESULTS_LOADING,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/store/selectors/asm-ui.selectors.ts
  {
    previousNode: GET_CUSTOMER_SEARCH_RESULTS_LOADING,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/store/selectors/feature.selector.ts
  {
    previousNode: GET_ASM_STATE,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/personalization/config/personalization-config.ts
  {
    previousNode: PERSONALIZATION_CONFIG,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_TRACKING}/personalization/root`,
  },
  // projects/core/src/personalization/services/personalization-context.service.ts
  {
    previousNode: PERSONALIZATION_CONTEXT_SERVICE,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_TRACKING}/personalization/core`,
  },
  // projects/core/src/personalization/model/personalization-context.model.ts
  {
    previousNode: PERSONALIZATION_ACTION,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_TRACKING}/personalization/core`,
  },
  // projects/core/src/personalization/model/personalization-context.model.ts
  {
    previousNode: PERSONALIZATION_CONTEXT,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_TRACKING}/personalization/core`,
  },
  // projects/core/src/smart-edit/services/smart-edit.service.ts
  {
    previousNode: SMART_EDIT_SERVICE,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_SMARTEDIT}/core`,
  },
  // projects/storefrontlib/src/cms-components/product/product-variants/variant-style-icons/variant-style-icons.component.ts
  {
    previousNode: VARIANT_STYLE_ICONS_COMPONENT,
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: `${SPARTACUS_PRODUCT}/variants/root`,
  },
  // projects/storefrontlib/src/cms-components/product/product-variants/variant-style-icons/variant-style-icons.module.ts
  {
    previousNode: VARIANT_STYLE_ICONS_MODULE,
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: `${SPARTACUS_PRODUCT}/variants/root`,
  },
  // projects/storefrontlib/src/cms-components/myaccount/close-account/close-account.module.ts
  {
    previousNode: CLOSE_ACCOUNT_MODULE,
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_USER_PROFILE_COMPONENTS,
  },
  // projects/storefrontlib/src/cms-components/myaccount/forgot-password/forgot-password.module.ts
  {
    previousNode: FORGOT_PASSWORD_MODULE,
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_USER_PROFILE_COMPONENTS,
  },
  // projects/storefrontlib/src/cms-components/user/register/register.module.ts
  {
    previousNode: REGISTER_COMPONENT_MODULE,
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_USER_PROFILE_COMPONENTS,
  },
  // projects/storefrontlib/src/cms-components/myaccount/reset-password/reset-password.module.ts
  {
    previousNode: RESET_PASSWORD_MODULE,
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_USER_PROFILE_COMPONENTS,
  },
  // projects/storefrontlib/src/cms-components/myaccount/update-email/update-email.module.ts
  {
    previousNode: UPDATE_EMAIL_MODULE,
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_USER_PROFILE_COMPONENTS,
  },
  // projects/storefrontlib/src/cms-components/myaccount/update-password/update-password.module.ts
  {
    previousNode: UPDATE_PASSWORD_MODULE,
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_USER_PROFILE_COMPONENTS,
  },
  // projects/storefrontlib/src/cms-components/myaccount/update-profile/update-profile.module.ts
  {
    previousNode: UPDATE_PROFILE_MODULE,
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_USER_PROFILE_COMPONENTS,
  },
  // projects/storefrontlib/src/cms-components/user/login/login.module.ts
  {
    previousNode: LOGIN_MODULE,
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_USER_ACCOUNT_COMPONENTS,
  },
  // projects/storefrontlib/src/cms-components/user/login-form/login-form.module.ts
  {
    previousNode: LOGIN_FORM_MODULE,
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_USER_ACCOUNT_COMPONENTS,
  },
  // projects/storefrontlib/src/cms-components/user/login-register/login-register.module.ts
  {
    previousNode: LOGIN_REGISTER_MODULE,
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_USER_ACCOUNT_COMPONENTS,
  },
  // projects/storefrontlib/src/cms-components/myaccount/close-account/components/close-account/close-account.component.ts
  {
    previousNode: CLOSE_ACCOUNT_COMPONENT,
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_USER_PROFILE_COMPONENTS,
  },
  // projects/storefrontlib/src/cms-components/user/login-register/login-register.component.ts
  {
    previousNode: LOGIN_REGISTER_COMPONENT,
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_USER_ACCOUNT_COMPONENTS,
    // feature-libs/checkout/components/services/express-checkout.service.ts
  },
];

export function migrate(): Rule {
  return (tree: Tree) => {
    return migrateRenamedSymbols(tree, RENAMED_SYMBOLS_DATA);
  };
}
