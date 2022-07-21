if real delete →

    write a message in the "migrationComment" field of this change in breaking-changes.json
    regenerate doc + schematics for deleted symbols.

if it's a rename →

    Adjust breaking-changes.json to express a rename instead of a delete
    Manually analyze the class/iface/other for breaking changes that might be present and add those too in breaking-changes.json.
    regenerate doc + all appropriate schematics, at least deleted symbols schematics and renamed api schematics (maybe others if a deleted class was renamed and then has other breaking changes).


Use 'getSelectedDeliveryModeState()' from 'CheckoutDeliveryModesFacade' (imported from '@spartacus/checkout/base/root')


Use 'getOrderDetails()' from 'OrderFacade' (imported from '@spartacus/order/root')


Use 'getCheckoutDetailsState()' from 'CheckoutQueryFacade' (imported from '@spartacus/checkout/base/root')



Variable checkoutPaymentSteps
--------------------------
@spartacus/checkout/root

- [ ]  Variable checkoutPaymentSteps is DELETED


Variable checkoutShippingSteps
--------------------------
@spartacus/checkout/root

- [ ]  Variable checkoutShippingSteps is DELETED
