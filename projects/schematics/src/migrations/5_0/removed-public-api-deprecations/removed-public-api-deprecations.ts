/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import {
  BAD_REQUEST_HANDLER,
  BAD_VOUCHER_REQUEST_HANDLER,
  CDS_MERCHANDISING_FACET_NORMALIZER,
  CDS_MERCHANDISING_FACET_TO_QUERY_PARAM_NORMALIZER,
  CONFIGURATOR_EVENT_LISTENER,
  HANDLE_VOUCHER_OPERATION_ERROR,
  MODAL_DIRECTIVE,
  MODAL_DIRECTIVE_OPTIONS,
  MODAL_DIRECTIVE_SERVICE,
  MODAL_MODULE,
  MODAL_OPTIONS,
  MODAL_REF,
  MODAL_SERVICE,
} from '../../../shared/constants';
import {
  SPARTACUS_CDS,
  SPARTACUS_CORE,
  SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
  SPARTACUS_STOREFRONTLIB,
} from '../../../shared/libs-constants';

import { DeprecatedNode } from '../../../shared/utils/file-utils';
import { removedPublicApiDeprecation } from '../../mechanism/removed-public-api-deprecations/removed-public-api-deprecation';

export const GENERATED_REMOVED_PUBLIC_API_DATA: DeprecatedNode[] = [
  {
    node: 'DeleteSavedCartFailEvent',
    importPath: '@spartacus/cart/saved-cart/root',
    comment:
      "Class DeleteSavedCartFailEvent has been removed and is no longer part of the public API. Event was moved to 'cart.events.ts' in @spartacus/cart/base/root, and renamed to DeleteCartFailEvent.",
  },
  {
    node: 'DeleteSavedCartSuccessEvent',
    importPath: '@spartacus/cart/saved-cart/root',
    comment:
      "Class DeleteSavedCartSuccessEvent has been removed and is no longer part of the public API. Event was moved to 'cart.events.ts' in @spartacus/cart/base/root, and renamed to DeleteCartSuccessEvent.",
  },
  {
    node: 'OrderConfirmationOverviewComponent',
    importPath: '@spartacus/checkout/components',
    comment:
      "Class OrderConfirmationOverviewComponent has been removed and is no longer part of the public API. Use 'OrderDetailShippingComponent' instead from @spartacus/order/components",
  },
  {
    node: 'ReplenishmentOrderConfirmationModule',
    importPath: '@spartacus/checkout/components',
    comment:
      "Class ReplenishmentOrderConfirmationModule has been removed and is no longer part of the public API. Use 'OrderConfirmationModule' instead as the cms mapping has been consolidated into one module.",
  },
  {
    node: 'ReviewSubmitModule',
    importPath: '@spartacus/checkout/components',
    comment:
      'Class ReviewSubmitModule has been removed and is no longer part of the public API. It has been renamed to CheckoutReviewSubmitModule and moved to @spartacus/checkout/base/components. If it is for a b2b storefront, please use B2BCheckoutReviewSubmitModule in @spartacus/checkout/b2b/components',
  },
  {
    node: 'ShippingAddressModule',
    importPath: '@spartacus/checkout/components',
    comment:
      'Class ShippingAddressModule has been removed and is no longer part of the public API. It has been renamed to CheckoutDeliveryAddressModule and moved to @spartacus/checkout/base/components. If it is for a b2b storefront, please use B2BCheckoutDeliveryAddressModule in @spartacus/checkout/b2b/components',
  },
  {
    node: 'CardTypesState',
    importPath: '@spartacus/checkout/core',
    comment:
      "Interface CardTypesState has been removed and is no longer part of the public API. The card types is no longer found in the NgRX store. You can find the card type 'state' from the query 'getPaymentCardTypesState' in CheckoutPaymentFacade.",
  },
  {
    node: 'CHECKOUT_DETAILS',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CHECKOUT_DETAILS has been removed and is no longer part of the public API. It is not used anymore. Please adapt your checkout library to use Commands & Queries instead of NgRX. You can get the checkout details 'state' through the query 'getCheckoutDetailsState' in CheckoutQueryFacade.",
  },
  {
    node: 'CheckoutActions',
    importPath: '@spartacus/checkout/core',
    comment:
      'Namespace CheckoutActions has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. Please take a look at Commands & Queries documentation on how we handle state https://sap.github.io/spartacus-docs/commands-and-queries.',
  },
  {
    node: 'ADD_DELIVERY_ADDRESS_FAIL',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.ADD_DELIVERY_ADDRESS_FAIL has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. You can leverage RxJS' error handling when calling the 'createAndSetAddress()' from CheckoutDeliveryAddressFacade.",
  },
  {
    node: 'ADD_DELIVERY_ADDRESS_SUCCESS',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.ADD_DELIVERY_ADDRESS_SUCCESS has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. You can use the EventService to listen for 'CheckoutDeliveryAddressCreatedEvent', which gets fired when the address has been successfully added.",
  },
  {
    node: 'ADD_DELIVERY_ADDRESS',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.ADD_DELIVERY_ADDRESS has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. Use 'createAndSetAddress()' from CheckoutDeliveryAddressFacade.",
  },
  {
    node: 'AddDeliveryAddress',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.AddDeliveryAddress has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. Use 'createAndSetAddress()' from CheckoutDeliveryAddressFacade.",
  },
  {
    node: 'AddDeliveryAddressFail',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.AddDeliveryAddressFail has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. You can leverage RxJS' error handling when calling the 'createAndSetAddress()' from CheckoutDeliveryAddressFacade.",
  },
  {
    node: 'AddDeliveryAddressSuccess',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.AddDeliveryAddressSuccess has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. You can use the EventService to listen for 'CheckoutDeliveryAddressCreatedEvent', which gets fired when the address has been successfully added.",
  },
  {
    node: 'CardTypesAction',
    importPath: '@spartacus/checkout/core',
    comment:
      "TypeAlias CheckoutActions.CardTypesAction has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. You can use the query 'getPaymentCardTypesState' in CheckoutPaymentFacade to get the data and state for the card types.",
  },
  {
    node: 'CHECKOUT_CLEAR_MISCS_DATA',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.CHECKOUT_CLEAR_MISCS_DATA has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. You can use the EventService to dispatch events to clear miscellanous data like the payment types with 'CheckoutPaymentTypesQueryResetEvent', supported delivery modes with 'CheckoutSupportedDeliveryModesQueryResetEvent', and card types with 'CheckoutPaymentCardTypesQueryResetEvent'.",
  },
  {
    node: 'CheckoutAction',
    importPath: '@spartacus/checkout/core',
    comment:
      'TypeAlias CheckoutActions.CheckoutAction has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. Please take a look at Commands & Queries documentation on how we handle state https://sap.github.io/spartacus-docs/commands-and-queries.',
  },
  {
    node: 'CheckoutClearMiscsData',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.CheckoutClearMiscsData has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. You can use the EventService to dispatch events to clear miscellanous data like the payment types with 'CheckoutPaymentTypesQueryResetEvent', supported delivery modes with 'CheckoutSupportedDeliveryModesQueryResetEvent', and card types with 'CheckoutPaymentCardTypesQueryResetEvent'.",
  },
  {
    node: 'CLEAR_CHECKOUT_DATA',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.CLEAR_CHECKOUT_DATA has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. You can use the EventService to dispatch an event to clear checkout data by using 'CheckoutQueryResetEvent'.",
  },
  {
    node: 'CLEAR_CHECKOUT_DELIVERY_ADDRESS_FAIL',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.CLEAR_CHECKOUT_DELIVERY_ADDRESS_FAIL has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. You can leverage RxJS' error handling when calling the 'clearCheckoutDeliveryAddress()' from CheckoutDeliveryAddressFacade.",
  },
  {
    node: 'CLEAR_CHECKOUT_DELIVERY_ADDRESS_SUCCESS',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.CLEAR_CHECKOUT_DELIVERY_ADDRESS_SUCCESS has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. You can use the EventService to listen for 'CheckoutDeliveryAddressClearedEvent', which gets fired when the address has been successfully cleared.",
  },
  {
    node: 'CLEAR_CHECKOUT_DELIVERY_ADDRESS',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.CLEAR_CHECKOUT_DELIVERY_ADDRESS has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. Use 'clearCheckoutDeliveryAddress()' from CheckoutDeliveryAddressFacade.",
  },
  {
    node: 'CLEAR_CHECKOUT_DELIVERY_MODE_FAIL',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.CLEAR_CHECKOUT_DELIVERY_MODE_FAIL has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. You can use the EventService to listen for 'CheckoutDeliveryModeClearedErrorEvent', which gets fired when the delivery mode has failed to clear.",
  },
  {
    node: 'CLEAR_CHECKOUT_DELIVERY_MODE_SUCCESS',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.CLEAR_CHECKOUT_DELIVERY_MODE_SUCCESS has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. You can use the EventService to listen for 'CheckoutDeliveryModeClearedEvent', which gets fired when the delivery mode has successfully cleared.",
  },
  {
    node: 'CLEAR_CHECKOUT_DELIVERY_MODE',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.CLEAR_CHECKOUT_DELIVERY_MODE has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. Use 'clearCheckoutDeliveryMode()' from CheckoutDeliveryModesFacade.",
  },
  {
    node: 'CLEAR_CHECKOUT_STEP',
    importPath: '@spartacus/checkout/core',
    comment:
      'Variable CheckoutActions.CLEAR_CHECKOUT_STEP has been removed and is no longer part of the public API. ',
  },
  {
    node: 'CLEAR_PLACE_ORDER',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.CLEAR_PLACE_ORDER has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. Use 'clearPlacedOrder' from OrderFacade instead.",
  },
  {
    node: 'CLEAR_SCHEDULE_REPLENISHMENT_ORDER',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.CLEAR_SCHEDULE_REPLENISHMENT_ORDER has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. Use 'clearPlacedOrder' from OrderFacade instead.",
  },
  {
    node: 'CLEAR_SUPPORTED_DELIVERY_MODES',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.CLEAR_SUPPORTED_DELIVERY_MODES has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. Use 'clearCheckoutDeliveryMode' from CheckoutDeliveryModesFacade instead.",
  },
  {
    node: 'ClearCheckoutData',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.ClearCheckoutData has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. You can use the EventService to dispatch an event to clear checkout data by using 'CheckoutQueryResetEvent'.",
  },
  {
    node: 'ClearCheckoutDeliveryAddress',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.ClearCheckoutDeliveryAddress has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. Use 'clearCheckoutDeliveryAddress' from CheckoutDeliveryAddressFacade.",
  },
  {
    node: 'ClearCheckoutDeliveryAddressFail',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.ClearCheckoutDeliveryAddressFail has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. You can leverage RxJS' error handling when calling the 'clearCheckoutDeliveryAddress()' from CheckoutDeliveryAddressFacade.",
  },
  {
    node: 'ClearCheckoutDeliveryAddressSuccess',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.ClearCheckoutDeliveryAddressSuccess has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. You can use the EventService to listen for 'CheckoutDeliveryAddressClearedEvent', which gets fired when the address has been successfully cleared.",
  },
  {
    node: 'ClearCheckoutDeliveryMode',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.ClearCheckoutDeliveryMode has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. Use 'clearCheckoutDeliveryMode' from CheckoutDeliveryModesFacade instead.",
  },
  {
    node: 'ClearCheckoutDeliveryModeFail',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.ClearCheckoutDeliveryModeFail has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. You can use the EventService to listen for 'CheckoutDeliveryModeClearedErrorEvent', which gets fired when the delivery mode has failed to clear.",
  },
  {
    node: 'ClearCheckoutDeliveryModeSuccess',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.ClearCheckoutDeliveryModeSuccess has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. You can use the EventService to listen for 'CheckoutDeliveryModeClearedEvent', which gets fired when the delivery mode has successfully cleared.",
  },
  {
    node: 'ClearCheckoutStep',
    importPath: '@spartacus/checkout/core',
    comment:
      'Class CheckoutActions.ClearCheckoutStep has been removed and is no longer part of the public API. ',
  },
  {
    node: 'ClearPlaceOrder',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.ClearPlaceOrder has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. Use 'clearPlacedOrder' from OrderFacade instead.",
  },
  {
    node: 'ClearScheduleReplenishmentOrderAction',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.ClearScheduleReplenishmentOrderAction has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. Use 'clearPlacedOrder' from OrderFacade instead.",
  },
  {
    node: 'ClearSupportedDeliveryModes',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.ClearSupportedDeliveryModes has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. Use 'clearCheckoutDeliveryMode' from CheckoutDeliveryModesFacade instead.",
  },
  {
    node: 'CREATE_PAYMENT_DETAILS_FAIL',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.CREATE_PAYMENT_DETAILS_FAIL has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. You can leverage RxJS' error handling when calling the 'createPaymentDetails()' from CheckoutPaymentFacade.",
  },
  {
    node: 'CREATE_PAYMENT_DETAILS_SUCCESS',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.CREATE_PAYMENT_DETAILS_SUCCESS has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. You can use the EventService to listen for 'CheckoutPaymentDetailsCreatedEvent', which gets fired when the payment details has successfully added",
  },
  {
    node: 'CREATE_PAYMENT_DETAILS',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.CREATE_PAYMENT_DETAILS has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. Use'createPaymentDetails()' from CheckoutPaymentFacade.",
  },
  {
    node: 'CreatePaymentDetails',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.CreatePaymentDetails has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. Use 'createPaymentDetails()' from CheckoutPaymentFacade.",
  },
  {
    node: 'CreatePaymentDetailsFail',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.CreatePaymentDetailsFail has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. You can leverage RxJS' error handling when calling the 'createPaymentDetails()' from CheckoutPaymentFacade.",
  },
  {
    node: 'CreatePaymentDetailsSuccess',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.CreatePaymentDetailsSuccess has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. You can use the EventService to listen for 'CheckoutPaymentDetailsCreatedEvent', which gets fired when the payment details has successfully added",
  },
  {
    node: 'LOAD_CARD_TYPES_FAIL',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.LOAD_CARD_TYPES_FAIL has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. You can find the card types 'state' from the query 'getPaymentCardTypesState' in CheckoutPaymentFacade.",
  },
  {
    node: 'LOAD_CARD_TYPES_SUCCESS',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.LOAD_CARD_TYPES_SUCCESS has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. You can find the card types 'state' from the query 'getPaymentCardTypesState' in CheckoutPaymentFacade.",
  },
  {
    node: 'LOAD_CARD_TYPES',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.LOAD_CARD_TYPES has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. You can find the card types 'state' from the query 'getPaymentCardTypesState' in CheckoutPaymentFacade.",
  },
  {
    node: 'LOAD_CHECKOUT_DETAILS_FAIL',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.LOAD_CHECKOUT_DETAILS_FAIL has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. You can get the checkout details 'state' through the query 'getCheckoutDetailsState' in CheckoutQueryFacade.",
  },
  {
    node: 'LOAD_CHECKOUT_DETAILS_SUCCESS',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.LOAD_CHECKOUT_DETAILS_SUCCESS has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. You can get the checkout details 'state' through the query 'getCheckoutDetailsState' in CheckoutQueryFacade.",
  },
  {
    node: 'LOAD_CHECKOUT_DETAILS',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.LOAD_CHECKOUT_DETAILS has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. You can get the checkout details 'state' through the query 'getCheckoutDetailsState' in CheckoutQueryFacade.",
  },
  {
    node: 'LOAD_PAYMENT_TYPES_FAIL',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.LOAD_PAYMENT_TYPES_FAIL has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. You can find the payment types 'state' from the query 'getPaymentTypesState' in CheckoutPaymentTypeFacade.",
  },
  {
    node: 'LOAD_PAYMENT_TYPES_SUCCESS',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.LOAD_PAYMENT_TYPES_SUCCESS has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. You can find the payment types 'state' from the query 'getPaymentTypesState' in CheckoutPaymentTypeFacade.",
  },
  {
    node: 'LOAD_PAYMENT_TYPES',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.LOAD_PAYMENT_TYPES has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. You can find the payment types 'state' from the query 'getPaymentTypesState' in CheckoutPaymentTypeFacade.",
  },
  {
    node: 'LOAD_SUPPORTED_DELIVERY_MODES_FAIL',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.LOAD_SUPPORTED_DELIVERY_MODES_FAIL has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. You can find the supported delivery modes 'state' from the query 'getSupportedDeliveryModesState' in CheckoutDeliveryModesFacade.",
  },
  {
    node: 'LOAD_SUPPORTED_DELIVERY_MODES_SUCCESS',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.LOAD_SUPPORTED_DELIVERY_MODES_SUCCESS has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. You can find the supported delivery modes 'state' from the query 'getSupportedDeliveryModesState' in CheckoutDeliveryModesFacade.",
  },
  {
    node: 'LOAD_SUPPORTED_DELIVERY_MODES',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.LOAD_SUPPORTED_DELIVERY_MODES has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. You can find the supported delivery modes 'state' from the query 'getSupportedDeliveryModesState' in CheckoutDeliveryModesFacade.",
  },
  {
    node: 'LoadCardTypes',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.LoadCardTypes has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. You can find the card types 'state' from the query 'getPaymentCardTypesState' in CheckoutPaymentFacade.",
  },
  {
    node: 'LoadCardTypesFail',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.LoadCardTypesFail has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. You can find the card types 'state' from the query 'getPaymentCardTypesState' in CheckoutPaymentFacade.",
  },
  {
    node: 'LoadCardTypesSuccess',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.LoadCardTypesSuccess has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. You can find the card types 'state' from the query 'getPaymentCardTypesState' in CheckoutPaymentFacade.",
  },
  {
    node: 'LoadCheckoutDetails',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.LoadCheckoutDetails has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. You can get the checkout details 'state' through the query 'getCheckoutDetailsState' in CheckoutQueryFacade.",
  },
  {
    node: 'LoadCheckoutDetailsFail',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.LoadCheckoutDetailsFail has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. You can get the checkout details 'state' through the query 'getCheckoutDetailsState' in CheckoutQueryFacade.",
  },
  {
    node: 'LoadCheckoutDetailsSuccess',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.LoadCheckoutDetailsSuccess has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. You can get the checkout details 'state' through the query 'getCheckoutDetailsState' in CheckoutQueryFacade.",
  },
  {
    node: 'LoadPaymentTypes',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.LoadPaymentTypes has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. You can find the payment types 'state' from the query 'getPaymentTypesState' in CheckoutPaymentTypeFacade.",
  },
  {
    node: 'LoadPaymentTypesFail',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.LoadPaymentTypesFail has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. You can find the payment types 'state' from the query 'getPaymentTypesState' in CheckoutPaymentTypeFacade.",
  },
  {
    node: 'LoadPaymentTypesSuccess',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.LoadPaymentTypesSuccess has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. You can find the payment types 'state' from the query 'getPaymentTypesState' in CheckoutPaymentTypeFacade.",
  },
  {
    node: 'LoadSupportedDeliveryModes',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.LoadSupportedDeliveryModes has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. You can find the supported delivery modes 'state' from the query 'getSupportedDeliveryModesState' in CheckoutDeliveryModesFacade.",
  },
  {
    node: 'LoadSupportedDeliveryModesFail',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.LoadSupportedDeliveryModesFail has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. You can find the supported delivery modes 'state' from the query 'getSupportedDeliveryModesState' in CheckoutDeliveryModesFacade.",
  },
  {
    node: 'LoadSupportedDeliveryModesSuccess',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.LoadSupportedDeliveryModesSuccess has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. You can find the supported delivery modes 'state' from the query 'getSupportedDeliveryModesState' in CheckoutDeliveryModesFacade.",
  },
  {
    node: 'OrderTypesActions',
    importPath: '@spartacus/checkout/core',
    comment:
      "TypeAlias CheckoutActions.OrderTypesActions has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. Please take a look at Commands & Queries documentation on how we handle state https://sap.github.io/spartacus-docs/commands-and-queries. You can use 'setOrderType' from CheckoutReplenishmentFormService.",
  },
  {
    node: 'PAYMENT_PROCESS_SUCCESS',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.PAYMENT_PROCESS_SUCCESS has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. You can use the EventService to listen for 'CheckoutPaymentDetailsSetEvent', which gets fired when the payment has been successfully processed.",
  },
  {
    node: 'PaymentProcessSuccess',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.PaymentProcessSuccess has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. You can use the EventService to listen for 'CheckoutPaymentDetailsSetEvent', which gets fired when the payment has been successfully processed.",
  },
  {
    node: 'PaymentTypesAction',
    importPath: '@spartacus/checkout/core',
    comment:
      'TypeAlias CheckoutActions.PaymentTypesAction has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. Please take a look at Commands & Queries documentation on how we handle state https://sap.github.io/spartacus-docs/commands-and-queries.',
  },
  {
    node: 'PLACE_ORDER_FAIL',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.PLACE_ORDER_FAIL has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. You can leverage RxJS' error handling when calling the 'placeOrder()' from OrderFacade.",
  },
  {
    node: 'PLACE_ORDER_SUCCESS',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.PLACE_ORDER_SUCCESS has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. You can use the EventService to listen for 'OrderPlacedEvent', which gets fired when checkout has been successful.",
  },
  {
    node: 'PLACE_ORDER',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.PLACE_ORDER has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. Use 'placeOrder()' from OrderFacade.",
  },
  {
    node: 'PlaceOrder',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.PlaceOrder has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. Use 'placeOrder()' from OrderFacade.",
  },
  {
    node: 'PlaceOrderFail',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.PlaceOrderFail has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. You can leverage RxJS' error handling when calling the 'placeOrder()' from OrderFacade.",
  },
  {
    node: 'PlaceOrderSuccess',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.PlaceOrderSuccess has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. You can use the EventService to listen for 'OrderPlacedEvent', which gets fired when checkout has been successful.",
  },
  {
    node: 'ReplenishmentOrderActions',
    importPath: '@spartacus/checkout/core',
    comment:
      'TypeAlias CheckoutActions.ReplenishmentOrderActions has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions. Please take a look at Commands & Queries documentation on how we handle state https://sap.github.io/spartacus-docs/commands-and-queries.',
  },
  {
    node: 'RESET_LOAD_PAYMENT_TYPES_PROCESS_ID',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.RESET_LOAD_PAYMENT_TYPES_PROCESS_ID has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions.  You can use the EventService to dispatch event to invalidate the loading of payment types using 'CheckoutPaymentTypesQueryResetEvent'.",
  },
  {
    node: 'RESET_SET_COST_CENTER_PROCESS',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.RESET_SET_COST_CENTER_PROCESS has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions.  You can use the EventService to dispatch an event to clear checkout data by using 'CheckoutQueryResetEvent', which removes the set cost center as well.",
  },
  {
    node: 'RESET_SET_DELIVERY_ADDRESS_PROCESS',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.RESET_SET_DELIVERY_ADDRESS_PROCESS has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions.  You can use the EventService to dispatch an event to clear checkout data by using 'CheckoutQueryResetEvent', which removes the set delivery address as well.",
  },
  {
    node: 'RESET_SET_DELIVERY_MODE_PROCESS',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.RESET_SET_DELIVERY_MODE_PROCESS has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions.  You can use the EventService to dispatch an event to clear checkout data by using 'CheckoutQueryResetEvent', which removes the set delivery mode as well.",
  },
  {
    node: 'RESET_SET_PAYMENT_DETAILS_PROCESS',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.RESET_SET_PAYMENT_DETAILS_PROCESS has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions.  You can use the EventService to dispatch an event to clear checkout data by using 'CheckoutQueryResetEvent', which removes the set payment details as well.",
  },
  {
    node: 'RESET_SUPPORTED_SET_DELIVERY_MODES_PROCESS',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.RESET_SUPPORTED_SET_DELIVERY_MODES_PROCESS has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions.  You can use the EventService to dispatch an event to invalidate the supported delivery modes by using 'CheckoutSupportedDeliveryModesQueryResetEvent'.",
  },
  {
    node: 'ResetLoadPaymentTypesProcess',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.ResetLoadPaymentTypesProcess has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions.  You can use the EventService to dispatch an event to invalidate the payment types by using 'CheckoutPaymentTypesQueryResetEvent'.",
  },
  {
    node: 'ResetLoadSupportedDeliveryModesProcess',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.ResetLoadSupportedDeliveryModesProcess has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions.  You can use the EventService to dispatch an event to invalidate the supported delivery modes by using 'CheckoutSupportedDeliveryModesQueryResetEvent'.",
  },
  {
    node: 'ResetSetCostCenterProcess',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.ResetSetCostCenterProcess has been removed and is no longer part of the public API. It is not used anymore. Checkout library no longer uses NgRX to dispatch actions.  You can use the EventService to dispatch an event to clear checkout data by using 'CheckoutQueryResetEvent', which removes the set cost center as well.",
  },
  {
    node: 'ResetSetDeliveryAddressProcess',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.ResetSetDeliveryAddressProcess has been removed and is no longer part of the public API. After switching to commands & queries, processes are no longer used. If you need to manually reset the state (in 'CheckoutQueryService' imported from '@spartacus/checkout/base/core'), you can fire 'CheckoutQueryResetEvent' event (imported from '@spartacus/checkout/base/root').",
  },
  {
    node: 'ResetSetDeliveryModeProcess',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.ResetSetDeliveryModeProcess has been removed and is no longer part of the public API. After switching to commands & queries, processes are no longer used. If you need to manually reset the state (in 'CheckoutQueryService' imported from '@spartacus/checkout/base/core'), you can fire 'CheckoutQueryResetEvent' event (imported from '@spartacus/checkout/base/root').",
  },
  {
    node: 'ResetSetPaymentDetailsProcess',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.ResetSetPaymentDetailsProcess has been removed and is no longer part of the public API. After switching to commands & queries, processes are no longer used. If you need to manually reset the state (in 'CheckoutQueryService' imported from '@spartacus/checkout/base/core'), you can fire 'CheckoutQueryResetEvent' event (imported from '@spartacus/checkout/base/root')",
  },
  {
    node: 'SCHEDULE_REPLENISHMENT_ORDER_FAIL',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.SCHEDULE_REPLENISHMENT_ORDER_FAIL has been removed and is no longer part of the public API. Instead, use the Observer's `error` property of the 'scheduleReplenishmentOrder()' from 'ScheduledReplenishmentOrderFacade' (imported from '@spartacus/order/root').",
  },
  {
    node: 'SCHEDULE_REPLENISHMENT_ORDER_SUCCESS',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.SCHEDULE_REPLENISHMENT_ORDER_SUCCESS has been removed and is no longer part of the public API. Listen to 'ReplenishmentOrderScheduledEvent' imported from '@spartacus/order/root'.",
  },
  {
    node: 'SCHEDULE_REPLENISHMENT_ORDER',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.SCHEDULE_REPLENISHMENT_ORDER has been removed and is no longer part of the public API. Use 'scheduleReplenishmentOrder()' from 'ScheduledReplenishmentOrderFacade' (imported from '@spartacus/order/root')",
  },
  {
    node: 'ScheduleReplenishmentOrder',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.ScheduleReplenishmentOrder has been removed and is no longer part of the public API. Use 'scheduleReplenishmentOrder()' from 'ScheduledReplenishmentOrderFacade' (imported from '@spartacus/order/root')",
  },
  {
    node: 'ScheduleReplenishmentOrderFail',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.ScheduleReplenishmentOrderFail has been removed and is no longer part of the public API. Instead, use the Observer's `error` property of the 'scheduleReplenishmentOrder()' from 'ScheduledReplenishmentOrderFacade' (imported from '@spartacus/order/root').",
  },
  {
    node: 'ScheduleReplenishmentOrderSuccess',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.ScheduleReplenishmentOrderSuccess has been removed and is no longer part of the public API. Listen to 'ReplenishmentOrderScheduledEvent' imported from '@spartacus/order/root'.",
  },
  {
    node: 'SET_COST_CENTER_FAIL',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.SET_COST_CENTER_FAIL has been removed and is no longer part of the public API. Instead, use the Observer's `error` property of the 'setCostCenter()' from 'CheckoutCostCenterFacade' (imported from '@spartacus/checkout/b2b/root').",
  },
  {
    node: 'SET_COST_CENTER_SUCCESS',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.SET_COST_CENTER_SUCCESS has been removed and is no longer part of the public API. Listen to 'CheckoutCostCenterSetEvent' imported from '@spartacus/checkout/b2b/root'.",
  },
  {
    node: 'SET_COST_CENTER',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.SET_COST_CENTER has been removed and is no longer part of the public API. Use 'setCostCenter()' from 'CheckoutCostCenterFacade' (imported from '@spartacus/checkout/b2b/root')",
  },
  {
    node: 'SET_DELIVERY_ADDRESS_FAIL',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.SET_DELIVERY_ADDRESS_FAIL has been removed and is no longer part of the public API. Instead, use the Observer's `error` property of either 'setDeliveryAddress()' or 'createAndSetAddress()' from 'CheckoutDeliveryAddressFacade' (imported from '@spartacus/checkout/base/root').",
  },
  {
    node: 'SET_DELIVERY_ADDRESS_SUCCESS',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.SET_DELIVERY_ADDRESS_SUCCESS has been removed and is no longer part of the public API. Listen to 'CheckoutDeliveryAddressSetEvent' (imported from '@spartacus/checkout/base/root')",
  },
  {
    node: 'SET_DELIVERY_ADDRESS',
    importPath: '@spartacus/checkout/core',
    comment:
      'Variable CheckoutActions.SET_DELIVERY_ADDRESS has been removed and is no longer part of the public API. ',
  },
  {
    node: 'SET_DELIVERY_MODE_FAIL',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.SET_DELIVERY_MODE_FAIL has been removed and is no longer part of the public API. Instead, use the Observer's `error` property of the 'setDeliveryMode()' from 'CheckoutDeliveryModesFacade' (imported from '@spartacus/checkout/base/root').",
  },
  {
    node: 'SET_DELIVERY_MODE_SUCCESS',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.SET_DELIVERY_MODE_SUCCESS has been removed and is no longer part of the public API. Listen to 'CheckoutDeliveryModeSetEvent' (imported from '@spartacus/checkout/base/root')",
  },
  {
    node: 'SET_DELIVERY_MODE',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.SET_DELIVERY_MODE has been removed and is no longer part of the public API. Use 'setDeliveryMode()' from 'CheckoutDeliveryModesFacade' (imported from '@spartacus/checkout/base/root')",
  },
  {
    node: 'SET_ORDER_TYPE',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.SET_ORDER_TYPE has been removed and is no longer part of the public API. Use 'setOrderType()' from 'CheckoutReplenishmentFormService' (imported from '@spartacus/checkout/scheduled-replenishment/components')",
  },
  {
    node: 'SET_PAYMENT_DETAILS_FAIL',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.SET_PAYMENT_DETAILS_FAIL has been removed and is no longer part of the public API. Instead, use the Observer's `error` property of the 'setPaymentDetails()' from 'CheckoutPaymentFacade' (imported from '@spartacus/checkout/base/root').",
  },
  {
    node: 'SET_PAYMENT_DETAILS_SUCCESS',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.SET_PAYMENT_DETAILS_SUCCESS has been removed and is no longer part of the public API. Listen to 'CheckoutPaymentDetailsSetEvent' (imported from '@spartacus/checkout/base/root')",
  },
  {
    node: 'SET_PAYMENT_DETAILS',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.SET_PAYMENT_DETAILS has been removed and is no longer part of the public API. Use 'setPaymentDetails()' from 'CheckoutPaymentFacade' (imported from '@spartacus/checkout/base/root')",
  },
  {
    node: 'SET_PAYMENT_TYPE_FAIL',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.SET_PAYMENT_TYPE_FAIL has been removed and is no longer part of the public API. Instead, use the Observer's `error` property of the 'setPaymentType()' from 'CheckoutPaymentTypeFacade' (imported from '@spartacus/checkout/b2b/root').",
  },
  {
    node: 'SET_PAYMENT_TYPE_SUCCESS',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.SET_PAYMENT_TYPE_SUCCESS has been removed and is no longer part of the public API. Listen to 'CheckoutPaymentTypeSetEvent' (imported from '@spartacus/checkout/b2b/root')",
  },
  {
    node: 'SET_PAYMENT_TYPE',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.SET_PAYMENT_TYPE has been removed and is no longer part of the public API. Use 'setPaymentType()' from 'CheckoutPaymentTypeFacade' (imported from '@spartacus/checkout/b2b/root')",
  },
  {
    node: 'SET_SUPPORTED_DELIVERY_MODES_FAIL',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.SET_SUPPORTED_DELIVERY_MODES_FAIL has been removed and is no longer part of the public API. Instead, use the Observer's `error` property of either 'getSupportedDeliveryModes()' or 'getSelectedDeliveryModeState()' from 'CheckoutDeliveryModesFacade' (imported from '@spartacus/checkout/base/root').",
  },
  {
    node: 'SET_SUPPORTED_DELIVERY_MODES_SUCCESS',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.SET_SUPPORTED_DELIVERY_MODES_SUCCESS has been removed and is no longer part of the public API. Use 'getSupportedDeliveryModesState()' from 'CheckoutDeliveryModesFacade' (imported from '@spartacus/checkout/base/root')",
  },
  {
    node: 'SET_SUPPORTED_DELIVERY_MODES',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutActions.SET_SUPPORTED_DELIVERY_MODES has been removed and is no longer part of the public API. Use 'getSupportedDeliveryModesState()' from 'CheckoutDeliveryModesFacade' (imported from '@spartacus/checkout/base/root')",
  },
  {
    node: 'SetCostCenter',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.SetCostCenter has been removed and is no longer part of the public API. Use 'setCostCenter()' from 'CheckoutCostCenterFacade' (imported from '@spartacus/checkout/b2b/root')",
  },
  {
    node: 'SetCostCenterFail',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.SetCostCenterFail has been removed and is no longer part of the public API. Instead, use the Observer's `error` property of the 'setCostCenter()' from 'CheckoutCostCenterFacade' (imported from '@spartacus/checkout/b2b/root').",
  },
  {
    node: 'SetCostCenterSuccess',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.SetCostCenterSuccess has been removed and is no longer part of the public API. Listen to 'CheckoutCostCenterSetEvent' imported from '@spartacus/checkout/b2b/root'.",
  },
  {
    node: 'SetDeliveryAddress',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.SetDeliveryAddress has been removed and is no longer part of the public API. Use 'setDeliveryAddress()' from 'CheckoutDeliveryAddressFacade' (imported from '@spartacus/checkout/base/root')",
  },
  {
    node: 'SetDeliveryAddressFail',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.SetDeliveryAddressFail has been removed and is no longer part of the public API. Instead, use the Observer's `error` property of either 'setDeliveryAddress()' or 'createAndSetAddress()' from 'CheckoutDeliveryAddressFacade' (imported from '@spartacus/checkout/base/root').",
  },
  {
    node: 'SetDeliveryAddressSuccess',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.SetDeliveryAddressSuccess has been removed and is no longer part of the public API. Listen to 'CheckoutDeliveryAddressSetEvent' (imported from '@spartacus/checkout/base/root')",
  },
  {
    node: 'SetDeliveryMode',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.SetDeliveryMode has been removed and is no longer part of the public API. Use 'setDeliveryMode()' from 'CheckoutDeliveryModesFacade' (imported from '@spartacus/checkout/base/root')",
  },
  {
    node: 'SetDeliveryModeFail',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.SetDeliveryModeFail has been removed and is no longer part of the public API. Instead, use the Observer's `error` property of the 'setDeliveryMode()' from 'CheckoutDeliveryModesFacade' (imported from '@spartacus/checkout/base/root').",
  },
  {
    node: 'SetDeliveryModeSuccess',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.SetDeliveryModeSuccess has been removed and is no longer part of the public API. Listen to 'CheckoutDeliveryModeSetEvent' (imported from '@spartacus/checkout/base/root')",
  },
  {
    node: 'SetOrderType',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.SetOrderType has been removed and is no longer part of the public API. Use 'setOrderType()' from 'CheckoutReplenishmentFormService' (imported from '@spartacus/checkout/scheduled-replenishment/components')",
  },
  {
    node: 'SetPaymentDetails',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.SetPaymentDetails has been removed and is no longer part of the public API. Use 'setPaymentDetails()' from 'CheckoutPaymentFacade' (imported from '@spartacus/checkout/base/root')",
  },
  {
    node: 'SetPaymentDetailsFail',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.SetPaymentDetailsFail has been removed and is no longer part of the public API. Instead, use the Observer's `error` property of the 'setPaymentDetails()' from 'CheckoutPaymentFacade' (imported from '@spartacus/checkout/base/root').",
  },
  {
    node: 'SetPaymentDetailsSuccess',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.SetPaymentDetailsSuccess has been removed and is no longer part of the public API. Listen to 'CheckoutPaymentDetailsSetEvent' (imported from '@spartacus/checkout/base/root')",
  },
  {
    node: 'SetPaymentType',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.SetPaymentType has been removed and is no longer part of the public API. Use 'setPaymentType()' from 'CheckoutPaymentTypeFacade' (imported from '@spartacus/checkout/b2b/root')",
  },
  {
    node: 'SetPaymentTypeFail',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.SetPaymentTypeFail has been removed and is no longer part of the public API. Instead, use the Observer's `error` property of the 'setPaymentType()' from 'CheckoutPaymentTypeFacade' (imported from '@spartacus/checkout/b2b/root').",
  },
  {
    node: 'SetPaymentTypeSuccess',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutActions.SetPaymentTypeSuccess has been removed and is no longer part of the public API. Listen to 'CheckoutPaymentTypeSetEvent' (imported from '@spartacus/checkout/b2b/root').",
  },
  {
    node: 'CheckoutDeliveryAdapter',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutDeliveryAdapter has been removed and is no longer part of the public API. Use 'CheckoutDeliveryAddressAdapter' or 'CheckoutDeliveryModesAdapter' (imported from '@spartacus/checkout/base/core')",
  },
  {
    node: 'CheckoutDeliveryConnector',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutDeliveryConnector has been removed and is no longer part of the public API. Use 'CheckoutDeliveryModesConnector' or 'CheckoutDeliveryAddressConnector' (imported from '@spartacus/checkout/base/core')",
  },
  {
    node: 'CheckoutDeliveryService',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutDeliveryService has been removed and is no longer part of the public API. Use 'CheckoutDeliveryAddressFacade' or 'CheckoutDeliveryModesFacade' (imported from '@spartacus/checkout/base/root')",
  },
  {
    node: 'CheckoutDetails',
    importPath: '@spartacus/checkout/core',
    comment:
      "TypeAlias CheckoutDetails has been removed and is no longer part of the public API. Replaced with 'CheckoutState' (imported from '@spartacus/checkout/base/root')",
  },
  {
    node: 'CheckoutEventBuilder',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutEventBuilder has been removed and is no longer part of the public API. The events are now split to different listeners across the Base, B2B and Scheduled-Replenishment libraries. All listeners have the following naming convention: 'Checkout*EventListener'.",
  },
  {
    node: 'CheckoutEventListener',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutEventListener has been removed and is no longer part of the public API. The events are now split to different listeners across the Base, B2B and Scheduled-Replenishment libraries. All listeners have the following naming convention: 'Checkout*EventListener'.",
  },
  {
    node: 'CheckoutReplenishmentOrderAdapter',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutReplenishmentOrderAdapter has been removed and is no longer part of the public API. Use 'ScheduledReplenishmentOrderAdapter' (imported from '@spartacus/order/core')",
  },
  {
    node: 'CheckoutReplenishmentOrderConnector',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class CheckoutReplenishmentOrderConnector has been removed and is no longer part of the public API. Use 'ScheduledReplenishmentOrderConnector' (imported from '@spartacus/order/core')",
  },
  {
    node: 'CheckoutSelectors',
    importPath: '@spartacus/checkout/core',
    comment:
      'Namespace CheckoutSelectors has been removed and is no longer part of the public API. ',
  },
  {
    node: 'getAllCardTypes',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutSelectors.getAllCardTypes has been removed and is no longer part of the public API. Use 'getPaymentCardTypes()' from 'CheckoutPaymentFacade' (imported from '@spartacus/checkout/base/root')",
  },
  {
    node: 'getAllPaymentTypes',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutSelectors.getAllPaymentTypes has been removed and is no longer part of the public API. Use 'getPaymentCardTypes()' from 'CheckoutPaymentFacade' (imported from '@spartacus/checkout/base/root')",
  },
  {
    node: 'getCardTypesEntites',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutSelectors.getCardTypesEntites has been removed and is no longer part of the public API. Use 'getPaymentCardTypes()' from 'CheckoutPaymentFacade' (imported from '@spartacus/checkout/base/root')",
  },
  {
    node: 'getCardTypesState',
    importPath: '@spartacus/checkout/core',
    comment:
      'Variable CheckoutSelectors.getCardTypesState has been removed and is no longer part of the public API. ',
  },
  {
    node: 'getCheckoutDetailsLoaded',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutSelectors.getCheckoutDetailsLoaded has been removed and is no longer part of the public API. Use 'getCheckoutDetailsState()' from 'CheckoutQueryFacade' (imported from '@spartacus/checkout/base/root')",
  },
  {
    node: 'getCheckoutLoading',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutSelectors.getCheckoutLoading has been removed and is no longer part of the public API. Use 'getCheckoutDetailsState()' from 'CheckoutQueryFacade' (imported from '@spartacus/checkout/base/root')",
  },
  {
    node: 'getCheckoutOrderDetails',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutSelectors.getCheckoutOrderDetails has been removed and is no longer part of the public API. Use 'getOrderDetails()' from 'OrderFacade' (imported from '@spartacus/order/root')",
  },
  {
    node: 'getCheckoutState',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutSelectors.getCheckoutState has been removed and is no longer part of the public API. Use 'getCheckoutDetailsState()' from 'CheckoutQueryFacade' (imported from '@spartacus/checkout/base/root')",
  },
  {
    node: 'getCheckoutSteps',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutSelectors.getCheckoutSteps has been removed and is no longer part of the public API. Use 'getCheckoutDetailsState()' from 'CheckoutQueryFacade' (imported from '@spartacus/checkout/base/root')",
  },
  {
    node: 'getCheckoutStepsState',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutSelectors.getCheckoutStepsState has been removed and is no longer part of the public API. Use 'getCheckoutDetailsState()' from 'CheckoutQueryFacade' (imported from '@spartacus/checkout/base/root')",
  },
  {
    node: 'getDeliveryAddress',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutSelectors.getDeliveryAddress has been removed and is no longer part of the public API. Use 'getDeliveryAddressState()' from 'CheckoutDeliveryAddressFacade' (imported from '@spartacus/checkout/base/root')",
  },
  {
    node: 'getDeliveryMode',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutSelectors.getDeliveryMode has been removed and is no longer part of the public API. Use 'getSupportedDeliveryModesState()' from 'CheckoutDeliveryModesFacade' (imported from '@spartacus/checkout/base/root')",
  },
  {
    node: 'getOrderTypesState',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutSelectors.getOrderTypesState has been removed and is no longer part of the public API. If you are not using scheduled-replenishment feature, you don't need this variable any longer. Otherwise, use 'getOrderType()' from 'CheckoutReplenishmentFormService' (imported from '@spartacus/checkout/scheduled-replenishment/components')",
  },
  {
    node: 'getPaymentDetails',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutSelectors.getPaymentDetails has been removed and is no longer part of the public API. Use 'getPaymentDetailsState()' from 'CheckoutPaymentFacade' (imported from '@spartacus/checkout/base/root')",
  },
  {
    node: 'getPaymentTypesEntites',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutSelectors.getPaymentTypesEntites has been removed and is no longer part of the public API. Use 'getPaymentTypesState()' from 'CheckoutPaymentTypeFacade' (imported from '@spartacus/checkout/b2b/root')",
  },
  {
    node: 'getPaymentTypesState',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutSelectors.getPaymentTypesState has been removed and is no longer part of the public API. Use 'getPaymentTypesState()' from 'CheckoutPaymentTypeFacade' (imported from '@spartacus/checkout/b2b/root')",
  },
  {
    node: 'getPoNumer',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutSelectors.getPoNumer has been removed and is no longer part of the public API. Use 'getPurchaseOrderNumberState()' from 'CheckoutPaymentTypeFacade' (imported from '@spartacus/checkout/b2b/root')",
  },
  {
    node: 'getSelectedDeliveryMode',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutSelectors.getSelectedDeliveryMode has been removed and is no longer part of the public API. Use 'getSelectedDeliveryModeState()' from 'CheckoutDeliveryModesFacade' (imported from '@spartacus/checkout/base/root')",
  },
  {
    node: 'getSelectedDeliveryModeCode',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutSelectors.getSelectedDeliveryModeCode has been removed and is no longer part of the public API. Use 'getSelectedDeliveryModeState()' from 'CheckoutDeliveryModesFacade' and deduce the code (imported from '@spartacus/checkout/base/root')",
  },
  {
    node: 'getSelectedOrderType',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutSelectors.getSelectedOrderType has been removed and is no longer part of the public API. If you are not using scheduled-replenishment feature, you don't need this variable any longer. Otherwise, use 'getOrderType()' from 'CheckoutReplenishmentFormService' (imported from '@spartacus/checkout/scheduled-replenishment/components')",
  },
  {
    node: 'getSelectedOrderTypeSelector',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutSelectors.getSelectedOrderTypeSelector has been removed and is no longer part of the public API. If you are not using scheduled-replenishment feature, you don't need this variable any longer. Otherwise, use 'getOrderType()' from 'CheckoutReplenishmentFormService' (imported from '@spartacus/checkout/scheduled-replenishment/components')",
  },
  {
    node: 'getSelectedPaymentType',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutSelectors.getSelectedPaymentType has been removed and is no longer part of the public API. Use 'getSelectedPaymentTypeState()' from 'CheckoutPaymentTypeFacade' (imported from '@spartacus/checkout/b2b/root')",
  },
  {
    node: 'getSupportedDeliveryModes',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable CheckoutSelectors.getSupportedDeliveryModes has been removed and is no longer part of the public API. Use 'getSupportedDeliveryModesState()' from 'CheckoutDeliveryModesFacade' (imported from '@spartacus/checkout/base/root')",
  },
  {
    node: 'CheckoutService',
    importPath: '@spartacus/checkout/core',
    comment:
      'Class CheckoutService has been removed and is no longer part of the public API. Please check the comment instructions above each of the methods you use from this class.',
  },
  {
    node: 'CheckoutStepsState',
    importPath: '@spartacus/checkout/core',
    comment:
      'Interface CheckoutStepsState has been removed and is no longer part of the public API. Removed, and no longer used.',
  },
  {
    node: 'ClearCheckoutService',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class ClearCheckoutService has been removed and is no longer part of the public API. You can use 'CheckoutQueryResetEvent' (imported from '@spartacus/checkout/base/root') to reset the checkout state.",
  },
  {
    node: 'GET_PAYMENT_TYPES_PROCESS_ID',
    importPath: '@spartacus/checkout/core',
    comment:
      'Variable GET_PAYMENT_TYPES_PROCESS_ID has been removed and is no longer part of the public API. After switching to commands & queries, processes are no longer used.',
  },
  {
    node: 'OrderTypesState',
    importPath: '@spartacus/checkout/core',
    comment:
      'Interface OrderTypesState has been removed and is no longer part of the public API. ',
  },
  {
    node: 'PAYMENT_TYPE_NORMALIZER',
    importPath: '@spartacus/checkout/core',
    comment:
      "Variable PAYMENT_TYPE_NORMALIZER has been removed and is no longer part of the public API. Use 'CHECKOUT_PAYMENT_TYPE_NORMALIZER' from '@spartacus/checkout/b2b/core'",
  },
  {
    node: 'PaymentTypeAdapter',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class PaymentTypeAdapter has been removed and is no longer part of the public API. Use 'CheckoutPaymentTypeAdapter' (imported from '@spartacus/checkout/b2b/core')",
  },
  {
    node: 'PaymentTypeConnector',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class PaymentTypeConnector has been removed and is no longer part of the public API. Use 'CheckoutPaymentTypeConnector' (imported from '@spartacus/checkout/b2b/root')",
  },
  {
    node: 'PaymentTypeService',
    importPath: '@spartacus/checkout/core',
    comment:
      "Class PaymentTypeService has been removed and is no longer part of the public API. Use 'CheckoutPaymentTypeFacade' (imported from '@spartacus/checkout/b2b/root')",
  },
  {
    node: 'PaymentTypesState',
    importPath: '@spartacus/checkout/core',
    comment:
      'Interface PaymentTypesState has been removed and is no longer part of the public API. ',
  },
  {
    node: 'PLACED_ORDER_PROCESS_ID',
    importPath: '@spartacus/checkout/core',
    comment:
      'Variable PLACED_ORDER_PROCESS_ID has been removed and is no longer part of the public API. After switching to commands & queries, processes are no longer used.',
  },
  {
    node: 'SET_COST_CENTER_PROCESS_ID',
    importPath: '@spartacus/checkout/core',
    comment:
      'Variable SET_COST_CENTER_PROCESS_ID has been removed and is no longer part of the public API. After switching to commands & queries, processes are no longer used.',
  },
  {
    node: 'SET_DELIVERY_ADDRESS_PROCESS_ID',
    importPath: '@spartacus/checkout/core',
    comment:
      'Variable SET_DELIVERY_ADDRESS_PROCESS_ID has been removed and is no longer part of the public API. ',
  },
  {
    node: 'SET_DELIVERY_MODE_PROCESS_ID',
    importPath: '@spartacus/checkout/core',
    comment:
      'Variable SET_DELIVERY_MODE_PROCESS_ID has been removed and is no longer part of the public API. After switching to commands & queries, processes are no longer used.',
  },
  {
    node: 'SET_PAYMENT_DETAILS_PROCESS_ID',
    importPath: '@spartacus/checkout/core',
    comment:
      'Variable SET_PAYMENT_DETAILS_PROCESS_ID has been removed and is no longer part of the public API. After switching to commands & queries, processes are no longer used.',
  },
  {
    node: 'SET_SUPPORTED_DELIVERY_MODE_PROCESS_ID',
    importPath: '@spartacus/checkout/core',
    comment:
      'Variable SET_SUPPORTED_DELIVERY_MODE_PROCESS_ID has been removed and is no longer part of the public API. After switching to commands & queries, processes are no longer used.',
  },
  {
    node: 'StateWithCheckout',
    importPath: '@spartacus/checkout/core',
    comment:
      "Interface StateWithCheckout has been removed and is no longer part of the public API. No direct replacement. Check the 'CheckoutState' (imported from '@spartacus/checkout/base/root')",
  },
  {
    node: 'OccCheckoutDeliveryAdapter',
    importPath: '@spartacus/checkout/occ',
    comment:
      "Class OccCheckoutDeliveryAdapter has been removed and is no longer part of the public API. Use 'OccCheckoutDeliveryAddressAdapter' or 'OccCheckoutDeliveryModesAdapter' (imported from '@spartacus/checkout/base/occ')",
  },
  {
    node: 'OccCheckoutReplenishmentOrderAdapter',
    importPath: '@spartacus/checkout/occ',
    comment:
      "Class OccCheckoutReplenishmentOrderAdapter has been removed and is no longer part of the public API. Use 'OccScheduledReplenishmentOrderAdapter' (imported from '@spartacus/order/core')",
  },
  {
    node: 'OccReplenishmentOrderFormSerializer',
    importPath: '@spartacus/checkout/occ',
    comment:
      "Class OccReplenishmentOrderFormSerializer has been removed and is no longer part of the public API. Use 'OccScheduledReplenishmentOrderFormSerializer' (imported from '@spartacus/order/occ')",
  },
  {
    node: 'CheckoutDeliveryFacade',
    importPath: '@spartacus/checkout/root',
    comment:
      "Class CheckoutDeliveryFacade has been removed and is no longer part of the public API. Use 'CheckoutDeliveryAddressFacade' or 'CheckoutDeliveryModesFacade' (imported from '@spartacus/checkout/base/root')",
  },
  {
    node: 'CheckoutFacade',
    importPath: '@spartacus/checkout/root',
    comment:
      "Class CheckoutFacade has been removed and is no longer part of the public API. The class' functionality is scattered, please check the migration instruction for each of the methods you use from this class.",
  },
  {
    node: 'checkoutPaymentSteps',
    importPath: '@spartacus/checkout/root',
    comment:
      "Variable checkoutPaymentSteps has been removed and is no longer part of the public API. Moved to 'getCheckoutPaymentSteps()' in 'CheckoutReviewSubmitComponent' (imported from '@spartacus/checkout/base/components') and 'getCheckoutPaymentSteps()' in 'CheckoutReviewSubmitComponent' (imported from '@spartacus/checkout/b2b/components')",
  },
  {
    node: 'checkoutShippingSteps',
    importPath: '@spartacus/checkout/root',
    comment:
      "Variable checkoutShippingSteps has been removed and is no longer part of the public API. Moved to 'getCheckoutDeliverySteps()' in 'CheckoutReviewSubmitComponent' (imported from '@spartacus/checkout/base/components')",
  },
  {
    node: 'ClearCheckoutFacade',
    importPath: '@spartacus/checkout/root',
    comment:
      "Class ClearCheckoutFacade has been removed and is no longer part of the public API. You can use 'CheckoutQueryResetEvent' (imported from '@spartacus/checkout/base/root') to reset the checkout state.",
  },
  {
    node: 'PaymentTypeFacade',
    importPath: '@spartacus/checkout/root',
    comment:
      "Class PaymentTypeFacade has been removed and is no longer part of the public API. Use 'CheckoutPaymentTypeFacade' (imported from '@spartacus/checkout/b2b/root')",
  },
  {
    node: 'RESET_WISH_LIST_DETAILS',
    importPath: '@spartacus/core',
    comment:
      'Variable CartActions.RESET_WISH_LIST_DETAILS has been removed and is no longer part of the public API. It is not used anymore.',
  },
  {
    node: 'SET_TEMP_CART',
    importPath: '@spartacus/core',
    comment:
      'Variable CartActions.SET_TEMP_CART has been removed and is no longer part of the public API. It is not used anymore.',
  },
  {
    node: 'SetTempCart',
    importPath: '@spartacus/core',
    comment:
      'Class CartActions.SetTempCart has been removed and is no longer part of the public API. It is not used anymore.',
  },
  {
    node: 'CartModule',
    importPath: '@spartacus/core',
    comment:
      "Class CartModule has been removed and is no longer part of the public API. While it's not identical, the new module 'CartBaseCoreModule' in '@spartacus/cart/base/core' is the closest equivalent in the new cart library.",
  },
  {
    node: 'CartOccModule',
    importPath: '@spartacus/core',
    comment:
      "Class CartOccModule has been removed and is no longer part of the public API. While it's not identical, the new module 'CartBaseOccModule' in '@spartacus/cart/base/occ' is the closest equivalent in the new cart library.",
  },
  {
    node: 'getActiveCartId',
    importPath: '@spartacus/core',
    comment:
      "Variable MultiCartSelectors.getActiveCartId has been removed and is no longer part of the public API. Use 'getCartIdByTypeFactory' instead",
  },
  {
    node: 'getWishListId',
    importPath: '@spartacus/core',
    comment:
      "Variable MultiCartSelectors.getWishListId has been removed and is no longer part of the public API. Use 'getCartIdByTypeFactory' instead",
  },
  {
    node: 'OccUserOrderAdapter',
    importPath: '@spartacus/core',
    comment:
      'Class OccUserOrderAdapter has been removed and is no longer part of the public API. Use OccOrderHistoryAdapter in @spartacus/order/occ instead',
  },
  {
    node: 'OccUserReplenishmentOrderAdapter',
    importPath: '@spartacus/core',
    comment:
      'Class OccUserReplenishmentOrderAdapter has been removed and is no longer part of the public API. Use OccReplenishmentOrderHistoryAdapter in @spartacus/order/occ instead',
  },
  {
    node: 'OrderEntryPromotionsService',
    importPath: '@spartacus/core',
    comment:
      'Class OrderEntryPromotionsService has been removed and is no longer part of the public API. It is not used anymore.',
  },
  {
    node: 'SaveCartAdapter',
    importPath: '@spartacus/core',
    comment:
      "Class SaveCartAdapter has been removed and is no longer part of the public API. Use CartAdapter.save instead from '@spartacus/cart/base/core'",
  },
  {
    node: 'SaveCartConnector',
    importPath: '@spartacus/core',
    comment:
      "Class SaveCartConnector has been removed and is no longer part of the public API. Use CartConnector.save instead from '@spartacus/cart/base/core'",
  },
  {
    node: 'USER_ORDER_DETAILS',
    importPath: '@spartacus/core',
    comment:
      "Variable USER_ORDER_DETAILS has been removed and is no longer part of the public API. It is replaced by ORDER_DETAILS from '@spartacus/order/core', but the constant value is not the same.",
  },
  {
    node: 'USER_ORDERS',
    importPath: '@spartacus/core',
    comment:
      "Variable USER_ORDERS has been removed and is no longer part of the public API. It is replaced by ORDERS from '@spartacus/order/core', but the constant value is not the same.",
  },
  {
    node: 'USER_REPLENISHMENT_ORDER_DETAILS',
    importPath: '@spartacus/core',
    comment:
      "Variable USER_REPLENISHMENT_ORDER_DETAILS has been removed and is no longer part of the public API. It is replaced by REPLENISHMENT_ORDER_DETAILS from '@spartacus/order/core', but the constant value is not the same.",
  },
  {
    node: 'USER_REPLENISHMENT_ORDERS',
    importPath: '@spartacus/core',
    comment:
      "Variable USER_REPLENISHMENT_ORDERS has been removed and is no longer part of the public API. It is replaced by REPLENISHMENT_ORDERS from '@spartacus/order/core', but the constant value is not the same.",
  },
  {
    node: 'USER_RETURN_REQUEST_DETAILS',
    importPath: '@spartacus/core',
    comment:
      "Variable USER_RETURN_REQUEST_DETAILS has been removed and is no longer part of the public API. It is replaced by RETURN_REQUEST_DETAILS from '@spartacus/order/core', but the constant value is not the same.",
  },
  {
    node: 'USER_RETURN_REQUESTS',
    importPath: '@spartacus/core',
    comment:
      "Variable USER_RETURN_REQUESTS has been removed and is no longer part of the public API. It is replaced by RETURN_REQUESTS from '@spartacus/order/core', but the constant value is not the same.",
  },
  {
    node: 'UserAccountFacadeTransitionalToken',
    importPath: '@spartacus/core',
    comment:
      'Class UserAccountFacadeTransitionalToken has been removed and is no longer part of the public API. Use UserAccountFacade instead.',
  },
  {
    node: 'UserOccTransitional_4_2_Module',
    importPath: '@spartacus/core',
    comment:
      'Class UserOccTransitional_4_2_Module has been removed and is no longer part of the public API. Use UserOccModule instead.',
  },
  {
    node: 'UserOccTransitionalModule',
    importPath: '@spartacus/core',
    comment:
      'Class UserOccTransitionalModule has been removed and is no longer part of the public API. ',
  },
  {
    node: 'UserOrderAdapter',
    importPath: '@spartacus/core',
    comment:
      'Class UserOrderAdapter has been removed and is no longer part of the public API. Use OrderHistoryAdapter in @spartacus/order/core.',
  },
  {
    node: 'UserOrderConnector',
    importPath: '@spartacus/core',
    comment:
      'Class UserOrderConnector has been removed and is no longer part of the public API. Use OrderHistoryConnector in @spartacus/order/core.',
  },
  {
    node: 'UserOrderService',
    importPath: '@spartacus/core',
    comment:
      'Class UserOrderService has been removed and is no longer part of the public API. Use OrderHistoryFacade in @spartacus/order/root instead.',
  },
  {
    node: 'UserReplenishmentOrderAdapter',
    importPath: '@spartacus/core',
    comment:
      'Class UserReplenishmentOrderAdapter has been removed and is no longer part of the public API. Use ReplenishmentOrderHistoryAdapter in @spartacus/order/core.',
  },
  {
    node: 'UserReplenishmentOrderConnector',
    importPath: '@spartacus/core',
    comment:
      'Class UserReplenishmentOrderConnector has been removed and is no longer part of the public API. Use ReplenishmentOrderHistoryConnector in @spartacus/order/core.',
  },
  {
    node: 'UserReplenishmentOrderService',
    importPath: '@spartacus/core',
    comment:
      'Class UserReplenishmentOrderService has been removed and is no longer part of the public API. Use ReplenishmentOrderHistoryFacade in @spartacus/order/root instead.',
  },
  {
    node: 'UserTransitional_4_2_Module',
    importPath: '@spartacus/core',
    comment:
      'Class UserTransitional_4_2_Module has been removed and is no longer part of the public API. Use UserModule instead.',
  },
  {
    node: 'UserTransitionalModule',
    importPath: '@spartacus/core',
    comment:
      'Class UserTransitionalModule has been removed and is no longer part of the public API. ',
  },
  {
    node: 'IncubatorCoreModule',
    importPath: '@spartacus/incubator',
    comment:
      'Class IncubatorCoreModule has been removed and is no longer part of the public API. ',
  },
  {
    node: 'IncubatorStorefrontModule',
    importPath: '@spartacus/incubator',
    comment:
      'Class IncubatorStorefrontModule has been removed and is no longer part of the public API. ',
  },
  {
    node: 'ReplenishmentOrderAdapter',
    importPath: '@spartacus/order/core',
    comment:
      'Class ReplenishmentOrderAdapter has been removed and is no longer part of the public API. ',
  },
  {
    node: 'ReplenishmentOrderConnector',
    importPath: '@spartacus/order/core',
    comment:
      'Class ReplenishmentOrderConnector has been removed and is no longer part of the public API. ',
  },
  {
    node: 'ReplenishmentOrderService',
    importPath: '@spartacus/order/core',
    comment:
      'Class ReplenishmentOrderService has been removed and is no longer part of the public API. ',
  },
  {
    node: 'OccReplenishmentOrderAdapter',
    importPath: '@spartacus/order/occ',
    comment:
      'Class OccReplenishmentOrderAdapter has been removed and is no longer part of the public API. ',
  },
  {
    node: 'orderFacadeFactory',
    importPath: '@spartacus/order/root',
    comment:
      'Function orderFacadeFactory has been removed and is no longer part of the public API. ',
  },
  {
    node: 'ReplenishmentOrderFacade',
    importPath: '@spartacus/order/root',
    comment:
      'Class ReplenishmentOrderFacade has been removed and is no longer part of the public API. ',
  },
  {
    node: 'replenishmentOrderFacadeFactory',
    importPath: '@spartacus/order/root',
    comment:
      'Function replenishmentOrderFacadeFactory has been removed and is no longer part of the public API. ',
  },
  {
    node: 'RulebasedConfiguratorEventListener',
    importPath: '@spartacus/product-configurator/rulebased',
    comment:
      "Class RulebasedConfiguratorEventListener has been removed and is no longer part of the public API. Please use 'ConfiguratorRouterListener' instead.  RulebasedConfiguratorEventListener was responsible for deleting cart bound configurations when an order was submitted. This is now handled by `ConfiguratorRouterListener`, which checks on cart boundconfigurations on every navigation that is not configurator related, and deletes cart bound configurations if needed.",
  },
  {
    node: 'RulebasedConfiguratorEventModule',
    importPath: '@spartacus/product-configurator/rulebased',
    comment:
      'Class RulebasedConfiguratorEventModule has been removed and is no longer part of the public API. ',
  },
  {
    node: 'defaultB2bCheckoutConfig',
    importPath: '@spartacus/setup',
    comment:
      "Variable defaultB2bCheckoutConfig has been removed and is no longer part of the public API. Use 'defaultB2BCheckoutConfig' instead (imported from '@spartacus/checkout/b2b/root')",
  },
  {
    node: 'CartComponentModule',
    importPath: '@spartacus/storefront',
    comment:
      'Class CartComponentModule has been removed and is no longer part of the public API. ',
  },
  {
    node: 'CartOrderEntriesContext',
    importPath: '@spartacus/storefront',
    comment:
      'Class CartOrderEntriesContext has been removed and is no longer part of the public API. ',
  },
  {
    node: 'defaultKeyboardFocusConfig',
    importPath: '@spartacus/storefront',
    comment:
      'Variable defaultKeyboardFocusConfig has been removed and is no longer part of the public API. ',
  },
  {
    node: 'KeyboardFocusConfig',
    importPath: '@spartacus/storefront',
    comment:
      'Class KeyboardFocusConfig has been removed and is no longer part of the public API. ',
  },
  {
    node: 'keyboardFocusFactory',
    importPath: '@spartacus/storefront',
    comment:
      'Function keyboardFocusFactory has been removed and is no longer part of the public API. ',
  },
  {
    node: 'OrderDetailsServiceTransitionalToken',
    importPath: '@spartacus/storefront',
    comment:
      'Class OrderDetailsServiceTransitionalToken has been removed and is no longer part of the public API. ',
  },
];

export const REMOVED_PUBLIC_API_DATA: DeprecatedNode[] = [
  ...GENERATED_REMOVED_PUBLIC_API_DATA,
  // integration-libs/cds/src/merchandising/converters/merchandising-facet-normalizer.ts
  {
    node: CDS_MERCHANDISING_FACET_NORMALIZER,
    importPath: SPARTACUS_CDS,
    comment: `'${CDS_MERCHANDISING_FACET_NORMALIZER} has been removed and is no longer part of the public API.`,
  },
  // integration-libs/cds/src/merchandising/converters/merchandising-facet-to-queryparam-normalizer.ts
  {
    node: CDS_MERCHANDISING_FACET_TO_QUERY_PARAM_NORMALIZER,
    importPath: SPARTACUS_CDS,
    comment: `'${CDS_MERCHANDISING_FACET_TO_QUERY_PARAM_NORMALIZER} has been removed and is no longer part of the public API.`,
  },
  // projects/storefrontlib/shared/components/modal/modal-options.ts
  {
    node: MODAL_OPTIONS,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${MODAL_OPTIONS} has been removed and is no longer part of the public API.`,
  },
  // projects/storefrontlib/shared/components/modal/modal-ref.ts
  {
    node: MODAL_REF,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${MODAL_REF} has been removed and is no longer part of the public API.`,
  },
  // projects/storefrontlib/shared/components/modal/modal.directive.ts
  {
    node: MODAL_DIRECTIVE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${MODAL_DIRECTIVE} has been removed and is no longer part of the public API.`,
  },
  // projects/storefrontlib/shared/components/modal/modal.directive.ts
  {
    node: MODAL_DIRECTIVE_OPTIONS,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${MODAL_DIRECTIVE_OPTIONS} has been removed and is no longer part of the public API.`,
  },
  // projects/storefrontlib/shared/components/modal/modal.directive.ts
  {
    node: MODAL_DIRECTIVE_SERVICE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${MODAL_DIRECTIVE_SERVICE} has been removed and is no longer part of the public API.`,
  },
  // projects/storefrontlib/shared/components/modal/modal.module.ts
  {
    node: MODAL_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${MODAL_MODULE} has been removed and is no longer part of the public API.`,
  },
  // projects/storefrontlib/shared/components/modal/modal.service.ts
  {
    node: MODAL_SERVICE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${MODAL_SERVICE} has been removed and is no longer part of the public API.`,
  },
  // feature-libs/product-configurator/rulebased/core/event/rulebased-configurator-event.listener.ts
  {
    node: CONFIGURATOR_EVENT_LISTENER,
    importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
    comment: `'${CONFIGURATOR_EVENT_LISTENER} has been removed and is no longer part of the public API. Please use 'ConfiguratorRouterListener' instead`,
  },
  // projects/core/src/global-message/http-interceptors/handlers/bad-request/bad-request.handler.ts
  {
    node: BAD_REQUEST_HANDLER,
    importPath: SPARTACUS_CORE,
    comment: `'${HANDLE_VOUCHER_OPERATION_ERROR} has been removed and is no longer part of the public API. Please use new methods in ${BAD_VOUCHER_REQUEST_HANDLER}`,
  },
];

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return removedPublicApiDeprecation(tree, context, REMOVED_PUBLIC_API_DATA);
  };
}
