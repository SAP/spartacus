import { Rule, Tree } from '@angular-devkit/schematics';
import {
  BUDGET_ROUTING_CONFIG,
  COST_CENTER_ROUTING_CONFIG,
  DEFAULT_BUDGET_ROUTING_CONFIG,
  DEFAULT_COST_CENTER_ROUTING_CONFIG,
  DEFAULT_PERMISSION_ROUTING_CONFIG,
  DEFAULT_UNITS_ROUTING_CONFIG,
  DEFAULT_USER_GROUP_ROUTING_CONFIG,
  DEFAULT_USER_ROUTING_CONFIG,
  PERMISSION_ROUTING_CONFIG,
  SPARTACUS_CHECKOUT_COMPONENTS,
  SPARTACUS_CHECKOUT_CORE,
  SPARTACUS_CHECKOUT_OCC,
  SPARTACUS_CHECKOUT_ROOT,
  SPARTACUS_CORE,
  SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS,
  SPARTACUS_ORGANIZATION_ADMINISTRATION_ROOT,
  SPARTACUS_STOREFRONTLIB,
  UNITS_ROUTING_CONFIG,
  USER_GROUP_ROUTING_CONFIG,
  USER_ROUTING_CONFIG,
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
];

export const CHECKOUT_LIB_MOVED_SYMBOLS_DATA: RenamedSymbol[] = [
  // projects/storefrontlib/src/cms-components/user/checkout-login/*
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
  // projects/storefrontlib/src/cms-components/order-confirmation/*
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
  // projects/storefrontlib/src/cms-components/checkout/*
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
  //=-----
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
    previousNode: 'AddressVerificationState',
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
];

export function migrate(): Rule {
  return (tree: Tree) => {
    return migrateRenamedSymbols(tree, [
      ...RENAMED_SYMBOLS_DATA,
      ...CHECKOUT_LIB_MOVED_SYMBOLS_DATA,
    ]);
  };
}
