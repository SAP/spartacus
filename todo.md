if real delete →

    write a message in the "migrationComment" field of this change in breaking-changes.json
    regenerate doc + schematics for deleted symbols.

if it's a rename →

    Adjust breaking-changes.json to express a rename instead of a delete
    Manually analyze the class/iface/other for breaking changes that might be present and add those too in breaking-changes.json.
    regenerate doc + all appropriate schematics, at least deleted symbols schematics and renamed api schematics (maybe others if a deleted class was renamed and then has other breaking changes).


Use 'getSupportedDeliveryModesState()' from 'CheckoutDeliveryModesFacade' (imported from '@spartacus/checkout/base/root')


Use 'CheckoutDeliveryAddressFacade' or 'CheckoutDeliveryModesFacade' (imported from '@spartacus/checkout/base/root')



This property is used internally only.




TypeAlias CheckoutDetails
--------------------------
@spartacus/checkout/core

- [ ]  TypeAlias CheckoutDetails is DELETED


Class CheckoutPaymentService
--------------------------
@spartacus/checkout/core

- [ ]  Method actionAllowed is DELETED
- [ ]  Property activeCartService is DELETED
- [ ]  Property checkoutStore is DELETED
- [ ]  Method getCardTypes is DELETED
- [ ]  Method getPaymentDetails is DELETED
- [ ]  Method loadSupportedCardTypes is DELETED


Namespace CheckoutSelectors
--------------------------
@spartacus/checkout/core

- [ ]  Namespace CheckoutSelectors is DELETED


Variable getAllCardTypes
--------------------------
@spartacus/checkout/core

- [ ]  Variable getAllCardTypes is DELETED


Variable getAllPaymentTypes
--------------------------
@spartacus/checkout/core

- [ ]  Variable getAllPaymentTypes is DELETED


Variable getCardTypesEntites
--------------------------
@spartacus/checkout/core

- [ ]  Variable getCardTypesEntites is DELETED


Variable getCardTypesState
--------------------------
@spartacus/checkout/core

- [ ]  Variable getCardTypesState is DELETED


Variable getCheckoutDetailsLoaded
--------------------------
@spartacus/checkout/core

- [ ]  Variable getCheckoutDetailsLoaded is DELETED


Variable getCheckoutLoading
--------------------------
@spartacus/checkout/core

- [ ]  Variable getCheckoutLoading is DELETED


Variable getCheckoutOrderDetails
--------------------------
@spartacus/checkout/core

- [ ]  Variable getCheckoutOrderDetails is DELETED


Variable getCheckoutState
--------------------------
@spartacus/checkout/core

- [ ]  Variable getCheckoutState is DELETED


Variable getCheckoutSteps
--------------------------
@spartacus/checkout/core

- [ ]  Variable getCheckoutSteps is DELETED


Variable getCheckoutStepsState
--------------------------
@spartacus/checkout/core

- [ ]  Variable getCheckoutStepsState is DELETED


Variable getDeliveryAddress
--------------------------
@spartacus/checkout/core

- [ ]  Variable getDeliveryAddress is DELETED


Variable getDeliveryMode
--------------------------
@spartacus/checkout/core

- [ ]  Variable getDeliveryMode is DELETED


Variable getOrderTypesState
--------------------------
@spartacus/checkout/core

- [ ]  Variable getOrderTypesState is DELETED


Variable getPaymentDetails
--------------------------
@spartacus/checkout/core

- [ ]  Variable getPaymentDetails is DELETED


Variable getPaymentTypesEntites
--------------------------
@spartacus/checkout/core

- [ ]  Variable getPaymentTypesEntites is DELETED


Variable getPaymentTypesState
--------------------------
@spartacus/checkout/core

- [ ]  Variable getPaymentTypesState is DELETED


Variable getPoNumer
--------------------------
@spartacus/checkout/core

- [ ]  Variable getPoNumer is DELETED


Variable getSelectedDeliveryMode
--------------------------
@spartacus/checkout/core

- [ ]  Variable getSelectedDeliveryMode is DELETED


Variable getSelectedDeliveryModeCode
--------------------------
@spartacus/checkout/core

- [ ]  Variable getSelectedDeliveryModeCode is DELETED


Variable getSelectedOrderType
--------------------------
@spartacus/checkout/core

- [ ]  Variable getSelectedOrderType is DELETED


Variable getSelectedOrderTypeSelector
--------------------------
@spartacus/checkout/core

- [ ]  Variable getSelectedOrderTypeSelector is DELETED


Variable getSelectedPaymentType
--------------------------
@spartacus/checkout/core

- [ ]  Variable getSelectedPaymentType is DELETED


Variable getSupportedDeliveryModes
--------------------------
@spartacus/checkout/core

- [ ]  Variable getSupportedDeliveryModes is DELETED


Interface CheckoutState
--------------------------
@spartacus/checkout/core

- [ ]  PropertySignature cardTypes is DELETED
- [ ]  PropertySignature orderType is DELETED
- [ ]  PropertySignature paymentTypes is DELETED
- [ ]  PropertySignature steps is DELETED


Interface CheckoutStepsState
--------------------------
@spartacus/checkout/core

- [ ]  Interface CheckoutStepsState is DELETED


Interface OrderTypesState
--------------------------
@spartacus/checkout/core

- [ ]  Interface OrderTypesState is DELETED


Variable PAYMENT_TYPE_NORMALIZER
--------------------------
@spartacus/checkout/core

- [ ]  Variable PAYMENT_TYPE_NORMALIZER is DELETED


Interface PaymentTypesState
--------------------------
@spartacus/checkout/core

- [ ]  Interface PaymentTypesState is DELETED


Interface StateWithCheckout
--------------------------
@spartacus/checkout/core

- [ ]  Interface StateWithCheckout is DELETED


Interface CheckoutOccEndpoints
--------------------------
@spartacus/checkout/occ

- [ ]  PropertySignature loadCheckoutDetails is DELETED
- [ ]  PropertySignature paymentTypes is DELETED
- [ ]  PropertySignature placeOrder is DELETED
- [ ]  PropertySignature setCartCostCenter is DELETED
- [ ]  PropertySignature setCartPaymentType is DELETED


Class OccReplenishmentOrderFormSerializer
--------------------------
@spartacus/checkout/occ

- [ ]  Class OccReplenishmentOrderFormSerializer is DELETED


Class CheckoutCostCenterFacade
--------------------------
@spartacus/checkout/root

- [ ]  Method getCostCenter is DELETED

Class CheckoutPaymentFacade
--------------------------
@spartacus/checkout/root

- [ ]  Method getCardTypes is DELETED
- [ ]  Method getPaymentDetails is DELETED
- [ ]  Method loadSupportedCardTypes is DELETED


Variable checkoutPaymentSteps
--------------------------
@spartacus/checkout/root

- [ ]  Variable checkoutPaymentSteps is DELETED


Variable checkoutShippingSteps
--------------------------
@spartacus/checkout/root

- [ ]  Variable checkoutShippingSteps is DELETED


Class OrderConfirmationOrderEntriesContext
--------------------------
@spartacus/checkout/root

- [ ]  Property checkoutService is DELETED

Variable defaultB2bCheckoutConfig
--------------------------
@spartacus/setup

- [ ]  Variable defaultB2bCheckoutConfig is DELETED