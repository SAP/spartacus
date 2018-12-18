[^ Configurable routes](../README.md)

---

# Disabling standard routes

To disable a route (i.e. to remove it from Angular's router config and avoid translating paths to this route) it suffices to set one of those things in the `routesConfig`:

- set `null` for this route's name
- set `null` or `[]` for route's paths

For example:

```typescript
ConfigModule.withConfig({
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

## Subjects of change

- when predefined configuration of routes is splitted in between the feature modules (as planned in [652](https://github.com/SAP/cloud-commerce-spartacus-storefront/issues/652)), then it will suffice just not to import the feature module in order to disable its routes