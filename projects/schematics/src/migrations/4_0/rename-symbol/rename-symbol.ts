import { Rule, Tree } from '@angular-devkit/schematics';
import {
  ASM_ACTIONS,
  ASM_ADAPTER,
  ASM_AUTH_HTTP_HEADER_SERVICE,
  ASM_AUTH_SERVICE,
  ASM_AUTH_STORAGE_SERVICE,
  ASM_CONFIG,
  ASM_CONNECTOR,
  ASM_FEATURE,
  ASM_MODULE,
  ASM_OCC_MODULE,
  ASM_SELECTORS,
  ASM_SERVICE,
  ASM_STATE,
  ASM_STATE_PERSISTENCE_SERVICE,
  ASM_UI,
  BUDGET_ROUTING_CONFIG,
  CART_NOT_EMPTY_GUARD,
  CLOSE_ACCOUNT_COMPONENT,
  CLOSE_ACCOUNT_MODULE,
  COST_CENTER_ROUTING_CONFIG,
  CS_AGENT_AUTH_SERVICE,
  CUSTOMER_SEARCH_DATA,
  CUSTOMER_SEARCH_OPTIONS,
  CUSTOMER_SEARCH_PAGE,
  CUSTOMER_SEARCH_PAGE_NORMALIZER,
  DEFAULT_BUDGET_ROUTING_CONFIG,
  DEFAULT_COST_CENTER_ROUTING_CONFIG,
  DEFAULT_PERMISSION_ROUTING_CONFIG,
  DEFAULT_UNITS_ROUTING_CONFIG,
  DEFAULT_USER_GROUP_ROUTING_CONFIG,
  DEFAULT_USER_ROUTING_CONFIG,
  FORGOT_PASSWORD_MODULE,
  ITEM,
  LOGIN_FORM_MODULE,
  LOGIN_MODULE,
  LOGIN_REGISTER_COMPONENT,
  LOGIN_REGISTER_MODULE,
  OCC_ASM_ADAPTER,
  ORDER_ENTRY,
  PERMISSION_ROUTING_CONFIG,
  PERSONALIZATION_ACTION,
  PERSONALIZATION_CONFIG,
  PERSONALIZATION_CONTEXT,
  PERSONALIZATION_CONTEXT_SERVICE,
  PRODUCT_VARIANT_STYLE_ICONS_COMPONENT,
  PRODUCT_VARIANT_STYLE_ICONS_MODULE,
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
  SPARTACUS_CHECKOUT_CORE,
  SPARTACUS_CHECKOUT_OCC,
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
  // projects/storefrontlib/cms-components/product/config/default-view-config.ts
  {
    previousNode: 'defaultScrollConfig',
    previousImportPath: '@spartacus/storefront',
    newNode: 'defaultViewConfig',
  },
  // projects/storefrontlib/cms-components/misc/qualtrics/qualtrics-loader.service.ts
  {
    previousNode: QUALTRICS_LOADER_SERVICE,
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: `${SPARTACUS_QUALTRICS}/components`,
  },
  // projects/storefrontlib/cms-components/misc/qualtrics/config/qualtrics-config.ts
  {
    previousNode: QUALTRICS_CONFIG,
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: `${SPARTACUS_QUALTRICS}/components`,
  },
  // projects/storefrontlib/cms-components/misc/qualtrics/qualtrics-loader.service.ts
  {
    previousNode: QUALTRICS_EVENT_NAME,
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: `${SPARTACUS_QUALTRICS}/components`,
  },
  // projects/storefrontlib/cms-components/misc/qualtrics/qualtrics.component.ts
  {
    previousNode: QUALTRICS_COMPONENT,
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: `${SPARTACUS_QUALTRICS}/components`,
  },
  // projects/storefrontlib/cms-components/misc/qualtrics/qualtrics.module.ts
  {
    previousNode: QUALTRICS_MODULE,
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newNode: 'QualtricsComponentsModule',
    newImportPath: `${SPARTACUS_QUALTRICS}/components`,
  },
  // projects/storefrontlib/cms-components/asm/asm.module.ts
  {
    previousNode: ASM_MODULE,
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newNode: 'AsmComponentsModule',
    newImportPath: `${SPARTACUS_ASM}/components`,
  },
  // projects/core/src/occ/adapters/asm/asm-occ.module.ts
  {
    previousNode: ASM_OCC_MODULE,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/occ`,
  },
  // projects/core/src/occ/adapters/asm/occ-asm.adapter.ts
  {
    previousNode: OCC_ASM_ADAPTER,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/occ`,
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
  // projects/core/src/asm/store/actions/customer.action.ts
  // projects/core/src/asm/store/actions/logout-agent.action.ts
  {
    previousNode: ASM_ACTIONS,
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
  // projects/core/src/asm/store/selectors/feature.selector.ts
  {
    previousNode: ASM_SELECTORS,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/core`,
  },
  // projects/core/src/asm/services/asm-auth.service.ts
  {
    previousNode: ASM_AUTH_SERVICE,
    previousImportPath: SPARTACUS_CORE,
    newImportPath: `${SPARTACUS_ASM}/root`,
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
  // projects/storefrontlib/cms-components/product/product-variants/variant-style-icons/variant-style-icons.component.ts
  {
    previousNode: VARIANT_STYLE_ICONS_COMPONENT,
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newNode: PRODUCT_VARIANT_STYLE_ICONS_COMPONENT,
    newImportPath: `${SPARTACUS_PRODUCT}/variants/root`,
  },
  // projects/storefrontlib/cms-components/product/product-variants/variant-style-icons/variant-style-icons.module.ts
  {
    previousNode: VARIANT_STYLE_ICONS_MODULE,
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newNode: PRODUCT_VARIANT_STYLE_ICONS_MODULE,
    newImportPath: `${SPARTACUS_PRODUCT}/variants/root`,
  },
  // projects/storefrontlib/cms-components/myaccount/close-account/close-account.module.ts
  {
    previousNode: CLOSE_ACCOUNT_MODULE,
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_USER_PROFILE_COMPONENTS,
  },
  // projects/storefrontlib/cms-components/myaccount/forgot-password/forgot-password.module.ts
  {
    previousNode: FORGOT_PASSWORD_MODULE,
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_USER_PROFILE_COMPONENTS,
  },
  // projects/storefrontlib/cms-components/user/register/register.module.ts
  {
    previousNode: REGISTER_COMPONENT_MODULE,
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_USER_PROFILE_COMPONENTS,
  },
  // projects/storefrontlib/cms-components/myaccount/reset-password/reset-password.module.ts
  {
    previousNode: RESET_PASSWORD_MODULE,
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_USER_PROFILE_COMPONENTS,
  },
  // projects/storefrontlib/cms-components/myaccount/update-email/update-email.module.ts
  {
    previousNode: UPDATE_EMAIL_MODULE,
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_USER_PROFILE_COMPONENTS,
  },
  // projects/storefrontlib/cms-components/myaccount/update-password/update-password.module.ts
  {
    previousNode: UPDATE_PASSWORD_MODULE,
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_USER_PROFILE_COMPONENTS,
  },
  // projects/storefrontlib/cms-components/myaccount/update-profile/update-profile.module.ts
  {
    previousNode: UPDATE_PROFILE_MODULE,
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_USER_PROFILE_COMPONENTS,
  },
  // projects/storefrontlib/cms-components/user/login/login.module.ts
  {
    previousNode: LOGIN_MODULE,
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_USER_ACCOUNT_COMPONENTS,
  },
  // projects/storefrontlib/cms-components/user/login-form/login-form.module.ts
  {
    previousNode: LOGIN_FORM_MODULE,
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_USER_ACCOUNT_COMPONENTS,
  },
  // projects/storefrontlib/cms-components/user/login-register/login-register.module.ts
  {
    previousNode: LOGIN_REGISTER_MODULE,
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_USER_ACCOUNT_COMPONENTS,
  },
  // projects/storefrontlib/cms-components/myaccount/close-account/components/close-account/close-account.component.ts
  {
    previousNode: CLOSE_ACCOUNT_COMPONENT,
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_USER_PROFILE_COMPONENTS,
  },
  // projects/storefrontlib/cms-components/user/login-register/login-register.component.ts
  {
    previousNode: LOGIN_REGISTER_COMPONENT,
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_USER_ACCOUNT_COMPONENTS,
  },
  // projects/storefrontlib/cms-components/cart/cart-shared/cart-item/cart-item.component.ts
  {
    previousNode: ITEM,
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newNode: ORDER_ENTRY,
    newImportPath: SPARTACUS_CORE,
  },
];

export const CHECKOUT_LIB_MOVED_SYMBOLS_DATA: RenamedSymbol[] = [
  // projects/storefrontlib/cms-components/user/checkout-login/*
  {
    previousNode: 'CheckoutLoginComponent',
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_CHECKOUT_COMPONENTS,
  },
  {
    previousNode: 'CheckoutLoginModule',
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_CHECKOUT_COMPONENTS,
  },
  // projects/storefrontlib/cms-components/order-confirmation/*
  {
    previousNode: 'OrderConfirmationModule',
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_CHECKOUT_COMPONENTS,
  },
  {
    previousNode: 'ReplenishmentOrderConfirmationModule',
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_CHECKOUT_COMPONENTS,
  },
  {
    previousNode: 'OrderConfirmationGuard',
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_CHECKOUT_COMPONENTS,
  },
  {
    previousNode: 'GuestRegisterFormComponent',
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_CHECKOUT_COMPONENTS,
  },
  {
    previousNode: 'OrderConfirmationItemsComponent',
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_CHECKOUT_COMPONENTS,
  },
  {
    previousNode: 'OrderConfirmationOverviewComponent',
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_CHECKOUT_COMPONENTS,
  },
  {
    previousNode: 'OrderConfirmationThankYouMessageComponent',
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_CHECKOUT_COMPONENTS,
  },
  {
    previousNode: 'OrderConfirmationTotalsComponent',
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_CHECKOUT_COMPONENTS,
  },
  // projects/storefrontlib/cms-components/checkout/*
  {
    previousNode: 'CheckoutComponentModule',
    newNode: 'CheckoutComponentsModule',
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_CHECKOUT_COMPONENTS,
  },
  {
    previousNode: 'CheckoutOrchestratorComponent',
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_CHECKOUT_COMPONENTS,
  },
  {
    previousNode: 'CheckoutOrchestratorModule',
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_CHECKOUT_COMPONENTS,
  },
  {
    previousNode: 'CheckoutOrderSummaryComponent',
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_CHECKOUT_COMPONENTS,
  },
  {
    previousNode: 'CheckoutOrderSummaryModule',
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_CHECKOUT_COMPONENTS,
  },
  {
    previousNode: 'CheckoutProgressComponent',
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_CHECKOUT_COMPONENTS,
  },
  {
    previousNode: 'CheckoutProgressModule',
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_CHECKOUT_COMPONENTS,
  },
  {
    previousNode: 'CheckoutProgressMobileBottomComponent',
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_CHECKOUT_COMPONENTS,
  },
  {
    previousNode: 'CheckoutProgressMobileBottomModule',
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_CHECKOUT_COMPONENTS,
  },
  {
    previousNode: 'CheckoutProgressMobileTopComponent',
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_CHECKOUT_COMPONENTS,
  },
  {
    previousNode: 'CheckoutProgressMobileTopModule',
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_CHECKOUT_COMPONENTS,
  },
  {
    previousNode: 'DeliveryModeComponent',
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_CHECKOUT_COMPONENTS,
  },
  {
    previousNode: 'DeliveryModeModule',
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_CHECKOUT_COMPONENTS,
  },
  {
    previousNode: 'PaymentMethodComponent',
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_CHECKOUT_COMPONENTS,
  },
  {
    previousNode: 'PaymentMethodModule',
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_CHECKOUT_COMPONENTS,
  },
  {
    previousNode: 'PaymentFormComponent',
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_CHECKOUT_COMPONENTS,
  },
  {
    previousNode: 'PaymentFormModule',
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_CHECKOUT_COMPONENTS,
  },
  {
    previousNode: 'PlaceOrderComponent',
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_CHECKOUT_COMPONENTS,
  },
  {
    previousNode: 'PlaceOrderModule',
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_CHECKOUT_COMPONENTS,
  },
  {
    previousNode: 'ReviewSubmitComponent',
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_CHECKOUT_COMPONENTS,
  },
  {
    previousNode: 'ReviewSubmitModule',
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_CHECKOUT_COMPONENTS,
  },
  {
    previousNode: 'ScheduleReplenishmentOrderComponent',
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_CHECKOUT_COMPONENTS,
  },
  {
    previousNode: 'ScheduleReplenishmentOrderModule',
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_CHECKOUT_COMPONENTS,
  },
  {
    previousNode: 'CardWithAddress',
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_CHECKOUT_COMPONENTS,
  },
  {
    previousNode: 'ShippingAddressComponent',
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_CHECKOUT_COMPONENTS,
  },
  {
    previousNode: 'ShippingAddressModule',
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_CHECKOUT_COMPONENTS,
  },
  {
    previousNode: 'DeliveryModePreferences',
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_CHECKOUT_ROOT,
  },
  {
    previousNode: 'CheckoutConfig',
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_CHECKOUT_ROOT,
  },
  {
    previousNode: 'CheckoutAuthGuard',
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_CHECKOUT_COMPONENTS,
  },
  {
    previousNode: 'CheckoutStepsSetGuard',
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_CHECKOUT_COMPONENTS,
  },
  {
    previousNode: 'CheckoutGuard',
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_CHECKOUT_COMPONENTS,
  },
  {
    previousNode: 'NotCheckoutAuthGuard',
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_CHECKOUT_COMPONENTS,
  },
  {
    previousNode: 'CheckoutStepType',
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_CHECKOUT_ROOT,
  },
  {
    previousNode: 'checkoutShippingSteps',
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_CHECKOUT_ROOT,
  },
  {
    previousNode: 'checkoutPaymentSteps',
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_CHECKOUT_ROOT,
  },
  {
    previousNode: 'CheckoutStep',
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_CHECKOUT_ROOT,
  },
  {
    previousNode: 'CheckoutConfigService',
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_CHECKOUT_COMPONENTS,
  },
  {
    previousNode: 'CheckoutDetailsService',
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_CHECKOUT_COMPONENTS,
  },
  {
    previousNode: 'CheckoutReplenishmentFormService',
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_CHECKOUT_COMPONENTS,
  },
  {
    previousNode: 'CheckoutStepService',
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_CHECKOUT_COMPONENTS,
  },
  {
    previousNode: 'ExpressCheckoutService',
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_CHECKOUT_COMPONENTS,
  },
  // projects/core/src/occ/adapters/checkout/*
  {
    previousNode: 'CheckoutOccModule',
    previousImportPath: SPARTACUS_CORE,
    newImportPath: SPARTACUS_CHECKOUT_OCC,
  },
  {
    previousNode: 'OccCheckoutCostCenterAdapter',
    previousImportPath: SPARTACUS_CORE,
    newImportPath: SPARTACUS_CHECKOUT_OCC,
  },
  {
    previousNode: 'OccCheckoutDeliveryAdapter',
    previousImportPath: SPARTACUS_CORE,
    newImportPath: SPARTACUS_CHECKOUT_OCC,
  },
  {
    previousNode: 'OccCheckoutPaymentTypeAdapter',
    previousImportPath: SPARTACUS_CORE,
    newImportPath: SPARTACUS_CHECKOUT_OCC,
  },
  {
    previousNode: 'OccCheckoutPaymentAdapter',
    previousImportPath: SPARTACUS_CORE,
    newImportPath: SPARTACUS_CHECKOUT_OCC,
  },
  {
    previousNode: 'OccCheckoutReplenishmentOrderAdapter',
    previousImportPath: SPARTACUS_CORE,
    newImportPath: SPARTACUS_CHECKOUT_OCC,
  },
  {
    previousNode: 'OccCheckoutAdapter',
    previousImportPath: SPARTACUS_CORE,
    newImportPath: SPARTACUS_CHECKOUT_OCC,
  },
  {
    previousNode: 'OccReplenishmentOrderFormSerializer',
    previousImportPath: SPARTACUS_CORE,
    newImportPath: SPARTACUS_CHECKOUT_OCC,
  },
  // projects/core/src/checkout/*
  {
    previousNode: 'CheckoutModule',
    newNode: 'CheckoutCoreModule',
    previousImportPath: SPARTACUS_CORE,
    newImportPath: SPARTACUS_CHECKOUT_CORE,
  },
  {
    previousNode: 'CheckoutAdapter',
    previousImportPath: SPARTACUS_CORE,
    newImportPath: SPARTACUS_CHECKOUT_CORE,
  },
  {
    previousNode: 'CheckoutConnector',
    previousImportPath: SPARTACUS_CORE,
    newImportPath: SPARTACUS_CHECKOUT_CORE,
  },
  {
    previousNode: 'CheckoutCostCenterAdapter',
    previousImportPath: SPARTACUS_CORE,
    newImportPath: SPARTACUS_CHECKOUT_CORE,
  },
  {
    previousNode: 'CheckoutCostCenterConnector',
    previousImportPath: SPARTACUS_CORE,
    newImportPath: SPARTACUS_CHECKOUT_CORE,
  },
  {
    previousNode: 'CheckoutDeliveryAdapter',
    previousImportPath: SPARTACUS_CORE,
    newImportPath: SPARTACUS_CHECKOUT_CORE,
  },
  {
    previousNode: 'CheckoutDeliveryConnector',
    previousImportPath: SPARTACUS_CORE,
    newImportPath: SPARTACUS_CHECKOUT_CORE,
  },
  {
    previousNode: 'DELIVERY_MODE_NORMALIZER',
    previousImportPath: SPARTACUS_CORE,
    newImportPath: SPARTACUS_CHECKOUT_CORE,
  },
  {
    previousNode: 'CheckoutPaymentAdapter',
    previousImportPath: SPARTACUS_CORE,
    newImportPath: SPARTACUS_CHECKOUT_CORE,
  },
  {
    previousNode: 'CheckoutPaymentConnector',
    previousImportPath: SPARTACUS_CORE,
    newImportPath: SPARTACUS_CHECKOUT_CORE,
  },
  {
    previousNode: 'PAYMENT_DETAILS_SERIALIZER',
    previousImportPath: SPARTACUS_CORE,
    newImportPath: SPARTACUS_CHECKOUT_CORE,
  },
  {
    previousNode: 'CARD_TYPE_NORMALIZER',
    previousImportPath: SPARTACUS_CORE,
    newImportPath: SPARTACUS_CHECKOUT_CORE,
  },
  {
    previousNode: 'PAYMENT_TYPE_NORMALIZER',
    previousImportPath: SPARTACUS_CORE,
    newImportPath: SPARTACUS_CHECKOUT_CORE,
  },
  {
    previousNode: 'PaymentTypeAdapter',
    previousImportPath: SPARTACUS_CORE,
    newImportPath: SPARTACUS_CHECKOUT_CORE,
  },
  {
    previousNode: 'PaymentTypeConnector',
    previousImportPath: SPARTACUS_CORE,
    newImportPath: SPARTACUS_CHECKOUT_CORE,
  },
  {
    previousNode: 'PaymentTypeConnector',
    previousImportPath: SPARTACUS_CORE,
    newImportPath: SPARTACUS_CHECKOUT_CORE,
  },
  {
    previousNode: 'CheckoutReplenishmentOrderAdapter',
    previousImportPath: SPARTACUS_CORE,
    newImportPath: SPARTACUS_CHECKOUT_CORE,
  },
  {
    previousNode: 'CheckoutReplenishmentOrderConnector',
    previousImportPath: SPARTACUS_CORE,
    newImportPath: SPARTACUS_CHECKOUT_CORE,
  },
  {
    previousNode: 'REPLENISHMENT_ORDER_FORM_SERIALIZER',
    previousImportPath: SPARTACUS_CORE,
    newImportPath: SPARTACUS_CHECKOUT_CORE,
  },
  {
    previousNode: 'CheckoutEventBuilder',
    previousImportPath: SPARTACUS_CORE,
    newImportPath: SPARTACUS_CHECKOUT_CORE,
  },
  {
    previousNode: 'CheckoutEventModule',
    previousImportPath: SPARTACUS_CORE,
    newImportPath: SPARTACUS_CHECKOUT_CORE,
  },
  {
    previousNode: 'OrderPlacedEvent',
    previousImportPath: SPARTACUS_CORE,
    newImportPath: SPARTACUS_CHECKOUT_ROOT,
  },
  {
    previousNode: 'CheckoutCostCenterService',
    newNode: 'CheckoutCostCenterFacade',
    previousImportPath: SPARTACUS_CORE,
    newImportPath: SPARTACUS_CHECKOUT_ROOT,
  },
  {
    previousNode: 'CheckoutDeliveryService',
    newNode: 'CheckoutDeliveryFacade',
    previousImportPath: SPARTACUS_CORE,
    newImportPath: SPARTACUS_CHECKOUT_ROOT,
  },
  {
    previousNode: 'CheckoutPaymentService',
    newNode: 'CheckoutPaymentFacade',
    previousImportPath: SPARTACUS_CORE,
    newImportPath: SPARTACUS_CHECKOUT_ROOT,
  },
  {
    previousNode: 'CheckoutService',
    newNode: 'CheckoutFacade',
    previousImportPath: SPARTACUS_CORE,
    newImportPath: SPARTACUS_CHECKOUT_ROOT,
  },
  {
    previousNode: 'PaymentTypeService',
    newNode: 'PaymentTypeFacade',
    previousImportPath: SPARTACUS_CORE,
    newImportPath: SPARTACUS_CHECKOUT_ROOT,
  },
  {
    previousNode: 'ClearCheckoutService',
    newNode: 'ClearCheckoutFacade',
    previousImportPath: SPARTACUS_CORE,
    newImportPath: SPARTACUS_CHECKOUT_ROOT,
  },
  {
    previousNode: 'CheckoutDetails',
    previousImportPath: SPARTACUS_CORE,
    newImportPath: SPARTACUS_CHECKOUT_CORE,
  },
  {
    previousNode: 'CheckoutPageMetaResolver',
    previousImportPath: SPARTACUS_CORE,
    newImportPath: SPARTACUS_CHECKOUT_CORE,
  },
  {
    previousNode: 'CHECKOUT_FEATURE',
    previousImportPath: SPARTACUS_CORE,
    newImportPath: SPARTACUS_CHECKOUT_CORE,
  },
  {
    previousNode: 'CHECKOUT_DETAILS',
    previousImportPath: SPARTACUS_CORE,
    newImportPath: SPARTACUS_CHECKOUT_CORE,
  },
  {
    previousNode: 'SET_DELIVERY_ADDRESS_PROCESS_ID',
    previousImportPath: SPARTACUS_CORE,
    newImportPath: SPARTACUS_CHECKOUT_CORE,
  },
  {
    previousNode: 'SET_DELIVERY_MODE_PROCESS_ID',
    previousImportPath: SPARTACUS_CORE,
    newImportPath: SPARTACUS_CHECKOUT_CORE,
  },
  {
    previousNode: 'SET_SUPPORTED_DELIVERY_MODE_PROCESS_ID',
    previousImportPath: SPARTACUS_CORE,
    newImportPath: SPARTACUS_CHECKOUT_CORE,
  },
  {
    previousNode: 'SET_PAYMENT_DETAILS_PROCESS_ID',
    previousImportPath: SPARTACUS_CORE,
    newImportPath: SPARTACUS_CHECKOUT_CORE,
  },
  {
    previousNode: 'GET_PAYMENT_TYPES_PROCESS_ID',
    previousImportPath: SPARTACUS_CORE,
    newImportPath: SPARTACUS_CHECKOUT_CORE,
  },
  {
    previousNode: 'SET_COST_CENTER_PROCESS_ID',
    previousImportPath: SPARTACUS_CORE,
    newImportPath: SPARTACUS_CHECKOUT_CORE,
  },
  {
    previousNode: 'PLACED_ORDER_PROCESS_ID',
    previousImportPath: SPARTACUS_CORE,
    newImportPath: SPARTACUS_CHECKOUT_CORE,
  },
  {
    previousNode: 'StateWithCheckout',
    previousImportPath: SPARTACUS_CORE,
    newImportPath: SPARTACUS_CHECKOUT_CORE,
  },
  {
    previousNode: 'CardTypesState',
    previousImportPath: SPARTACUS_CORE,
    newImportPath: SPARTACUS_CHECKOUT_CORE,
  },
  {
    previousNode: 'CheckoutStepsState',
    previousImportPath: SPARTACUS_CORE,
    newImportPath: SPARTACUS_CHECKOUT_CORE,
  },
  {
    previousNode: 'PaymentTypesState',
    previousImportPath: SPARTACUS_CORE,
    newImportPath: SPARTACUS_CHECKOUT_CORE,
  },
  {
    previousNode: 'OrderTypesState',
    previousImportPath: SPARTACUS_CORE,
    newImportPath: SPARTACUS_CHECKOUT_CORE,
  },
  {
    previousNode: 'PaymentTypesState',
    previousImportPath: SPARTACUS_CORE,
    newImportPath: SPARTACUS_CHECKOUT_CORE,
  },
  {
    previousNode: 'CheckoutState',
    previousImportPath: SPARTACUS_CORE,
    newImportPath: SPARTACUS_CHECKOUT_CORE,
  },
  {
    previousNode: 'CheckoutActions',
    previousImportPath: SPARTACUS_CORE,
    newImportPath: SPARTACUS_CHECKOUT_CORE,
  },
  {
    previousNode: 'CheckoutSelectors',
    previousImportPath: SPARTACUS_CORE,
    newImportPath: SPARTACUS_CHECKOUT_CORE,
  },
  // projects/storefrontlib/cms-components/cart/cart-not-empty.guard.ts
  {
    previousNode: CART_NOT_EMPTY_GUARD,
    previousImportPath: SPARTACUS_STOREFRONTLIB,
    newImportPath: SPARTACUS_CHECKOUT_COMPONENTS,
  },
];

export function migrate(): Rule {
  return (tree: Tree) => {
    return migrateRenamedSymbols(tree, [
      ...RENAMED_SYMBOLS_DATA,
      ...CHECKOUT_LIB_MOVED_SYMBOLS_DATA,
    ]);
  };
}
