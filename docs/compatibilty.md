# Compatibility Notes

## February 13, 2019

Libraries: spartacus/
* styles 0.1.0-prealpha.TBD
* core 0.1.0-prealpha.TBD
* storefront 0.1.0-prealpha.TBD

1. Top bar missing: no language and currency menus, can't storefinder

New CMS components are being used to display the language and currency selectors, the store finder, and other links in the top right bar. CMS components are pulled from the backend and thus aren't released yet.

Workarounds:
* You can change the language or currency in the URL. For example, when you first load the storefront, you will see www.domain.com/en/USD/. You can change 'en' to 'de' to show German, and 'USD' to 'JPY' to show Japanese Yen.
* You can display the storefinder by adding 'store-finder' after the language and currency entities. For example: www.domain.com/en/USD/en/USD/store-finder.

2. Refresh issue

Depending on the server configuration, refreshing the page or trying to go directly to a specific page will display the server's 404 error. This is not an issue with Spartacus but with server URL rewrite rules. See https://stackoverflow.com/questions/34619751/tomcat-8-url-rewrite-issues/44847035#44847035.

## January 14, 2019

Libraries: spartacus/
* styles 0.1.0-prealpha.7
* core 0.1.0-prealpha.6
* storefront 0.1.0-prealpha.13

SmartEdit support has been added. Full functionality of this feature nonetheless requires extensions that will be released in SAP Commerce Cloud 1905.
