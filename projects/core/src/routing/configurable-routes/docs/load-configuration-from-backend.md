# Load configuration from backend

When `fetch` is set to `true` in `routesConfig`, app will wait with bootstraping until translations of routes are succesfully fetched from backend's URL `<baseUrl>/routes-config`. Example:

```typescript
StorefrontModule.withConfig({
    server: {
        baseUrl: '<base-server-url>'
    },
    routesConfig: { 
        fetch: true // will fetch translations from '<base-server-url>/routes-config'
    }
})
```

## Extending static translations

When `routesConfig` contains statically defined `translations` and also `fetch` set to `true`, then the  static routes translations will be extended by the fetched ones (the same as static translations extend the predefined ones). For example:

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
StorefrontModule.withConfig({
    server: {
        baseUrl: '<base-server-url>'
    },
    routesConfig: { 
        fetch: true,
        translations: {
            default: {
                product: { paths: ['p/:product-code'] },
                category: { paths: ['c/:categoryCode'] }
            }
        }
    }
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

## SUBJECTS OF CHANGE

- [#662](https://github.com/SAP/cloud-commerce-spartacus-storefront/issues/662) a better way of handling the failure is under consideration

## LIMITATIONS

- Endpoint with translations of routes is not configurable. It's always `<baseUrl>/routes-config`
