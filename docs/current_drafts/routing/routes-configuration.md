[^ Configurable routes](./README.md)

---

# Routes configuration

## Config

All routes in Spartacus can be configured by importing `ConfigModule.withConfig()` with an object containing `routing` property: 

```typescript
ConfigModule.withConfig({
    routing: { /* ... */ },
    /* ... */
})
```

### Predefined config

```typescript
// default-storefront-routes-config.ts
product: { 
    paths: ['product/:productCode'],
    /* ... */
}
/* ... */
```

### Extending predefined config

Every part of the predefined config can be extended or overwritten in the application, using `ConfigModule.withConfig`:

```typescript
ConfigModule.withConfig({
    routing: {
        routes: {
            product: { paths: [':productCode/custom/product-path'] }
        }
    }
})
```

### How predefined config is extended and overwritten

- objects **extend** predefined objects
- values (primitives, arrays, `null`) **overwrite** predefined values

### Always use route parameters from the predefined config

All route parameters that appear in predefined config (for example `:productCode` param in `product/:productCode` path) mustn't be omitted in overwritten paths. Otherwise Storefront's components may break. For example please **don't do**:

```typescript
ConfigModule.withConfig({
    routing: {
        routes: {
            product: { paths: ['product/:productName'] } // overwritten without :productCode
        }
    }
})
```

### Why `paths` is an array

It's to support [Route aliases](./route-aliases.md).

## Angular's `Routes`

In order to have configurable `Routes` we need to name them (in `data.cxRoute` property) the same as the route keys in the config. For example:

```typescript
const routes: Routes = [
    {
        data: {
            cxRoute: 'product' // the name of the route
        },
        path: null, // it will be replaced by the path from config
        component: ProductPageComponent
        /* ... */
    }
];
```

where config is:

```typescript
ConfigModule.withConfig({
    routing: {
        routes: {
            product: { // the name of the route
                paths: [/*...*/]
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
            cxRoute: 'parent' // the name of the route
        },
        children: [
            {
                data: {
                    cxRoute: 'child' // the name of the route
                },
                /* ... */
            }
        ],
        /* ... */
    }
];
```

then we need configuration for both parent and child routes:

```typescript
ConfigModule.withConfig({
    routing: {
        routes: {
            parent: { // the name of the route
                paths: ['parent-path'],
            },
            child: { // the name of the route
                paths: ['child-path']
            },
        }
    }
})
```
