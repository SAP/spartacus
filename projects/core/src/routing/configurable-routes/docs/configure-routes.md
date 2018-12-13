# Configure routes

## Config

### Predefined config

The predefined routes config for Storefront's pages can be found in [`default-storefront-routes-translations.ts`](./config/default-storefront-routes-translations.ts).

```typescript
// default-storefront-routes-translations.ts
default: {
    /* ... */
    product: { 
        paths: ['product/:productCode'],
        /* ... */
    }
    /* ... */
}
```

### Extending predefined config

Every part of the predefined config can be extended or overwritten in the Shell App, using `StorefrontModule.withConfig`:

1. for all languages (`default` key):

    ```typescript
    StorefrontModule.withConfig({
        routesConfig: {
            translations: {
                default: {
                    product: { paths: ['p/:productCode'] }
                }
            }
        }
    })
    ```

    Then the route of the product page will be `p/:productCode` for all languages .

2. for specific languages (for example `en` key):

    ```typescript
    StorefrontModule.withConfig({
        routesConfig: {
            translations: {
                /* predefined not overwritten: 
                default: {
                    product: { paths: ['p/:productCode'] }
                }
                */
                en: {
                    product: { paths: [':productCode/custom/product-path'] }
                }
            }
        }
    })
    ```

    Then the route of the product page will be `:productCode/custom/product-path` only for English and `product/:productCode` for every other language.

3. both for all languages (`default` key) and for specific languages (for example `en` key):

    ```typescript
    StorefrontModule.withConfig({
        routesConfig: {
            translations: {
                default: { 
                    product: { paths: ['p/:productCode'] } // predefined overwritten
                },
                en: {
                    product: { paths: [':productCode/custom/product-path'] }
                }
            }
        }
    })
    ```

    Then the route of product page will be `:productCode/custom/product-path` only for English and `p/:productCode` for every other language.

### How predefined config is extended and overwritten

- objects **extend** predefined objects
- values (primitives, arrays, `null`) **overwrite** predefined values

### Always use route parameters from the predefined config

All route parameters that appear in predefined config (for example `:productCode` param in `product/:productCode` path) mustn't be omitted in overwritten paths. Otherwise Storefront's components may break. For example please **don't do**:

```typescript
StorefrontModule.withConfig({
    routesConfig: {
        translations: {
            default: {
                product: { paths: ['product/:productName'] } // overwritten without :productCode
            }
        }
    }
})
```

### Why `paths` is an array

It's to support [Route aliases](./route-aliases.md).

## Angular's `Routes`

In order to have configurable `Routes` we need to name them (in `data.cxPath` property) the same as the route keys in the config. For example:

```typescript
const routes: Routes = [
    {
        data: {
            cxPath: 'product' // the name of the route
        },
        path: null, // it will be replaced by the path from config
        component: ProductPageComponent
        /* ... */
    }
];
```

where config is:

```typescript
StorefrontModule.withConfig({
    routesConfig: {
        translations: {
            default: {
                product: { // the name of the route
                    paths: [/*...*/]
                }
            }
        }
    }
})
```

### Property `path` cannot be left `undefined`

Angular requires any defined `path` in compilation time.

### Children routes (nested routes)

When an Angular's `Route` contains `children`:

```typescript
const routes: Routes = [
    {
        data: {
            cxPath: 'parent' // the name of the route
        },
        children: [
            {
                data: {
                    cxPath: 'child' // the name of the route
                },
                /* ... */
            }
        ],
        /* ... */
    }
];
```

then the children's configuration should be nested at `children` property of the parent route:

```typescript
StorefrontModule.withConfig({
    routesConfig: {
        translations: {
            default: {
                parent: { // the name of the route
                    paths: ['parent-path'],
                    children: {
                        child: { // the name of the route
                            paths: ['child-path']
                        },
                    }
                },
            }
        }
    }
})
```

### Subjects of change

- `cxPath` property is considered to be replaced with other property
- `path` is considered to contain the first default [path alias](#path-aliases)
