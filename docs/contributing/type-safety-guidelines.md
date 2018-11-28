# Type safety in Spartacus

The whole codebase of SPA has type safe methods, parameters, objects, etc. except for a few corner cases. Each PR should have type safety in place.

If you need generated OCC types, these are located in `projects/core/src/occ-models/occ.models.ts`.

## When to use type safety

A few suggestions where type safety can be added: 

## When it's OK not to use typesafety

There are some cases when it's OK to use `any`:

