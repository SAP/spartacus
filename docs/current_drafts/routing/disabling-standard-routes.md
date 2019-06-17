[^ Configurable routes](./README.md)

---

# Disabling standard routes

To disable a route (i.e. to remove it from Angular's router config and avoid generating paths to this route) it suffices to set one of those things in the `routesConfig`:

- set `null` for this route's name
- set `null` or `[]` for route's paths

For example:

```typescript
ConfigModule.withConfig({
    routing: {
        routes: {
            product: null,
            /*
            or
              product: { paths: null }
            or
              product: { paths: [] }
            */
        }
    }
})
```

Then [configurable router links](./configurable-router-links.md) will output:

```html
<a [routerLink]="{ cxRoute: 'product', params: { productCode: 1234 } } | cxUrl"></a>
```

result

```html
<a [routerLink]="['/']"></a>
```
