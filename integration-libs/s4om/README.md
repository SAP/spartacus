# S/4 HANA Synchronous Order Management

This library provides S/4 HANA Synchronous Order Management capabilities to Spartacus UI.


The features supported are:
- Schedule Lines: Display a table of scheduled delivery dates and product quantity for each item in the B2B Cart using information from S/4 HANA system.


- Requested Delivery Date: Allow customers to provide a delivery date for which the item would be needed. The minimum date would be fetched from the S/4 HANA system and used along with the Order.

- PDF Invoices: View invoices for their orders and download PDF invoices using `Invoices` APIs. When the user selects an invoice, the backend returns a byte array, which is converted to PDF and downloaded.


