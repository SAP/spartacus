# Spartacus Order Library

Spartacus Order feature can be added to the existing Spartacus application by running `ng add @spartacus/order`. For more information about Spartacus schematics, visit the [official Spartacus schematics documentation page](https://sap.github.io/spartacus-docs/schematics/).

To see enhanced UI in Order History and Order Details page in B2C storefront, 
1. Add `{ provide: MY_ACCOUNT_V2_ORDER, useValue: true },` to order-feature.module.ts file `providers` array.
2. Add `pdf-invoices` feature to the storefront, if not installed already.

For more information, see [Spartacus](https://github.com/SAP/spartacus).
