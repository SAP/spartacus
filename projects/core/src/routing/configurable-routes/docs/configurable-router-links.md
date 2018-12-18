
[^ Configurable routes](../README.md)

---

# Configurable router links <!-- omit in toc -->

While the [router configuration](./configure-routes.md) allows the application to listen to different routes, the links to those routes must take the route configuration into account as well.

Configured router links can be automatically generated in HTML templates using `cxTranslateUrl` pipe. It allows to:

1. transform **the name of the route** and **the params object** into the configured path
2. transform **the path having the default shape** into the configured path

## Table of contents <!-- omit in toc -->

- [Assumptions and limitations](#assumptions-and-limitations)
- [Prerequisites](#prerequisites)
- [Router links](#router-links)
  - [Transform the name of the route and the params object](#transform-the-name-of-the-route-and-the-params-object)
    - [The route with parameters](#the-route-with-parameters)
  - [Transform the path having the default shape](#transform-the-path-having-the-default-shape)
- [Links to nested routes](#links-to-nested-routes)
- [Parameters mapping](#parameters-mapping)
  - [Predefined parameters mapping](#predefined-parameters-mapping)
    - [Define parameters mapping under key: default](#define-parameters-mapping-under-key-default)
- [Programmatic API](#programmatic-api)
  - [Navigation to the translated path](#navigation-to-the-translated-path)
  - [Simply translation of the path](#simply-translation-of-the-path)


## Assumptions and limitations

- the output path is always absolute (the path array contains the leading `''`)
- the route that cannot be resolved from *a route's name and params* will return the root URL `['/']`
- the route that cannot be resolved from the supposed *path having the default shape* will return the original URL
- a *routes' names and params* are given in an array in order to support [Links to nested routes](#links-to-nested-routes) (planned API optimisation for non-nested routes: [#706](https://github.com/SAP/cloud-commerce-spartacus-storefront/issues/706))
- the relative *path having the default shape* is treated as absolute


## Prerequisites

Import `UrlTranslatorModule` in every module that uses configurable router links.

## Router links

### Transform the name of the route and the params object

```typescript
{ route: <route> } | cxTranslateUrl
```

Example:

```html
<a [routerLink]="{ route: [ { name: 'cart' } ] } | cxTranslateUrl"></a>
```

when config is:

```typescript
ConfigModule.withConfig({
    routesConfig: {
        translations: {
            en: {
                cart: { paths: ['custom/cart-path'] }
            }
        }
    }
})
```

result in:

```html
<a [routerLink]="['', 'custom', 'cart-path']"></a>
```

#### The route with parameters

When the route needs parameters, the object with route's `name` and `params` can be passed instead of just simple string. For example:

```html
<a [routerLink]="{ route: [ { name: 'product', params: { productCode: 1234 } } ] } | cxTranslateUrl"></a>
```

where config is:

```typescript
ConfigModule.withConfig({
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


### Transform the path having the default shape

```typescript
{ url: <url> } | cxTranslateUrl
```

Examples:

1. When the predefined path **is not overwritten** in the config

    ```html
    <a [routerLink]="{ url: '/product/1234' } | cxTranslateUrl"></a> 
    ```

    config:

    ```typescript
    ConfigModule.withConfig({
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

2. When the predefined path **is overwritten** in the config

    ```html
    <a [routerLink]="{ url: 'p/1234' } | cxTranslateUrl"></a>
    ```

    config:

    ```typescript
    ConfigModule.withConfig({
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
ConfigModule.withConfig({
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


## Parameters mapping

When properties of given `params` object do not match exactly to names of route parameters, they can be mapped using `paramsMapping` option in the configuration. For example:

The `params` object below does not contain necessary property `productCode`, but it has `id`:

```html
<a [routerLink]="{ route: [ { name: 'product', params: { id: 1234 } ] | cxTranslateUrl"></a>
```

Then `paramsMapping` needs to be configured:

```typescript
ConfigModule.withConfig({
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

### Predefined parameters mapping

Some Storefront's routes already have predefined `paramsMapping`. They can be found in [`default-storefront-routes-translations.ts`](./config/default-storefront-routes-translations.ts).

```typescript
// default-storefront-routes-translations.ts

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

#### Define parameters mapping under key: default

Not to repeat `paramsMapping` for all languages, it's recommended to configure them under `default` key.

## Programmatic API

### Navigation to the translated path

The `RoutingService.go` method called with `{ route: <route> }` or `{ url: <url> }` navigates to the translated path. For example:

When config is:

```typescript
ConfigModule.withConfig({
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

### Simply translation of the path

The `UrlTranslationService.translate` method called with `{ route: <route> }` or `{ url: <url> }` returns the translated path (just like `cxTranslateUrl` pipe in HTML templates). For example:

When config is:

```typescript
ConfigModule.withConfig({
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
