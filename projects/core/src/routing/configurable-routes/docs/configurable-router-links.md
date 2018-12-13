
# Configurable router links

## Prerequisites

Import `UrlTranslatorModule` in every module that uses configurable router links.

## Router links

Configured router links can be automatically generated in HTML templates using `cxTranslateUrl` pipe. It can:

1. transform **a name of a route** and **a params object** into a configured path
2. transform **a path having a default shape** into a configured path


### Transform a name of a route and a params object

```typescript
{ route: <route> } | cxTranslateUrl
```

Example:

```html
<a [routerLink]="{ route: [ { name: 'product', params: { productCode: 1234 } } ] } | cxTranslateUrl"></a>
```

where config is:

```typescript
StorefrontModule.withConfig({
    routesConfig: {
        translations: {
            en: {
                product: { paths: [':productCode/custom/product-path'] }
            }
        }
    }
})
```

result:

```html
<a [routerLink]="['', 1234, 'custom', 'product-path']"></a>
```

#### What if `{ route: <route> }` cannot be translated?

When the path cannot be translated from `{ route: <unknown-route> }` (for example due to typo in the route's name, mising necessary params or wrong config) *the root URL* `['/']` is returned:

```html
<a [routerLink]="{ route: <unknown-route> } | cxTranslateUrl"></a>
```

result:

```html
<a [routerLink]="['/']"></a>
```

#### Pass `string` when only a name of route is needed

When only a name of route is needed (i.e. no params), then it can be given as `string` instead of object with `name` property. For example:

Both:

```html
<a [routerLink]="{ route: ['cart'] } | cxTranslateUrl"></a>
```

and

```html
<a [routerLink]="{ route: [ { name: 'cart' } ] } | cxTranslateUrl"></a>
```

when config is:

```typescript
StorefrontModule.withConfig({
    routesConfig: {
        translations: {
            en: {
                cart: { paths: ['custom/cart-path'] } // no params needed
            }
        }
    }
})
```

result in:

```html
<a [routerLink]="['', 'custom', 'cart-path']"></a>
```

#### Why `<route>` is an array?

It's to support children routes (nested routes).

### Transform a path having a default shape

```typescript
{ url: <url> } | cxTranslateUrl
```

Examples:

1. When the predefined path **is not overwritten**

    ```html
    <a [routerLink]="{ url: '/product/1234' } | cxTranslateUrl"></a> 
    ```

    config:

    ```typescript
    StorefrontModule.withConfig({
        routesConfig: {
            translations: {
                /* 
                default: {
                    product: { paths: ['product/:productCode'] } // predefined not overwritten
                }
                */
                en: {
                    product: { paths: [':productCode/custom/product-path'] }
                }
            }
        }
    })
    ```

    result:

    ```html
    <a [routerLink]="['', 1234, 'custom', 'product-path']"></a>
    ```

2. When the predefined path **is overwritten**

    ```html
    <a [routerLink]="{ url: 'p/1234' } | cxTranslateUrl"></a>
    ```

    config:

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

    result:

    ```html
    <a [routerLink]="['', 1234, 'custom', 'product-path']"></a>
    ```

#### What if `{ url: <url> }` cannot be translated?

When the path cannot be translated from `{ url: <unknown-url> }` (for example due to unexpected shape of the URL, or wrong config) *the original URL* is returned:

```html
<a [routerLink]="{ url: '/unknown/url' } | cxTranslateUrl"></a> 
```

result:

```html
<a [routerLink]="'/unknown/url'"></a>
```

#### Relative path in `{ url: <url> }` is treated as absolute

When URL in `{ url: <url> }` is relative (without leading `/`), it will be treated the same as absolute. For example:

Both:

```html
<a [routerLink]="{ u0 rl: 'product/1234' } | cxTranslateUrl"></a> 
```

and

```html
<a [routerLink]="{ url: '/product/1234' } | cxTranslateUrl"></a> 
```

result in:

```html
<a [routerLink]="['', 1234, 'custom', 'product-path']"></a>
```

## Output paths are alaways absolute

Output paths always contain the leading `''` in array:

```html
<a [routerLink]="['', product, 1234]"></a>
```

which equals the leading `/` in the URL:

```html
<a href="/product/1234"></a>
```


## Links to nested routes

When Angular's `Routes` contain **arrays** of `children` routes:

```typescript
const routes: Routes = [
    {
        data: { cxPath: 'parent' }, // route name
        children: [
            {
                data: { cxPath: 'child' }, // route name
                children: [
                    {
                        data: { cxPath: 'grandChild' }, // route name
                        /* ... */ 
                    }
                ],
                /* ... */
            }
        ],
        /* ... */
    }
];
```

then config should contain **objects** with `children` routes translations:

```typescript
StorefrontModule.withConfig({
    routesConfig: {
        translations: {
            en: {
                parent: { // route name
                    paths: ['parent-path/:param1'],
                    children: {
                        child: { // route name
                            paths: ['child-path/:param2'],
                            children: {
                                grandChild: { // route name
                                    paths: ['grand-child-path/:param3']
                                }
                            }
                        },
                    }
                },
            }
        }
    }
})
```

In order to translate the path of grand child's route, `{ route: <route> }` needs an array of all nested routes from the root to the grand child's route. For example:

```html
<a [routerLink]="{ route: [ 
    { name: 'parent',     params: { param1: 'value1' } }, 
    { name: 'child',      params: { param2: 'value2' } },
    { name: 'grandChild', params: { param3: 'value3' } }
} | cxTranslateUrl">
</a>
```

result:

```html
<a [routerLink]="['', 'parent-path', 'value1', 'child-path', 'value2', 'grand-child-path', 'value3']"></a>
```


## Params mapping

When properties of given `params` object do not match exactly to names of route parameters, they can be mapped using `paramsMapping` option in the configuration. For example:

The `params` object below does not contain necessary property `productCode`, but it has `id`:

```html
<a [routerLink]="{ route: [ { name: 'product', params: { id: 1234 } ] | cxTranslateUrl"></a>
```

Then `paramsMapping` needs to be configured:

```typescript
StorefrontModule.withConfig({
    routesConfig: {
        translations: {
            default: {
                product: {
                    /* 'productCode' route parameter will be filled with value of 'id' property of 'params' object  */
                    paramsMapping: { productCode: 'id' }
                }
            }
            en: {
                product: { 
                    paths: [':productCode/custom/product-path']
                },
            }
        }
    }
})
```

result:

```html
<a [routerLink]="['', 1234, 'custom', 'product-path']"></a>
```

### Predefined `paramsMaping`

Some Storefront's routes already have predefined `paramsMapping`. They can be found in [`defaut-storefront-routes-translations.ts`](./config/default-storefront-routes-translations.ts).

```typescript
// defaut-storefront-routes-translations.ts

default: {
    product: {
      paramsMapping: { productCode: 'code' }
      /* ... */
    },
    category: {
      paramsMapping: { categoryCode: 'code' }
      /* ... */
    },
    orderDetails: {
      paramsMapping: { orderCode: 'code' }
      /* ... */
    },
    /* ... */
}
```

#### Define `paramsMapping` under `default` key

Not to repeat `paramsMapping` for all languages, it's recommended to define them under `default` key in the configuration.

## Navigation in TypeScript code

The `RoutingService.go` method called with `{ route: <route> }` or `{ url: <url> }` navigates to the translated path. For example:

When config is:

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

1. With `{ route: <route> }`:

    ```typescript
    routingService.go({ route: [ { name: 'product', params: { productCode: 1234 } } ] });

    // router navigates to ['', 'p', 1234]
    ```

2. With `{ url: <url> }`:
    ```typescript
    routingService.go({ url: '/product/1234' });

    // router navigates to ['', 'p', 1234]
    ```

**`RoutingService.go` called with an array**

When `RoutingService.go` method is **called with an array**, then **no translation happens**. It just navigates to the path given in the array:

```typescript
routingService.go(['product', 1234]);

// router navigates to ['product', 1234]
```

## Translation of paths in TypeScript code

The `UrlTranslationService.translate` method called with `{ route: <route> }` or `{ url: <url> }` returns the translated path (just like `cxTranslateUrl` pipe in HTML templates). For example:

When config is:

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

1. With `{ route: <route> }`:

    ```typescript
    urlTranslatorService.translate({ route: [ { name: 'product', params: { productCode: 1234 } } ] });

    // ['', 'p', 1234]
    ```

2. With `{ url: <url> }`:
    ```typescript
    urlTranslatorService.translate({ url: '/product/1234' });

    // ['', 'p', 1234]
    ```
