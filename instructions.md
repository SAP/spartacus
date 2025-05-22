## Running

Install Dependencies (once) `npm i`

Start with `npm run start`

1. Navigate to `http://localhost:4200/electronics/en/USD/`

2. Click login (in hamburger menu for mobile view)

3. Enter credentials into auth server

4. Click login

5. - Expected: Redirect back to http://localhost:4200
   - Actual: 404 on auth server

## Configuration

OCC Endpoint here: [.env-cmdrc] (.env-cmdrc)
```json
  "dev": {
    "CX_BASE_URL": "<API>"
  },
```

Auth credentials here: [spartacus-b2c-configuration.module.ts](projects/storefrontapp/src/app/spartacus/spartacus-b2c-configuration.module.ts)
```ts
    provideConfig(<AuthConfig>{
      authentication: {
        client_id: 'android_mobile_new',
      },
    }),
```
Most settings are covered by the default config.

## Backoffice changes

Added new auth credential
```text
OAuth client ID                mobile_android_new
OAuth authorities              ROLE_CLIENT
OAuth authorized grant types   refresh_token authorization_code
OAuth resource IDs             hybris
OAuth registered redirect URI  https://localhost:4200
Scopes                         basic
```

Set up customer: keenreviewer1@hybris.com
- enabled for all sites
- added password for all sites
