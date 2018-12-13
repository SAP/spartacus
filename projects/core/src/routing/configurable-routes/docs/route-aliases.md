# Route aliases

Many route aliases can be configured in `paths` array. For example:

```typescript
StorefrontModule.withConfig({
    routesConfig: {
        translations: {
            default: {
                product: 
                    paths: [
                        ':campaignName/product/:productCode',
                        'product/:productCode'
                    ]
                }
            }
        }
    }
})
```

Then a [configurable router link](./configurable-router-links.md) will use **the first configured path alias** from the `paths` array **that can satisfy its params** with given `params` object. So it's good to order aliases from those that require the most specific parametes to those having less parameters. For example:

When config is:

```typescript
StorefrontModule.withConfig({
    routesConfig: {
        translations: {
            default: {
                product: 
                    paths: [
                        ':campaignName/product/:productCode',
                        'product/:productCode'
                    ]
                }
            },
            en: {
                product: 
                    paths: [
                        ':campaignName/p/:productCode', /* this will be used when `campaignName` param is given */
                        'p/:productCode' /* this will be used otherwise */
                   ]
                }
            }
        }
    }
})
```

1. With `{ route: <route> }`:
    1. when `campaignName` param **is** given:

        ```html
        <a [routerLink]="{ route: [ 
            { name: 'product', params: { productCode: 1234, campaignName: 'sale' } } 
        ] } | cxTranslateUrl"></a>
        ```

        result

        ```html
        <a [routerLink]="['', 'sale', 'p', '1234']"></a>
        ```

    2. when `campaignName` param **is not** given:

        ```html
        <a [routerLink]="{ route: [ { name: 'product', params: { productCode: 1234 } } ] } | cxTranslateUrl"></a>
        ```

        result

        ```html
        <a [routerLink]="['', 'p', '1234']"></a>
        ```

2. With `{ url: <url> }`:

    1. when `campaignName` param **is** given:

        ```html
        <a [routerLink]="{ url: '/sale/product/1234' } | cxTranslateUrl"></a>
        ```

        result

        ```html
        <a [routerLink]="['', 'sale', 'p', '1234']"></a>
        ```

    2. when `campaignName` param **is not** given:

        ```html
        <a [routerLink]="{ url: '/product/1234' } | cxTranslateUrl"></a>
        ```

        result

        ```html
        <a [routerLink]="['', 'p', '1234']"></a>
        ```

## Wrong order of aliases

When a path with less params (for example `/p/:productCode`) is put before a path that has the same params and more (for example `:campaignName/p/:productCode`), then the first path will **always** be used to translate the path (and the second will **never** be used). For example:

```typescript
StorefrontModule.withConfig({
    routesConfig: {
        translations: {
            default: {
                product: 
                    paths: [
                        ':campaignName/product/:productCode',
                        'product/:productCode'
                    ]
                }
            },
            en: {
                product: 
                    paths: [
                        /* WRONG: */

                        /* will always be used */
                        'p/:productCode', 

                        /* will never be used, because (among others) contains the same params as above */
                        ':campaignName/p/:productCode'
                   ]
                }
            }
        }
    }
})
```

All following examples result in the same:

```html
<a [routerLink]="['', 'p', '1234']"></a>
```

1. `{ route: <route> }`:
    1. when `campaignName` param **is** given:
    
        ```html
        <a [routerLink]="{ route: [ 
            { name: 'product', params: { productCode: 1234, campaignName: 'sale' } } 
        ] } | cxTranslateUrl"></a>
        ```

    2. when `campaignName` param **is not** given:

        ```html
        <a [routerLink]="{ route: [ { name: 'product', params: { productCode: 1234 } } ] } | cxTranslateUrl"></a>
        ```

2. `{ url: <url> }`:

    1. when `campaignName` param **is** given:

        ```html
        <a [routerLink]="{ url: '/sale/product/1234' } | cxTranslateUrl"></a>
        ```

    2. when `campaignName` param **is not** given:

        ```html
        <a [routerLink]="{ url: '/product/1234' } | cxTranslateUrl"></a>
        ```

## Subjects of change

- [#655](https://github.com/SAP/cloud-commerce-spartacus-storefront/issues/655) named aliases are under consideration - to allow translating precise aliases of paths and not to base only on the specificity of parameters
