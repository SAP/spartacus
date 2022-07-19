if real delete →

    write a message in the "migrationComment" field of this change in breaking-changes.json
    regenerate doc + schematics for deleted symbols.

if it's a rename →

    Adjust breaking-changes.json to express a rename instead of a delete
    Manually analyze the class/iface/other for breaking changes that might be present and add those too in breaking-changes.json.
    regenerate doc + all appropriate schematics, at least deleted symbols schematics and renamed api schematics (maybe others if a deleted class was renamed and then has other breaking changes).


Use 'getSelectedDeliveryModeState()' from 'CheckoutDeliveryModesFacade' (imported from '@spartacus/checkout/base/root')


Use 'getOrderDetails()' from 'OrderFacade' (imported from '@spartacus/order/root')


Variable getCheckoutSteps
--------------------------
@spartacus/checkout/core

- [ ]  Variable getCheckoutSteps is DELETED


Variable getCheckoutStepsState
--------------------------
@spartacus/checkout/core

- [ ]  Variable getCheckoutStepsState is DELETED


Variable getOrderTypesState
--------------------------
@spartacus/checkout/core

- [ ]  Variable getOrderTypesState is DELETED



Use 'getSelectedDeliveryModeState()' from 'CheckoutDeliveryModesFacade' (imported from '@spartacus/checkout/base/root')


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


Interface CheckoutOccEndpoints
--------------------------
@spartacus/checkout/occ

- [ ]  PropertySignature loadCheckoutDetails is DELETED
- [ ]  PropertySignature paymentTypes is DELETED
- [ ]  PropertySignature placeOrder is DELETED
- [ ]  PropertySignature setCartCostCenter is DELETED
- [ ]  PropertySignature setCartPaymentType is DELETED

Variable checkoutPaymentSteps
--------------------------
@spartacus/checkout/root

- [ ]  Variable checkoutPaymentSteps is DELETED


Variable checkoutShippingSteps
--------------------------
@spartacus/checkout/root

- [ ]  Variable checkoutShippingSteps is DELETED

Variable defaultB2bCheckoutConfig
--------------------------
@spartacus/setup

- [ ]  Variable defaultB2bCheckoutConfig is DELETED