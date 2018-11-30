# Type safety in Spartacus

The whole codebase of SPA has type safe methods, parameters, objects, etc. except for a few corner cases. Each PR should have type safety in place.

If you need generated OCC types, these are located in `projects/core/src/occ-models/occ.models.ts`.

## When to use type safety

We should use type safety everwhere we can.

### Method parameters and return values

```
addCartEntry(productCode: string, quantity: number): void {
  ...
}
```

*Note*: even though in JavaScript/TypeScript the `void` return type is implicit, we like make it explicit. The reason for this is that in the future, the method may return a value, in which case we would have type safety for the returned type.

### Test files

It's important that `*.spec.ts` files have type safe code which alignes with the file being tested.

### Object literals

There are two ways how to define an object literal:

1. [Object literal with all the properties](#with-all-properties)
2. [Object literal with just a few selected properties](#with-selected-properties)

### With all properties

A type-safe object literal can be defined like this:

```
const userToken: UserToken = {
  access_token: 'xxx',
  token_type: 'bearer',
  refresh_token: 'xxx',
  expires_in: 1000,
  scope: ['xxx'],
  userId: 'xxx'
}
```

By using this syntax, TypeScript is enforcing all the required properties from `UserToken` type to be defined.

#### With selected properties

In cases when only a few properties need to be defined (often the case for tests), the following syntax can be used:

```
const userToken = <UserToken>{
  access_token: 'xxx'
}
```

Alternatively:
```
const userToken = {
  access_token: 'xxx'
} as UserToken;
```

We are encouraging the `as` syntax, but we accept the `<>` as well.

### Generics

There are some places in code where generics are used, i.e. when working with CMS components.

Curently, there are no types for specific CMS componets, but there's a generic `CmsComponent` in `cms-component.models.ts` and that can be used like this:

```
loadComponent<T extends CmsComponent>(
    id: string,
    pageContext: PageContext,
    fields?: string
  ): Observable<T> {
    const aComponent = <T>{...};
    return of(aComponent);
  }
```

For more about TypeSript's advanced types, see [TypeScript's docs](https://www.typescriptlang.org/docs/handbook/advanced-types.html).

## When it's OK not to use typesafety

There are functions that really can legitimately deal with `any` types.

### Interceptors

```
intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    ...
  }
```
