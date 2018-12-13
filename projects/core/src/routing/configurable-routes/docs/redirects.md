# Redirects

Angular's `Route` needs a name of configurable route in `data.cxRedirectTo` property in order to redirect to it. For example:

```typescript
const routes: Routes = [
    {
        path: 'old/product/path',

        /* name of configurable route */
        data: { cxRedirectTo: 'product' }

        /* this will be replaced by the path from config (in application's bootstrap time) */
        redirectTo: null, 

        /* ... */
    }
];
```

## Property `redirectTo` cannot be left `undefined`

Angular requires any defined `redirectTo` in compilation time.

## Combination of `cxPath` and `cxRedirectTo` is not supported

When both `cxPath` and `cxRedirectTo` are defined, then the route won't be translated.

More about `cxPath` in [Configure routes](./configure-routes.md).

## Subjects of change

- `cxRedirectTo` property is considered to be replaced with other property
- [#567](https://github.com/SAP/cloud-commerce-spartacus-storefront/issues/657) redirects to nested routes are planned to be supported
