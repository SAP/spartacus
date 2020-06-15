# An isomorphic javascript sdk for - CommerceWebservicesV2
This project provides an isomorphic javascript package. Right now it supports:
- node.js version 6.x.x or higher
- browser javascript

## How to Install

- nodejs
```
npm install hybris-occ-client
```
- browser
```html
<script type="text/javascript" src="hybris-occ-client/commerceWebservicesV2Bundle.js"></script>
```

## How to use

### nodejs - Authentication, client creation and getCardTypes  as an example written in TypeScript.

```javascript
import * as msRest from "ms-rest-js";
import { CommerceWebservicesV2, CommerceWebservicesV2Models, CommerceWebservicesV2Mappers } from "hybris-occ-client";
const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];

const token = "<access_token>";
const creds = new msRest.TokenCredentials(token);
const client = new CommerceWebservicesV2(creds, subscriptionId);
const baseSiteId = "testbaseSiteId";
const fields = "BASIC";
client.getCardTypes(baseSiteId, fields).then((result) => {
  console.log("The result is:");
  console.log(result);
}).catch((err) => {
  console.log('An error ocurred:');
  console.dir(err, {depth: null, colors: true});
});
```

### browser - Authentication, client creation and getCardTypes  as an example written in javascript.

- index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>My Todos</title>
    <script type="text/javascript" src="https://raw.githubusercontent.com/Azure/ms-rest-js/master/msRestBundle.js"></script>
    <script type="text/javascript" src="./commerceWebservicesV2Bundle.js"></script>
    <script type="text/javascript">
      document.write('hello world');
      const subscriptionId = "<Subscription_Id>";
      const token = "<access_token>";
      const creds = new msRest.TokenCredentials(token);
      const client = new CommerceWebservicesV2(creds, subscriptionId);
      const baseSiteId = "testbaseSiteId";
      const fields = "BASIC";
      client.getCardTypes(baseSiteId, fields).then((result) => {
        console.log("The result is:");
        console.log(result);
      }).catch((err) => {
        console.log('An error ocurred:');
        console.dir(err, { depth: null, colors: true});
      });
    </script>
  </head>
  <body>
  </body>
</html>
```

# Related projects
 - [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)
