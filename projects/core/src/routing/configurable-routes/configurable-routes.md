# Configurable routes <!-- omit in toc -->

## Introduction
The navigation in a web application is mostly done through URLs. URLs can be used to deeplink into a specific application state and contribute to the usability and SEO capabilities of the application. To that reason, it is most important that customers can customize those URLs.

In a Single Page Application, URLs are intercepted by the application logic so that the view(s) can be updated seamlessly. This requires *routing logic*, which, in case of Spartacus, is provided by the Angular Router.

While the Angular router contains a rich set of features and configuration options, Spartacus contains components that are intended to run without any configuration by default. Moreover, configuration is intended to be runtime configurable by business users. 

This is where configurable routes comes in to play; every route in Spartacus is configurable and can be translated. 

## Features

The following features are supported:
- Configure routes
- Translate routes
- Disable standard routes
- Configurable router links
- Add route parameters
- Aliases
- Redirects
- Load configuration from backend

## Limitations

## Table of contents <!-- omit in toc -->

- [Introduction](#introduction)
- [Features](#features)
- [Limitations](#limitations)
- [Prerequisites](#prerequisites)
- [Config](#config)
  - [Predefined config](#predefined-config)
  - [Extending predefined config](#extending-predefined-config)
  - [Always use params from predefined config](#always-use-params-from-predefined-config)
- [Navigation links](#navigation-links)
- [Angular's `Routes`](#angulars-routes)
  - [Routes with configurable `path`](#routes-with-configurable-path)
  - [Routes with configurable `redirectTo`](#routes-with-configurable-redirectto)
- [Params mapping](#params-mapping)
  - [Predefined `paramsMaping`](#predefined-paramsmaping)
- [Children routes (nested routes)](#children-routes-nested-routes)
- [Navigation in TypeScript code](#navigation-in-typescript-code)
- [Translation of paths in TypeScript code](#translation-of-paths-in-typescript-code)
- [Additional params](#additional-params)
- [Disabling routes](#disabling-routes)
- [Path aliases](#path-aliases)
  - [The order of path aliases](#the-order-of-path-aliases)
- [Fetching routes config from backend](#fetching-routes-config-from-backend)
  - [Extending static translations](#extending-static-translations)
- [General Subjects of Change](#general-subjects-of-change)
- [General Limitations](#general-limitations)

## Prerequisites

- Import `ConfigurableRoutesModule` in `StorefrontModule`
- Import `UrlTranslatorModule` in every feature's module that [translates navigation links in templates](#navigation-links)
- Set active language using `ConfigurableRoutesService.translateRouterConfig(<languageCode>)` in `StorefrontComponent`

**SUBJECTS OF CHANGE:**
Setting active language is planned to be moved out from `StorefrontComponent`


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

**SUBJECTS OF CHANGE:**
The default config is planned to be moved out from `@spartacus/core` and splitted in between the feature modules in `@spartacus/storefrontlib`.

### Extending predefined config

Every part of default config can be extended and overwritten in the Shell App, using `StorefrontModule.withConfig`:

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

    Then the path of the product page will have the shape `p/:productCode` in all languages 

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

    Then the path of the product page will have the shape `:productCode/custom/product-path` only in English. But in every other language it will have the `default` shape `product/:productCode`.

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

    Then the path of product page will have shape `:productCode/custom/product-path` only in English. But in every other language it will have the (overwritten) default shape `p/:productCode`.

**How predefined config is extended**

- objects **extend** predefined objects
- values (primitives, arrays, `null`) **overwrite** predefined values

### Always use params from predefined config

All params that appear in predefined paths (for example `:productCode` param in `product/:productCode` path) mustn't be omitted in overwritten paths. Otherwise Storefront's components may break. For example please **don't do**:

```typescript
StorefrontModule.withConfig({
    routesConfig: {
        translations: {
            en: {
                product: { paths: ['product/:productName'] } // overwritten without :productCode
            }
        }
    }
})
```

**Routes config can be also fetched from backend**

More in the section [Fetching routes config from backend](#fetching-routes-config-from-backend).

**LIMITATIONS:**

- Only English is supported for now - keys: `en` and `default`. But all languages are planned to be supported.

## Navigation links

Navigation links can be automatically generated in HTML templates using `cxTranslateUrl` pipe. It can:

1. transform a unique name of a route into a configured path: 
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

    **What if `{ route: <route> }` cannot be translated?**

    When the path cannot be translated from `{ route: <unknown-route> }` (for example due to typo in the route's name, mising necessary params or wrong config) *the root URL* `['/']` is returned:

    ```html
    <a [routerLink]="{ route: <unknown-route> } | cxTranslateUrl"></a>
    ```

    result:

    ```html
    <a [routerLink]="['/']"></a>
    ```

    **Pass `string` when only a name of route is needed**

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

    **Why `<route>` is an array?**

    It's to support [children routes (nested routes)](#children-routes-nested-routes).

2. transform a path having a default shape into a configured path: 
    ```typescript
    { url: <url> } | cxTranslateUrl
    ```

    Examples:

    1. When the predefined default shape of the path **is not overwritten**

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

    2. When the predefined default shape of the path **is overwritten**

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

    **What if `{ url: <url> }` cannot be translated?**

    When the path cannot be translated from `{ url: <unknown-url> }` (for example due to unexpected shape of the URL, or wrong config) *the original URL* is returned:

    ```html
    <a [routerLink]="{ url: '/unknown/url' } | cxTranslateUrl"></a> 
    ```

    result:

    ```html
    <a [routerLink]="'/unknown/url'"></a>
    ```

    **Relative path having default shape are treated the same as absolute**

    When URL in `{ url: <url> }` is relative (without leading `/`), it will be treated the same as absolute. For example:

    For both:

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

**Note:** Translated paths are never relative (they are always absolute - with leading `''` in array):

```html
<a [routerLink]="['', product, 1234]"></a>
```

which equals the leading `/` in the URL:

```html
<a href="/product/1234"></a>
```

## Angular's `Routes`

### Routes with configurable `path`

Angular's `Routes` need to contain a unique name of route at property `data.cxPath` in order to have configurable and translatable `path`. For example:

```typescript
const routes: Routes = [
    {
        /* cxPath: 'product' - is a unique name of route that will be matched to routes translations' keys */
        data: { cxPath: 'product' }

        /* path: null - the value will be replaced by the path from config (in application's bootstrap time) */
        path: null, 

        component: ProductPageComponent
        /* ... */
    }
];
```

**Property `path` cannot be left `undefined`**

Angular requires any defined `path` in compilation time.

**SUBJECTS OF CHANGE:**

- `cxPath` property is planned to be replaced with other property (not known now) containing a default route's config (which will be moved out from [`defaut-storefront-routes-translations.ts`](./config/default-storefront-routes-translations.ts) and splitted in between feature modules)
- `path` is considered to contain the first default [path alias](#path-aliases)

### Routes with configurable `redirectTo`

Analogically, a unique name of route is needed at property `data.cxRedirectTo` of Angular's `Routes` in order to have configurable and translatable `redirectTo`. For example:

```typescript
const routes: Routes = [
    {
        path: '<source-url>',

        /* cxRedirectTo: 'product' - is a unique name of route that will be matched to routes translations' keys */
        data: { cxRedirectTo: 'product' }

        /* redirectTo: null - the value will be replaced by the path from config (in application's bootstrap time) */
        redirectTo: null, 

        /* ... */
    }
];
```

**Combination of `cxPath` and `cxRedirectTo` is not supported**

When both `cxPath` and `cxRedirectTo` are defined, then the route won't be translated.

**Property `redirectTo` cannot be left `undefined`**

Angular requires any defined `redirectTo` in compilation time.

**SUBJECTS OF CHANGE**:

- `cxRedirectTo` property is planned to be replaced with other property together with `cxPath`
- `cxRedirectTo` property is planned to accept an array of routes' names instead of string - in order to support redirects to nested routes

## Params mapping

When properties of given object do not match to names of parameters in configured url, the mapping can be also configured using `paramsMapping`. For example:

The params object below does not contain property `productCode` but `code`:

```html
<a [routerLink]="{ route: [ { name: 'product', params: { code: 1234 } ] | cxTranslateUrl"></a>
```

and config is

```typescript
StorefrontModule.withConfig({
    routesConfig: {
        translations: {
            default: {
                product: {
                    /* `:productCode` param will be filled with value of params object's `code` property */
                    paramsMapping: { productCode: 'code' }
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

**Avoid params mapping per language - define them under `default` key**

The routes' `paramsMapping` should be defined in under `default` key (not to repeat them  for all languages).

### Predefined `paramsMaping`

Some Storefront's routes already have predefined default `paramsMapping`. They can be found in [`defaut-storefront-routes-translations.ts`](./config/default-storefront-routes-translations.ts).

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

**SUBJECTS OF CHANGE:**

- default `paramsMappings` are planned to be moved out from `@spartacus/core` and splitted in between the feature modules in `@spartacus/storefrontlib`


## Children routes (nested routes)

Children routes routes are configurable and translatable.

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

Then to translate the path of grand child's route, an array of routes from root (parent) to leaf (grand child) needs to be passed to `{ route: <route> }`. For example:

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


## Additional params

More params can be added to the configured path (for example for SEO purposes):

```typescript
StorefrontModule.withConfig({
    routesConfig: {
        translations: {
            en: {
                product: { 
                    paths: [
                        // :productCode is an obligatory param, as it's present in default url
                        // :productName is a new param
                        ':productCode/custom/product-path/:productName',
                    ] 
                }
            }
        }
    }
})
```

Then additional params are also needed in `{ route: <route> }` and `{ url: <url> }` (otherwise path cannot be translated). Examples:

1. `{ route: <route> }` needs also `productName` param:

    ```html
    <a [routerLink]="{ route: [ { name: 'product', params: { productName: 'ABC', productCode: 1234 } } ] } | cxTranslateUrl"></a>
    ```

    result:

    ```html
    <a [routerLink]="['', 1234, 'custom', 'product-path', 'ABC']"></a>
    ```

2. `{ url: <url> }` needs also `productName` param. And default translations in config need `:productName` too. For example:

    ```html
    <a [routerLink]="{ url: '/product/1234/ABC' } | cxTranslateUrl"></a> 
    ```

    where config is:

    ```typescript
    StorefrontModule.withConfig({
        routesConfig: {
            translations: {
                default: {
                    product: { 
                        paths: ['product/:productCode/:productName'] 
                    }
                }
                en: {
                    product: { 
                        paths: [
                            // :productCode is an obligatory param
                            // :productName is a new param
                            ':productCode/custom/product-path/:productName',
                        ] 
                    }
                }
            }
        }
    })
    ```

    result:

    ```html
    <a [routerLink]="['', 1234, 'custom', 'product-path', 'ABC']"></a>
    ```

## Disabling routes

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

Then links will remain in templates but won't be translated:

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

## Path aliases

There can be configured many path aliases that activate the same Angular's component. For example:

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
                        ':campaignName/p/:productCode', /* will be used when `campaignName` param is given */
                        'p/:productCode' /* will be used otherwise */
                   ]
                }
            }
        }
    }
})
```

To translate the path there will be used **the first path** from the `paths` array **that can satisfy its params** with given params (more about common mistakes in section [The order of path aliases](#the-order-of-path-aliases)). Example:

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

### The order of path aliases

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

1. With `{ route: <route> }`:
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

2. With `{ url: <url> }`:

    1. when `campaignName` param **is** given:

        ```html
        <a [routerLink]="{ url: '/sale/product/1234' } | cxTranslateUrl"></a>
        ```

    2. when `campaignName` param **is not** given:

        ```html
        <a [routerLink]="{ url: '/product/1234' } | cxTranslateUrl"></a>
        ```

result for all:

```html
<a [routerLink]="['', 'p', '1234']"></a>
```

**SUBJECTS OF CHANGE:**

- named aliases are under consideration - to allow translating precise aliases of paths and not to base only on the specificity of params

## Fetching routes config from backend

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

### Extending static translations

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

**What if translations cannot be fetched**

When request for translations fails after 2 automatic retries, then a fatal error is thrown and unfortunately the app crashes.

**SUBJECTS OF CHANGE:**

- a better way of handling the failure is under consideration

**LIMITATIONS:**

- Endpoint with translations of routes is not configurable. It's always `<baseUrl>/routes-config`


## General Subjects of Change

- Routes for 4 CMS content pages: `contact`, `help`, `sale`, `termsAndConditions` are planned to be removed from the configuration as they shouldn't be separate configurable routes.
- Lazy loaded routes are currently not supported (they can't be configurable and translatable), but they are planned to be supported

## General Limitations
- Routing based on hash ([Angular's `HashLocationStrategy`](https://angular.io/guide/router#appendix-locationstrategy-and-browser-url-styles)) is not supported, for example `domain.com/#/some/route`.
