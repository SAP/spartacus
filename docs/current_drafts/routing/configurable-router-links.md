
[^ Configurable routes](./README.md)

---

# Configurable router links <!-- omit in toc -->

While the [router configuration](./routes-configuration.md) allows the application to listen to different routes, the links to those routes must take the route configuration into account as well.

Configured router links can be automatically generated in HTML templates using `cxUrl` pipe. It allows to transform **the name of the route** and **the params object** into the configured path

## Table of contents <!-- omit in toc -->

- [Assumptions and limitations](#assumptions-and-limitations)
- [Prerequisites](#prerequisites)
- [Router links](#router-links)
  - [Transform the name of the route and the params object](#transform-the-name-of-the-route-and-the-params-object)
    - [The route with parameters](#the-route-with-parameters)
- [Links to nested routes](#links-to-nested-routes)
  - [Relative links](#relative-links)
  - [Relative links up](#relative-links-up)
- [Parameters mapping](#parameters-mapping)
  - [Predefined parameters mapping](#predefined-parameters-mapping)
- [Programmatic API](#programmatic-api)
  - [Navigation to the generated path](#navigation-to-the-generated-path)
  - [Simply generation of the path](#simply-generation-of-the-path)


## Assumptions and limitations

- the output path array is absolute by default (it contains the leading `'/'`)
- the output path doesn't contain the leading `/`, when the input starts with an element that is *not an object with `route` property*, i.e. string `'./'`, `'../'` or `{ not_route_property: ... }` 
- the route that cannot be resolved from *a route's name and params* will return the root URL `['/']`

## Prerequisites

Import `UrlModule` in every module that uses configurable router links.

## Router links

### Transform the name of the route and the params object

```typescript
{ cxRoute: <route> } | cxUrl
```

Example:

```html
<a [routerLink]="{ cxRoute: 'cart' } | cxUrl"></a>
```

when config is:

```typescript
ConfigModule.withConfig({
    routing: {
        routes: {
            cart: { paths: ['custom/cart-path'] }
        }
    }
})
```

result in:

```html
<a [routerLink]="['/', 'custom', 'cart-path']"></a>
```

#### The route with parameters

When the route needs parameters, the object with route's `name` and `params` can be passed instead of just simple string. For example:

```html
<a [routerLink]="{ cxRoute: 'product', params: { productCode: 1234 } } | cxUrl"></a>
```

where config is:

```typescript
ConfigModule.withConfig({
    routing: {
        routes: {
            product: { paths: [':productCode/custom/product-path'] }
        }
    }
})
```

result:

```html
<a [routerLink]="['/', 1234, 'custom', 'product-path']"></a>
```

## Links to nested routes

When Angular's `Routes` contain **arrays** of `children` routes:

```typescript
const routes: Routes = [
    {
        data: { cxRoute: 'parent' }, // route name
        children: [
            {
                data: { cxRoute: 'child' }, // route name
                /* ... */
            },
            {
                data: { cxRoute: 'otherChild' }, // route name
                /* ... */
            }
        ],
        /* ... */
    }
];
```

then config should be:

```typescript
ConfigModule.withConfig({
    routing: {
        routes: {
            parent: { // route name
                paths: ['parent-path/:param1'],
            },
            child: { // route name
                paths: ['child-path/:param2'],
            }
            otherChild: { // route name
                paths: ['other-child-path'],
            }
        }
    }
})
```

In order to generate the path of parent and child route we need to pass them in an array. For example:

```html
<a [routerLink]="[
    { cxRoute: 'parent', params: { param1: 'value1' },
    { cxRoute: 'child',  params: { param2: 'value2' }
] | cxUrl,
)"></a>
```

result:

```html
<a [routerLink]="['/', 'parent-path', 'value1', 'child-path', 'value2']"></a>
```


### Relative links

If you are already in the context of the activated parent route, you may want to only generate a relative link to the child route. Then you need to pass `'./'` string in the beginning of the input array . For example:

```html
<a [routerLink]="[ './', { cxRoute: 'child',  params: { param2: 'value2' } } ] | cxUrl"></a>
```

result:

```html
<a [routerLink]="['./', 'child-path', 'value2']"></a>
```

### Relative links up

If you want to go i.e. one one level up in the routes tree, you need to pass `../` to the array. For example:

```html
<a [routerLink]="[ '../', { cxRoute: 'otherChild' } ] | cxUrl"></a>
```

result:

```html
<a [routerLink]="['../', 'child-path', 'value2']"></a>
```

**NOTE:** *Every element that is **not an object with `route` property** won't be transformed. So for example:*

```html
<a [routerLink]="[
    { cxRoute: 'parent', params: { param1: 'value1' } },
    'SOMETHING'
] | cxUrl,
)"></a>
```

*will result in:*

```html
<a [routerLink]="['/', 'parent-path', 'value1', 'SOMETHING']"></a>
```

**NOTE:** *If the first element in the array is **not an object with `route` property**, the output path array won't have `'/'` element by default. So for example:*


```html
<a [routerLink]="[
    'SOMETHING',
    { cxRoute: 'parent', params: { param1: 'value1' } }
] | cxUrl,
)"></a>
```

*will result in:*

```html
<a [routerLink]="['SOMETHING', 'parent-path', 'value1']"></a>
```

## Parameters mapping

When properties of given `params` object do not match exactly to names of route parameters, they can be mapped using `paramsMapping` option in the configuration. For example:

The `params` object below does not contain necessary property `productCode`, but it has `code`:

```html
<a [routerLink]="{ cxRoute: 'product', params: { code: 1234 } } | cxUrl"></a>
```

Then `paramsMapping` needs to be configured:

```typescript
ConfigModule.withConfig({
    routing: {
        routes: {
            product: {
                /* 'productCode' route parameter will be filled with value of 'code' property of 'params' object  */
                paramsMapping: { productCode: 'code' }
                paths: [':productCode/custom/product-path']
            }
        }
    }
})
```

result:

```html
<a [routerLink]="['/', 1234, 'custom', 'product-path']"></a>
```

### Predefined parameters mapping

```typescript
// default-storefront-routes-config.ts

product: {
    paramsMapping: { productCode: 'code' }
    /* ... */
},
category: {
    paramsMapping: { categoryCode: 'code' }
    /* ... */
},
/* ... */
```

## Programmatic API

### Navigation to the generated path

The `RoutingService.go` method called with `{ cxRoute: <route> }` navigates to the generated path - similar like `routerLink` with `cxUrl` pipe in the HTML template. For example:

When config is:

```typescript
ConfigModule.withConfig({
    routing: {
        routes: {
            product: { paths: ['p/:productCode'] }
        }
    }
})
```

```typescript
routingService.go({ cxRoute: 'product', params: { productCode: 1234 } });

// router navigates to ['/', 'p', 1234]
```

### Simply generation of the path

The `UrlService.generateUrl` method called with `{ cxRoute: <route> }` returns the generated path (just like `cxUrl` pipe in HTML templates). For example:

When config is:

```typescript
ConfigModule.withConfig({
    routing: {
        routes: {
            product: { paths: ['p/:productCode'] }
        }
    }
})
```

```typescript
urlService.generateUrl({ cxRoute: 'product', params: { productCode: 1234 } });

// ['/', 'p', 1234]
```
