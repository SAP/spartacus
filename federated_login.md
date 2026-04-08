# Questions
- CMS loading
  - cms data can be loaded per site with little issue.  Modified site-context-config-initializer to read URL and parameter.
    - realistically should use configurable param with hard-coded map of keys to sites
- Media endpoints
  - URIs are built from CMS and configuration.  If the merchant is using the same CMS for every site (true if assumption of single spartacus instance), assets load for the selected base-site.
- can everything be done in a single spartacus instance?
  - limited.
    - performance impact of using dynamic site resolution. could be initiated only when applicable via logic
    - components/modules i.e. b2b/b2c.  configuration will apply to all sites, so loaded feature modules will need to be a union of all hosted sites.  If any of those configurations are exclusive, 
- link handling
  - still unclear
    - Absolute CMS links for media work, assuming separate cms structure for each base-site
    - no solution found to programmatically apply different base URL
      - angular routerLink is not dynamic, bootstrapped before base-site can be determined
      - possibly use directive on all links to override attribute rendering
- adding arbitrary params to redirect URL
  - yes, can add arbitrary parameters to /authorizationserver/oauth/authorize call
    - needs dynamic aspect added to AuthConfigService.getLoginUrl
- csp policies?
  - should not be an issue
- localstorage data
  - language
  - currency
  - cart
  - cookie settings?
  - 
- multi-country setup 
  - 


# Assumptions
- different base sites per 
- 

# Configuration
{redirectUriHost}

```sh
# add 'context'
authserver.authorizationCode.allowed.params=context 
# client_id,client_secret,response_type,redirect_uri,scope,state,code_challenge,code_challenge_method,nonce,continue,_csrf,context

# add 'login.local'
authserver.oauthclientdetails.loginpageuri.allowed.hosts=login.local 

# add to current value
corsfilter.authorizationserver.allowedOrigins=https://login.local:4200, https://electronics-storefront.de:4200, https://electronics-storefront.es:4200, https://powertools-storefront.de:4200
```


## Hosting

static API endpoint
	- [api.login.local](https://api.login.local:9002/)
static login storefront
	- [login.local:4200 - es](https://login.local:4200/?origin=es)
	- [login.local:4200 - de](https://login.local:4200/?origin=de)
	- [login.local:4200 - pd](https://login.local:4200/?origin=pd)
storefront domains
	- electronics-storefront.de:4200 - electronics-spa
	- electronics-storefront.es:4200 - apparel-uk-spa
	- powertools-storefront.de:4200  - powertools-spa

## Spartacus configs
https://wiki.one.int.sap/wiki/spaces/spar/pages/5804333987/Multi-Host+emulation+for+local+development
```json projects/storefrontapp/project.json
      "options": {
        "allowedHosts": [
          "localhost",
          "login.local",
          "powertools.de",
          "electronics.de"
          "electronics.es",
        ]
      },
```

```json .env-cmdrc
    "CX_BASE_URL": "https://api.local:9002"
```

```ts projects/storefrontapp/src/app/spartacus/spartacus-b2c-configuration.providers.ts
  provideConfig({
    context: {
      urlParameters: ['baseSite', 'language', 'currency'],
      // baseSite: baseSite, // comment this out
    },
  }),
  provideConfig({
    authentication: { client_id: 'mobile_android_login' },
  }),
```


# development notes

- need to store context on login domain for page reloads
  - read from param
  - fallback to localstorage
  - fallback to basesite defaults

**What to do when no basesite?**
