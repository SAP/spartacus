[^ Configurable routes](./README.md)

---

# Additional route parameters

Additional route parameters can be configured to make the URL more specific, which can be useful for SEO.

```typescript
ConfigModule.withConfig({
    routing: {
        routes: {
            product: { 
                paths: [
                    // :productCode is an obligatory param, as it's present in default url
                    // :productName is a new param
                    ':productCode/custom/product-path/:productName'
                ] 
            }
        }
    }
})
```

Then additional params are also needed in `{ cxRoute: <route> }` (otherwise path cannot be generated). Examples:

`{ cxRoute: <route> }` also needs the new `productName` param:

```html
<a [routerLink]="{ cxRoute: 'product', params: { productName: 'ABC', productCode: 1234 } } | cxUrl"></a>
```

result:

```html
<a [routerLink]="['/', 1234, 'custom', 'product-path', 'ABC']"></a>
```
