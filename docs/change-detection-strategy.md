# Change Detection Strategy

## What it is in Angular

By default, each Angular component re-renders after any asynchronous event happens in the application which can be pretty inefficient in most cases. Fortunately, it can be optimised with [`changeDetection`](https://angular.io/api/core/Component#changedetection) option of Angular `@Component` decorator which can have one of 2 values:  `ChangeDetectionStrategy.Default` (which is default) and `ChangeDetectionStrategy.OnPush`. The  `OnPush` value will cause component to rerender only in limited cases:
- when some of its [`@Input`s](https://angular.io/api/core/Input) changed; or
- when some observable passed to [`async` pipe](https://angular.io/api/common/AsyncPipe) in its template has changed/emitted new value; or
- when change detection was invoked manually.

By the Angular's design, the `changeDetection` value is also implicitly inherited by all descendant components in the tree.

## OnPush used in Spartacus

In Spartacus, the root component `<cx-storefront>` has the `changeDetection` option configured to `OnPush`. But all descendant components don't have `changeDetection` option configured so they just inherit the `OnPush` value from the root component. 

But when Spartacus' components are used individually in some custom parent component, then they will just inherit the `changeDetection` option of their custom parent component.

## Custom change detection strategy

We believe the `OnPush` strategy is the right strategy for commerce storefronts, however, customers could configure an alternative strategy per individual (group of) components or by replacing the storefront module entirely.
