---
name: subscriptions
description: Use this skill when reaching for `.subscribe()` in a component or service in a Spartacus app, or when adding `cd.markForCheck()`. Covers acceptable vs unacceptable subscription patterns and `takeUntilDestroyed()` as the canonical unsubscription tool.
---

# RxJS Subscriptions in Components and Services

## Rule

In templates, ALWAYS use the `async` pipe. In TypeScript, AVOID `.subscribe()` unless you have a true imperative side effect that cannot be expressed declaratively.

`.subscribe()` is acceptable for:

1. **Form initialization from a one-shot Query** with `take(1)` or `first()`.
2. **Navigation** (`router.navigate(...)`) triggered by an event stream.
3. **Showing a global UI message** (toast, dialog) on a one-off event.
4. **Pure side effects that don't drive the view** (logging, analytics, telemetry, persisting to storage).

`.subscribe()` is NEVER acceptable for:

1. Copying a stream value into a component property "so the template can read it" — use `async` pipe.
2. Driving state that the template displays — use `async` pipe over a derived stream.
3. Calling `cd.markForCheck()` from inside a `.subscribe()` callback — that's the framework telling you the state should have been a stream.

For concrete before/after examples of each unacceptable pattern, see [references/anti-patterns.md](references/anti-patterns.md).

## Acceptable patterns — don't "fix" these

### ✅ Form initialization from a one-shot Query

```typescript
ngOnInit(): void {
  this.deliveryInstructionsService
    .getDeliveryInstructions()
    .pipe(take(1))
    .subscribe((instructions) => {
      this.form.patchValue(instructions);
    });
}
```

Forms are inherently imperative; `take(1)` makes the stream complete itself, so no `takeUntil` needed. This is the canonical escape hatch — leave it alone.

### ✅ Navigation triggered by an event

```typescript
this.cartEvents.add$
  .pipe(takeUntilDestroyed())
  .subscribe(() => this.router.navigate(['/cart']));
```

Side effect with no view state, no `markForCheck()` — fine.

## Unsubscription

If you must `.subscribe()` and the stream isn't self-completing (`take`, `first`, HTTP):

- **Use** `.pipe(takeUntilDestroyed())` from `@angular/core/rxjs-interop`. It uses Angular's `DestroyRef`, so no `Subscription` field and no `ngOnDestroy` are needed.
- **Avoid** `takeUntil(this.destroy$)` with a manually-managed `Subject` — `takeUntilDestroyed` does the same thing without the boilerplate.

```typescript
private eventService = inject(EventService);

constructor() {
  this.eventService
    .get(ProductDetailsPageEvent)
    .pipe(takeUntilDestroyed())
    .subscribe((event) => event.code && this.addProductCode(event.code));
}
```

`takeUntilDestroyed()` reads the current `DestroyRef` in a constructor or other injection context, so the subscription completes when the component is torn down — no field, no `ngOnDestroy`.

## Singleton services and SSR

The same discipline matters even more in `providedIn: 'root'` (singleton) services. Under SSR a fresh injector is created and destroyed for **every** request, so a long-lived subscription that's never torn down keeps the whole request's injector (and everything it captured) alive — a memory leak that grows with traffic on the server. In a service, tie the subscription to the injector lifetime the same way:

```typescript
@Injectable({ providedIn: 'root' })
export class MyService {
  constructor() {
    this.someEvent$.pipe(takeUntilDestroyed()).subscribe(/* ... */);
  }
}
```

(Or implement `ngOnDestroy` in the service and unsubscribe there — services have lifecycle hooks too.)

## Source reference (in `node_modules/@spartacus/*`)

- `EventService` from `@spartacus/core`.
- `LaunchDialogService` from `@spartacus/storefront`.
- `takeUntilDestroyed` from `@angular/core/rxjs-interop`.

📖 [Angular: takeUntilDestroyed](https://angular.dev/api/core/rxjs-interop/takeUntilDestroyed) · [RxJS: switchMap](https://rxjs.dev/api/operators/switchMap)

## Supplemental Information

- [references/anti-patterns.md](references/anti-patterns.md) — three concrete subscription anti-patterns (copying a stream into a property, `subscribe()` + `markForCheck()` after a Command, manual `Subscription` field + `ngOnDestroy`) with paired fixes.
