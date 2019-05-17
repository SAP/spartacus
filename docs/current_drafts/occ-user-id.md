# OCC User Identifier with 1905+

It is a security best practice to avoid using sensitive user information in the endpoint urls.  Starting from SAP CX commerce version 1905, it is now possible to use other identifiers than the uid ( which contains the user email by default ).

Spartacus now uses this security improvement.  By default, Spartacus will use the user's customerId as a user identifier in the OCC call urls.

For example, the url for a call to the update password endpoint will look like this:

```
http://backendserver/rest/v2/electronics-spa/users/e57924e5-cafe-4b58-997d-9d684367cab8/password?lang=en&curr=USD
```

Where e57924e5-cafe-4b58-997d-9d684367cab8 is the user's customerId.

## Backward compatibility with versions prior to 1905

In order to use Spartacus with SAP CX commerce 1811, it is possible to override this behaviour with a configuration.

In the app.module.ts file of your Angular app, set the Spartacus config `backend.occ.userIdentifier` to `uid`.  

```
StorefrontModule.withConfig({
      backend: {
        occ: {
          userIdentifier: 'uid',
        },
      },
    })
```

Spartacus will switch back to use the user's `uid` (which is likely the user's email) in the OCC call URLs. If we take again the example of the update password endpoint, the url will liik like this instead:

```
http://backendserver/rest/v2/electronics-spa/users/email@domain.com/password?lang=en&curr=USD
```




