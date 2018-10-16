# Spartacus Demo Server

This document contains instructions on accessing the Spartacus demo server that will be functional during SAP Customer Experience Live 2018 (the CRM event of the year - see https://events.sap.com/sap-cx-live/en/home)

The demo server can be reached here: 
https://storefront.c39j2-walkersde1-d2-public.model-t.cc.commerce.ondemand.com/spartacus

This site is an example of Spartacus running through a Model-T build of as-yet-unreleased next release of SAP Commerce Cloud. You can: register, log in, search, view products, add to cart, view cart, and checkout*. Try it with your mobile phone too!

The demo server will be operational until at least the week of SAP Customer Experience Live 2018. Thanks for trying it out!

----
## Checking Out
*Spartacus checkout for this server is connected to a payment provider. To complete checkout, you must configure a browse with a plugin that bypasses CORS security protections. The following instructions describe how to do this with Google Chrome. Warning: Using a plugin like CORS turns off important security settings; use at your own risk.

1. Install a CORS plugin such as the following:
Allow-Control-Allow-Origin: *
https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en

2. Add the following URL to your CORS plugin settings:
https://testsecureacceptance.cybersource.com/silent/pay

3. Turn on the plugin.

4. Check out through the Spartacus demo site.
Note: If checkout payment step still doesn't work, try restarting your browser.

If you don't use a CORS bypass plugin, you'll be able to proceed through checkout but the payment step will not work.

Remember to turn this plugin off after!

----
Using Test Data

For checking out, use test shipping and credit card data. 
A test credit card number is Visa and 4111111111111111.

Orders are not actually placed, but the information is saved to your account. Account information and orders will be deleted after the summit is over.

