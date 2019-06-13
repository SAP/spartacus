[^ Configurable routes](./README.md)

---

# How to: routing

## Intro: Page types and Page labels

Hybris CMS comes with the concept of 3 special page types: Product Page, Category Page, Catalog Page (Catalog is not supported for now) and one common type Content Page used for all other pages, i.e. login, order history or faq.

Spartacus reflects that by defining a few Angular `Routes`:

- route with `:productCode` param - for Product Page
- route with `:categoryCode` param and route with `:brandCode` param - for Category Page
- wildcard `**` route - for all other, Content Pages

The URLs of product, category and brand pages can be [configured only in Spartacus](./routes-configuration.md). Content Pages have a configurable url in the CMS, where it's called  *page label*.

In Spartacus, if no `Route` is matched, the wildcard `**` route lookups in  backend CMS if there is a page with given *page label*

Note: *page labels* in CMS must start with slash, i.e. `/login`.

## How to add Content Page

To add new route, no development is required, it suffices to add in the CMS a new Content Page with *page label* i.e. `/contact-us` or `/my-account/order-history`. The Spartacus' wildcard `**` route with match it out of the box.

## How to customize the Product Page route

Product Page route can be configured only in Spartacus. It has to contain the `:productCode` param to identify the product. But for SEO you can add also more dynamic parameters that can be accessed in the product entity, i.e. product name, in `ConfigModule`:

```typescript
routing: {
    routes: {
        product: { paths: ['product/:name/:productCode'] }
    }
}
```

*Note: See also [`paramsMapping` docs](./configurable-router-links.md#parameters-mapping) for mapping from properties of product entity to names of route parametes.*

## How to customize the Category Page route

Similar to Product Page.

## How to add Content Page with dynamic params

Angular routes can contain dynamic *route parameters* that can be consumed in the logic of  Angular components. But Hybris CMS doesn't support *page labels* with dynamic params. So you need to define your custom Angular `Route` with `path` and explicitly assign the CMS *page label*, for example in your `app.module.ts`:

```typescript
import { PageLayoutComponent, CmsPageGuard } from `@spartacus/storefront`;

/* ... */

imports: [
    RouterModule.forChild([
        {
            // path with dynamic param:
            path: 'order/:orderCode',

            // page label without param, starting with slash:
            data: { pageLabel: '/order' },

            // those are needed to display slots and components from CMS:
            component: PageLayoutComponent,
            canActivate: [CmsPageGuard]
        }
    ]),
]
```

## How to add Angular children routes for Content Page

Angular components can display nested views in nested `<router-outlet>` for children routes. Hybris CMS doesn't support *children pages* itself. But in Spartacus for components used in Content Pages you can configure *children routes*. For example in `ConfigModule`:

```typescript
cmsComponents: {
    CustomComponentName: {
        component: CustomComponent,
        childRoutes: [
            {
                path: 'some/nested/path',
                component: ChildCustomComponent,
            },
        ],
    }
}
```

*Note: accessing children routes via a deep links to nested routes is not yet supported. You have to open firstly the parent route and then navigate to the child route via router link.*


## Backward compatibility with accelerators

In Hybris accelerators there were used routes `**/p/:productCode` and `**/c/:categoryCode` for Product and Category Page. For backward compatibility, Spartacus also matches those routes, by simply numbering parameters.

So for example URL `/some-catalogue/some-category/p/1234` will be recognized with parameters:

```typescript
{
    productCode: '1234',
    param0: 'some-catalogue',
    param1: 'some-category',
}
```

## Advanced

### How to configure category name in the Product Page route

Only the first-level properties of the product entity (like `code` or `name`) can be used to build URL. Unfortunately, product categories is not the case. If you want names of categories in your Product Page URL, you need to map `name`s from objects in the `categories` array to the first-level properties of product entity. You can perform such a mapping in the `PRODUCT_NORMALIZER` in your app.module:

```typescript
providers: [
    {
      provide: PRODUCT_NORMALIZER,
      useClass: MyProductCategoriesNormalizer,
      multi: true,
    },
]
```

where your `MyProductCategoriesNormalizer` is for example:

```typescript
@Injectable()
export class MyProductCategoriesNormalizer implements Converter<Occ.Product, Product> {
  convert(source: Occ.Product, target?: Product): Product {
    if (target === undefined) {
      target = { ...(source as any) };
    }

    if (source.categories && source.categories.length) {
      target.category = source.categories[0].name; // <----------------- MAPPING HERE
    }
    return target;
  }
}
```

Then you can configure your Product Page route in `ConfigModule` to contain `:category` param:

```typescript
routing: {
    routes: {
        product: { paths: ['product/:category/:name/:productCode'] }
    }
}
```