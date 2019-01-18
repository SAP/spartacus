# Change Detection Strategy

## What it is in Angular

By default, each Angular component re-renders after any asynchronous event happens in the application which can be pretty inefficient in most cases. Fortunately, it can be optimised with [`changeDetection`](https://angular.io/api/core/Component#changedetection) option of Angular `@Component` decorator which can have one of 2 values:  `ChangeDetectionStrategy.Default` (which is default) and `ChangeDetectionStrategy.OnPush`. The  `OnPush` value will cause component to rerender only in limited cases:
- when some of its [`@Input`s](https://angular.io/api/core/Input) changed; or
- when some observable passed to [`async` pipe](https://angular.io/api/common/AsyncPipe) in its template has changed/emitted new value; or
- when change detection was invoked manually.

By the Angular's design, the `changeDetection` value is also implicitly inherited by all descendant components in the tree.

## OnPush change detection strategy in Spartacus

In Spartacus, the root component `<cx-storefront>` has the `changeDetection` option configured to `OnPush` and all descendant components don't have `changeDetection` option configured so they just inherit the `OnPush` value.

But when Spartacus' components are used exclusively (not via the root component `<cx-storefront>`), then they will just inherit the `changeDetection` option of their custom host component.