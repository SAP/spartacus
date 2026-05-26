---
name: change-detection
description: Use this skill when authoring a new Angular component in a Spartacus app, when a component's view doesn't update, or when extending a Spartacus component (some intentionally use `Default` change detection). Establishes `ChangeDetectionStrategy.OnPush` plus the `async` pipe as the default.
---

<!-- spartacus-version: 221121.7.0 -->

# Change Detection

## Rule

Declare `ChangeDetectionStrategy.OnPush` on new components, and bind observables with the `async` pipe in templates.

```typescript
@Component({
  selector: 'app-my-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './my-component.component.html',
})
export class MyComponent {
  protected myFacade = inject(MyFacade);
  data$ = this.myFacade.getData();
}
```

```html
<div *ngIf="data$ | async as data">
  {{ data.name }}
</div>
```

## Why (Spartacus-specific)

A Spartacus page composes components from many feature libs. Spartacus components are mostly `OnPush`, and the `async`-pipe pattern is what makes their data flows compose cleanly. A non-`OnPush` component dropped into the same page tree can pull the whole subtree back into default change detection, undoing the gains you get elsewhere on the page.

For the underlying mechanics, see Angular's [Skipping component subtrees](https://angular.dev/best-practices/skipping-subtrees).

## Exception — extending a Spartacus component that uses `Default`

A handful of Spartacus components intentionally use `ChangeDetectionStrategy.Default` (e.g. `ActiveFacetsComponent`, several product-configurator components). Their child components may rely on the parent being checked on every event. If you subclass one of these, **keep its CD strategy** unless you have explicit evidence the children handle `OnPush` correctly.

## When OnPush appears to "not update"

Always a smell, never a reason to drop OnPush:

- A `BehaviorSubject` whose `.value` was mutated instead of `.next(...)` — emit the new value.
- An array/object pushed-into instead of replaced — emit a new reference.
- An imperative `.subscribe()` writing to a component property — convert it to a stream and use `async` pipe (see the `subscriptions` skill).
- A timer / browser API callback running outside Angular's zone — wrap in `NgZone.run()` *only if* you can't express the data as an observable.

Reaching for `cd.markForCheck()` is almost always a sign that something upstream should have been a stream.

## Subscriptions

For when you genuinely need imperative `.subscribe()`, see the `subscriptions` skill.

## Codebase reference

- Most Spartacus components in `@spartacus/storefront` and the feature libs use `ChangeDetectionStrategy.OnPush`. A handful intentionally use `Default` — keep their CD strategy when you extend them.

📖 [Angular: Skipping component subtrees](https://angular.dev/best-practices/skipping-subtrees)
