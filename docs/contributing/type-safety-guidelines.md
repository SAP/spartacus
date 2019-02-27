# Type Safety in Spartacus

The entire Spartacus codebase has type safe methods, parameters, objects, and so on, with a few minor exceptions.

Use type safety everywhere that you can, including in all pull requests.

**Note**: When working with test files, it is important that `*.spec.ts` files have type safe code that aligns with the files being tested.

If you are looking for generated OCC types, refer to `projects/core/src/occ-models/occ.models.ts`.

## Method Parameters and Return Values

Although the `void` return type is implicit in JavaScript and TypeScript, we prefer to make it explicit. The reasoning is that, if a method is modified in the future to return a value, then we already have type safety in place for the returned type.

The following is an example of a method with an explicit `void` return type:

```Typescript
addCartEntry(productCode: string, quantity: number): void {
  ...
}
```

## Defining Object Literals

You can define an object literal with all properties, or with just a few, selected properties.

For example, a type-safe object literal can be defined as follows:

```Typescript
const userToken: UserToken = {
  access_token: 'xxx',
  token_type: 'bearer',
  refresh_token: 'xxx',
  expires_in: 1000,
  scope: ['xxx'],
  userId: 'xxx'
}
```

In this example, TypeScript is enforcing all the required properties of the `UserToken` type to be defined.

However, in cases where only a few properties need to be defined (which is often true for tests), then the following syntax can be used:

```Typescript
const userToken = {
  access_token: 'xxx'
} as UserToken;
```
Another way to define the same object literal is the following:

```Typescript
const userToken = <UserToken>{
  access_token: 'xxx'
}
```

We encourage using the `as` syntax, but the syntax using angle brackets `<>` is also acceptable.

## Working with Generics

There are some places in the code where generics are used, such as when working with CMS components.

Currently, there are no types for specific CMS components, but there is a generic `CmsComponent` in `cms-component.models.ts`. This component can be used as follows:

```Typescript
loadComponent<T extends CmsComponent>(
    id: string,
    pageContext: PageContext,
    fields?: string
  ): Observable<T> {
    const aComponent = <T>{...};
    return of(aComponent);
  }
```

For more information about advanced types in TypeSript, see the official [TypeScript documentation](https://www.typescriptlang.org/docs/handbook/advanced-types.html).

## Exceptions

Sometimes it is acceptable not to use type safety. For example, there are functions that can legitimately deal with `any` type, such as interceptors. 

The following is an example:

```Typescript
intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    ...
  }
```
