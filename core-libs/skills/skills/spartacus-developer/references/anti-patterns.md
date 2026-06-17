# Subscription Anti-Patterns (Real Cases)

Three patterns that come up repeatedly in Spartacus customizations, each with a paired fix.

## ❌ Subscribing to copy data into a property

```typescript
ngOnInit(): void {
  this.subscription.add(
    this.launchDialogService.data$.subscribe((data) => {
      if (data?.product) {
        this.product = data.product;
      }
    })
  );
}
```

`this.product` is read by the template — that's exactly what `async` pipe is for. With `OnPush`, the assignment also won't trigger CD on its own, so this is subtly broken in addition to being verbose.

✅ Fix:

```typescript
product$ = this.launchDialogService.data$.pipe(
  map((data) => data?.product),
  filter(Boolean),
);
```

```html
<ng-container *ngIf="product$ | async as product">
  <!-- ... -->
</ng-container>
```

## ❌ `.subscribe()` + `markForCheck()` after a Command

```typescript
redeem(value: number): void {
  this.subscription.add(
    this.loyaltyFacade.redeemPoints(value).subscribe({
      next: (result) => {
        this.redemption = result;
        this.cd.markForCheck();
      },
      error: () => {
        this.redeemError = true;
        this.cd.markForCheck();
      },
    })
  );
}
```

Every `markForCheck()` is the framework saying "you're working around OnPush". `redemption` and `redeemError` should be emissions on a stream, not mutable fields.

✅ Fix:

```typescript
private redeemTrigger$ = new Subject<number>();

redeemResult$ = this.redeemTrigger$.pipe(
  switchMap((value) =>
    this.loyaltyFacade.redeemPoints(value).pipe(
      map((result) => ({ result, error: false, pending: false } as const)),
      catchError(() => of({ result: null, error: true, pending: false } as const)),
      startWith({ result: null, error: false, pending: true } as const),
    ),
  ),
);

redeem(value: number): void {
  this.redeemTrigger$.next(value);
}
```

Template binds `redeemResult$ | async`; `markForCheck()` disappears, `Subscription` field disappears, `ngOnDestroy` disappears.

## ❌ Manual `Subscription` field + `ngOnDestroy` unsubscribe

```typescript
private subscription = this.eventService
  .get(ProductDetailsPageEvent)
  .subscribe((event) => event.code && this.addProductCode(event.code));

ngOnDestroy(): void {
  this.subscription.unsubscribe();
}
```

The `Subscription` field and the lifecycle hook are pure boilerplate.

✅ Fix:

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
