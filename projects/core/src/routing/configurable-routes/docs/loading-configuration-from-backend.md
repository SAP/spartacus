[^ Configurable routes](../README.md)

---

# Loading configuration from backend

When the config contains `routes.fetch` set to `true`, the app will wait with bootstrapping until translations of routes are successfully fetched from backend's URL `<baseUrl>/routes-config` (**NOTE**: this endpoint is not available in the backend yet). Example:

```typescript
ConfigModule.withConfig({
    server: {
        baseUrl: '<base-server-url>'
    },
    routes: {
        fetch: true // will fetch translations from '<base-server-url>/routes-config'
    }
})
```

## Extending static translations

When the config contains both `routes.config` with statically defined `translations` and `fetch` set to `true`, then the the static routes translations will be extended by the fetched ones (the same as static translations extend the predefined ones). For example:

JSON returned by `<base-server-url>/routes-config` will have the *highest priority*:

```typescript
{
    "translations": {
        "default": {
            "product": { "paths": [":productCode/custom/product-path"] },
        }
    }
}
```

Static config will have *medium priority*:

```typescript
ConfigModule.withConfig({
    server: {
        baseUrl: '<base-server-url>'
    },
    routes: {
        config: { 
            translations: {
                default: {
                    product: { paths: ['p/:product-code'] },
                    category: { paths: ['c/:categoryCode'] }
                }
            }
        },
        fetch: true
    },
})
```

And predefined translations have the *lowest priority*:

```typescript
default {
    product: { paths: ['product/:productCode'] },
    category: { paths: ['category/:categoryCode'] }
    cart: { paths: ['cart'] },
    /* ... */
},
/* ... */
```

Then the final translations will be:

```typescript
translations: {
    /* ... */
    default: {
        product: { paths: [":productCode/custom/product-path"] }, // fetched
        cart: { paths: ['custom/cart-path'] },                    // static
        category: { paths: ['category/:categoryCode'] }           // predefined
        /* ... */
    },
    /* ... */
}
```

## What if translations cannot be fetched

When request for translations fails after 2 automatic retries, then a fatal error is thrown and unfortunately the app crashes.

## Subjects of change

- [#662](https://github.com/SAP/cloud-commerce-spartacus-storefront/issues/662) a better way of handling the failure is under consideration

## Limitations

- Endpoint with translations of routes is not configurable. It's always `<baseUrl>/routes-config`
