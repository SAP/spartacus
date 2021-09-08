## 1. ADR Details
| | |
|-|-|
| ADR # | SPA001 |
| Product Area(s) | Base site, CMS |
| Title | One app for B2B and B2C  |
| Status | PROPOSED |
| Proposer(s) | @platonn |
| Approver(s) | @marlass @znikola |
| To Be Reviewed On | - |

## 2. Context
_Explain why the decision is being taken_

Customers are able to configure a channel (b2b or b2c) for each base site in the CMS - to control the channel of the storefront. But currently Spartacus doesn't support it, so any channel-specific logic needs to be hardcoded upfront in customer's JS app - for example for a B2B channel, customer needs this adding this snippet:

```typescript
  provideConfig(defaultB2bOccConfig),      
  provideConfig(defaultB2bCheckoutConfig),

  // both configs imported from '@spartacus/setup'
```

Some customers want to run just one Spartacus app for various basesites that have different channels. To address this problem, we should load the channel configuration from the CMS upfront (during app initialization) and then provide specific channel-dependent Spartacus configs.

### Characteristics of an ideal solution 
- We're able to define channel-dependent default config chunks - different for b2b and b2c.
- Customer doesn't have to amend his app code, when we want to introduce new properties in the channel-dependent default config
  - Why: because it's hard to maintain. It requires manual steps from customers and additional documentation on our side.
- customer should be able to easily and intuitively overwrite properties of our channel-dependent default config (in particular: overwrite properties only for a specific channel or for both channels)
- channel-dependent default config chunks may live not only in the `@spartacus/setup` library, but also live in various feature libraries (e.g. `@spartacus/checkout`, `@spartacus/user`, etc.)


Related issue: https://github.com/SAP/spartacus/issues/10251


### Considered solutions:

#### A) async Config Initializer placed in the customer's app
The existing mechanism of `ConfigInitializer` allows for populating the config properties asynchronously during the app initialization.

Normally the customer's config has higher priority over our default config properties. But any config (even default) that is populated asynchronously by the `ConfigInitializer` overwrite properties that were declared statically. This means that customer's static config will be overwritten by our asynchronous *default* config, which might be counter-intuitive for customers.

We can create a convenient function `provideConfigForChannel(defaultConfig, channel)`. Under the hood it would register a `CONFIG_INITIALIZER` for a given `defaultConfig` parameter, and populate the main configuration with it, only if the `channel` matches the current basesite's channel.

Pros:

👍 we control the `defaultConfig` object, so we can add new properties to it

Cons:

👎 the customer's static config is overwritten by the async default config, which might be counter-intuitive for customers if they want to overwrite the defaults using static config

👎 Setting any new value in the default config that is async is risking a breaking change. It might overwrite the customer's config properties in case he already configured this property statically before.
  
👎 in feature libs we can't add new default config chunks that are async (it's because customer's app code decides which config chunks are async and channel-dependent).

### B) async Default Config Initializer, placed in our library
We can introduce a new mechanism called Default Config Initializer, which would populate the configuration with a config chunk, but ensuring it has less priority than any static config chunks.

To check: how it would affect the complexity of existing mechanisms of:
- [ ] `ConfigInitializer`
- [ ] `ConfigurationService`

Pros:

👍 we control the `defaultConfig` object, so we can add new properties to it

👍 we can add new default config properties without breaking change in minor version, because customer's static config still has higher priority. This also remains intuitive for customers.

👍 we can add new async default config chunks in feature libraries without amending customer's app code

## 3. Decision
_Elaborate the decision_

TODO

## 4. Consequences
_Explain any trade-offs there_

TODO

## 5. Compliance
_How can this decision be ensured? Eg. automatically or through reviews_

N/A

## 6. Components Involved
`Config`
`ConfigInitializer`
`SiteContextConfigInitializer`