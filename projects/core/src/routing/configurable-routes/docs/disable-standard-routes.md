# Disable standard routes

To disable a route (i.e. to remove it from Angular's router config and avoid translating paths to this route) it suffices to do one of those things in the config:

- set `null` for this route's name
- set `null` or `[]` for route's paths

For example:

```typescript
StorefrontModule.withConfig({
    routesConfig: {
        translations: {
            en: {
                product: null,
                /*
                or
                  product: { paths: null }
                or
                  product: { paths: [] }
                */
            }
        }
    }
})
```

Then [configurable router links](./configurable-router-links.md) will output:

1. For `{ route: <route> } `

    ```html
    <a [routerLink]="{ route: [ { name: 'product', params: { productCode: 1234 } } ] } | cxTranslateUrl"></a>
    ```

    result

    ```html
    <a [routerLink]="['/']"></a>
    ```

2. For `{ url: <url> } `

    ```html
    <a [routerLink]="{ url: '/product/1234' } | cxTranslateUrl"></a> 
    ```

    result 

    ```html
    <a [routerLink]="'/product/1234'"></a>
    ```
